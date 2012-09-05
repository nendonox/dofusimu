function fileEvent(){
    fileOutputEvent();
    fileInputEvent();
}

function fileOutputEvent(){
    $("#file_output_button").click(function(){
        var output = {};
        if(getDictSize(equipments) != 0){
            output["equipments"] = equipments;            
        }

        if(getDictSize(inventory) != 0){
            output["inventory"] = inventory;
        }

        output["character"] = character;
        $("#file_output_text").val(trace(output));
    });
}

function fileInputEvent(){
    $("#file_input_button").click(function(){
        var data = escape_html_tag($("#file_input_text").val());        

        try {
            // JSONに変換
            var input = $.parseJSON(data);
            equipments = input["equipments"];
            if(equipments == undefined) equipments = {};
            inventory = input["inventory"];
            if(inventory == undefined) inventory = {};
            character = input["character"];
            
            reflesh();
        }
        catch (e) {
            // parseJSON()でエラーのとき
            alert("不正なデータ形式です\n" + e);
        }
        //(new Function("return " + data))();
    });
}

// http://www.kuma-de.com/blog/2009-10-01/1274
// オブジェクトを書き出す
function trace(s){
    mylog = [];

    function getIndent(num){
        var ind = [];
        while(num){
            ind.push('  ');
            num--;
        }
        return ind.join('');
    }

    function addLog(txt, defaultIndent){
        var cnt = defaultIndent;
        //array
        if((typeof txt == 'object') && (txt instanceof Array)){
            cnt++;
            mylog.push('[');
            for(var i = 0; i < txt.length; i++){
                mylog.push('\r\n' + getIndent(cnt));
                addLog(txt[i], cnt);
                if(i != txt.length - 1){
                    mylog.push(',');
                }
            }
            mylog.push('\r\n' + getIndent(cnt - 1) + ']');
            //object
        }else if((typeof txt == 'object')){
            cnt++;
            mylog.push('{');
            for(var i in txt){
                mylog.push('\r\n' + getIndent(cnt) + dq(i) + ':');
                addLog(txt[i], cnt);
                mylog.push(',');
            }
            mylog.pop();
            mylog.push('\r\n' + getIndent(cnt - 1) + '}');
        }else{
            mylog.push(dq(txt));
        }
    }
    addLog(s, 0);
    return mylog.join('');

    //Firebugが入っていなかったらこっち
    //alert(mylog.join(''));
};