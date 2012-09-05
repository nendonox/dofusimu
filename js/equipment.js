function equipmentEvent(){
    $(".equipment_select").change(function(){
        updateEquipments();
        displayInventoryEquipments();
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

// 装備セレクトをすべて初期化し、装備データを対応させる
function displayEquipments(){
    var option = getTag("option", {"value": "default"}, "なし");
    $("#equipment_table").find("select").each(function(){
        $(this).html(option);
    });

    for(var i in equipments){
        var type = equipments[i]["Type"];
        var id = equipments[i]["Id"];
        var name = equipments[i]["Name"];
        var eqop = getTag("option", {"value": id}, name);
        $("#equipment_table").find("select").each(function(){
            if($(this).attr("Key") == type){
                if($(this).val() == "default"){
                    $(this).append(eqop);
                    $(this).val(id);

                    return false;
                }
            }
        });            
    }
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
function displayInventoryEquipments(){
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


// 指定タイプの装備数を返す
function getEquipmentAmount(type){
    var count = 0;
    for(var i in equipments){
        if(equipments[i]["Type"] == type){
            count ++;
        }
    }
    return count;
}

// 装備データに入れられる形式でアイテムデータを取得
function getItemDataForEquipment(name){
    var rawitem = getItemData(name);
    if(rawitem != null){
        var item = {};
        item["Type"] = rawitem["Type"];
        item["Level"] = rawitem["Level"];
        item["Name"] = rawitem["Name"];
        item["Key"] = rawitem["Key"];
        item["Id"] = getNotOverlappedId(getValidId(item["Key"]), getItemsIdList());
        item["Status"] = {};
        for(var i in rawitem["Status"]){
            item["Status"][i] = rawitem["Status"][i]["max"]; 
        }

        return item;
    }
    return null;
}

// 同種の装備がいくつ装備されているかを返す
function getEquippedAmount(key){
    var count = 0;
    for(var i in equipments){
        if(equipments[i]["Key"] == key){
            count++;
        }
    }
    return count;
}