function initialize(){
    $.getJSON("json/equipment.json", function(data){
	    equipment_json = data;
	    setBuilderTypeSelect();
    });

    $.getJSON("json/set_dict.json", function(data){
	    set_dict_json = data;
    });

    $.getJSON("json/set_status.json", function(data){
	    set_status_json = data;
    });
    
    setBuilderLevelCondition();
    setInventorySelect();
    setEquipmentTags();
    setCharacterClassSelect();
    setCharacterLevelSelect();
    setCharacterStatusTags();
    setTotalTags();
}

function setBuilderTypeSelect(){
    var options = getOption("default", "装備タイプを選択してくだしあ");
    equipment_type_list.forEach(function(type){
	    options += getOption(type, id_display_dict[type]);
    });
    $("#builder_type_select").append(options);
}

function setBuilderLevelCondition(){
    $("#builder_level_low").append(getOptionsCorrespondsToValues(0, 200, 0));
    $("#builder_level_high").append(getOptionsCorrespondsToValues(0, 200, 200));
}

function setInventorySelect(){    
    var options = getTag("option", {"value": "default"}, "全種類");
    equipment_type_list.forEach(function(type){
        options += getTag("option", {"value": type}, id_display_dict[type]);
    });

    $("#inventory_select").append(options);
}

// 装備一覧用タグをセット
function setEquipmentTags(){
    var tags = "";
    
    equipment_type_list.forEach(function(type){
        var h3 = getTag("h3", {}, id_display_dict[type]);
        var div = getTag("div", {"id": "equipment_" + type}, "");
        tags += getTag("div", {"class": "b3"}, h3 + div);
    });
    
    $("#equipment").append(tags);
    
    equipment_type_list.forEach(function(data){
	    displayEquipment(data);
    });
}

// キャラクターのクラス選択フォームをセット
function setCharacterClassSelect(){
    var options = getTag("option", {"value": "default"}, "クラスを選択");
    class_list.forEach(function(data){
        options += getTag("option", {"value": data}, id_display_dict[data]);
    });

    $("#character_class_select").append(options);
}

// キャラクターのレベル選択フォームをセット
function setCharacterLevelSelect(){
    var options = getOptionsCorrespondsToValues(1, 200, 199);
    
    $("#character_level_select").append(options);
}

// キャラクターのステータス設定タグをセット
function setCharacterStatusTags(){
    var tags = "";

    character_status_list.forEach(function(data){
        var scrollMinus = getTag("input", {"type": "button", "key": data, "key2": "Scroll", "class": "character_status_shift", "value": "-"}, "");
        var scrollPlus = getTag("input", {"type": "button", "key": data, "key2": "Scroll", "class": "character_status_shift", "value": "+"}, "");
        var pointMinus = getTag("input", {"type": "button", "key": data, "key2": "Point", "class": "character_status_shift", "value": "-"}, "");
        var pointPlus = getTag("input", {"type": "button", "key": data, "key2": "Point", "class": "character_status_shift", "value": "+"}, "");
        
        var label = getTag("td", {"class": "label"}, id_display_dict[data]);
        var scroll = getTag("td", {}, scrollMinus + getTag("span", {"id": "character_status_scroll"}, "0") + scrollPlus);
        var point = getTag("td", {}, pointMinus + getTag("span", {"id": "character_status_point"}, "0") + pointPlus);
        var total = getTag("td", {"id": "character_status_total"}, "0");
        tags += getTag("tr", {"key": data}, label + scroll + point + total);
    });

    $("#character_status_list").append(getTag("table", {}, tags));
}

// 総合ステータスのタグを設定
function setTotalTags(){
    calcTotal();

    var trs = "";
    for(var key in total_status){
	    var tags = getTag("td", {"class": "label"}, id_display_dict[key]);
	    tags += getTag("td", {"id": "total_" + key}, total_status[key]);
	    trs += getTag("tr", {}, tags);
    }
    var table = getTag("table", {}, trs);
    $("#total").append(table);
}