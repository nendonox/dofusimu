var equipment_json = null;
var status_id_json = null;
var builder_item_type = null;
var builder_item_name = null;
var inventory = {};

var equipment_type_list = ["Amulet", "Boots", "Belt", "Cloak", "Hat", "Ring"];

$(document).ready(function(){
    loadJson();

    builderItemTypeChangeEvent();
    builderItemNameChangeEvent();
    builderItemCreateEvent();

    itemClickEvent();
    inventoryItemDblClickEvent();

    statusCalculateEvent();
});

function loadJson(){
    $.getJSON("json/equipment.json", function(data){
	equipment_json = data;
	for(var type in data){
	    $("#type").append("<option>" + type + "</option>");
	}
    });

    $.getJSON("json/status.json", function(data){
	status_id_json = data;
    });
}

function getInventoryNameList(){
    nameList = [];
    for(var name in inventory){
	nameList.push(name);
    }
    return nameList;
}

function getNotOverlappedName(baseName, nameList){
    var count = 0;
    var name = baseName;
    while(true){
	count++;
	if(nameList.indexOf(name) == -1){
	    break;
	}else{
	    name = baseName + " " + count;
	}
    }
    return name;
}

function getValidId(id){
    return id.replace(/[^0-9a-zA-Z]/g, "");
}

function builderItemTypeChangeEvent(){
    $("#type").change(function(){
	builder_item_type = $(this).val();
	$("#builder_status").empty();
	$("#name").empty();
	for(var name in equipment_json[builder_item_type]){
	    $("#name").append("<option>" + name + "</option>");
	}	
    });
}

function builderItemNameChangeEvent(){
    $("#name").change(function(){
	builder_item_name = $(this).val();
	$("#builder_status").empty();
	for(var s in equipment_json[builder_item_type][builder_item_name]){
	    value = equipment_json[builder_item_type][builder_item_name][s];
	    status_name = status_id_json[s]["name"]
	    min = value["min"];
	    max = value["max"];
	    $("#builder_status").append("<tr id=\"" + s + "\"></tr>");
	    if(min == undefined){
 		$("#" + s).append(status_name + ": " + value);
	    }else{
		$("#" + s).append(status_name + ": " 
				  + "<select id=\"select" + s + "\"></select>")
		min = Math.min(min, 0);
		max = Math.max(max, status_id_json[s]["max"]);
		option = "";
		for(var i=min ; i<max + 1 ; i++){
		    if(i == value["max"]){
			option = "<option selected>" + i + "</option>" + option;
		    }else{
			option = "<option>" + i + "</option>" + option;
		    }
		}
		$("#select" + s).append(option);
	    }	
	}
    });
}

function builderItemCreateEvent(){
    $("#create").click(function(){
	if(builder_item_name != null){
	    item_data = {};
	    for(var s in status_id_json){
		value = $("#select" + s).val();
		if(value != undefined){
		    item_data[s] = value;
		}
	    }

	    nameList = getInventoryNameList();
	    createItemName = getNotOverlappedName(builder_item_name, nameList);
	    createItemId = getValidId(createItemName);
	    item_data["id"] = createItemId;
	    item_data["type"] = builder_item_type;

	    inventory[createItemName] = item_data;
	    
	    $("#inventory_list").append("<div class=\"item inventoryElm\" id=\"" 
			      + createItemId + "\">" 
			      + createItemName + "</div>");
	}
    });
}

function itemClickEvent(){
   $(".item").live("click", function(){
       $("#item_status").empty();
       name = $(this).html();
       $("#item_status").append("<div>名前: " + name + "</div>");
       item = inventory[name];
       for(var s in item){
	   if(status_id_json[s] != undefined){
	       status_name = status_id_json[s]["name"];
	       $("#item_status").append("<div>" + status_name + ": " 
					+ item[s] + "</div>");
	   }
       }
   });
}

function inventoryItemDblClickEvent(){
   $(".inventoryElm").live("dblclick", function(){
       name = $(this).html();
       $("#" + inventory[name]["id"]).remove();
       $("#" + inventory[name]["type"]).empty();
       $("#" + inventory[name]["type"]).append("<div class=\"item equipmentElm\">" 
					       + name + "</div>");
   });
}

function isValidStatusValueName(statusName){
    if(status_id_json[statusName] != undefined){
	if(status_id_json[statusName]["max"] != undefined){
	    return true;
	}
    }
    return false;
}

function getEquipmentTotalStatusDict(){
    statusDict = {};
    for(var status in status_id_json){
	if(isValidStatusValueName(status)){
	    statusDict[status] = 0;
	}
    }

    for(var i in equipment_type_list){
	type_name = equipment_type_list[i];
	equipment_name = $("#" + type_name).children("div").html();
	
	console.log(":" + equipment_name);
	for(var status in inventory[equipment_name]){
	    if(isValidStatusValueName(status)){
		statusDict[status] += eval(inventory[equipment_name][status]);
	    }
	}
    }

    return statusDict;
}

function getStatusRegularName(idName){
    return status_id_json[idName]["name"];
}

function statusCalculateEvent(){
    $("#calc").click(function(){
	$("#status_list").empty();
	statusDict = getEquipmentTotalStatusDict();
	for(var status in statusDict){
	    $("#status_list").append("<div>" + getStatusRegularName(status) + ": " 
				+ statusDict[status] + "</div>");
	}
    });
}