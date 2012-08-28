function inventoryEvent(){
    inventorySelectChangeEvent();
}

// 表示カテゴリー変更イベント
function inventorySelectChangeEvent(){
    $("#inventory_select").change(function(){
        displayInventory();
    });
}

// インベントリ内にあるすべてのアイテムのid(key)をリスト化し返す
function getInventoryIdList(){
    var list = [];
    for(var id in inventory){
        list.push(id);
    }
    return list;
}

// インベントリ内のアイテムを選択カテゴリに応じて表示
function displayInventory(){
    var divs = "";
    var type = $("#inventory_select").val();
    for(var itemId in inventory){
        var item = inventory[itemId];
        if(type == "default" | item["Type"] == type){
            divs += getTag("div", {"id": itemId, "class": "item"}, item["Name"]);
        }
    }
    emptyThenAppend("inventory_list", divs);
}

// idがインベントリ内にあるかどうか
function isInInventory(id){
    if(inventory[id] == undefined){
	return false;
    }else{
	return true;
    }
}
