// 依據種族和職業組合的裝備推薦
// 包含詳細的繁體中文描述、屬性和使用情境

export const equipmentByClass = {
  barbarian: {
    name: '野蠻人',
    weapons: [
      { 
        name: '巨斧', 
        description: '一把巨大的雙手斧頭，能造成毀滅性的傷害。這是野蠻人最喜愛的武器，每次揮擊都能展現原始的力量。',
        damage: '1d12 揮砍',
        properties: '重型、雙手',
        useCase: '適合力量型戰士，在近戰中造成最大傷害。與狂暴能力配合效果絕佳。'
      },
      { 
        name: '戰斧', 
        description: '單手戰斧，平衡性良好。可以雙手持握以增加傷害，也能搭配盾牌使用。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '靈活的選擇，可根據戰況在攻擊和防禦間切換。'
      },
      { 
        name: '標槍', 
        description: '可投擲的長矛，適合遠程攻擊。野蠻人可以在衝鋒前先投擲削弱敵人。',
        damage: '1d6 穿刺',
        properties: '投擲（射程 30/120 呎）',
        useCase: '在近戰前削弱遠處敵人，或攻擊飛行生物。'
      }
    ],
    armor: [
      { 
        name: '皮甲', 
        description: '由硬化皮革製成的柔軟護甲。不會妨礙野蠻人的靈活移動和狂暴能力。',
        armorClass: 'AC 11 + 敏捷調整值',
        properties: '輕甲',
        useCase: '最適合野蠻人的護甲選擇，因為可以在狂暴時使用，且不影響移動速度。'
      },
      { 
        name: '盾牌', 
        description: '木製或金屬圓盾，可額外提供 +2 AC。',
        armorClass: '+2 AC',
        properties: '需佔用一隻手',
        useCase: '搭配單手武器使用時提供額外防護。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '探險者背包', 
        description: '包含背包、睡袋、餐具、10 支火把、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '冒險必備的基本裝備組合。'
      },
      { 
        name: '攀爬工具組', 
        description: '包含特殊釘鞋、手套和安全帶，用於攀爬懸崖和牆壁。',
        useCase: '在山區或地城探索時非常有用。'
      }
    ]
  },

  bard: {
    name: '吟遊詩人',
    weapons: [
      { 
        name: '細劍', 
        description: '優雅的刺擊武器，適合敏捷型戰士。吟遊詩人常用它展現華麗的劍術。',
        damage: '1d8 穿刺',
        properties: '靈巧',
        useCase: '利用敏捷而非力量進行攻擊，適合吟遊詩人的戰鬥風格。'
      },
      { 
        name: '長劍', 
        description: '經典的騎士之劍，平衡且多用途。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '可靠的全能武器，適合各種戰鬥情境。'
      },
      { 
        name: '手弩', 
        description: '小型弩機，可單手操作。讓吟遊詩人在演奏樂器時仍能自衛。',
        damage: '1d6 穿刺',
        properties: '彈藥（射程 30/120 呎）、輕型、裝填',
        useCase: '遠程攻擊選項，在需要保持距離時使用。'
      }
    ],
    armor: [
      { 
        name: '皮甲', 
        description: '時尚的硬化皮革護甲，不會影響演奏或施法。',
        armorClass: 'AC 11 + 敏捷調整值',
        properties: '輕甲',
        useCase: '最適合吟遊詩人，因為不會干擾施法動作。'
      },
      { 
        name: '鑲釘皮甲', 
        description: '在皮甲上加裝金屬釘釘，提供更好的防護。',
        armorClass: 'AC 12 + 敏捷調整值',
        properties: '輕甲',
        useCase: '稍重但提供更好的防護，仍允許靈活移動。'
      }
    ],
    tools: [
      { 
        name: '魯特琴', 
        description: '弦樂器，吟遊詩人用來施放法術和娛樂觀眾。',
        useCase: '作為施法焦點，也能賺取表演收入。'
      },
      { 
        name: '長笛', 
        description: '木製管樂器，音色優美動聽。',
        useCase: '另一種施法焦點選項，便於攜帶。'
      }
    ],
    equipment: [
      { 
        name: '外交官背包', 
        description: '包含箱子、2 個地圖或卷軸盒、華麗服裝、墨水、羽毛筆、燈籠、2 瓶油、5 張紙、香水瓶、蠟封和肥皂。',
        useCase: '適合社交場合和外交任務。'
      },
      { 
        name: '變裝工具組', 
        description: '包含化妝品、染髮劑、小道具和服裝配件。',
        useCase: '潛入、偽裝和秘密任務時使用。'
      }
    ]
  },

  cleric: {
    name: '牧師',
    weapons: [
      { 
        name: '釘頭錘', 
        description: '沉重的鈍擊武器，許多牧師偏好使用以避免見血。',
        damage: '1d6 鈍擊',
        properties: '無',
        useCase: '可靠的近戰武器，適合不想使用刀劍的聖職者。'
      },
      { 
        name: '戰錘', 
        description: '鍛造精良的戰鬥錘，可單手或雙手使用。',
        damage: '1d8 鈍擊（單手）或 1d10 鈍擊（雙手）',
        properties: '多用途',
        useCase: '靈活的武器選擇，搭配盾牌或雙手持握皆可。'
      }
    ],
    armor: [
      { 
        name: '鎖甲', 
        description: '由互相連接的金屬環組成的護甲，提供良好防護。',
        armorClass: 'AC 16',
        properties: '重甲、需力量 13',
        useCase: '牧師可穿著的最佳重甲之一，提供優秀的防護。'
      },
      { 
        name: '鏈甲衫', 
        description: '穿在衣服下的金屬環甲衣。',
        armorClass: 'AC 13 + 敏捷調整值（最高 +2）',
        properties: '中甲',
        useCase: '平衡防護和靈活性的選擇。'
      },
      { 
        name: '盾牌', 
        description: '神聖符號裝飾的盾牌，可作為施法焦點。',
        armorClass: '+2 AC',
        properties: '可當作聖徽使用',
        useCase: '提供防護同時作為施法焦點。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '牧師背包', 
        description: '包含背包、毯子、10 支蠟燭、火絨盒、施捨箱、2 塊香料、水袋。',
        useCase: '牧師冒險的基本裝備。'
      },
      { 
        name: '聖徽', 
        description: '代表你信仰的神聖符號，用於施放神術。',
        useCase: '施法必需品，可佩戴或持握。'
      },
      { 
        name: '祈禱書', 
        description: '記錄祈禱文和神學知識的書籍。',
        useCase: '準備法術和進行宗教儀式時使用。'
      }
    ]
  },

  druid: {
    name: '德魯伊',
    weapons: [
      { 
        name: '彎刀', 
        description: '彎曲的單刃劍，德魯伊傳統武器。',
        damage: '1d6 揮砍',
        properties: '靈巧、輕型',
        useCase: '德魯伊的經典武器選擇，靈活且致命。'
      },
      { 
        name: '木棒', 
        description: '簡單的木製武器，也可作為施法焦點。',
        damage: '1d4 鈍擊',
        properties: '輕型',
        useCase: '可同時用於戰鬥和施法。'
      },
      { 
        name: '標槍', 
        description: '木製投擲長矛，適合狩獵。',
        damage: '1d6 穿刺',
        properties: '投擲（射程 30/120 呎）',
        useCase: '在變身前進行遠程攻擊。'
      }
    ],
    armor: [
      { 
        name: '皮甲', 
        description: '天然皮革製成的護甲，符合德魯伊的自然誓言。',
        armorClass: 'AC 11 + 敏捷調整值',
        properties: '輕甲、非金屬',
        useCase: '德魯伊唯一可穿著的護甲類型。'
      },
      { 
        name: '木盾', 
        description: '天然木材製成的盾牌，可雕刻自然符號。',
        armorClass: '+2 AC',
        properties: '非金屬',
        useCase: '提供額外防護而不違背德魯伊誓言。'
      }
    ],
    tools: [
      { 
        name: '草藥師工具組', 
        description: '包含藥草、藥瓶、剪刀和研缽，用於製作藥劑和毒藥。',
        useCase: '製作治療藥劑和天然毒藥。'
      }
    ],
    equipment: [
      { 
        name: '德魯伊焦點', 
        description: '樹枝、槲寄生或其他自然物品，用於施放德魯伊法術。',
        useCase: '施法必需品。'
      },
      { 
        name: '探險者背包', 
        description: '包含背包、睡袋、餐具、10 支火把、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '野外生存的基本裝備。'
      },
      { 
        name: '圖騰', 
        description: '代表自然力量的木製或石製圖騰。',
        useCase: '儀式和冥想時使用。'
      }
    ]
  },

  fighter: {
    name: '戰士',
    weapons: [
      { 
        name: '長劍', 
        description: '經典的騎士之劍，可靠且多用途。戰士的標誌性武器。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '全能武器，適合所有戰鬥情境。'
      },
      { 
        name: '巨劍', 
        description: '雙手持握的大型劍，需要力量和技巧才能揮舞。',
        damage: '2d6 揮砍',
        properties: '重型、雙手',
        useCase: '造成巨大傷害，適合前線戰士。'
      },
      { 
        name: '長弓', 
        description: '遠程武器，射程遠且威力強大。',
        damage: '1d8 穿刺',
        properties: '彈藥（射程 150/600 呎）、重型、雙手',
        useCase: '遠程戰鬥，在敵人接近前削弱他們。'
      },
      { 
        name: '戰斧', 
        description: '單手戰斧，可搭配盾牌使用。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '靈活的近戰選擇。'
      }
    ],
    armor: [
      { 
        name: '鎖甲', 
        description: '由互相連接的金屬環組成，提供優秀防護。',
        armorClass: 'AC 16',
        properties: '重甲、需力量 13',
        useCase: '戰士的標準護甲，平衡防護和移動性。'
      },
      { 
        name: '板甲', 
        description: '最強的護甲，由成形金屬板組成。',
        armorClass: 'AC 18',
        properties: '重甲、需力量 15',
        useCase: '最佳防護，適合前線坦克型戰士。'
      },
      { 
        name: '盾牌', 
        description: '金屬或木製盾牌，可刻上家族紋章。',
        armorClass: '+2 AC',
        properties: '需佔用一隻手',
        useCase: '使用單手武器時提供額外防護。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '地城探險者背包', 
        description: '包含背包、撬棍、鐵錘、10 根釘子、10 支火把、火絨盒、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '地城探索必備裝備。'
      },
      { 
        name: '磨刀石', 
        description: '用於保持武器鋒利的石頭。',
        useCase: '維護武器的必需品。'
      }
    ]
  },

  monk: {
    name: '武僧',
    weapons: [
      { 
        name: '短劍', 
        description: '輕巧的刺擊武器，適合武僧的快速攻擊風格。',
        damage: '1d6 穿刺',
        properties: '靈巧、輕型、武僧武器',
        useCase: '利用敏捷進行攻擊，可觸發武僧的額外攻擊。'
      },
      { 
        name: '木棒', 
        description: '簡單的木製武器，武僧訓練的基礎。',
        damage: '1d4 鈍擊',
        properties: '輕型、武僧武器',
        useCase: '基本武僧武器，可用於各種技巧。'
      },
      { 
        name: '飛鏢', 
        description: '小型投擲武器，武僧可以快速連續投擲。',
        damage: '1d4 穿刺',
        properties: '靈巧、投擲（射程 20/60 呎）、武僧武器',
        useCase: '遠程攻擊選項。'
      }
    ],
    armor: [
      { 
        name: '無甲防禦', 
        description: '武僧不穿護甲時，AC = 10 + 敏捷調整值 + 感知調整值',
        armorClass: '10 + 敏捷 + 感知',
        properties: '職業能力',
        useCase: '武僧的主要防禦方式，隨等級提升而增強。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '探險者背包', 
        description: '包含背包、睡袋、餐具、10 支火把、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '基本冒險裝備。'
      },
      { 
        name: '冥想珠', 
        description: '用於專注和冥想的念珠。',
        useCase: '恢復氣和專注心神。'
      },
      { 
        name: '草藥', 
        description: '治療用的藥草和草藥。',
        useCase: '自然療法和恢復。'
      }
    ]
  },

  paladin: {
    name: '聖武士',
    weapons: [
      { 
        name: '長劍', 
        description: '聖武士的象徵武器，常被祝福並刻上神聖符號。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '經典聖武士武器，可配合神擊能力。'
      },
      { 
        name: '巨劍', 
        description: '雄偉的雙手劍，適合正義的戰士。',
        damage: '2d6 揮砍',
        properties: '重型、雙手',
        useCase: '最大化神擊傷害的選擇。'
      },
      { 
        name: '戰錘', 
        description: '神聖的錘子，象徵正義的力量。',
        damage: '1d8 鈍擊（單手）或 1d10 鈍擊（雙手）',
        properties: '多用途',
        useCase: '對抗不死生物特別有效。'
      }
    ],
    armor: [
      { 
        name: '鎖甲', 
        description: '拋光的金屬環甲，反射神聖之光。',
        armorClass: 'AC 16',
        properties: '重甲、需力量 13',
        useCase: '聖武士的標準護甲。'
      },
      { 
        name: '板甲', 
        description: '刻有神聖符號的全身板甲。',
        armorClass: 'AC 18',
        properties: '重甲、需力量 15',
        useCase: '最強防護，適合前線聖武士。'
      },
      { 
        name: '盾牌', 
        description: '刻有神聖印記的盾牌，可作為聖徽使用。',
        armorClass: '+2 AC',
        properties: '可當作聖徽',
        useCase: '防禦和施法的雙重用途。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '牧師背包', 
        description: '包含背包、毯子、10 支蠟燭、火絨盒、施捨箱、2 塊香料、水袋。',
        useCase: '聖武士的基本裝備。'
      },
      { 
        name: '聖徽', 
        description: '你誓言的神聖象徵。',
        useCase: '施放聖武士法術的焦點。'
      },
      { 
        name: '祈禱書', 
        description: '記錄誓言和祈禱文的書籍。',
        useCase: '準備法術和宗教儀式。'
      }
    ]
  },

  ranger: {
    name: '遊俠',
    weapons: [
      { 
        name: '長弓', 
        description: '遊俠的主要武器，適合狩獵和遠程戰鬥。',
        damage: '1d8 穿刺',
        properties: '彈藥（射程 150/600 呎）、重型、雙手',
        useCase: '遊俠的首選武器，在遠距離精確射擊。'
      },
      { 
        name: '雙短劍', 
        description: '一對短劍，適合雙武器戰鬥風格。',
        damage: '1d6 穿刺（每把）',
        properties: '靈巧、輕型',
        useCase: '近戰時使用雙武器攻擊。'
      },
      { 
        name: '長劍', 
        description: '可靠的近戰武器選擇。',
        damage: '1d8 揮砍（單手）或 1d10 揮砍（雙手）',
        properties: '多用途',
        useCase: '平衡的近戰選項。'
      }
    ],
    armor: [
      { 
        name: '鑲釘皮甲', 
        description: '輕便但堅固的護甲，不會妨礙在野外的行動。',
        armorClass: 'AC 12 + 敏捷調整值',
        properties: '輕甲',
        useCase: '遊俠的理想護甲，允許隱匿和靈活移動。'
      },
      { 
        name: '盾牌', 
        description: '木製或皮革盾牌，可提供額外防護。',
        armorClass: '+2 AC',
        properties: '需佔用一隻手',
        useCase: '使用單手武器時的防禦選項。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '探險者背包', 
        description: '包含背包、睡袋、餐具、10 支火把、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '野外生存必備。'
      },
      { 
        name: '狩獵陷阱', 
        description: '鋼製捕獸夾，可用於狩獵或防禦。',
        useCase: '設置陷阱捕捉獵物或阻擋敵人。'
      },
      { 
        name: '動物誘餌', 
        description: '用於吸引或安撫野生動物的食物。',
        useCase: '與動物互動或設置陷阱。'
      }
    ]
  },

  rogue: {
    name: '盜賊',
    weapons: [
      { 
        name: '細劍', 
        description: '優雅的刺擊武器，完美適合偷襲攻擊。',
        damage: '1d8 穿刺',
        properties: '靈巧',
        useCase: '盜賊的首選武器，最大化偷襲傷害。'
      },
      { 
        name: '短劍', 
        description: '輕巧的刺擊武器，可雙持。',
        damage: '1d6 穿刺',
        properties: '靈巧、輕型',
        useCase: '雙武器戰鬥或隱藏武器。'
      },
      { 
        name: '短弓', 
        description: '緊湊的遠程武器，適合從陰影中攻擊。',
        damage: '1d6 穿刺',
        properties: '彈藥（射程 80/320 呎）、雙手',
        useCase: '遠程偷襲攻擊。'
      },
      { 
        name: '手弩', 
        description: '單手弩機，可搭配近戰武器使用。',
        damage: '1d6 穿刺',
        properties: '彈藥（射程 30/120 呎）、輕型、裝填',
        useCase: '近距離遠程攻擊。'
      }
    ],
    armor: [
      { 
        name: '皮甲', 
        description: '不會發出聲音的柔軟皮革護甲。',
        armorClass: 'AC 11 + 敏捷調整值',
        properties: '輕甲',
        useCase: '最適合隱匿行動的護甲。'
      },
      { 
        name: '鑲釘皮甲', 
        description: '稍重但提供更好防護的皮甲。',
        armorClass: 'AC 12 + 敏捷調整值',
        properties: '輕甲',
        useCase: '需要更多防護時的選擇。'
      }
    ],
    tools: [
      { 
        name: '盜賊工具', 
        description: '包含小銼刀、撬鎖針、小鏡子、細鉗子和剪刀。',
        useCase: '開鎖和解除陷阱的必需品。'
      }
    ],
    equipment: [
      { 
        name: '盜賊背包', 
        description: '包含背包、1000 顆滾珠、10 呎線、鈴鐺、5 支蠟燭、撬棍、鐵錘、10 根釘子、5 天口糧、水袋和 50 呎麻繩。',
        useCase: '盜賊專用的實用工具組合。'
      },
      { 
        name: '變裝工具組', 
        description: '化妝品、假髮和服裝配件。',
        useCase: '偽裝身份和潛入。'
      },
      { 
        name: '攀爬工具組', 
        description: '釘鞋、手套和安全帶。',
        useCase: '爬上建築物或懸崖。'
      }
    ]
  },

  sorcerer: {
    name: '術士',
    weapons: [
      { 
        name: '匕首', 
        description: '輕巧的刀刃，可近戰或投擲。術士的基本自衛武器。',
        damage: '1d4 穿刺',
        properties: '靈巧、輕型、投擲（射程 20/60 呎）',
        useCase: '緊急自衛武器，主要依靠法術。'
      },
      { 
        name: '飛鏢', 
        description: '可快速投擲的小型武器。',
        damage: '1d4 穿刺',
        properties: '靈巧、投擲（射程 20/60 呎）',
        useCase: '保持距離的簡單選項。'
      },
      { 
        name: '輕弩', 
        description: '簡單的遠程武器。',
        damage: '1d8 穿刺',
        properties: '彈藥（射程 80/320 呎）、裝填、雙手',
        useCase: '節省法術位時使用。'
      }
    ],
    armor: [
      { 
        name: '無護甲', 
        description: '術士通常不穿護甲，依靠法術防護自己。',
        armorClass: 'AC 10 + 敏捷調整值',
        properties: '可施展法術',
        useCase: '術士的標準選擇，配合護甲法術如法師護甲。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '探險者背包', 
        description: '包含背包、睡袋、餐具、10 支火把、10 天口糧、水袋和 50 呎麻繩。',
        useCase: '基本冒險裝備。'
      },
      { 
        name: '奧術焦點', 
        description: '水晶、寶珠、權杖、法杖或魔杖，用於施放術士法術。',
        useCase: '施法必需品。'
      },
      { 
        name: '法術成分袋', 
        description: '裝有施法材料的小袋。',
        useCase: '替代奧術焦點的選項。'
      }
    ]
  },

  warlock: {
    name: '邪術師',
    weapons: [
      { 
        name: '輕弩', 
        description: '簡單的遠程武器，可配合妖火箭使用。',
        damage: '1d8 穿刺',
        properties: '彈藥（射程 80/320 呎）、裝填、雙手',
        useCase: '物理攻擊選項，通常使用妖火箭更好。'
      },
      { 
        name: '匕首', 
        description: '隱藏武器，可近戰或投擲。',
        damage: '1d4 穿刺',
        properties: '靈巧、輕型、投擲（射程 20/60 呎）',
        useCase: '緊急自衛，主要使用咒法。'
      }
    ],
    armor: [
      { 
        name: '皮甲', 
        description: '輕便的護甲，允許靈活施法。',
        armorClass: 'AC 11 + 敏捷調整值',
        properties: '輕甲',
        useCase: '邪術師可穿著的基本護甲。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '學者背包', 
        description: '包含背包、學識之書、墨水瓶、羽毛筆、10 張羊皮紙、香料小袋和小刀。',
        useCase: '研究和記錄的工具。'
      },
      { 
        name: '奧術焦點', 
        description: '代表你守護者力量的物品。',
        useCase: '施放邪術師法術的焦點。'
      },
      { 
        name: '契約之書', 
        description: '記錄你與守護者契約的神秘書籍。',
        useCase: '某些守護者恩惠需要此書。'
      }
    ]
  },

  wizard: {
    name: '法師',
    weapons: [
      { 
        name: '匕首', 
        description: '法師的標準自衛武器，輕巧易藏。',
        damage: '1d4 穿刺',
        properties: '靈巧、輕型、投擲（射程 20/60 呎）',
        useCase: '緊急情況使用，主要依靠法術。'
      },
      { 
        name: '木棍', 
        description: '可作為行走杖或施法焦點的木棒。',
        damage: '1d6 鈍擊',
        properties: '多用途',
        useCase: '可用作武器或法杖。'
      }
    ],
    armor: [
      { 
        name: '無護甲', 
        description: '法師不穿護甲，使用法師護甲等法術代替。',
        armorClass: 'AC 10 + 敏捷調整值',
        properties: '可施展法術',
        useCase: '標準選擇，配合防護法術使用。'
      }
    ],
    tools: [],
    equipment: [
      { 
        name: '學者背包', 
        description: '包含背包、學識之書、墨水瓶、羽毛筆、10 張羊皮紙、香料小袋和小刀。',
        useCase: '法師研究的必備工具。'
      },
      { 
        name: '法術書', 
        description: '記錄你所知法術的魔法書。',
        useCase: '準備法術和學習新法術的必需品。'
      },
      { 
        name: '奧術焦點', 
        description: '水晶、寶珠、權杖、法杖或魔杖。',
        useCase: '施放法術的焦點。'
      },
      { 
        name: '法術成分袋', 
        description: '裝有各種施法材料的袋子。',
        useCase: '替代奧術焦點的選項。'
      }
    ]
  }
};

// Helper function to get equipment for a specific class
export const getEquipmentForClass = (className) => {
  if (!className) return null;
  const classKey = className.toLowerCase();
  return equipmentByClass[classKey] || null;
};

// Helper function to get recommended equipment based on class and race
export const getRecommendedEquipment = (className, raceName) => {
  if (!className) return null;
  const classKey = className.toLowerCase();
  const classEquipment = equipmentByClass[classKey];
  
  if (!classEquipment) return null;
  
  // Return basic recommended set
  const recommended = {
    weapons: classEquipment.weapons.slice(0, 2), // First 2 weapons
    armor: classEquipment.armor.slice(0, 1), // First armor
    tools: classEquipment.tools.slice(0, 1), // First tool if any
    equipment: classEquipment.equipment.slice(0, 2) // First 2 equipment items
  };
  
  return recommended;
};

export default equipmentByClass;
