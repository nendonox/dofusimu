$(document).ready(function(){
    initialize();

    builderEvent();
    equipmentEvent();
    setEvent();
    characterEvent();
    fileEvent();
});

$(document).bind('keyup keydown', function(e){
    alted = e.altKey;
    ctrled = e.ctrlKey;
});