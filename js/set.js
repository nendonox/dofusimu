function setEvent(){
    $("#set_select").change(function(){
        displaySetInfo();
    });
}

function displaySetInfo(){

    var target = $("#set_select").val();

    if(target != "default"){
        $("#set_nume").html(sets[target]);
        $("#set_deno").html(set_status_json[target].length);

        var trs = "";
        var bonus = set_status_json[target][sets[target] - 1];
        for(var i in bonus){
            var label = getTag("td", {}, id_display_dict[i]);
            var value = getTag("td", {}, bonus[i]);

            trs += getTag("tr", {}, label + value);
        }

        if(trs == ""){
            trs = "<tr><td>該当するセットボーナスはありません</td></tr>";
        }

        $("#set_bonus").html(trs);

    }else{
        $("#set_nume").html("*");
        $("#set_deno").html("*");

        $("#set_bonus").html("<tr><td>該当するセットボーナスはありません</td></tr>")
    }
}

function displaySetSelect(){
    var options = "";

    for(var key in sets){
        options += getTag("option", {"value": key}, key);
    }

    if(options == ""){
        options = getTag("option", {"value": "default"}, "なし");
    }

    emptyThenAppend("set_select", options);

    displaySetInfo();
}

// 装備からセット情報を計算
function calcSets(){
    sets = {};

    for(var key in equipments){
        var item = equipments[key];

        var name = set_dict_json[item["Key"]]
        if(name != undefined){
            if(sets[name] == undefined){
                sets[name] = 1;
            }else{
                sets[name] += 1;
            }
        }
    }
}