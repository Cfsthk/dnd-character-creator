// Equipment recommendations based on race and class combinations
// Traditional Chinese descriptions included

export const equipmentByClass = {
  barbarian: {
    name: 'Barbarian',
    nameChinese: '野蠻人',
    weapons: [
      { name: 'Greataxe', nameChinese: '巨斧', description: '雙手重武器，造成強大傷害' },
      { name: 'Handaxe (2)', nameChinese: '手斧 (2)', description: '可投擲的單手武器' }
    ],
    armor: [
      { name: 'Hide Armor', nameChinese: '獸皮甲', description: '中型護甲，不影響狂暴' }
    ],
    equipment: [
      { name: 'Javelin (4)', nameChinese: '標槍 (4)', description: '投擲武器' },
      { name: 'Explorer\'s Pack', nameChinese: '探險者背包', description: '基本冒險用品' }
    ]
  },
  bard: {
    name: 'Bard',
    nameChinese: '吟遊詩人',
    weapons: [
      { name: 'Rapier', nameChinese: '刺劍', description: '優雅的巧技武器' },
      { name: 'Dagger', nameChinese: '匕首', description: '輕型備用武器' }
    ],
    armor: [
      { name: 'Leather Armor', nameChinese: '皮甲', description: '輕型護甲，不妨礙施法' }
    ],
    equipment: [
      { name: 'Lute', nameChinese: '魯特琴', description: '施法焦點和樂器' },
      { name: 'Diplomat\'s Pack', nameChinese: '外交官背包', description: '社交場合用品' }
    ]
  },
  cleric: {
    name: 'Cleric',
    nameChinese: '牧師',
    weapons: [
      { name: 'Mace', nameChinese: '釘錘', description: '簡易武器，適合神職人員' },
      { name: 'Shield', nameChinese: '盾牌', description: '提供+2 AC' }
    ],
    armor: [
      { name: 'Scale Mail', nameChinese: '鱗甲', description: '中型護甲，良好防護' },
      { name: 'Chain Mail', nameChinese: '鎖甲', description: '重型護甲（若有熟練）' }
    ],
    equipment: [
      { name: 'Holy Symbol', nameChinese: '聖徽', description: '神聖施法焦點' },
      { name: 'Priest\'s Pack', nameChinese: '神職人員背包', description: '宗教用品' }
    ]
  },
  druid: {
    name: 'Druid',
    nameChinese: '德魯伊',
    weapons: [
      { name: 'Scimitar', nameChinese: '彎刀', description: '自然武器' },
      { name: 'Wooden Shield', nameChinese: '木盾', description: '天然材質盾牌' }
    ],
    armor: [
      { name: 'Leather Armor', nameChinese: '皮甲', description: '非金屬護甲' }
    ],
    equipment: [
      { name: 'Druidic Focus', nameChinese: '德魯伊法器', description: '自然施法焦點' },
      { name: 'Explorer\'s Pack', nameChinese: '探險者背包', description: '野外生存用品' }
    ]
  },
  fighter: {
    name: 'Fighter',
    nameChinese: '戰士',
    weapons: [
      { name: 'Longsword', nameChinese: '長劍', description: '多用途軍用武器' },
      { name: 'Shield', nameChinese: '盾牌', description: '提供+2 AC' },
      { name: 'Longbow + 20 Arrows', nameChinese: '長弓 + 20箭', description: '遠程武器' }
    ],
    armor: [
      { name: 'Chain Mail', nameChinese: '鎖甲', description: '重型護甲，AC 16' }
    ],
    equipment: [
      { name: 'Dungeoneer\'s Pack', nameChinese: '地城探險者背包', description: '地下城用品' }
    ]
  },
  monk: {
    name: 'Monk',
    nameChinese: '武僧',
    weapons: [
      { name: 'Shortsword', nameChinese: '短劍', description: '武僧武器' },
      { name: 'Dart (10)', nameChinese: '飛鏢 (10)', description: '武僧遠程武器' }
    ],
    armor: [
      { name: 'No Armor', nameChinese: '無護甲', description: '使用無甲防禦' }
    ],
    equipment: [
      { name: 'Explorer\'s Pack', nameChinese: '探險者背包', description: '基本冒險用品' }
    ]
  },
  paladin: {
    name: 'Paladin',
    nameChinese: '聖騎士',
    weapons: [
      { name: 'Longsword', nameChinese: '長劍', description: '神聖武器' },
      { name: 'Shield', nameChinese: '盾牌', description: '提供+2 AC' },
      { name: 'Javelin (5)', nameChinese: '標槍 (5)', description: '投擲武器' }
    ],
    armor: [
      { name: 'Chain Mail', nameChinese: '鎖甲', description: '重型護甲，AC 16' }
    ],
    equipment: [
      { name: 'Holy Symbol', nameChinese: '聖徽', description: '神聖施法焦點' },
      { name: 'Priest\'s Pack', nameChinese: '神職人員背包', description: '宗教用品' }
    ]
  },
  ranger: {
    name: 'Ranger',
    nameChinese: '遊俠',
    weapons: [
      { name: 'Longbow + 20 Arrows', nameChinese: '長弓 + 20箭', description: '主要遠程武器' },
      { name: 'Shortsword (2)', nameChinese: '短劍 (2)', description: '雙武器戰鬥' }
    ],
    armor: [
      { name: 'Scale Mail', nameChinese: '鱗甲', description: '中型護甲' }
    ],
    equipment: [
      { name: 'Explorer\'s Pack', nameChinese: '探險者背包', description: '野外探險用品' }
    ]
  },
  rogue: {
    name: 'Rogue',
    nameChinese: '盜賊',
    weapons: [
      { name: 'Rapier', nameChinese: '刺劍', description: '巧技偷襲武器' },
      { name: 'Shortbow + 20 Arrows', nameChinese: '短弓 + 20箭', description: '遠程偷襲' },
      { name: 'Dagger (2)', nameChinese: '匕首 (2)', description: '隱藏武器' }
    ],
    armor: [
      { name: 'Leather Armor', nameChinese: '皮甲', description: '輕型護甲，利於潛行' }
    ],
    equipment: [
      { name: 'Thieves\' Tools', nameChinese: '盜賊工具', description: '開鎖和陷阱' },
      { name: 'Burglar\'s Pack', nameChinese: '竊賊背包', description: '潛行用品' }
    ]
  },
  sorcerer: {
    name: 'Sorcerer',
    nameChinese: '術士',
    weapons: [
      { name: 'Light Crossbow + 20 Bolts', nameChinese: '輕弩 + 20弩箭', description: '遠程武器' },
      { name: 'Dagger (2)', nameChinese: '匕首 (2)', description: '簡易武器' }
    ],
    armor: [
      { name: 'No Armor', nameChinese: '無護甲', description: '依賴敏捷和法術' }
    ],
    equipment: [
      { name: 'Arcane Focus', nameChinese: '奧術法器', description: '施法焦點' },
      { name: 'Dungeoneer\'s Pack', nameChinese: '地城探險者背包', description: '冒險用品' }
    ]
  },
  warlock: {
    name: 'Warlock',
    nameChinese: '邪術師',
    weapons: [
      { name: 'Light Crossbow + 20 Bolts', nameChinese: '輕弩 + 20弩箭', description: '遠程武器' },
      { name: 'Dagger (2)', nameChinese: '匕首 (2)', description: '簡易武器' }
    ],
    armor: [
      { name: 'Leather Armor', nameChinese: '皮甲', description: '輕型護甲' }
    ],
    equipment: [
      { name: 'Arcane Focus', nameChinese: '奧術法器', description: '契約施法焦點' },
      { name: 'Scholar\'s Pack', nameChinese: '學者背包', description: '研究用品' }
    ]
  },
  wizard: {
    name: 'Wizard',
    nameChinese: '法師',
    weapons: [
      { name: 'Quarterstaff', nameChinese: '長棍', description: '簡易法術武器' },
      { name: 'Dagger', nameChinese: '匕首', description: '備用武器' }
    ],
    armor: [
      { name: 'No Armor', nameChinese: '無護甲', description: '依賴法甲術' }
    ],
    equipment: [
      { name: 'Spellbook', nameChinese: '法術書', description: '必需的法術記錄' },
      { name: 'Arcane Focus', nameChinese: '奧術法器', description: '施法焦點' },
      { name: 'Scholar\'s Pack', nameChinese: '學者背包', description: '研究用品' }
    ]
  }
}

// Race-specific equipment recommendations
export const equipmentByRace = {
  dwarf: {
    bonus: [
      { name: 'Warhammer', nameChinese: '戰錘', description: '矮人傳統武器' },
      { name: 'Battleaxe', nameChinese: '戰斧', description: '矮人工藝武器' }
    ]
  },
  elf: {
    bonus: [
      { name: 'Longbow', nameChinese: '長弓', description: '精靈傳統武器' },
      { name: 'Longsword', nameChinese: '長劍', description: '精靈武器熟練' }
    ]
  },
  halfling: {
    bonus: [
      { name: 'Sling', nameChinese: '投石索', description: '小型武器' },
      { name: 'Shortsword', nameChinese: '短劍', description: '適合小型生物' }
    ]
  },
  dragonborn: {
    bonus: [
      { name: 'Greatsword', nameChinese: '巨劍', description: '配合龍裔力量' }
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
