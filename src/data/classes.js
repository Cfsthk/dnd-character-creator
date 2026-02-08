// Complete D&D 5E Class Data with Visual Information for AI Prompts

export const CLASSES = {
  fighter: {
    name: '戰士',
    nameEn: 'Fighter',
    icon: '⚔️',
    difficulty: 2,
    hitDie: 'd10',
    primaryAbility: '力量 (Strength)',
    secondaryAbility: '體質 (Constitution)',
    savingThrows: ['力量', '體質'],
    category: 'martial',
    description: '戰士是最多才多藝的戰鬥職業，精通各種武器與護甲。無論您想當堅強的前線坦克、靈活的劍客，還是遠程射手，戰士都能滿足您的需求。',
    
    bestFor: [
      '想要簡單直接的戰鬥',
      '喜歡多種武器與戰鬥風格',
      '第一次玩 D&D 的新手',
      '想要扮演經典戰士角色'
    ],
    
    keyFeatures: [
      '戰鬥風格 (Fighting Style) - 第1級選擇專精',
      '動作如潮 (Action Surge) - 額外行動回合',
      '多次攻擊 (Extra Attack) - 第5級獲得',
      '戰技專精 (Martial Archetype) - 第3級選擇子職業'
    ],
    
    subclasses: [
      { name: '戰鬥大師', description: '靈活戰技與戰場控制' },
      { name: '冠軍', description: '強化基礎攻擊能力' },
      { name: '魔劍士', description: '結合魔法與劍術' }
    ],
    
    startingEquipment: [
      '鎖甲或皮甲',
      '長劍與盾牌，或兩把武器',
      '輕弩與20支弩矢，或兩把手斧',
      '地城探險包或探險者包'
    ],
    
    skillOptions: ['特技', '動物馴養', '運動', '歷史', '洞察', '威嚇', '察覺', '生存'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'muscular and athletic build',
        posture: 'confident battle-ready stance',
        features: 'battle scars and weathered features'
      },
      equipment: {
        armor: ['heavy plate armor', 'chain mail', 'scale armor with shield'],
        weapons: ['longsword and shield', 'greatsword', 'dual wielding swords', 'longbow'],
        accessories: ['military insignia', 'weapon belt', 'combat gauntlets']
      },
      atmosphere: {
        setting: ['battlefield', 'training grounds', 'castle courtyard', 'arena'],
        lighting: 'dramatic side lighting emphasizing muscle definition',
        mood: 'determined and battle-ready'
      },
      poses: ['combat stance with weapon drawn', 'mid-swing attack pose', 'defensive guard position']
    }
  },

  rogue: {
    name: '盜賊',
    nameEn: 'Rogue',
    icon: '🗡️',
    difficulty: 2,
    hitDie: 'd8',
    primaryAbility: '敏捷 (Dexterity)',
    secondaryAbility: '智力或魅力',
    savingThrows: ['敏捷', '智力'],
    category: 'agile',
    description: '盜賊是精通偷襲與詭計的專家。擅長潛行、開鎖、陷阱解除，以及致命的偷襲攻擊。適合喜歡策略與巧妙戰術的玩家。',
    
    bestFor: [
      '喜歡潛行與策略戰鬥',
      '想要高技能與多功能角色',
      '享受扮演狡猾聰明的角色',
      '喜歡偷襲與暴擊傷害'
    ],
    
    keyFeatures: [
      '偷襲 (Sneak Attack) - 額外傷害骰',
      '專精 (Expertise) - 雙倍熟練加值',
      '狡詐行動 (Cunning Action) - 附贈行動潛行/脫離',
      '盜賊專長 (Roguish Archetype) - 第3級選擇子職業'
    ],
    
    subclasses: [
      { name: '刺客', description: '致命偷襲與偽裝專家' },
      { name: '盜賊', description: '敏捷攀爬與快速行動' },
      { name: '秘法騙徒', description: '結合魔法與詭計' }
    ],
    
    startingEquipment: [
      '細劍或短劍',
      '短弓與箭袋（20支箭）或短劍',
      '竊賊工具',
      '地城探險包或探險者包',
      '皮甲、兩把匕首、盜賊工具'
    ],
    
    skillOptions: ['特技', '運動', '欺瞞', '洞察', '威嚇', '調查', '察覺', '表演', '說服', '巧手', '隱匿'],
    skillsToChoose: 4,
    
    visualData: {
      appearance: {
        build: 'lean and agile physique',
        posture: 'crouched or stealth-ready stance',
        features: 'sharp observant eyes, nimble fingers'
      },
      equipment: {
        armor: ['dark leather armor', 'studded leather', 'hooded cloak'],
        weapons: ['dual daggers', 'rapier', 'short sword', 'hand crossbow'],
        accessories: ['thieves tools', 'lockpicks', 'pouches and bags', 'hooded cowl']
      },
      atmosphere: {
        setting: ['shadowy alley', 'rooftops at night', 'tavern corner', 'treasure vault'],
        lighting: 'low-key lighting with dramatic shadows',
        mood: 'mysterious and cunning'
      },
      poses: ['stealth crouch', 'picking a lock', 'dual dagger combat stance', 'parkour leap']
    }
  },

  cleric: {
    name: '牧師',
    nameEn: 'Cleric',
    icon: '✨',
    difficulty: 3,
    hitDie: 'd8',
    primaryAbility: '感知 (Wisdom)',
    secondaryAbility: '體質或魅力',
    savingThrows: ['感知', '魅力'],
    category: 'divine',
    description: '牧師是神祇的代言人，擁有強大的治療與支援魔法。能夠根據神域選擇成為治療者、戰士或施法者。是團隊不可或缺的支援角色。',
    
    bestFor: [
      '想要扮演治療與支援角色',
      '喜歡神聖魔法與宗教主題',
      '想要平衡戰鬥與施法能力',
      '享受扮演虔誠信仰者'
    ],
    
    keyFeatures: [
      '神域 (Divine Domain) - 第1級選擇專精方向',
      '引導神力 (Channel Divinity) - 特殊神聖能力',
      '法術施放 - 完整施法者，自動知道所有牧師法術',
      '銷毀不死生物 (Destroy Undead) - 第5級獲得'
    ],
    
    subclasses: [
      { name: '生命神域', description: '最強治療與支援' },
      { name: '戰爭神域', description: '戰鬥導向的戰士牧師' },
      { name: '光明神域', description: '對抗黑暗的火焰魔法' }
    ],
    
    startingEquipment: [
      '釘頭鎚或戰鎚',
      '鱗甲、皮甲或鎖甲',
      '輕弩與20支弩矢或簡易武器',
      '牧師包或探險者包',
      '盾牌與聖徽'
    ],
    
    skillOptions: ['歷史', '洞察', '醫藥', '說服', '宗教'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'moderate build with divine presence',
        posture: 'upright reverent stance',
        features: 'serene expression, divine glow'
      },
      equipment: {
        armor: ['chain mail with holy symbols', 'plate armor (high level)', 'robes with armor'],
        weapons: ['mace or warhammer', 'shield with deity symbol', 'holy staff'],
        accessories: ['holy symbol amulet', 'prayer book', 'divine focus', 'glowing emblems']
      },
      atmosphere: {
        setting: ['temple', 'battlefield healing allies', 'prayer chamber', 'holy shrine'],
        lighting: 'divine glow or soft radiant light',
        mood: 'serene and righteous'
      },
      poses: ['casting healing spell', 'raising holy symbol', 'prayer pose', 'blessing gesture']
    }
  },

  wizard: {
    name: '法師',
    nameEn: 'Wizard',
    icon: '🔮',
    difficulty: 4,
    hitDie: 'd6',
    primaryAbility: '智力 (Intelligence)',
    secondaryAbility: '體質或敏捷',
    savingThrows: ['智力', '感知'],
    category: 'arcane',
    description: '法師是奧術魔法的大師，透過學習與研究掌握最多種類的法術。是最強大但也最脆弱的施法者，需要策略與智慧。',
    
    bestFor: [
      '喜歡複雜策略與法術系統',
      '想要最多法術選擇',
      '享受扮演學者與魔法研究者',
      '喜歡控場與範圍傷害'
    ],
    
    keyFeatures: [
      '法術書 (Spellbook) - 可學習所有法師法術',
      '奧術復甦 (Arcane Recovery) - 恢復法術位',
      '奧術傳統 (Arcane Tradition) - 第2級選擇專精學派',
      '法術精通 - 第18級部分法術可無限施放'
    ],
    
    subclasses: [
      { name: '塑能學派', description: '傷害法術專精' },
      { name: '防護學派', description: '防禦與保護魔法' },
      { name: '幻術學派', description: '幻象與心靈控制' }
    ],
    
    startingEquipment: [
      '木棍或匕首',
      '材料包或秘法焦點',
      '學者包或探險者包',
      '法術書'
    ],
    
    skillOptions: ['奧秘', '歷史', '洞察', '調查', '醫藥', '宗教'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'slender scholarly build',
        posture: 'focused spellcasting stance',
        features: 'intelligent eyes, arcane marks or tattoos'
      },
      equipment: {
        armor: ['robes with arcane symbols', 'no armor (cloth only)', 'enchanted cloak'],
        weapons: ['wooden staff', 'ornate wand', 'dagger', 'spellbook'],
        accessories: ['spellbook at belt', 'component pouch', 'arcane focus', 'scrolls']
      },
      atmosphere: {
        setting: ['wizard tower library', 'magical laboratory', 'ancient ruins', 'casting circle'],
        lighting: 'magical glow from spells or crystals',
        mood: 'focused and intellectual'
      },
      poses: ['casting spell with gestures', 'reading spellbook', 'hand raised with magical energy', 'summoning ritual']
    }
  },

  paladin: {
    name: '聖武士',
    nameEn: 'Paladin',
    icon: '🛡️',
    difficulty: 3,
    hitDie: 'd10',
    primaryAbility: '力量 (Strength)',
    secondaryAbility: '魅力 (Charisma)',
    savingThrows: ['感知', '魅力'],
    category: 'martial',
    description: '聖武士是神聖戰士，結合了強大的戰鬥力與治療魔法。透過神聖誓言獲得力量，是團隊的守護者與道德支柱。',
    
    bestFor: [
      '想當坦克同時有治療能力',
      '喜歡神聖戰士主題',
      '享受扮演正義守護者',
      '想要混合戰鬥與魔法'
    ],
    
    keyFeatures: [
      '神聖誓言 (Sacred Oath) - 第3級選擇',
      '神擊 (Divine Smite) - 強力單體爆發傷害',
      '聖療 (Lay on Hands) - 治療能力',
      '光環能力 (Aura) - 第6級獲得團隊增益'
    ],
    
    subclasses: [
      { name: '奉獻誓約', description: '保護弱者的守護者' },
      { name: '復仇誓約', description: '懲罰邪惡的審判者' },
      { name: '古人誓約', description: '自然與光明的守護者' }
    ],
    
    startingEquipment: [
      '武器與盾牌，或兩把武器',
      '5支標槍或簡易近戰武器',
      '牧師包或探險者包',
      '鎖甲與聖徽'
    ],
    
    skillOptions: ['運動', '洞察', '威嚇', '醫藥', '說服', '宗教'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'strong heroic build',
        posture: 'noble protective stance',
        features: 'righteous expression, divine aura'
      },
      equipment: {
        armor: ['shining plate armor', 'armor with holy emblems', 'ornate shield'],
        weapons: ['longsword glowing with holy light', 'warhammer', 'lance'],
        accessories: ['holy symbol', 'flowing cape', 'crown or circlet', 'glowing sigils']
      },
      atmosphere: {
        setting: ['holy temple steps', 'protecting innocents', 'facing evil', 'divine battlefield'],
        lighting: 'radiant golden light',
        mood: 'heroic and righteous'
      },
      poses: ['sword raised with divine light', 'shield protecting others', 'kneeling in prayer', 'smiting evil']
    }
  },

  barbarian: {
    name: '野蠻人',
    nameEn: 'Barbarian',
    icon: '⚡',
    difficulty: 2,
    hitDie: 'd12',
    primaryAbility: '力量 (Strength)',
    secondaryAbility: '體質 (Constitution)',
    savingThrows: ['力量', '體質'],
    category: 'martial',
    description: '野蠻人是原始力量的化身，透過狂暴獲得驚人的戰鬥力。最高的生命值與傷害抗性讓野蠻人成為終極坦克。',
    
    bestFor: [
      '想要簡單直接的高傷害',
      '喜歡狂暴與戰鬥快感',
      '想當隊伍的前線肉盾',
      '享受原始戰士角色'
    ],
    
    keyFeatures: [
      '狂暴 (Rage) - 傷害加成與抗性',
      '無甲防禦 (Unarmored Defense) - 不穿護甲也有高AC',
      '無畏 (Reckless Attack) - 優勢攻擊',
      '原始道途 (Primal Path) - 第3級選擇'
    ],
    
    subclasses: [
      { name: '狂戰士', description: '狂怒中的狂怒' },
      { name: '圖騰戰士', description: '野獸圖騰力量' },
      { name: '祖靈守護者', description: '祖靈保護與力量' }
    ],
    
    startingEquipment: [
      '巨斧或任何武術武器',
      '兩把手斧或簡易武器',
      '探險者包與4支標槍'
    ],
    
    skillOptions: ['動物馴養', '運動', '威嚇', '自然', '察覺', '生存'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'massive muscular build',
        posture: 'aggressive charging stance',
        features: 'fierce expression, tribal markings or scars'
      },
      equipment: {
        armor: ['minimal armor showing muscles', 'fur and leather', 'tribal ornaments'],
        weapons: ['greataxe', 'greatsword', 'maul', 'dual hand axes'],
        accessories: ['tribal tattoos', 'war paint', 'bone jewelry', 'animal pelts']
      },
      atmosphere: {
        setting: ['wilderness', 'mountain peak', 'tribal camp', 'charging into battle'],
        lighting: 'dramatic with energy effects during rage',
        mood: 'wild and ferocious'
      },
      poses: ['mid-rage roar', 'weapon overhead strike', 'charging attack', 'victory pose over defeated foe']
    }
  },

  ranger: {
    name: '遊俠',
    nameEn: 'Ranger',
    icon: '🏹',
    difficulty: 3,
    hitDie: 'd10',
    primaryAbility: '敏捷或力量',
    secondaryAbility: '感知 (Wisdom)',
    savingThrows: ['力量', '敏捷'],
    category: 'agile',
    description: '遊俠是荒野的守護者與追蹤大師。擅長遠程攻擊、生存技能與自然魔法。對特定地形與敵人有額外優勢。',
    
    bestFor: [
      '喜歡弓箭遠程戰鬥',
      '享受荒野探索與追蹤',
      '想要戰鬥與施法的平衡',
      '喜歡動物夥伴（子職業）'
    ],
    
    keyFeatures: [
      '宿敵 (Favored Enemy) - 對特定敵人加成',
      '天然探索者 (Natural Explorer) - 地形專精',
      '戰鬥風格 - 遠程或雙武器',
      '遊俠專長 (Ranger Archetype) - 第3級選擇'
    ],
    
    subclasses: [
      { name: '獸王', description: '擁有動物夥伴' },
      { name: '獵人', description: '對抗特定敵人專精' },
      { name: '地平線行者', description: '傳送與異界力量' }
    ],
    
    startingEquipment: [
      '鱗甲或皮甲',
      '兩把短劍或兩把簡易近戰武器',
      '地城探險包或探險者包',
      '長弓與箭袋（20支箭）'
    ],
    
    skillOptions: ['動物馴養', '運動', '洞察', '調查', '自然', '察覺', '隱匿', '生存'],
    skillsToChoose: 3,
    
    visualData: {
      appearance: {
        build: 'athletic wilderness-ready build',
        posture: 'alert tracking stance',
        features: 'weathered features, keen eyes'
      },
      equipment: {
        armor: ['leather armor with forest colors', 'studded leather', 'camouflage cloak'],
        weapons: ['longbow', 'dual short swords', 'hunting knife', 'arrows with special tips'],
        accessories: ['quiver', 'survival gear', 'animal companion', 'tracking tools']
      },
      atmosphere: {
        setting: ['dense forest', 'mountain trail', 'hunting in wilderness', 'with animal companion'],
        lighting: 'natural outdoor lighting, dawn or dusk',
        mood: 'alert and ready'
      },
      poses: ['drawing bow', 'tracking on ground', 'with animal companion', 'dual wielding stance']
    }
  },

  monk: {
    name: '武僧',
    nameEn: 'Monk',
    icon: '🥋',
    difficulty: 3,
    hitDie: 'd8',
    primaryAbility: '敏捷與感知',
    secondaryAbility: '體質',
    savingThrows: ['力量', '敏捷'],
    category: 'agile',
    description: '武僧是武術大師，透過氣力量掌握超凡能力。無需武器與護甲，用拳腳與神秘能力戰鬥。速度最快的職業。',
    
    bestFor: [
      '喜歡徒手格鬥與武術',
      '想要高機動性角色',
      '享受東方武俠風格',
      '喜歡多次攻擊與連擊'
    ],
    
    keyFeatures: [
      '氣 (Ki) - 特殊資源點數',
      '無甲防禦 - 敏捷+感知計算AC',
      '快速移動 - 額外移動速度',
      '武僧傳統 (Monastic Tradition) - 第3級選擇'
    ],
    
    subclasses: [
      { name: '開掌', description: '氣療與操控' },
      { name: '影之道', description: '忍術與暗影魔法' },
      { name: '四元素', description: '元素魔法拳法' }
    ],
    
    startingEquipment: [
      '短劍或簡易武器',
      '地城探險包或探險者包',
      '10支飛鏢'
    ],
    
    skillOptions: ['特技', '運動', '歷史', '洞察', '宗教', '隱匿'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'lean muscular martial artist build',
        posture: 'martial arts stance',
        features: 'focused expression, disciplined presence'
      },
      equipment: {
        armor: ['simple robes', 'martial arts gi', 'monastic wrappings', 'no armor'],
        weapons: ['quarterstaff', 'bare fists with wraps', 'nunchaku', 'darts'],
        accessories: ['hand wraps', 'prayer beads', 'simple rope belt', 'headband']
      },
      atmosphere: {
        setting: ['monastery courtyard', 'mountaintop training', 'zen garden', 'martial arts arena'],
        lighting: 'serene with subtle ki energy effects',
        mood: 'calm and focused'
      },
      poses: ['martial arts stance', 'mid-kick', 'meditation pose', 'chi energy around fists']
    }
  },

  sorcerer: {
    name: '術士',
    nameEn: 'Sorcerer',
    icon: '💫',
    difficulty: 3,
    hitDie: 'd6',
    primaryAbility: '魅力 (Charisma)',
    secondaryAbility: '體質',
    savingThrows: ['體質', '魅力'],
    category: 'arcane',
    description: '術士天生擁有魔法血統，無需學習就能施展法術。透過超魔能力可以改變法術效果，是最靈活的施法者。',
    
    bestFor: [
      '喜歡天生魔法能力',
      '想要客製化法術效果',
      '享受龍裔或魔法血統背景',
      '喜歡爆發傷害與靈活施法'
    ],
    
    keyFeatures: [
      '魔法起源 (Sorcerous Origin) - 第1級決定力量來源',
      '超魔 (Metamagic) - 第3級獲得，改變法術',
      '術能點 (Sorcery Points) - 特殊資源',
      '法術已知 - 不需法術書但選擇較少'
    ],
    
    subclasses: [
      { name: '龍裔血脈', description: '龍族魔法與抗性' },
      { name: '狂野魔法', description: '混沌不可預測的力量' },
      { name: '風暴血脈', description: '雷電與風暴魔法' }
    ],
    
    startingEquipment: [
      '輕弩與20支弩矢或簡易武器',
      '材料包或秘法焦點',
      '地城探險包或探險者包',
      '兩把匕首'
    ],
    
    skillOptions: ['奧秘', '欺瞞', '洞察', '威嚇', '說服', '宗教'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'ethereal presence with innate power',
        posture: 'confident natural casting stance',
        features: 'magical eyes, draconic features or wild magic marks'
      },
      equipment: {
        armor: ['elegant robes', 'mystical clothing', 'draconic scale patterns', 'flowing magical garments'],
        weapons: ['staff with crystal', 'wand', 'orb focus', 'minimal weapons'],
        accessories: ['arcane focus', 'component pouch', 'magical jewelry', 'draconic ornaments']
      },
      atmosphere: {
        setting: ['arcane chamber', 'storm clouds', 'draconic lair', 'raw magic surroundings'],
        lighting: 'intense magical glow matching origin',
        mood: 'powerful and charismatic'
      },
      poses: ['raw magic erupting from hands', 'draconic transformation hints', 'confident casting', 'wild magic surge']
    }
  },

  bard: {
    name: '吟遊詩人',
    nameEn: 'Bard',
    icon: '🎵',
    difficulty: 3,
    hitDie: 'd8',
    primaryAbility: '魅力 (Charisma)',
    secondaryAbility: '敏捷',
    savingThrows: ['敏捷', '魅力'],
    category: 'arcane',
    description: '吟遊詩人是多才多藝的藝術家，透過音樂與表演施展魔法。擁有最多技能，能支援、控制、治療與傷害。',
    
    bestFor: [
      '想要多功能支援角色',
      '喜歡音樂與藝術主題',
      '享受社交互動與魅力',
      '想要最多技能熟練'
    ],
    
    keyFeatures: [
      '吟唱靈感 (Bardic Inspiration) - 支援隊友',
      '萬事通 (Jack of All Trades) - 所有檢定加值',
      '吟遊詩人學院 (Bard College) - 第3級選擇',
      '魔法祕密 (Magical Secrets) - 學習其他職業法術'
    ],
    
    subclasses: [
      { name: '學識學院', description: '額外技能與知識' },
      { name: '勇氣學院', description: '戰鬥導向的吟遊詩人' },
      { name: '魅力學院', description: '社交與心理操控' }
    ],
    
    startingEquipment: [
      '細劍、長劍或簡易武器',
      '外交官包或藝人包',
      '琵琶或其他樂器',
      '皮甲與匕首'
    ],
    
    skillOptions: ['所有技能'],
    skillsToChoose: 3,
    
    visualData: {
      appearance: {
        build: 'charismatic and expressive build',
        posture: 'performative dramatic stance',
        features: 'charming smile, expressive features'
      },
      equipment: {
        armor: ['stylish leather armor', 'colorful performer outfit', 'elegant clothing'],
        weapons: ['rapier', 'lute as weapon', 'dagger', 'hand crossbow'],
        accessories: ['musical instrument', 'colorful cape', 'jewelry', 'feathered hat']
      },
      atmosphere: {
        setting: ['grand stage', 'tavern performance', 'royal court', 'street corner'],
        lighting: 'spotlight or warm inviting light',
        mood: 'charismatic and inspiring'
      },
      poses: ['playing instrument', 'dramatic gesture while singing', 'inspiring allies', 'dancing with magic']
    }
  },

  druid: {
    name: '德魯伊',
    nameEn: 'Druid',
    icon: '🌿',
    difficulty: 4,
    hitDie: 'd8',
    primaryAbility: '感知 (Wisdom)',
    secondaryAbility: '體質',
    savingThrows: ['智力', '感知'],
    category: 'divine',
    description: '德魯伊是自然的守護者，能夠變身成野獸並施展自然魔法。多功能職業，能治療、控制、傷害與坦克。',
    
    bestFor: [
      '喜歡自然與動物主題',
      '想要變身成野獸戰鬥',
      '享受扮演自然守護者',
      '想要多功能施法者'
    ],
    
    keyFeatures: [
      '野性變身 (Wild Shape) - 變身動物',
      '德魯伊圈 (Druid Circle) - 第2級選擇',
      '自然魔法 - 控制與治療',
      '野獸語言 - 與動物溝通'
    ],
    
    subclasses: [
      { name: '月之圈', description: '強化野獸變身戰鬥' },
      { name: '大地圈', description: '額外法術與領域控制' },
      { name: '夢境圈', description: '治療與支援專精' }
    ],
    
    startingEquipment: [
      '木盾或簡易武器',
      '彎刀或簡易近戰武器',
      '皮甲、探險者包、德魯伊焦點'
    ],
    
    skillOptions: ['奧秘', '動物馴養', '洞察', '醫藥', '自然', '察覺', '宗教', '生存'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'natural earthy build',
        posture: 'connected to nature stance',
        features: 'wild hair, nature-touched features, animal eyes'
      },
      equipment: {
        armor: ['leather armor with leaves', 'wooden armor', 'natural materials', 'no metal'],
        weapons: ['wooden staff', 'scimitar', 'quarterstaff with vines', 'natural weapons'],
        accessories: ['druidic focus', 'holly and mistletoe', 'animal totems', 'flower crown']
      },
      atmosphere: {
        setting: ['ancient forest', 'stone circle', 'natural grove', 'surrounded by nature'],
        lighting: 'natural sunlight through trees',
        mood: 'serene and primal'
      },
      poses: ['wild shape transformation', 'communing with nature', 'casting nature magic', 'animal companion nearby']
    }
  },

  warlock: {
    name: '術士',
    nameEn: 'Warlock',
    icon: '👁️',
    difficulty: 3,
    hitDie: 'd8',
    primaryAbility: '魅力 (Charisma)',
    secondaryAbility: '體質',
    savingThrows: ['感知', '魅力'],
    category: 'arcane',
    description: '術士透過與超自然存在訂立契約獲得魔法。擁有強大的魔能祈喚（無限施放傷害法術）與獨特的異能。',
    
    bestFor: [
      '喜歡黑暗契約主題',
      '想要無限施放法術攻擊',
      '享受客製化角色能力',
      '喜歡爆發傷害與短休恢復'
    ],
    
    keyFeatures: [
      '異界宗主 (Otherworldly Patron) - 第1級選擇力量來源',
      '魔能祈喚 (Eldritch Invocations) - 客製化能力',
      '契約恩惠 (Pact Boon) - 第3級獲得特殊能力',
      '短休恢復 - 法術位短休即可恢復'
    ],
    
    subclasses: [
      { name: '魔神', description: '惡魔契約與火焰魔法' },
      { name: '大舊者', description: '克蘇魯式精神魔法' },
      { name: '仙靈', description: '迷惑與魅惑魔法' }
    ],
    
    startingEquipment: [
      '輕弩與20支弩矢或簡易武器',
      '材料包或秘法焦點',
      '學者包或地城探險包',
      '皮甲、簡易武器、兩把匕首'
    ],
    
    skillOptions: ['奧秘', '欺瞞', '歷史', '威嚇', '調查', '自然', '宗教'],
    skillsToChoose: 2,
    
    visualData: {
      appearance: {
        build: 'mysterious otherworldly presence',
        posture: 'pact-empowered confident stance',
        features: 'eldritch marks, otherworldly eyes, patron symbols'
      },
      equipment: {
        armor: ['dark robes with eldritch symbols', 'leather with occult designs', 'pact armor'],
        weapons: ['pact blade (magical weapon)', 'rod or wand', 'eldritch blast emanating from hands'],
        accessories: ['tome of shadows', 'patron token', 'occult jewelry', 'glowing pact marks']
      },
      atmosphere: {
        setting: ['dark ritual chamber', 'summoning circle', 'eldritch void', 'corrupted area'],
        lighting: 'eerie eldritch glow (green, purple, or red)',
        mood: 'mysterious and dangerous'
      },
      poses: ['channeling eldritch blast', 'communing with patron', 'pact weapon summoning', 'dark magic emanating']
    }
  }
};

export const CLASS_CATEGORIES = {
  martial: { name: '近戰戰士類', icon: '🗡️', classes: ['fighter', 'paladin', 'barbarian'] },
  agile: { name: '敏捷戰技類', icon: '🏃', classes: ['rogue', 'ranger', 'monk'] },
  arcane: { name: '奧術施法者', icon: '✨', classes: ['wizard', 'sorcerer', 'bard', 'warlock'] },
  divine: { name: '神聖施法者', icon: '🙏', classes: ['cleric', 'druid'] }
};

export const DIFFICULTY_LABELS = {
  2: { text: '新手友善', color: 'text-green-600', stars: '⭐⭐' },
  3: { text: '中等複雜', color: 'text-yellow-600', stars: '⭐⭐⭐' },
  4: { text: '進階玩家', color: 'text-red-600', stars: '⭐⭐⭐⭐' }
};
