// Equipment recommendations based on race and class combinations
// Traditional Chinese descriptions included with detailed stats

export const equipmentByClass = {
  barbarian: {
    name: 'Barbarian',
    nameChinese: '野蠻人',
    weapons: [
      { 
        name: 'Greataxe', 
        nameChinese: '巨斧', 
        description: 'A massive two-handed axe that deals devastating damage',
        descriptionChinese: '一把巨大的雙手斧，造成毀滅性傷害',
        damage: '1d12 slashing',
        properties: 'Heavy, Two-handed',
        propertiesChinese: '重型、雙手',
        useCase: 'Best for maximizing single-hit damage during Rage',
        useCaseChinese: '在狂暴時最大化單次攻擊傷害'
      },
      { 
        name: 'Handaxe (2)', 
        nameChinese: '手斧 (2)', 
        description: 'Versatile throwing axes that can be dual-wielded',
        descriptionChinese: '多用途的投擲斧，可以雙持',
        damage: '1d6 slashing',
        properties: 'Light, Thrown (range 20/60)',
        propertiesChinese: '輕型、投擲（射程 20/60）',
        useCase: 'Useful for ranged attacks and two-weapon fighting',
        useCaseChinese: '適合遠程攻擊和雙武器戰鬥'
      }
    ],
    armor: [
      { 
        name: 'Hide Armor', 
        nameChinese: '獸皮甲', 
        description: 'Crude armor made from thick furs and pelts',
        descriptionChinese: '由厚重毛皮製成的粗糙護甲',
        armorClass: '12 + Dex modifier (max 2)',
        useCase: 'Medium armor that doesn\'t interfere with Rage abilities',
        useCaseChinese: '不會影響狂暴能力的中型護甲'
      }
    ],
    equipment: [
      { 
        name: 'Javelin (4)', 
        nameChinese: '標槍 (4)', 
        description: 'Simple throwing spears for ranged combat',
        descriptionChinese: '用於遠程戰鬥的簡易投擲長矛',
        damage: '1d6 piercing',
        properties: 'Thrown (range 30/120)',
        propertiesChinese: '投擲（射程 30/120）',
        useCase: 'Ranged option before closing to melee',
        useCaseChinese: '進入近戰前的遠程選項'
      },
      { 
        name: 'Explorer\'s Pack', 
        nameChinese: '探險者背包', 
        description: 'Contains bedroll, mess kit, tinderbox, torches, rations, waterskin, and rope',
        descriptionChinese: '包含睡袋、餐具、火絨盒、火把、口糧、水袋和繩索',
        useCase: 'Essential survival gear for wilderness adventures',
        useCaseChinese: '荒野冒險必備的生存裝備'
      }
    ]
  },
  bard: {
    name: 'Bard',
    nameChinese: '吟遊詩人',
    weapons: [
      { 
        name: 'Rapier', 
        nameChinese: '刺劍', 
        description: 'An elegant blade perfect for finesse combat',
        descriptionChinese: '優雅的劍刃，完美適合巧技戰鬥',
        damage: '1d8 piercing',
        properties: 'Finesse',
        propertiesChinese: '巧技',
        useCase: 'Uses Dexterity for attack and damage rolls',
        useCaseChinese: '使用敏捷進行攻擊和傷害檢定'
      },
      { 
        name: 'Dagger', 
        nameChinese: '匕首', 
        description: 'A small, concealable blade',
        descriptionChinese: '小型、易於隱藏的刀刃',
        damage: '1d4 piercing',
        properties: 'Finesse, Light, Thrown (range 20/60)',
        propertiesChinese: '巧技、輕型、投擲（射程 20/60）',
        useCase: 'Backup weapon and ranged option',
        useCaseChinese: '備用武器和遠程選項'
      }
    ],
    armor: [
      { 
        name: 'Leather Armor', 
        nameChinese: '皮甲', 
        description: 'Light armor that doesn\'t restrict movement or spellcasting',
        descriptionChinese: '不限制移動或施法的輕型護甲',
        armorClass: '11 + Dex modifier',
        useCase: 'Allows full Dexterity bonus and no casting penalties',
        useCaseChinese: '允許完整敏捷加值且無施法懲罰'
      }
    ],
    equipment: [
      { 
        name: 'Lute', 
        nameChinese: '魯特琴', 
        description: 'A musical instrument that serves as your spellcasting focus',
        descriptionChinese: '作為你施法焦點的樂器',
        useCase: 'Required for casting Bard spells',
        useCaseChinese: '施展吟遊詩人法術所需'
      },
      { 
        name: 'Diplomat\'s Pack', 
        nameChinese: '外交官背包', 
        description: 'Contains chest, maps, fine clothes, ink, pen, lamp, oil, paper, perfume, sealing wax, and soap',
        descriptionChinese: '包含箱子、地圖、精緻服裝、墨水、筆、燈、油、紙張、香水、封蠟和肥皂',
        useCase: 'Tools for social encounters and performances',
        useCaseChinese: '社交場合和表演的工具'
      }
    ]
  },
  cleric: {
    name: 'Cleric',
    nameChinese: '牧師',
    weapons: [
      { 
        name: 'Mace', 
        nameChinese: '釘錘', 
        description: 'A simple bludgeoning weapon favored by clerics',
        descriptionChinese: '牧師偏好的簡易鈍擊武器',
        damage: '1d6 bludgeoning',
        properties: 'Simple weapon',
        propertiesChinese: '簡易武器',
        useCase: 'Reliable damage without using bladed weapons',
        useCaseChinese: '可靠傷害且不使用刀劍類武器'
      },
      { 
        name: 'Shield', 
        nameChinese: '盾牌', 
        description: 'Wooden or metal shield strapped to your arm',
        descriptionChinese: '綁在手臂上的木製或金屬盾牌',
        armorClass: '+2 AC',
        useCase: 'Significantly improves armor class for frontline clerics',
        useCaseChinese: '大幅提升前線牧師的護甲等級'
      }
    ],
    armor: [
      { 
        name: 'Scale Mail', 
        nameChinese: '鱗甲', 
        description: 'Armor made of overlapping metal scales',
        descriptionChinese: '由重疊金屬鱗片製成的護甲',
        armorClass: '14 + Dex modifier (max 2)',
        properties: 'Disadvantage on Stealth',
        propertiesChinese: '潛行劣勢',
        useCase: 'Good protection for most Cleric domains',
        useCaseChinese: '對大多數牧師領域提供良好防護'
      },
      { 
        name: 'Chain Mail', 
        nameChinese: '鎖甲', 
        description: 'Heavy armor made of interlocking metal rings',
        descriptionChinese: '由互鎖金屬環製成的重型護甲',
        armorClass: '16',
        properties: 'Heavy, Str 13 required, Disadvantage on Stealth',
        propertiesChinese: '重型、需要力量13、潛行劣勢',
        useCase: 'Best protection for War domain and heavy-armor clerics',
        useCaseChinese: '戰爭領域和重甲牧師的最佳防護'
      }
    ],
    equipment: [
      { 
        name: 'Holy Symbol', 
        nameChinese: '聖徽', 
        description: 'A divine focus representing your deity',
        descriptionChinese: '代表你神祇的神聖焦點',
        useCase: 'Required for casting Cleric spells',
        useCaseChinese: '施展牧師法術所需'
      },
      { 
        name: 'Priest\'s Pack', 
        nameChinese: '神職人員背包', 
        description: 'Contains blanket, candles, tinderbox, alms box, incense, vestments, rations, and waterskin',
        descriptionChinese: '包含毛毯、蠟燭、火絨盒、施捨箱、香、祭服、口糧和水袋',
        useCase: 'Religious items for ceremonies and healing',
        useCaseChinese: '儀式和治療用的宗教物品'
      }
    ]
  },
  druid: {
    name: 'Druid',
    nameChinese: '德魯伊',
    weapons: [
      { 
        name: 'Scimitar', 
        nameChinese: '彎刀', 
        description: 'A curved sword favored by nature warriors',
        descriptionChinese: '自然戰士偏好的彎曲劍',
        damage: '1d6 slashing',
        properties: 'Finesse, Light',
        propertiesChinese: '巧技、輕型',
        useCase: 'Good for Wild Shape forms that can use weapons',
        useCaseChinese: '適合能使用武器的野性變身形態'
      },
      { 
        name: 'Wooden Shield', 
        nameChinese: '木盾', 
        description: 'A shield made from natural materials',
        descriptionChinese: '由天然材料製成的盾牌',
        armorClass: '+2 AC',
        useCase: 'Provides defense without using metal',
        useCaseChinese: '在不使用金屬的情況下提供防禦'
      }
    ],
    armor: [
      { 
        name: 'Leather Armor', 
        nameChinese: '皮甲', 
        description: 'Natural hide armor acceptable for druids',
        descriptionChinese: '德魯伊可接受的天然皮革護甲',
        armorClass: '11 + Dex modifier',
        useCase: 'Non-metal armor that druids can wear',
        useCaseChinese: '德魯伊可以穿著的非金屬護甲'
      }
    ],
    equipment: [
      { 
        name: 'Druidic Focus', 
        nameChinese: '德魯伊法器', 
        description: 'A totem, staff, or natural item channeling druidic magic',
        descriptionChinese: '引導德魯伊魔法的圖騰、法杖或自然物品',
        useCase: 'Required for casting Druid spells',
        useCaseChinese: '施展德魯伊法術所需'
      },
      { 
        name: 'Explorer\'s Pack', 
        nameChinese: '探險者背包', 
        description: 'Wilderness survival gear',
        descriptionChinese: '荒野生存裝備',
        useCase: 'Essential tools for outdoor adventures',
        useCaseChinese: '戶外冒險的必備工具'
      }
    ]
  },
  fighter: {
    name: 'Fighter',
    nameChinese: '戰士',
    weapons: [
      { 
        name: 'Longsword', 
        nameChinese: '長劍', 
        description: 'A versatile military weapon',
        descriptionChinese: '多功能的軍用武器',
        damage: '1d8 slashing (1d10 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Can be used one or two-handed for flexibility',
        useCaseChinese: '可單手或雙手使用以獲得靈活性'
      },
      { 
        name: 'Shield', 
        nameChinese: '盾牌', 
        description: 'Essential defensive equipment',
        descriptionChinese: '必備的防禦裝備',
        armorClass: '+2 AC',
        useCase: 'Significantly boosts survivability',
        useCaseChinese: '大幅提升生存能力'
      },
      { 
        name: 'Longbow + 20 Arrows', 
        nameChinese: '長弓 + 20箭', 
        description: 'Long-range weapon for distance combat',
        descriptionChinese: '用於遠距離戰鬥的遠程武器',
        damage: '1d8 piercing',
        properties: 'Ammunition (range 150/600), Heavy, Two-handed',
        propertiesChinese: '彈藥（射程 150/600）、重型、雙手',
        useCase: 'Engage enemies from afar',
        useCaseChinese: '從遠處攻擊敵人'
      }
    ],
    armor: [
      { 
        name: 'Chain Mail', 
        nameChinese: '鎖甲', 
        description: 'Heavy armor providing excellent protection',
        descriptionChinese: '提供出色防護的重型護甲',
        armorClass: '16',
        properties: 'Heavy, Str 13 required, Disadvantage on Stealth',
        propertiesChinese: '重型、需要力量13、潛行劣勢',
        useCase: 'Best early-game protection for frontline fighters',
        useCaseChinese: '前線戰士的最佳早期防護'
      }
    ],
    equipment: [
      { 
        name: 'Dungeoneer\'s Pack', 
        nameChinese: '地城探險者背包', 
        description: 'Contains backpack, crowbar, hammer, pitons, torches, tinderbox, rations, waterskin, and rope',
        descriptionChinese: '包含背包、撬棍、錘子、岩釘、火把、火絨盒、口糧、水袋和繩索',
        useCase: 'Essential tools for dungeon exploration',
        useCaseChinese: '地下城探險的必備工具'
      }
    ]
  },
  monk: {
    name: 'Monk',
    nameChinese: '武僧',
    weapons: [
      { 
        name: 'Shortsword', 
        nameChinese: '短劍', 
        description: 'A monk weapon for armed combat',
        descriptionChinese: '用於武裝戰鬥的武僧武器',
        damage: '1d6 piercing',
        properties: 'Finesse, Light',
        propertiesChinese: '巧技、輕型',
        useCase: 'Higher damage option than unarmed strikes early on',
        useCaseChinese: '早期比徒手攻擊傷害更高的選擇'
      },
      { 
        name: 'Dart (10)', 
        nameChinese: '飛鏢 (10)', 
        description: 'Thrown monk weapons',
        descriptionChinese: '投擲武僧武器',
        damage: '1d4 piercing',
        properties: 'Finesse, Thrown (range 20/60)',
        propertiesChinese: '巧技、投擲（射程 20/60）',
        useCase: 'Ranged attacks using Dexterity and Martial Arts',
        useCaseChinese: '使用敏捷和武術的遠程攻擊'
      }
    ],
    armor: [
      { 
        name: 'No Armor', 
        nameChinese: '無護甲', 
        description: 'Monks don\'t wear armor to use Unarmored Defense',
        descriptionChinese: '武僧不穿護甲以使用無甲防禦',
        armorClass: '10 + Dex modifier + Wis modifier',
        useCase: 'Allows Unarmored Defense class feature',
        useCaseChinese: '允許使用無甲防禦職業特性'
      }
    ],
    equipment: [
      { 
        name: 'Explorer\'s Pack', 
        nameChinese: '探險者背包', 
        description: 'Basic adventuring gear',
        descriptionChinese: '基本冒險裝備',
        useCase: 'Essential supplies for traveling monks',
        useCaseChinese: '旅行武僧的必需品'
      }
    ]
  },
  paladin: {
    name: 'Paladin',
    nameChinese: '聖騎士',
    weapons: [
      { 
        name: 'Longsword', 
        nameChinese: '長劍', 
        description: 'The iconic paladin weapon',
        descriptionChinese: '標誌性的聖騎士武器',
        damage: '1d8 slashing (1d10 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Pairs well with Divine Smite for devastating critical hits',
        useCaseChinese: '配合神聖打擊造成毀滅性重擊'
      },
      { 
        name: 'Shield', 
        nameChinese: '盾牌', 
        description: 'Symbol of a defender of the faith',
        descriptionChinese: '信仰守護者的象徵',
        armorClass: '+2 AC',
        useCase: 'Essential for tanking and protecting allies',
        useCaseChinese: '承擔傷害和保護盟友的必需品'
      },
      { 
        name: 'Javelin (5)', 
        nameChinese: '標槍 (5)', 
        description: 'Holy throwing spears',
        descriptionChinese: '神聖的投擲長矛',
        damage: '1d6 piercing',
        properties: 'Thrown (range 30/120)',
        propertiesChinese: '投擲（射程 30/120）',
        useCase: 'Ranged option before charging into melee',
        useCaseChinese: '衝入近戰前的遠程選項'
      }
    ],
    armor: [
      { 
        name: 'Chain Mail', 
        nameChinese: '鎖甲', 
        description: 'Heavy armor befitting a holy warrior',
        descriptionChinese: '適合神聖戰士的重型護甲',
        armorClass: '16',
        properties: 'Heavy, Str 13 required, Disadvantage on Stealth',
        propertiesChinese: '重型、需要力量13、潛行劣勢',
        useCase: 'Excellent protection for frontline combat',
        useCaseChinese: '前線戰鬥的出色防護'
      }
    ],
    equipment: [
      { 
        name: 'Holy Symbol', 
        nameChinese: '聖徽', 
        description: 'Sacred focus for paladin spells',
        descriptionChinese: '聖騎士法術的神聖焦點',
        useCase: 'Required for casting paladin spells',
        useCaseChinese: '施展聖騎士法術所需'
      },
      { 
        name: 'Priest\'s Pack', 
        nameChinese: '神職人員背包', 
        description: 'Religious and adventuring supplies',
        descriptionChinese: '宗教和冒險用品',
        useCase: 'Tools for holy quests and healing',
        useCaseChinese: '神聖任務和治療的工具'
      }
    ]
  },
  ranger: {
    name: 'Ranger',
    nameChinese: '遊俠',
    weapons: [
      { 
        name: 'Longbow + 20 Arrows', 
        nameChinese: '長弓 + 20箭', 
        description: 'Primary ranged weapon for hunters',
        descriptionChinese: '獵人的主要遠程武器',
        damage: '1d8 piercing',
        properties: 'Ammunition (range 150/600), Heavy, Two-handed',
        propertiesChinese: '彈藥（射程 150/600）、重型、雙手',
        useCase: 'Excellent for sniping from distance',
        useCaseChinese: '適合從遠距離狙擊'
      },
      { 
        name: 'Shortsword (2)', 
        nameChinese: '短劍 (2)', 
        description: 'Dual-wielding weapons for close combat',
        descriptionChinese: '近戰雙持武器',
        damage: '1d6 piercing',
        properties: 'Finesse, Light',
        propertiesChinese: '巧技、輕型',
        useCase: 'Two-weapon fighting for multiple attacks',
        useCaseChinese: '雙武器戰鬥進行多次攻擊'
      }
    ],
    armor: [
      { 
        name: 'Scale Mail', 
        nameChinese: '鱗甲', 
        description: 'Medium armor for wilderness warriors',
        descriptionChinese: '荒野戰士的中型護甲',
        armorClass: '14 + Dex modifier (max 2)',
        properties: 'Disadvantage on Stealth',
        propertiesChinese: '潛行劣勢',
        useCase: 'Good protection without sacrificing too much mobility',
        useCaseChinese: '在不犧牲太多機動性的情況下提供良好防護'
      }
    ],
    equipment: [
      { 
        name: 'Explorer\'s Pack', 
        nameChinese: '探險者背包', 
        description: 'Wilderness survival essentials',
        descriptionChinese: '荒野生存必需品',
        useCase: 'Perfect for outdoor tracking and survival',
        useCaseChinese: '完美適合戶外追蹤和生存'
      }
    ]
  },
  rogue: {
    name: 'Rogue',
    nameChinese: '盜賊',
    weapons: [
      { 
        name: 'Rapier', 
        nameChinese: '刺劍', 
        description: 'Precision weapon for Sneak Attack',
        descriptionChinese: '用於偷襲的精準武器',
        damage: '1d8 piercing',
        properties: 'Finesse',
        propertiesChinese: '巧技',
        useCase: 'Highest damage die for finesse weapons',
        useCaseChinese: '巧技武器中傷害骰最高'
      },
      { 
        name: 'Shortbow + 20 Arrows', 
        nameChinese: '短弓 + 20箭', 
        description: 'Ranged weapon for stealthy attacks',
        descriptionChinese: '用於隱秘攻擊的遠程武器',
        damage: '1d6 piercing',
        properties: 'Ammunition (range 80/320), Two-handed',
        propertiesChinese: '彈藥（射程 80/320）、雙手',
        useCase: 'Sneak Attack from range',
        useCaseChinese: '從遠處進行偷襲'
      },
      { 
        name: 'Dagger (2)', 
        nameChinese: '匕首 (2)', 
        description: 'Concealable backup weapons',
        descriptionChinese: '可隱藏的備用武器',
        damage: '1d4 piercing',
        properties: 'Finesse, Light, Thrown (range 20/60)',
        propertiesChinese: '巧技、輕型、投擲（射程 20/60）',
        useCase: 'Hidden weapons and thrown attacks',
        useCaseChinese: '隱藏武器和投擲攻擊'
      }
    ],
    armor: [
      { 
        name: 'Leather Armor', 
        nameChinese: '皮甲', 
        description: 'Light armor for maximum stealth',
        descriptionChinese: '最大隱秘性的輕型護甲',
        armorClass: '11 + Dex modifier',
        useCase: 'No penalties to stealth or mobility',
        useCaseChinese: '對潛行或機動性無懲罰'
      }
    ],
    equipment: [
      { 
        name: 'Thieves\' Tools', 
        nameChinese: '盜賊工具', 
        description: 'Lockpicks and trap-disarming tools',
        descriptionChinese: '開鎖和解除陷阱的工具',
        useCase: 'Essential for lockpicking and disabling traps',
        useCaseChinese: '開鎖和解除陷阱的必需品'
      },
      { 
        name: 'Burglar\'s Pack', 
        nameChinese: '竊賊背包', 
        description: 'Contains backpack, ball bearings, string, bell, candles, crowbar, hammer, pitons, hooded lantern, oil, rations, tinderbox, waterskin, and rope',
        descriptionChinese: '包含背包、滾珠、細繩、鈴鐺、蠟燭、撬棍、錘子、岩釘、罩燈、油、口糧、火絨盒、水袋和繩索',
        useCase: 'Tools for stealth infiltration and heists',
        useCaseChinese: '潛行滲透和盜竊的工具'
      }
    ],
    tools: [
      { 
        name: 'Thieves\' Tools', 
        nameChinese: '盜賊工具', 
        description: 'Professional lockpicking kit',
        descriptionChinese: '專業開鎖工具組',
        useCase: 'Required for lockpicking and trap disarming',
        useCaseChinese: '開鎖和解除陷阱所需'
      }
    ]
  },
  sorcerer: {
    name: 'Sorcerer',
    nameChinese: '術士',
    weapons: [
      { 
        name: 'Light Crossbow + 20 Bolts', 
        nameChinese: '輕弩 + 20弩箭', 
        description: 'Simple ranged weapon for backup',
        descriptionChinese: '用於備用的簡易遠程武器',
        damage: '1d8 piercing',
        properties: 'Ammunition (range 80/320), Loading, Two-handed',
        propertiesChinese: '彈藥（射程 80/320）、裝填、雙手',
        useCase: 'Conserve spell slots with ranged attacks',
        useCaseChinese: '用遠程攻擊保存法術位'
      },
      { 
        name: 'Dagger (2)', 
        nameChinese: '匕首 (2)', 
        description: 'Last resort melee weapons',
        descriptionChinese: '最後手段的近戰武器',
        damage: '1d4 piercing',
        properties: 'Finesse, Light, Thrown (range 20/60)',
        propertiesChinese: '巧技、輕型、投擲（射程 20/60）',
        useCase: 'Emergency backup when out of spells',
        useCaseChinese: '法術用盡時的緊急備用'
      }
    ],
    armor: [
      { 
        name: 'No Armor', 
        nameChinese: '無護甲', 
        description: 'Rely on Dexterity and magical protection',
        descriptionChinese: '依賴敏捷和魔法防護',
        armorClass: '10 + Dex modifier',
        useCase: 'Use Mage Armor spell for better AC',
        useCaseChinese: '使用法甲術獲得更好的AC'
      }
    ],
    equipment: [
      { 
        name: 'Arcane Focus', 
        nameChinese: '奧術法器', 
        description: 'Crystal, orb, or wand channeling innate magic',
        descriptionChinese: '引導天生魔法的水晶、法球或魔杖',
        useCase: 'Required for casting Sorcerer spells',
        useCaseChinese: '施展術士法術所需'
      },
      { 
        name: 'Dungeoneer\'s Pack', 
        nameChinese: '地城探險者背包', 
        description: 'Adventuring supplies',
        descriptionChinese: '冒險用品',
        useCase: 'Basic gear for dungeon exploration',
        useCaseChinese: '地下城探險的基本裝備'
      }
    ]
  },
  warlock: {
    name: 'Warlock',
    nameChinese: '邪術師',
    weapons: [
      { 
        name: 'Light Crossbow + 20 Bolts', 
        nameChinese: '輕弩 + 20弩箭', 
        description: 'Ranged weapon before Eldritch Blast',
        descriptionChinese: '在獲得魔能爆前的遠程武器',
        damage: '1d8 piercing',
        properties: 'Ammunition (range 80/320), Loading, Two-handed',
        propertiesChinese: '彈藥（射程 80/320）、裝填、雙手',
        useCase: 'Physical damage option',
        useCaseChinese: '物理傷害選項'
      },
      { 
        name: 'Dagger (2)', 
        nameChinese: '匕首 (2)', 
        description: 'Ritual sacrifice and backup weapons',
        descriptionChinese: '儀式犧牲和備用武器',
        damage: '1d4 piercing',
        properties: 'Finesse, Light, Thrown (range 20/60)',
        propertiesChinese: '巧技、輕型、投擲（射程 20/60）',
        useCase: 'Flavor and emergency melee',
        useCaseChinese: '風格和緊急近戰'
      }
    ],
    armor: [
      { 
        name: 'Leather Armor', 
        nameChinese: '皮甲', 
        description: 'Light protection for spellcasters',
        descriptionChinese: '施法者的輕型防護',
        armorClass: '11 + Dex modifier',
        useCase: 'Basic defense without spell penalties',
        useCaseChinese: '基本防禦且無施法懲罰'
      }
    ],
    equipment: [
      { 
        name: 'Arcane Focus', 
        nameChinese: '奧術法器', 
        description: 'Pact-bound focus channeling otherworldly power',
        descriptionChinese: '引導異界力量的契約焦點',
        useCase: 'Required for casting Warlock spells',
        useCaseChinese: '施展邪術師法術所需'
      },
      { 
        name: 'Scholar\'s Pack', 
        nameChinese: '學者背包', 
        description: 'Contains backpack, book of lore, ink, pen, parchment, sand, and small knife',
        descriptionChinese: '包含背包、學識書、墨水、筆、羊皮紙、沙子和小刀',
        useCase: 'Research materials for arcane knowledge',
        useCaseChinese: '研究奧秘知識的材料'
      }
    ]
  },
  wizard: {
    name: 'Wizard',
    nameChinese: '法師',
    weapons: [
      { 
        name: 'Quarterstaff', 
        nameChinese: '長棍', 
        description: 'Traditional wizard weapon and walking stick',
        descriptionChinese: '傳統法師武器和手杖',
        damage: '1d6 bludgeoning (1d8 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Can double as arcane focus with Arcane Focus staff',
        useCaseChinese: '配合奧術法杖可兼作法器'
      },
      { 
        name: 'Dagger', 
        nameChinese: '匕首', 
        description: 'Scholar\'s utility knife',
        descriptionChinese: '學者的萬用刀',
        damage: '1d4 piercing',
        properties: 'Finesse, Light, Thrown (range 20/60)',
        propertiesChinese: '巧技、輕型、投擲（射程 20/60）',
        useCase: 'Last resort weapon',
        useCaseChinese: '最後手段武器'
      }
    ],
    armor: [
      { 
        name: 'No Armor', 
        nameChinese: '無護甲', 
        description: 'Wizards rely on magical protection',
        descriptionChinese: '法師依賴魔法防護',
        armorClass: '10 + Dex modifier',
        useCase: 'Cast Mage Armor for AC 13 + Dex',
        useCaseChinese: '施展法甲術獲得AC 13 + 敏捷'
      }
    ],
    equipment: [
      { 
        name: 'Spellbook', 
        nameChinese: '法術書', 
        description: 'Essential tome containing your known spells',
        descriptionChinese: '包含你已知法術的必要典籍',
        useCase: 'Absolutely required for preparing wizard spells',
        useCaseChinese: '準備法師法術絕對必需'
      },
      { 
        name: 'Arcane Focus', 
        nameChinese: '奧術法器', 
        description: 'Wand, staff, or orb for spellcasting',
        descriptionChinese: '用於施法的魔杖、法杖或法球',
        useCase: 'Required for casting wizard spells',
        useCaseChinese: '施展法師法術所需'
      },
      { 
        name: 'Scholar\'s Pack', 
        nameChinese: '學者背包', 
        description: 'Academic research materials',
        descriptionChinese: '學術研究材料',
        useCase: 'Tools for magical research and study',
        useCaseChinese: '魔法研究和學習的工具'
      }
    ]
  }
}

// Race-specific equipment recommendations
export const equipmentByRace = {
  dwarf: {
    bonus: [
      { 
        name: 'Warhammer', 
        nameChinese: '戰錘', 
        description: 'Traditional dwarven weapon of war',
        descriptionChinese: '傳統矮人戰爭武器',
        damage: '1d8 bludgeoning (1d10 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Dwarven cultural weapon proficiency',
        useCaseChinese: '矮人文化武器熟練'
      },
      { 
        name: 'Battleaxe', 
        nameChinese: '戰斧', 
        description: 'Masterwork dwarven craftsmanship',
        descriptionChinese: '矮人大師級工藝',
        damage: '1d8 slashing (1d10 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Alternative dwarven weapon',
        useCaseChinese: '替代矮人武器'
      }
    ]
  },
  elf: {
    bonus: [
      { 
        name: 'Longbow', 
        nameChinese: '長弓', 
        description: 'Elegant elven archery tradition',
        descriptionChinese: '優雅的精靈箭術傳統',
        damage: '1d8 piercing',
        properties: 'Ammunition (range 150/600), Heavy, Two-handed',
        propertiesChinese: '彈藥（射程 150/600）、重型、雙手',
        useCase: 'Elven weapon training proficiency',
        useCaseChinese: '精靈武器訓練熟練'
      },
      { 
        name: 'Longsword', 
        nameChinese: '長劍', 
        description: 'Graceful elven blade',
        descriptionChinese: '優雅的精靈劍',
        damage: '1d8 slashing (1d10 two-handed)',
        properties: 'Versatile',
        propertiesChinese: '多用',
        useCase: 'Elven weapon proficiency',
        useCaseChinese: '精靈武器熟練'
      }
    ]
  },
  halfling: {
    bonus: [
      { 
        name: 'Sling', 
        nameChinese: '投石索', 
        description: 'Simple weapon for small folk',
        descriptionChinese: '小型生物的簡易武器',
        damage: '1d4 bludgeoning',
        properties: 'Ammunition (range 30/120)',
        propertiesChinese: '彈藥（射程 30/120）',
        useCase: 'Size-appropriate ranged weapon',
        useCaseChinese: '適合體型的遠程武器'
      },
      { 
        name: 'Shortsword', 
        nameChinese: '短劍', 
        description: 'Light blade for small warriors',
        descriptionChinese: '小型戰士的輕型劍',
        damage: '1d6 piercing',
        properties: 'Finesse, Light',
        propertiesChinese: '巧技、輕型',
        useCase: 'Perfect size for halflings',
        useCaseChinese: '完美適合半身人的尺寸'
      }
    ]
  },
  dragonborn: {
    bonus: [
      { 
        name: 'Greatsword', 
        nameChinese: '巨劍', 
        description: 'Massive blade befitting dragonborn strength',
        descriptionChinese: '適合龍裔力量的巨大劍刃',
        damage: '2d6 slashing',
        properties: 'Heavy, Two-handed',
        propertiesChinese: '重型、雙手',
        useCase: 'Maximizes dragonborn Strength bonus',
        useCaseChinese: '最大化龍裔力量加值'
      }
    ]
  }
}

// Combined recommendations
export const getRecommendedEquipment = (characterClass, characterRace) => {
  const classEquipment = equipmentByClass[characterClass?.toLowerCase()] || {}
  const raceBonus = equipmentByRace[characterRace?.toLowerCase()]?.bonus || []

  return {
    classEquipment,
    raceBonus,
    totalItems: [
      ...(classEquipment.weapons || []),
      ...(classEquipment.armor || []),
      ...(classEquipment.equipment || []),
      ...raceBonus
    ]
  }
}

// Starting gold by class (in gp)
export const startingGold = {
  barbarian: '2d4 × 10',
  bard: '5d4 × 10',
  cleric: '5d4 × 10',
  druid: '2d4 × 10',
  fighter: '5d4 × 10',
  monk: '5d4',
  paladin: '5d4 × 10',
  ranger: '5d4 × 10',
  rogue: '4d4 × 10',
  sorcerer: '3d4 × 10',
  warlock: '4d4 × 10',
  wizard: '4d4 × 10'
}
