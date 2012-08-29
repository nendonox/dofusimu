function equipmentEvent(){
    $(".equipment_select").change(function(){
        updateEquipments();
        displayEquipments();
        displayTotal();
    });

    $(".equipment_modify").click(function(){
        var select = $(this).closest("tr").find(".equipment_select");
        var id = select.val();

        if(id != "default"){
            setBuilderItemInfo(equipments[id]);
            delete equipments[id];
            select.children(':selected').remove();
            select.val(0);
            displayTotal();
        }
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