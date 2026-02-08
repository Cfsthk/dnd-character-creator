// D&D 5E Class Data with ability score recommendations
export const classes = {
  barbarian: {
    name: 'Barbarian',
    primaryAbility: 'strength',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 15,
      dexterity: 14,
      constitution: 15,
      intelligence: 8,
      wisdom: 12,
      charisma: 8
    },
    description: 'A fierce warrior of primitive background who can enter a battle rage',
    hitDie: 'd12'
  },
  bard: {
    name: 'Bard',
    primaryAbility: 'charisma',
    secondaryAbility: 'dexterity',
    recommendedScores: {
      strength: 8,
      dexterity: 14,
      constitution: 12,
      intelligence: 10,
      wisdom: 10,
      charisma: 15
    },
    description: 'An inspiring magician whose power echoes the music of creation',
    hitDie: 'd8'
  },
  cleric: {
    name: 'Cleric',
    primaryAbility: 'wisdom',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 10,
      dexterity: 10,
      constitution: 14,
      intelligence: 8,
      wisdom: 15,
      charisma: 12
    },
    description: 'A priestly champion who wields divine magic in service of a higher power',
    hitDie: 'd8'
  },
  druid: {
    name: 'Druid',
    primaryAbility: 'wisdom',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 8,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 15,
      charisma: 10
    },
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms',
    hitDie: 'd8'
  },
  fighter: {
    name: 'Fighter',
    primaryAbility: 'strength',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 15,
      dexterity: 14,
      constitution: 15,
      intelligence: 8,
      wisdom: 10,
      charisma: 8
    },
    description: 'A master of martial combat, skilled with a variety of weapons and armor',
    hitDie: 'd10'
  },
  monk: {
    name: 'Monk',
    primaryAbility: 'dexterity',
    secondaryAbility: 'wisdom',
    recommendedScores: {
      strength: 10,
      dexterity: 15,
      constitution: 14,
      intelligence: 8,
      wisdom: 15,
      charisma: 8
    },
    description: 'A master of martial arts, harnessing the power of the body in pursuit of perfection',
    hitDie: 'd8'
  },
  paladin: {
    name: 'Paladin',
    primaryAbility: 'strength',
    secondaryAbility: 'charisma',
    recommendedScores: {
      strength: 15,
      dexterity: 10,
      constitution: 14,
      intelligence: 8,
      wisdom: 10,
      charisma: 14
    },
    description: 'A holy warrior bound to a sacred oath',
    hitDie: 'd10'
  },
  ranger: {
    name: 'Ranger',
    primaryAbility: 'dexterity',
    secondaryAbility: 'wisdom',
    recommendedScores: {
      strength: 10,
      dexterity: 15,
      constitution: 14,
      intelligence: 8,
      wisdom: 14,
      charisma: 8
    },
    description: 'A warrior who uses martial prowess and nature magic to combat threats',
    hitDie: 'd10'
  },
  rogue: {
    name: 'Rogue',
    primaryAbility: 'dexterity',
    secondaryAbility: 'intelligence',
    recommendedScores: {
      strength: 8,
      dexterity: 15,
      constitution: 14,
      intelligence: 12,
      wisdom: 10,
      charisma: 10
    },
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
    hitDie: 'd8'
  },
  sorcerer: {
    name: 'Sorcerer',
    primaryAbility: 'charisma',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 8,
      dexterity: 12,
      constitution: 15,
      intelligence: 10,
      wisdom: 10,
      charisma: 15
    },
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline',
    hitDie: 'd6'
  },
  warlock: {
    name: 'Warlock',
    primaryAbility: 'charisma',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 8,
      dexterity: 14,
      constitution: 14,
      intelligence: 10,
      wisdom: 10,
      charisma: 15
    },
    description: 'A wielder of magic derived from a bargain with an extraplanar entity',
    hitDie: 'd8'
  },
  wizard: {
    name: 'Wizard',
    primaryAbility: 'intelligence',
    secondaryAbility: 'constitution',
    recommendedScores: {
      strength: 8,
      dexterity: 14,
      constitution: 14,
      intelligence: 15,
      wisdom: 10,
      charisma: 8
    },
    description: 'A scholarly magic-user capable of manipulating the structures of reality',
    hitDie: 'd6'
  }
}

// Helper function to get ability score suggestions based on class and race
export const getAbilityScoreSuggestions = (classKey, raceKey) => {
  const classData = classes[classKey]
  if (!classData) return null
  
  return {
    ...classData.recommendedScores,
    primaryAbility: classData.primaryAbility,
    secondaryAbility: classData.secondaryAbility
  }
}
