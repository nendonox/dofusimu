var equipment_json = null;
var set_dict_json = null;
var set_status_json = null;

var inventory = {};
var equipments = {};
var sets = {};
var total_status = {};

for(var key in status_power_dict){
	total_status[key] = "0"
}

var character =
    {
        "Class": "default",
        "Level": "199",
        "Remain": "990",
        "Status": {
            "Vitality": {"Scroll": "0", "Point": "0", "Total": "0"},
            "Wisdom": {"Scroll": "0", "Point": "0", "Total": "0"},
            "Strength": {"Scroll": "0", "Point": "0", "Total": "0"},
            "Intelligence": {"Scroll": "0", "Point": "0", "Total": "0"},
            "Agility": {"Scroll": "0", "Point": "0", "Total": "0"},
            "Chance": {"Scroll": "0", "Point": "0", "Total": "0"}
        }
    };
