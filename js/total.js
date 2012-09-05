function displayTotal(){
    calcTotal();
    displaySetSelect();

    for(var key in total_status){
        $("#total_" + key).html(total_status[key]);
    }
}

function calcTotal(){
    initTotal();
    calcSets();
    addCharacterStatus();
    addEquipmentsStatus();
    addSetBonusStatus();
    addFinalBonusStatus();
}

// 総合ステータスを初期化
function initTotal(){
    for(var key in status_power_dict){
	    total_status[key] = 0;
    }

    total_status["Prospecting"] = 100;
    total_status["Vitality"] = 50;

    total_status["AP"] = 6;
    total_status["MP"] = 3;
}

// キャラクターのステータスを追加
function addCharacterStatus(){
    if(character["Class"] == "Enutrof"){
        total_status["Prospecting"] += 20;
    }

    if(character["Level"] >= 100){
        total_status["AP"] += 1;
    }

    total_status["Vitality"] += eval(character["Level"])*5;

    for(var key in character["Status"]){
        var value = character["Status"][key]["Total"];
        total_status[key] += eval(value);
    }
}

// 装備ステータスを追加
function addEquipmentsStatus(){
    for(var key in equipments){
        var status = equipments[key]["Status"];
        for(var type in status){
            total_status[type] += eval(status[type]);
        }
    }
}

// セットボーナスを追加
function addSetBonusStatus(){
    
    for(var key in sets){
        var status = set_status_json[key][sets[key] - 1];
        for(var type in status){
            total_status[type] += eval(status[type]);
        }
    }
}

// 最終ボーナスを追加
function addFinalBonusStatus(){
    total_status["Prospecting"] += Math.floor(eval(total_status["Chance"])/10);

    var init = 0;
    init += eval(total_status["Strength"]);
    init += eval(total_status["Intelligence"]);
    init += eval(total_status["Agility"]);
    init += eval(total_status["Chance"]);
    total_status["Initiative"] += init;

    var wd10 = Math.floor(total_status["Wisdom"]/10);
    total_status["MPreductionability"] += wd10;
	total_status["MPlossresistance"] += wd10;
	total_status["APreductionability"] += wd10;
	total_status["APlossresistance"] += wd10;

    var ad10 = Math.floor(total_status["Agility"]/10);
    total_status["Dodge"] += ad10;
	total_status["Lock"] += ad10;
}