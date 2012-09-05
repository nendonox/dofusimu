function setEvent(){
    $("#set_select").change(function(){
        displaySetInfo();
    });

    $("#set_full_button").click(function(){
        setFull();
    });
}

function displaySet(){
    displaySetSelect();
    displaySetInfo();
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

function setFull(){
    var setname = $("#set_select").val();

    if(setname != "default"){
        var list = [];
        for(var i in set_dict_json){
            if(set_dict_json[i] == setname){
                list.push(i);
            }
        }

        list.forEach(function(data){
            var item = getItemDataForEquipment(data);
            if(item != null){
                if(getEquippedAmount(item["Key"]) == 0){
                    equipments[item["Id"]] = item;
                }
            }
        });

        equipment_type_list.forEach(function(i){
            var amount = getEquipmentAmount(i);
            console.log(i + "amount: " + amount);
            var diff = max_number_of_equipment_dict[i] - amount;
            if(diff < 0){
                console.log("over: " + i);
                for(var j in equipments){
                    if(equipments[j]["Type"] == i){
                        inventory[j] = equipments[j];
                        delete equipments[j];

                        diff++;
                    }
                    if(diff == 0) break;
                }
            }
        });

        reflesh();
    }
}