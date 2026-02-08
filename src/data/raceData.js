// D&D 5E Race and Subrace Data
export const races = {
  human: {
    name: 'Human',
    subraces: ['Standard Human', 'Variant Human'],
    abilityBonus: { all: 1 }, // Standard gets +1 to all
    heightRange: { min: "4'8\"", max: "6'4\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 270, avg: 165 }
  },
  elf: {
    name: 'Elf',
    subraces: ['High Elf', 'Wood Elf', 'Dark Elf (Drow)', 'Eladrin', 'Sea Elf', 'Shadar-kai'],
    abilityBonus: { dexterity: 2 },
    heightRange: { min: "4'6\"", max: "6'0\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 90, max: 170, avg: 130 }
  },
  dwarf: {
    name: 'Dwarf',
    subraces: ['Hill Dwarf', 'Mountain Dwarf', 'Duergar'],
    abilityBonus: { constitution: 2 },
    heightRange: { min: "3'8\"", max: "4'8\"", avgFeet: 4, avgInches: 2 },
    weightRange: { min: 115, max: 250, avg: 150 }
  },
  halfling: {
    name: 'Halfling',
    subraces: ['Lightfoot Halfling', 'Stout Halfling', 'Ghostwise Halfling'],
    abilityBonus: { dexterity: 2 },
    heightRange: { min: "2'7\"", max: "3'3\"", avgFeet: 3, avgInches: 0 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  dragonborn: {
    name: 'Dragonborn',
    subraces: ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'],
    abilityBonus: { strength: 2, charisma: 1 },
    heightRange: { min: "5'6\"", max: "6'8\"", avgFeet: 6, avgInches: 2 },
    weightRange: { min: 175, max: 350, avg: 240 }
  },
  gnome: {
    name: 'Gnome',
    subraces: ['Forest Gnome', 'Rock Gnome', 'Deep Gnome (Svirfneblin)'],
    abilityBonus: { intelligence: 2 },
    heightRange: { min: "2'11\"", max: "3'7\"", avgFeet: 3, avgInches: 4 },
    weightRange: { min: 35, max: 45, avg: 40 }
  },
  'half-elf': {
    name: 'Half-Elf',
    subraces: ['Standard', 'Aquatic', 'Drow', 'High Elf', 'Wood Elf'],
    abilityBonus: { charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'0\"", avgFeet: 5, avgInches: 6 },
    weightRange: { min: 110, max: 200, avg: 155 }
  },
  'half-orc': {
    name: 'Half-Orc',
    subraces: ['Standard'],
    abilityBonus: { strength: 2, constitution: 1 },
    heightRange: { min: "4'10\"", max: "6'6\"", avgFeet: 5, avgInches: 10 },
    weightRange: { min: 140, max: 280, avg: 210 }
  },
  tiefling: {
    name: 'Tiefling',
    subraces: ['Asmodeus', 'Baalzebul', 'Dispater', 'Fierna', 'Glasya', 'Levistus', 'Mammon', 'Mephistopheles', 'Zariel'],
    abilityBonus: { charisma: 2 },
    heightRange: { min: "4'9\"", max: "6'1\"", avgFeet: 5, avgInches: 7 },
    weightRange: { min: 110, max: 240, avg: 155 }
  }
}

export const subRaceDetails = {
  // Elf subraces
  'High Elf': { abilityBonus: { intelligence: 1 } },
  'Wood Elf': { abilityBonus: { wisdom: 1 } },
  'Dark Elf (Drow)': { abilityBonus: { charisma: 1 } },
  'Eladrin': { abilityBonus: { charisma: 1 } },
  'Sea Elf': { abilityBonus: { constitution: 1 } },
  'Shadar-kai': { abilityBonus: { constitution: 1 } },
  
  // Dwarf subraces
  'Hill Dwarf': { abilityBonus: { wisdom: 1 } },
  'Mountain Dwarf': { abilityBonus: { strength: 2 } },
  'Duergar': { abilityBonus: { strength: 1 } },
  
  // Halfling subraces
  'Lightfoot Halfling': { abilityBonus: { charisma: 1 } },
  'Stout Halfling': { abilityBonus: { constitution: 1 } },
  'Ghostwise Halfling': { abilityBonus: { wisdom: 1 } },
  
  // Gnome subraces
  'Forest Gnome': { abilityBonus: { dexterity: 1 } },
  'Rock Gnome': { abilityBonus: { constitution: 1 } },
  'Deep Gnome (Svirfneblin)': { abilityBonus: { dexterity: 1 } },
  
  // Half-Elf subraces
  'Standard': { abilityBonus: {} },
  'Aquatic': { abilityBonus: {} },
  'Drow': { abilityBonus: {} },
  'High Elf': { abilityBonus: {} },
  'Wood Elf': { abilityBonus: {} },
  
  // Human subraces
  'Standard Human': { abilityBonus: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 } },
  'Variant Human': { abilityBonus: {} }, // Player chooses +1 to two different abilities
  
  // Dragonborn (ancestry types)
  'Black': { damageType: 'Acid' },
  'Blue': { damageType: 'Lightning' },
  'Brass': { damageType: 'Fire' },
  'Bronze': { damageType: 'Lightning' },
  'Copper': { damageType: 'Acid' },
  'Gold': { damageType: 'Fire' },
  'Green': { damageType: 'Poison' },
  'Red': { damageType: 'Fire' },
  'Silver': { damageType: 'Cold' },
  'White': { damageType: 'Cold' },
  
  // Tiefling subraces
  'Asmodeus': { abilityBonus: { intelligence: 1 } },
  'Baalzebul': { abilityBonus: { intelligence: 1 } },
  'Dispater': { abilityBonus: { dexterity: 1 } },
  'Fierna': { abilityBonus: { wisdom: 1 } },
  'Glasya': { abilityBonus: { dexterity: 1 } },
  'Levistus': { abilityBonus: { constitution: 1 } },
  'Mammon': { abilityBonus: { intelligence: 1 } },
  'Mephistopheles': { abilityBonus: { intelligence: 1 } },
  'Zariel': { abilityBonus: { strength: 1 } }
}
