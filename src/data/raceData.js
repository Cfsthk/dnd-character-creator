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
    description: '半身人是小巧、敏捷的種族，以其樂觀的天性和非凡的運氣而著稱。他們熱愛舒適和孶庭生活。',
    subraces: ['Lightfoot Halfling', 'Stout Halfling', 'Ghostwise Halfling'],
    abilityBonus: { dexterity: 2 },
    heightRange: { min: "2'7\"", max: "3'3\"", avgFeet: 3, avgInches: 0 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  dragonborn: {
    name: 'Dragonborn',
    nameChinese: '龍裔',
    description: '龍裔是驕傲、高貴的種族，擁有龍族血統，能大使用強大的吐息武器。他們重視榮譽和氏族。',
    subraces: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'],
    abilityBonus: { strength: 2, charisma: 1 },
    heightRange: { min: "5'6\"", max: "6'8\"", avgFeet: 6, avgInches: 2 },
    weightRange: { min: 175, max: 350, avg: 240 }
  },
  gnome: {
    name: 'Gnome',
    nameChinese: '侏儒',
    description: '侏儒是小巧、充滿好奇心的種族，熱愛發明、探索和魔法。他們以機智和广默感而聞名。',
    subraces: ['Forest Gnome', 'Rock Gnome', 'Deep Gnome (Svirfneblin)'],
    abilityBonus: { intelligence: 2 },
    heightRange: { min: "2'11\"", max: "3'7\"", avgFeet: 3, avgInches: 4 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  'half-elf': {
    name: 'Half-Elf',
    nameChinese: '半精靈',
    description: '半精靈結合了人類的適應力和精靈的優雅，在兩個世界之間遊走，擁有獨特的魅力和多才多才。',
    subraces: ['Standard Half-Elf', 'Half-Elf Variants'],
    abilityBonus: { charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'0\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 180, avg: 140 }
  },
  'half-orc': {
    name: 'Half-Orc',
    nameChinese: '及儽克',
    description: '半儽克結合了人類和儽克的原始唛勇，印许着萁人、儽克的重视和遫咬的強壏。',
    subraces: ['Standard Half-Orc'],
    abilityBonus: { strength: 2, constitution: 1 },
    heightRange: { min: "4'10\"", max: "6'4\"", avgFeet: 5, avgInches: 10 },
    weightRange: { min: 130, max: 250, avg: 180 }
  },
  tiefling: {
    name: 'Tiefling',
    nameChinese: '地瓍覫',
    description: '地瓍覫擁有地瓍衔統，天生具有烻焰的皮貀和襊隂多生的家鲑。',
    subraces: ['Standard Tiefling', 'Variant Tiefling'],
    abilityBonus: { intelligence: 1, charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'1\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 240, avg: 150 }
  }
}
