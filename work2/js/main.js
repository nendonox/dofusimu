$(document).ready(function(){
    initialize();

    builderEvent();
    equipmentEvent();
    setEvent();
    characterEvent();
});

$(document).bind('keyup keydown', function(e){
    shifted = e.shiftKey;
    ctrled = e.ctrlKey;
});