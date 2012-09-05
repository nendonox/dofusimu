function characterEvent(){
    characterStatusShiftEvent();
    characterClassChangeEvent();
    characterLevelChangeEvent();
}

// すべてのキャラクターデータを反映
function displayCharacter(){
    displayCharacterLevel();
    displayCharacterClass();
    for(var i in character_status_list){
        displayCharacterStatus(character_status_list[i]);
    }
    displayCharacterRemainPoint();
}

// クラスをデータから反映
function displayCharacterClass(){
    $("#character_class_select").val(character["Class"]);
}

// レベルをデータから反映
function displayCharacterLevel(){
    $("#character_class_select").val(character["Level"]);
}

// キャラクターの基礎ステータスを変動させるボタンのイベント
function characterStatusShiftEvent(){
    $(".character_status_shift").live("click", function(){
        var type = $(this).attr("key");
        var sign = $(this).attr("value");
        var value = getVariation(sign);
        var key = $(this).attr("key2");
        characterStatusShift(type, value, key);

        displayTotal();
    });
}

// キャラクターのクラスを変更したときのイベント
function characterClassChangeEvent(){
    $("#character_class_select").change(function(){
        character["Class"] = $(this).val();
        character_status_list.forEach(function(data){
            calcCharacterStatusTotal(data);
            displayCharacterStatus(data);
        });

        displayTotal();
    });
}

// キャラクターのレベルを変更したときのイベント
function characterLevelChangeEvent(){
    $("#character_level_select").change(function(){
        var current = character["Level"];
        character["Level"] = $("#character_level_select").val();
        
        var dif = current - character["Level"];
        character["Remain"] -= dif*5;

        displayCharacterRemainPoint();
    });
}

// キー入力情報と符号から変動数値を算出し返す
function getVariation(sign){
    var value = 1;

    var ctrl_checked = $("#character_check_ctrl").attr('checked') != undefined;
    var alt_checked = $("#character_check_alt").attr('checked') != undefined;

    if(sign == "-") value = -1;
    if(alted || alt_checked) value *= 10;
    if(ctrled || ctrl_checked) value *= 10;

    return value;
}

// 指定タイプのスクロ・基礎(key)値を指定数値だけ変化させる
function characterStatusShift(type, variation, key){
    var current = character["Status"][type][key];
    var resultVar = getStatusResultVariation(eval(current), variation, key);
    character["Status"][type][key] = eval(character["Status"][type][key]) + resultVar;
    calcCharacterStatusTotal(type);

    displayCharacterStatus(type);
    if(key == "Point"){
        character["Remain"] = eval(character["Remain"]) - resultVar;
        displayCharacterRemainPoint();
    }
}

// スクロ・基礎値上限などの条件に合わせた最終変動量を取得
function getStatusResultVariation(current, variation, key){
    var resultVar = variation;
    var result = current + variation;

    if(result < 0){
        resultVar = 0 - current;
    }else if(key == "Scroll"){
        if(result > 101){
            resultVar = 101 - current;
        }
    }else if(key == "Point"){
        var remain = character["Remain"];
        if(remain < 0){
            if(variation > 0){
                resultVar = 0;
            }
        }else if(variation > remain){
            resultVar = remain;
        }
    }

    return resultVar;
}

// 指定タイプのRow(trタグ)を取得
function getCharacterStatusRow(type){
    var row = "";
    $("#character_status_list").find("tr").each(function(){
        if($(this).attr("key") == type){
            row = $(this);
        }
    });
    return row;
}

// 指定タイプの表示を更新する
function displayCharacterStatus(type){
    $("#character_scroll_" + type).html(character["Status"][type]["Scroll"]);
    $("#character_point_" + type).html(character["Status"][type]["Point"]);
    $("#character_total_" + type).html(character["Status"][type]["Total"]);
}

// 余剰ポイントの表示を更新
function displayCharacterRemainPoint(){
    $("#character_remain_point").html(character["Remain"]);
}

// 最終値を計算し格納
function calcCharacterStatusTotal(type){
    var scroll = character["Status"][type]["Scroll"];
    var point = character["Status"][type]["Point"];

    var cl = character["Class"];
    var total = scroll;

    while(true){
        var necessary = getNecessary(cl, type, total);

        if(point >= necessary){
            total ++;
            point -= necessary;
        }else{
            break;
        }
    }

    character["Status"][type]["Total"] = total;
}

// 指定クラスの指定ステータス種の指定値から総合ポイントを1上げるためのポイントを返す
function getNecessary(cl, type, value){
    if(cl == "default") return 1;
    if(type == "Vitality" && cl == "Sacrier") return 0.5;

    var list = characteristic_dict[cl][type];
    var necessary = 0;

    for(var i=0 ; i<list.length ; i++){
        if(eval(value) < eval(list[i])){
            break;
        }else{
            necessary ++;
        }
    }

    return necessary;
}