// D&D 5E Race and Subrace Data with Traditional Chinese descriptions
export const races = {
  human: {
    name: 'Human',
    nameChinese: '人類',
    description: '人類是最適應力強且野心勃勃的種族，擁有多樣化的文化和天賦。',
    subraces: ['Standard Human', 'Variant Human'],
    abilityBonus: { all: 1 },
    heightRange: { min: "4'8\"", max: "6'4\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 270, avg: 165 }
  },
  elf: {
    name: 'Elf',
    nameChinese: '精靈',
    description: '精靈是優雅、長壽的種族，與自然和魔法有著深厚的聯繫，擁有敏銳的感官和超凡的敏捷。',
    subraces: ['High Elf', 'Wood Elf', 'Dark Elf (Drow)', 'Eladrin', 'Sea Elf', 'Shadar-kai'],
    abilityBonus: { dexterity: 2 },
    heightRange: { min: "4'6\"", max: "6'0\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 90, max: 170, avg: 130 }
  },
  dwarf: {
    name: 'Dwarf',
    nameChinese: '矮人',
    description: '矮人是堅韌、勇敢的種族，以其精湛的工藝技術和對榮譽的堅持而聞名。他們通常居住在山脈之中。',
    subraces: ['Hill Dwarf', 'Mountain Dwarf', 'Duergar'],
    abilityBonus: { constitution: 2 },
    heightRange: { min: "3'8\"", max: "4'8\"", avgFeet: 4, avgInches: 2 },
    weightRange: { min: 115, max: 250, avg: 150 }
  },
  halfling: {
    name: 'Halfling',
    nameChinese: '半身人',
    description: '半身人是小巧、敏捷的種族，以其樂觀的天性和非凡的運氣而著稱。他們熱愛舒適和家庭生活。',
    subraces: ['Lightfoot Halfling', 'Stout Halfling', 'Ghostwise Halfling'],
    abilityBonus: { dexterity: 2 },
    heightRange: { min: "2'7\"", max: "3'3\"", avgFeet: 3, avgInches: 0 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  dragonborn: {
    name: 'Dragonborn',
    nameChinese: '龍裔',
    description: '龍裔是驕傲、高貴的種族，擁有龍族血統，能夠使用強大的吐息武器。他們重視榮譽和氏族。',
    subraces: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'],
    abilityBonus: { strength: 2, charisma: 1 },
    heightRange: { min: "5'6\"", max: "6'8\"", avgFeet: 6, avgInches: 2 },
    weightRange: { min: 175, max: 350, avg: 240 }
  },
  gnome: {
    name: 'Gnome',
    nameChinese: '侏儒',
    description: '侏儒是小巧、充滿好奇心的種族，熱愛發明、探索和魔法。他們以機智和幽默感而聞名。',
    subraces: ['Forest Gnome', 'Rock Gnome', 'Deep Gnome (Svirfneblin)'],
    abilityBonus: { intelligence: 2 },
    heightRange: { min: "2'11\"", max: "3'7\"", avgFeet: 3, avgInches: 4 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  'half-elf': {
    name: 'Half-Elf',
    nameChinese: '半精靈',
    description: '半精靈結合了人類的適應力和精靈的優雅，在兩個世界之間遊走，擁有獨特的魅力和多才多藝。',
    subraces: ['Standard', 'Aquatic', 'Drow', 'High Elf', 'Wood Elf'],
    abilityBonus: { charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'0\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 200, avg: 155 }
  },
  'half-orc': {
    name: 'Half-Orc',
    nameChinese: '半獸人',
    description: '半獸人擁有人類和獸人的血統，以其驚人的力量和不屈的韌性而著稱，常常面對偏見但不屈不撓。',
    subraces: ['Standard'],
    abilityBonus: { strength: 2, constitution: 1 },
    heightRange: { min: "4'10\"", max: "6'6\"", avgFeet: 5, avgInches: 10 },
    weightRange: { min: 140, max: 280, avg: 210 }
  },
  tiefling: {
    name: 'Tiefling',
    nameChinese: '魔裔',
    description: '魔裔擁有惡魔血統，常因其外貌而受到誤解，但他們擁有強大的魔法天賦和堅韌的意志。',
    subraces: ['Asmodeus', 'Baalzebul', 'Dispater', 'Fierna', 'Glasya', 'Levistus', 'Mammon', 'Mephistopheles', 'Zariel'],
    abilityBonus: { charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'1\"", avgFeet: 5, avgInches: 7 },
    weightRange: { min: 110, max: 240, avg: 155 }
  }
}

export const subRaceDetails = {
  // Elf subraces
  'High Elf': { 
    abilityBonus: { intelligence: 1 },
    nameChinese: '高等精靈',
    description: '高等精靈精通魔法藝術，擁有額外的法術能力和武器訓練。'
  },
  'Wood Elf': { 
    abilityBonus: { wisdom: 1 },
    nameChinese: '森林精靈',
    description: '森林精靈與大自然緊密相連，移動速度更快，擅長隱匿於野外。'
  },
  'Dark Elf (Drow)': { 
    abilityBonus: { charisma: 1 },
    nameChinese: '黑暗精靈（卓爾）',
    description: '黑暗精靈來自地底世界，擁有優越的黑暗視覺和天生的魔法能力。'
  },
  'Eladrin': { 
    abilityBonus: { charisma: 1 },
    nameChinese: '妖精',
    description: '妖精是精靈的妖精位面分支，能夠轉換季節形態，擁有傳送能力。'
  },
  'Sea Elf': { 
    abilityBonus: { constitution: 1 },
    nameChinese: '海精靈',
    description: '海精靈適應水下生活，能夠在水中呼吸並擁有游泳速度。'
  },
  'Shadar-kai': { 
    abilityBonus: { constitution: 1 },
    nameChinese: '影精靈',
    description: '影精靈與影界相連，擁有抗性和短距離傳送能力。'
  },
  
  // Dwarf subraces
  'Hill Dwarf': { 
    abilityBonus: { wisdom: 1 },
    nameChinese: '丘陵矮人',
    description: '丘陵矮人額外堅韌，每級獲得更多生命值，擁有敏銳的感知力。'
  },
  'Mountain Dwarf': { 
    abilityBonus: { strength: 2 },
    nameChinese: '山地矮人',
    description: '山地矮人強壯有力，精通輕型和中型護甲的使用。'
  },
  'Duergar': { 
    abilityBonus: { strength: 1 },
    nameChinese: '灰矮人',
    description: '灰矮人來自幽暗地域，擁有高等黑暗視覺和天生的魔法抗性。'
  },
  
  // Halfling subraces
  'Lightfoot Halfling': { 
    abilityBonus: { charisma: 1 },
    nameChinese: '輕足半身人',
    description: '輕足半身人特別擅長隱匿，能夠躲藏在較大生物後方。'
  },
  'Stout Halfling': { 
    abilityBonus: { constitution: 1 },
    nameChinese: '強壯半身人',
    description: '強壯半身人擁有矮人血統，對毒素有抗性並更加堅韌。'
  },
  'Ghostwise Halfling': { 
    abilityBonus: { wisdom: 1 },
    nameChinese: '幽影半身人',
    description: '幽影半身人擁有心靈感應能力，能夠無聲地與他人交流。'
  },
  
  // Gnome subraces
  'Forest Gnome': { 
    abilityBonus: { dexterity: 1 },
    nameChinese: '森林侏儒',
    description: '森林侏儒擁有天生的幻術魔法和與小動物交流的能力。'
  },
  'Rock Gnome': { 
    abilityBonus: { constitution: 1 },
    nameChinese: '岩石侏儒',
    description: '岩石侏儒是天生的發明家，擁有製作機械裝置的天賦。'
  },
  'Deep Gnome (Svirfneblin)': { 
    abilityBonus: { dexterity: 1 },
    nameChinese: '深地侏儒',
    description: '深地侏儒居住在地底深處，擁有高等隱匿能力和石頭知識。'
  },
  
  // Half-Elf subraces
  'Standard': { 
    abilityBonus: {},
    nameChinese: '標準',
    description: '標準半精靈可以從各種技能中選擇兩項熟練，展現其多才多藝。'
  },
  'Aquatic': { 
    abilityBonus: {},
    nameChinese: '水棲',
    description: '水棲半精靈擁有游泳速度和水下呼吸能力。'
  },
  'Drow': { 
    abilityBonus: {},
    nameChinese: '卓爾',
    description: '卓爾半精靈擁有黑暗精靈的法術能力和優越的黑暗視覺。'
  },
  
  // Human subraces
  'Standard Human': { 
    abilityBonus: { all: 1 },
    nameChinese: '標準人類',
    description: '標準人類所有屬性各獲得+1，展現其全面的適應能力。'
  },
  'Variant Human': { 
    abilityBonus: {},
    nameChinese: '變體人類',
    description: '變體人類可選擇兩項屬性各+1，並獲得一個額外專長和技能。'
  },

  // Dragonborn subraces (breath weapons)
  'Black': {
    nameChinese: '黑龍',
    description: '黑龍裔擁有酸液吐息武器和酸液傷害抗性。',
    breathWeapon: 'Acid',
    damageType: 'acid'
  },
  'Blue': {
    nameChinese: '藍龍',
    description: '藍龍裔擁有閃電吐息武器和閃電傷害抗性。',
    breathWeapon: 'Lightning',
    damageType: 'lightning'
  },
  'Brass': {
    nameChinese: '黃銅龍',
    description: '黃銅龍裔擁有火焰吐息武器和火焰傷害抗性。',
    breathWeapon: 'Fire',
    damageType: 'fire'
  },
  'Bronze': {
    nameChinese: '青銅龍',
    description: '青銅龍裔擁有閃電吐息武器和閃電傷害抗性。',
    breathWeapon: 'Lightning',
    damageType: 'lightning'
  },
  'Copper': {
    nameChinese: '紫銅龍',
    description: '紫銅龍裔擁有酸液吐息武器和酸液傷害抗性。',
    breathWeapon: 'Acid',
    damageType: 'acid'
  },
  'Gold': {
    nameChinese: '金龍',
    description: '金龍裔擁有火焰吐息武器和火焰傷害抗性。',
    breathWeapon: 'Fire',
    damageType: 'fire'
  },
  'Green': {
    nameChinese: '綠龍',
    description: '綠龍裔擁有毒素吐息武器和毒素傷害抗性。',
    breathWeapon: 'Poison',
    damageType: 'poison'
  },
  'Red': {
    nameChinese: '紅龍',
    description: '紅龍裔擁有火焰吐息武器和火焰傷害抗性。',
    breathWeapon: 'Fire',
    damageType: 'fire'
  },
  'Silver': {
    nameChinese: '銀龍',
    description: '銀龍裔擁有寒冷吐息武器和寒冷傷害抗性。',
    breathWeapon: 'Cold',
    damageType: 'cold'
  },
  'White': {
    nameChinese: '白龍',
    description: '白龍裔擁有寒冷吐息武器和寒冷傷害抗性。',
    breathWeapon: 'Cold',
    damageType: 'cold'
  },

  // Tiefling subraces
  'Asmodeus': {
    nameChinese: '阿斯莫蒂斯',
    description: '阿斯莫蒂斯血統的魔裔獲得智力加值和額外的火焰法術。',
    abilityBonus: { intelligence: 1 }
  },
  'Baalzebul': {
    nameChinese: '巴力西卜',
    description: '巴力西卜血統的魔裔獲得智力加值和腐化相關的法術。',
    abilityBonus: { intelligence: 1 }
  },
  'Dispater': {
    nameChinese: '狄斯帕特',
    description: '狄斯帕特血統的魔裔獲得敏捷加值和欺詐相關的法術。',
    abilityBonus: { dexterity: 1 }
  },
  'Fierna': {
    nameChinese: '菲爾娜',
    description: '菲爾娜血統的魔裔獲得智慧加值和魅惑相關的法術。',
    abilityBonus: { wisdom: 1 }
  },
  'Glasya': {
    nameChinese: '格拉西雅',
    description: '格拉西雅血統的魔裔獲得敏捷加值和幻術相關的法術。',
    abilityBonus: { dexterity: 1 }
  },
  'Levistus': {
    nameChinese: '列維斯塔斯',
    description: '列維斯塔斯血統的魔裔獲得體質加值和寒冰相關的法術。',
    abilityBonus: { constitution: 1 }
  },
  'Mammon': {
    nameChinese: '瑪門',
    description: '瑪門血統的魔裔獲得智力加值和財富相關的法術。',
    abilityBonus: { intelligence: 1 }
  },
  'Mephistopheles': {
    nameChinese: '墨菲斯托',
    description: '墨菲斯托血統的魔裔獲得智力加值和寒冰與火焰法術。',
    abilityBonus: { intelligence: 1 }
  },
  'Zariel': {
    nameChinese: '札瑞爾',
    description: '札瑞爾血統的魔裔獲得力量加值和戰鬥相關的法術。',
    abilityBonus: { strength: 1 }
  }
}
