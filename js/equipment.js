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

// 装備されていない（全てされている場合一番上の）セレクトを返す
function getSelectOfDefaultForEq(type){
    var result = "";

    $("#equipment_table").find("select").each(function(){
	    if($(this).attr("key") == type){
		if($(this).val() == "default"){
		    result = $(this);
		    return false;
		}else if(result == ""){
		    result = $(this);
		}
	    }
    });

    return result;
}

// 装備セレクト内のインベントリと対応したオプションをデータと対応させる
function displayEquipments(){
    removeInventoryEquipments();
    addInventoryEquipments();
}

// 装備セレクトにすべてのインベントリアイテムを追加
function addInventoryEquipments(){
    for(var i in inventory){
        var type = inventory[i]["Type"];
        var value = i;
        var html = inventory[i]["Name"];

        appendOptionForEquipment(type, value, html);
    }
}

// 装備セレクトのすべてのインベントリアイテムを削除
function removeInventoryEquipments(){
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