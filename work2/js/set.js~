function displaySets(){
    for(var key in sets){
        var bonus = set_status_json[key][sets[key] - 1];
        
    }
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