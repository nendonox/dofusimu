// idがインベントリ内にあるかどうか
function isInInventory(id){
    if(inventory[id] == undefined){
	return false;
    }else{
	return true;
    }
}
