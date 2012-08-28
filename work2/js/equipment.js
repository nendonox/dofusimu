function equipmentEvent(){
    $(".equipment_select").change(function(){
        updateEquipments();
        displayEquipments();
        displayTotal();
    });
}

// 装備セレクトのオプションをデータと対応させる
function displayEquipments(){
    $("#equipment_table").find("select").each(function(){
        var select = $(this);
        $(this).children("option").each(function(){
            var selected = select.val();
            var value = $(this).attr("value");
            if(value != selected && value != "default"){
                $(this).remove();
            }
        });
    });

    for(var i in inventory){
        var type = inventory[i]["Type"];
        var value = i;
        var html = inventory[i]["Name"];

        appendOptionForEquipment(type, value, html);
    }
}

// 現在選択中のすべての装備をデータに反映させる
function updateEquipments(){
    releaseEquipments();

    $("#equipment_table").find("select").each(function(){
        id = $(this).val();
        if(id != "default"){
            equipments[id] = inventory[id];
            delete inventory[id];   
        }     
    });
}

// すべての装備を一度インベントリに戻す
function releaseEquipments(){
    for(var i in equipments){
        inventory[i] = equipments[i];
    }
    equipments = {};
}