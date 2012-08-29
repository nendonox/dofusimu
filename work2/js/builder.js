function builderEvent(){
    builderSearchEvent();
    builderNameChangeEvent();
    builderForgeEvent();
    builderCreateEvent();
}

function getConditionDiv(){
    var condition = getConditionTypeSelect()
        + getConditionValueInput();

    return getDiv(condition);
}

function getConditionTypeSelect(){
    var options = getOption("default", "ステータスの種類を選択");
    for(var status_type in status_power_dict){
        options += getOption(status_type, id_display_dict[status_type]);
    }
    return getSelect("builder_condition_options", options);
}

function getConditionValueInput(){
    return getInput("builder_condition_value", "text", "4");
}

// 検索ボタンを押したときのイベントを登録する
function builderSearchEvent(){
    $("#builder_search").click(function(){
        var type = $("#builder_type_select").val();

        var options = getTag("option", {"value": "default"}, "検索結果");

        if(type == "all"){
            equipment_type_list.forEach(function(type){
                options += getOptionsFromList(
                    getEquipmentNameListForConditions(equipment_json[type]));                
            });
        } else {
            options += getOptionsFromList(
                getEquipmentNameListForConditions(equipment_json[type]));
        }

        emptyThenAppend("builder_name_select", options);
    });
}

// 装備データリストから条件に合う装備をリストとして返す
function getEquipmentNameListForConditions(equipments){
    var list = [];

    for(var name in equipments){
        if(isMatchLevelCondition(equipments[name]["Level"]) 
           && isMatchCondition(equipments[name]["Status"])){
            list.push(name);
        }
    }

    return list;
}

// レベル条件に合うかどうかを調べる
function isMatchLevelCondition(level){
    var low = $("#builder_level_low").val();
    var high = $("#builder_level_high").val();

    return (low <= eval(level)) && (eval(level) <= high);
}

// ステータス条件に合うかどうかを調べる
function isMatchCondition(status){
    var flag = true;

    for(var i=0 ; i<3 ; i++){
        var condition_type = $("#builder_condition_select_" + i).val();
        var condition_value = $("#builder_condition_value_" + i).val();

        var target = status[condition_type] == undefined ? 
            "0" : status[condition_type]["max"]
        if(eval(target) < eval(condition_value)){
            flag = false;
        }
    }

    return flag;
}


// 検索欄の名前が変更された時のイベント
function builderNameChangeEvent(){
    $("#builder_name_select").change(function(){
        var name = $(this).val();
        var itemData = getItemData(name);

        if(itemData != null){
            setBuilderItemInfo(itemData);
        }
    });
}

// 
function setBuilderItemInfo(itemData){
    $("#builder_summary_base").html(itemData["Key"]);
    $("#builder_summary_type").html(id_display_dict[itemData["Type"]]);
    $("#builder_summary_type").attr("key", itemData["Type"]);         
    $("#builder_summary_level").html(itemData["Level"]);
    $("#builder_summary_name").val(itemData["Name"]);
    
    emptyThenAppend("builder_status", getBuilderStatusTags(itemData));
    setBuilderForgeType();
}

// id="builder_status"に入るタグを返す
function getBuilderStatusTags(itemData){
    var tags = "";
    
    for(var type in itemData["Status"]){
        var value = itemData["Status"][type]["max"];
        var min, max;
        if(value == undefined){
            value = itemData["Status"][type];
            min = Math.min(value, 0);
            max = Math.max(value, getMaxCorrespondsToType(type));
        }else{
            min = Math.min(itemData["Status"][type]["min"], 0);
            max = Math.max(value, getMaxCorrespondsToType(type));
        }

        tags += getBuilderStatusTr(type, min, max, value);
    }

    return tags;
}

// 引数タイプのステータス名と数値セレクトのペアを返す
function getBuilderStatusTr(type, min, max, value){
    var options = getOptionsCorrespondsToValues(min, max, value);

    return getTag("Tr", {}, 
                  getTag("td", {}, id_display_dict[type])
                  + getTag("td", {}, getTag("select", {"key": type}, options)));
}


//// 魔術ボタンを押したときのイベント
function builderForgeEvent(){
    $("#builder_forge").click(function(){
        var type = $("#builder_forge_type").val();
        if(status_power_dict[type] != undefined){
            var max = getMaxCorrespondsToType(type);
            $("#builder_status").append(getBuilderStatusTr(type, 0, max, 0));

            setBuilderForgeType();
        }
    });
}

// 魔術可能なオプション名をセレクトへ出力
function setBuilderForgeType(){
    var options = getTag("option", {"value": "default"}, "ステータス");
    var excluding_list = getExcludingStatusList(getBuilderStatusTypeList());
    excluding_list.forEach(function(type){
        options += getOption(type, id_display_dict[type]);
    });
    emptyThenAppend("builder_forge_type", options);
}

// 引数のリストにないステータスをリストとして返す
function getExcludingStatusList(including_list){
    var excluding_list = [];
    for(var type in status_power_dict){
        if(including_list.indexOf(type) == -1){
            excluding_list.push(type);        
        }
    }
    return excluding_list;
}

// 作成ボタンを押したときのイベントを登録する
function builderCreateEvent(){
    $("#builder_create").click(function(){
        if(canCreate()){
            var item = {"Status": {}};
            
            var summary_dict = getBuilderSummaryDict();
            for(var key in summary_dict){
                item[key] = summary_dict[key];
            }

            var status_dict = getBuilderStatusDict();
            for(var key in status_dict){
                item["Status"][key] = status_dict[key];
            }

            var id = getNotOverlappedId(getValidId(item["Key"]), getItemsIdList());
            item["Id"] = id;

            inventory[id] = item;

            appendOptionForEquipment(item["Type"], item["Id"], item["Name"]);
        }        
    });

    $("#builder_create_equip").click(function(){
        if(canCreate()){
            var item = {"Status": {}};
            
            var summary_dict = getBuilderSummaryDict();
            for(var key in summary_dict){
                item[key] = summary_dict[key];
            }

            var status_dict = getBuilderStatusDict();
            for(var key in status_dict){
                item["Status"][key] = status_dict[key];
            }

            var id = getNotOverlappedId(getValidId(item["Key"]), getItemsIdList());
            item["Id"] = id;

	    var select = getSelectOfDefaultForEq(item["Type"]);
	    var value = $(select).val();
	    
	    removeInventoryEquipments();

	    equipments[id] = item;

	    if(value == "default"){

	    }else{
		inventory[value] = equipments[value];

		delete equipments[value];
		$(select).children(':selected').remove();
	    }

	    select.append(getTag("option", {"value": id, "selected": "true"}, item["Name"]));

	    addInventoryEquipments();	   

	    displayTotal();
        }        
    });

}

// 全アイテムのid(key)をリスト化し返す
function getItemsIdList(){
    var list = [];
    for(var id in inventory){
        list.push(id);
    }
    for(var id in equipments){
        list.push(id);
    }
    return list;
}

// 該当タイプの装備セレクトそれぞれにオプションを追加
function appendOptionForEquipment(type, value, html){
    $("#equipment_table").find("select").each(function(data){
        if($(this).attr("key") == type){
            $(this).append(getTag("option", {"value": value}, html));
        }
    });
}

// 作成イベントを行えるかどうか
function canCreate(){
    for(var key in getBuilderStatusDict()){
        return true;
    }
    return false;
}

// id="builder_summary" 内のデータ辞書(Type, Name, Level)を返す
function getBuilderSummaryDict(){
    var summary = $("#builder_summary");
    var dict = {};

    dict["Type"] = $("#builder_summary_type").attr("key");
    dict["Name"] = escape_html_tag($("#builder_summary_name").val());
    dict["Key"] = $("#builder_summary_base").html();
    dict["Level"] = $("#builder_summary_level").html();
    
    return dict;
}

// id="builder_status"内のデータ辞書(Vitality, Strength)を返す
function getBuilderStatusDict(){
    var dict = {};

    $("#builder_status").find("select").each(function(){
        dict[$(this).attr("key")] = $(this).val();
    });

    return dict;
}

// 現在表示されているステータスのclassアトリビュートをリストとして返す
function getBuilderStatusTypeList(){
    var list = [];

    $("#builder_status").find("select").each(function(){
        list.push($(this).attr("key"));
    });

    return list;
}
