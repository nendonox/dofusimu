var character_status_list = 
    [
        "Vitality", "Wisdom",
        "Strength", "Intelligence", "Agility", "Chance"
    ];

var class_list =
    [
        "Cra", "Ecaflip", "Eniripsa", "Enutrof", "Feca", "Iop",
        "Masqueraider", "Osamodas", "Pandawa", "Rogue", "Sacrier", 
        "Sadida", "Sram", "Xelor"
    ];

var equipment_type_list = 
    [
        "Weapon", "Shield", 
        "Amulet", "Boots", "Belt", "Cloak", "Hat", "Ring", 
        "Pet", "Dofus"
    ];

var max_number_of_equipment_dict = 
    {
	"Weapon": "1", 
	"Shield": "1", 
	"Amulet": "1", 
	"Boots": "1", 
	"Belt": "1", 
	"Cloak": "1", 
	"Hat": "1", 
	"Ring": "2", 
	"Pet": "1", 
	"Dofus": "6"
    };

var characteristic_dict = 
    {
        "Cra": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "50", "150", "250", "350"],
            "Intelligence": ["0", "50", "150", "250", "350"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "50", "100", "150", "200"]
        }, 
        "Ecaflip": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "100", "200", "300", "400"],
            "Intelligence": ["0", "20", "40", "60", "80"],
            "Agility": ["0", "50", "100", "150", "200"],
            "Chance": ["0", "20", "40", "60", "80"]
        }, 
        "Eniripsa": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "0", "50", "150", "250"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "20", "40", "60", "80"]
        }, 
        "Enutrof": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "50", "150", "250", "350"],
            "Intelligence": ["0", "20", "60", "100", "150"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "100", "150", "230", "330"]
        }, 
        "Feca": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "0", "50", "150", "250"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "20", "40", "60", "80"]
        }, 
        "Iop": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "100", "200", "300", "400"],
            "Intelligence": ["0", "20", "40", "60", "80"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "20", "40", "60", "80"]
        },
        "Masqueraider": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "100", "200", "300", "400"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "100", "200", "300", "400"],
            "Chance": ["0", "100", "200", "300", "400"]
        }, 
        "Osamodas": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "0", "50", "150", "250"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "100", "200", "300", "400"]
        }, 
        "Pandawa": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "50", "200"],
            "Intelligence": ["0", "50", "200"],
            "Agility": ["0", "50", "200"],
            "Chance": ["0", "50", "200"]
        }, 
        "Rogue": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "50", "200"],
            "Intelligence": ["0", "50", "200"],
            "Agility": ["0", "50", "200"],
            "Chance": ["0", "50", "200"]
        }, 
        "Sacrier": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "0", "0", "100", "150"],
            "Intelligence": ["0", "0", "0", "100", "150"],
            "Agility": ["0", "0", "0", "100", "150"],
            "Chance": ["0", "0", "0", "100", "150"]
        }, 
        "Sadida": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "50", "250", "300", "400"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "100", "200", "300", "400"]
        }, 
        "Sram": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "100", "200", "300", "400"],
            "Intelligence": ["0", "0", "50", "150", "250"],
            "Agility": ["0", "100", "200", "300", "400"],
            "Chance": ["0", "20", "40", "60", "80"]
        }, 
        "Xelor": {
            "Vitality": ["0"], 
            "Wisdom": ["0", "0", "0"],
            "Strength": ["0", "0", "50", "150", "250"],
            "Intelligence": ["0", "100", "200", "300", "400"],
            "Agility": ["0", "20", "40", "60", "80"],
            "Chance": ["0", "20", "40", "60", "80"]
        }
    };

var id_display_dict = 
    {
	    "Weapon": "武器",
	    "Shield": "盾", 
	    "Amulet": "アミュレット", 
	    "Boots": "ブーツ",
	    "Belt": "ベルト", 
	    "Cloak": "マント",
	    "Hat": "かぶりもの",
	    "Ring": "リング", 
	    "Pet": "ペット・マウント", 
	    "Dofus": "ドフス・トロフィー",
	    "Level": "レベル",
	    "Initiative": "リーダーシップ", 
	    "Vitality": "活力", 
	    "Strength": "力",
	    "Intelligence": "知性",
	    "Agility": "すばやさ",
	    "Chance": "運",
	    "Wisdom": "精神",
	    "Prospecting": "ドロップ率",
	    "Criticalhit": "クリティカルヒット",
	    "Summon": "召喚",
	    "Pushbackdamage": "プッシュバックダメージ",
	    "Pushbackresistance": "プッシュバック耐性",
	    "Heal": "ヒーリング",
	    "Damage": "ダメージ",
	    "PercentDamage": "% ダメージ",
	    "Range": "有効エリア",
	    "MPreductionability": "MP奪取",
	    "MPlossresistance": "MPロス耐性",
	    "APreductionability": "AP奪取",
	    "APlossresistance": "APロス耐性",
	    "Resistneutral": "ニュートラル耐性",
	    "Resistearth": "地耐性",
	    "Resistfire": "火耐性",
	    "Resistair": "風耐性",
	    "Resistwater": "水耐性",
	    "PercentResistneutral": "% ニュートラル耐性",
	    "PercentResistearth": "% 地耐性",
	    "PercentResistfire": "% 火耐性",
	    "PercentResistair": "% 風耐性",
	    "PercentResistwater": "% 水耐性",
        "Criticalresistance": "クリティカル耐性",
	    "Damagetotraps": "トラップへのダメージ",
	    "PercentDamagetotraps": "% トラップへのダメージ",
	    "Dodge": "回避",
	    "Lock": "障害",
	    "Neutral": "ニュートラル属性ダメージ",
	    "Earth": "地属性ダメージ",
	    "Fire": "火属性ダメージ",
	    "Air": "風属性ダメージ",
	    "Water": "水属性ダメージ",
	    "MP": "MP",
	    "AP": "AP",
        "Cra": "クラ", 
        "Ecaflip": "エカフリップ",
        "Eniripsa": "エニリプサ", 
        "Enutrof": "エヌトロフ", 
        "Feca": "フェカ", 
        "Iop": "イオップ",
        "Masqueraider": "ゾバル",
        "Osamodas": "オサモダス",
        "Pandawa": "パンダワ",
        "Rogue": "策士",
        "Sacrier": "サクリエール", 
        "Sadida": "サディダ", 
        "Sram": "スーラム",
        "Xelor": "ゼロール"
    };

var status_power_dict = 
    {
	    "Initiative": "0.1", 
	    "Vitality": "0.25", 
	    "Strength": "1", 
	    "Intelligence": "1",
	    "Agility": "1",
	    "Chance": "1",
	    "Wisdom": "1", 
	    "Prospecting": "3", 
	    "Criticalhit": "30", 
	    "Summon": "30", 
	    "Pushbackdamage": "10", 
	    "Pushbackresistance": "10", 
	    "Heal": "20", 
	    "Damage": "20", 
	    "PercentDamage": "2", 
	    "Range": "100",
	    "MPreductionability": "6", 
	    "MPlossresistance": "6",
	    "APreductionability": "6", 
	    "APlossresistance": "6",
	    "Resistneutral": "3", 
	    "Resistearth": "3", 
	    "Resistfire": "3", 
	    "Resistair": "3", 
	    "Resistwater": "3",
	    "PercentResistneutral": "8",
	    "PercentResistearth": "8", 
	    "PercentResistfire": "8", 
	    "PercentResistair": "8", 
	    "PercentResistwater": "8",
        "Criticalresistance": "5",
	    "Damagetotraps": "20",
	    "PercentDamagetotraps": "2",
	    "Dodge": "8", 
	    "Lock": "8",
	    "Neutral": "6", 
	    "Earth": "6", 
	    "Fire": "6", 
	    "Air": "6", 
	    "Water": "6",
	    "MP": "100", 
	    "AP": "100"
    };