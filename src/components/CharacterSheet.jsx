import { CLASSES } from '../data/classes'
import { races } from '../data/raceData'

const CharacterSheet = ({ character }) => {
  const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const getAbilityModifierNum = (score) => {
    return Math.floor((score - 10) / 2)
  }

  const getProficiencyBonus = () => {
    return 2 // Level 1 default, can be expanded: Math.ceil(level / 4) + 1
  }

  const classData = character.class ? CLASSES[character.class] : null
  const raceData = character.race ? races[character.race] : null

  // Skill descriptions from D&D 5e rulebook
  const SKILL_DESCRIPTIONS = {
    acrobatics: "Balance, tumbling, aerial maneuvers, and staying upright on difficult terrain.",
    animalHandling: "Calm, train, or intuit the intentions of animals. Read body language and behavior.",
    arcana: "Recall knowledge about magic, spells, magical items, eldritch symbols, and magical traditions.",
    athletics: "Climbing, jumping, swimming, and other physically demanding activities.",
    deception: "Hide the truth through misdirection, misleading statements, or outright lies.",
    history: "Recall historical events, legendary figures, ancient kingdoms, past conflicts, and lost civilizations.",
    insight: "Determine the true intentions of a creature, read body language, and detect lies.",
    intimidation: "Influence others through threats, hostile actions, and physical violence.",
    investigation: "Look for clues, make deductions, and solve puzzles or mysteries.",
    medicine: "Stabilize dying companions, diagnose illnesses, and treat wounds.",
    nature: "Recall knowledge about terrain, plants, animals, weather, and natural cycles.",
    perception: "Spot, hear, or detect the presence of something using your senses.",
    performance: "Delight an audience with music, dance, acting, storytelling, or other entertainment.",
    persuasion: "Influence others through tact, social graces, or good nature.",
    religion: "Recall knowledge about deities, rites, prayers, religious hierarchies, and holy symbols.",
    sleightOfHand: "Pick pockets, conceal objects, perform magic tricks, and other feats of manual dexterity.",
    stealth: "Move silently, hide from others, and avoid detection.",
    survival: "Track creatures, hunt game, navigate wilderness, predict weather, and avoid natural hazards."
  }

  // Equipment descriptions
  const EQUIPMENT_DESCRIPTIONS = {
    // Weapons
    dagger: "Simple melee weapon. Light, finesse, thrown (20/60 ft). Versatile for stabbing or throwing.",
    shortsword: "Martial melee weapon. Light, finesse. A short blade ideal for quick strikes.",
    longsword: "Martial melee weapon. Versatile (1d8/1d10). The classic knight's blade.",
    greatsword: "Martial melee weapon. Two-handed, heavy. A massive blade wielded with both hands.",
    battleaxe: "Martial melee weapon. Versatile (1d8/1d10). A sturdy axe for chopping foes.",
    handaxe: "Simple melee weapon. Light, thrown (20/60 ft). A small axe that can be thrown.",
    mace: "Simple melee weapon. A heavy club with a metal head.",
    quarterstaff: "Simple melee weapon. Versatile (1d6/1d8). A simple wooden staff.",
    spear: "Simple melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). A pointed weapon on a shaft.",
    lightCrossbow: "Simple ranged weapon. Ammunition (80/320 ft), loading, two-handed. A small crossbow.",
    shortbow: "Simple ranged weapon. Ammunition (80/320 ft), two-handed. A compact bow.",
    longbow: "Martial ranged weapon. Ammunition (150/600 ft), heavy, two-handed. A powerful war bow.",
    
    // Armor
    leather: "Light armor. AC 11 + Dex modifier. Flexible and quiet, made from boiled leather.",
    studdedLeather: "Light armor. AC 12 + Dex modifier. Reinforced with metal studs for extra protection.",
    chainShirt: "Medium armor. AC 13 + Dex modifier (max 2). Interlocking metal rings worn under clothing.",
    scaleMail: "Medium armor. AC 14 + Dex modifier (max 2). Overlapping metal scales on a leather backing. Disadvantage on Stealth.",
    breastplate: "Medium armor. AC 14 + Dex modifier (max 2). Metal chest piece worn over leather.",
    halfPlate: "Medium armor. AC 15 + Dex modifier (max 2). Partial plate armor protecting vital areas. Disadvantage on Stealth.",
    ringMail: "Heavy armor. AC 14. Leather with heavy rings sewn in. Disadvantage on Stealth.",
    chainMail: "Heavy armor. AC 16. Interlocking metal rings covering the body. Str 13 required. Disadvantage on Stealth.",
    splint: "Heavy armor. AC 17. Metal strips on a leather backing. Str 15 required. Disadvantage on Stealth.",
    plate: "Heavy armor. AC 18. Full suit of interlocking metal plates. Str 15 required. Disadvantage on Stealth.",
    shield: "Shield. +2 AC. Wooden or metal shield strapped to your arm.",
    
    // Adventuring gear
    backpack: "A leather pack for carrying supplies (1 cubic foot / 30 pounds).",
    bedroll: "A warm blanket and padding for sleeping on the ground.",
    rope: "50 feet of hempen rope. Useful for climbing, binding, or makeshift solutions.",
    torches: "10 wooden sticks with oil-soaked wrappings. Each burns for 1 hour, providing bright light in 20-foot radius.",
    rations: "10 days of dried food (meat, fruit, hardtack). Each day's ration weighs 2 pounds.",
    waterskin: "A leather container holding 4 pints of liquid.",
    tinderbox: "Flint, fire steel, and tinder for starting fires.",
    healersKit: "10 uses. Bandages, salves, and splints for stabilizing dying creatures.",
    componentsPouch: "A belt pouch with compartments for holding spell components.",
    arcane Focus: "A special item (orb, staff, wand, etc.) used to channel magical energy.",
    holySymbol: "A sacred representation of your deity used as a spellcasting focus.",
    spellbook: "A leather-bound tome with 100 blank pages for recording wizard spells.",
    thievesTools: "Lockpicks, small files, and other tools for disabling traps and picking locks.",
    musicalInstrument: "An instrument you're proficient with for performances.",
    
    // Other common items
    potion: "A magical liquid that produces an effect when consumed.",
    goldPieces: "The standard currency in most D&D worlds. 1 gp = 10 silver pieces = 100 copper pieces."
  }

  // Render ability scores section
  const renderAbilityScores = () => {
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
    
    return (
      <div className="ability-scores-grid">
        {abilities.map((ability) => {
          const score = character.abilities?.[ability] || 10
          const modifier = getAbilityModifier(score)
          
          return (
            <div key={ability} className="ability-score-box">
              <div className="ability-name">{ability.toUpperCase().substring(0, 3)}</div>
              <div className="ability-modifier">{modifier}</div>
              <div className="ability-score">{score}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render skills section
  const renderSkills = () => {
    const skillAbilityMap = {
      acrobatics: 'dexterity',
      animalHandling: 'wisdom',
      arcana: 'intelligence',
      athletics: 'strength',
      deception: 'charisma',
      history: 'intelligence',
      insight: 'wisdom',
      intimidation: 'charisma',
      investigation: 'intelligence',
      medicine: 'wisdom',
      nature: 'intelligence',
      perception: 'wisdom',
      performance: 'charisma',
      persuasion: 'charisma',
      religion: 'intelligence',
      sleightOfHand: 'dexterity',
      stealth: 'dexterity',
      survival: 'wisdom'
    }

    return (
      <div className="skills-list">
        {Object.keys(skillAbilityMap).map((skill) => {
          const ability = skillAbilityMap[skill]
          const abilityScore = character.abilities?.[ability] || 10
          const abilityMod = getAbilityModifierNum(abilityScore)
          const isProficient = character.skills?.includes(skill)
          const profBonus = isProficient ? getProficiencyBonus() : 0
          const totalBonus = abilityMod + profBonus
          const bonusStr = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`

          const skillName = skill.replace(/([A-Z])/g, ' $1').trim()
          const capitalizedSkillName = skillName.charAt(0).toUpperCase() + skillName.slice(1)
          const description = SKILL_DESCRIPTIONS[skill] || ""

          return (
            <div 
              key={skill} 
              className={`skill-item ${isProficient ? 'proficient' : ''}`}
              title={description}
            >
              <div className="skill-checkbox">
                {isProficient && <span className="proficiency-dot">●</span>}
              </div>
              <div className="skill-bonus">{bonusStr}</div>
              <div className="skill-name">
                {capitalizedSkillName}
                <span className="skill-ability"> ({ability.substring(0, 3)})</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render saving throws section
  const renderSavingThrows = () => {
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
    
    return (
      <div className="saving-throws-list">
        {abilities.map((ability) => {
          const score = character.abilities?.[ability] || 10
          const abilityMod = getAbilityModifierNum(score)
          const isProficient = classData?.savingThrows?.includes(ability)
          const profBonus = isProficient ? getProficiencyBonus() : 0
          const totalBonus = abilityMod + profBonus
          const bonusStr = totalBonus >= 0 ? `+${totalBonus}` : `${totalBonus}`

          return (
            <div key={ability} className={`saving-throw-item ${isProficient ? 'proficient' : ''}`}>
              <div className="saving-throw-checkbox">
                {isProficient && <span className="proficiency-dot">●</span>}
              </div>
              <div className="saving-throw-bonus">{bonusStr}</div>
              <div className="saving-throw-name">{ability.charAt(0).toUpperCase() + ability.slice(1)}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Render features and traits
  const renderFeaturesAndTraits = () => {
    return (
      <div className="features-traits-section">
        {/* Race traits */}
        {raceData?.traits && (
          <div className="trait-category">
            <h4>Racial Traits</h4>
            {Array.isArray(raceData.traits) 
              ? raceData.traits.map((trait, index) => (
                  <div key={index} className="trait-item">
                    <strong>{trait.name}:</strong> {trait.description}
                  </div>
                ))
              : <div className="trait-item">{raceData.traits}</div>
            }
          </div>
        )}

        {/* Class features */}
        {classData?.features && (
          <div className="trait-category">
            <h4>Class Features (Level 1)</h4>
            {classData.features.map((feature, index) => (
              <div key={index} className="trait-item">
                <strong>{feature.name}:</strong> {feature.description}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Render equipment section
  const renderEquipment = () => {
    if (!character.equipment || character.equipment.length === 0) {
      return <p className="no-equipment">No equipment selected</p>
    }

    return (
      <div className="equipment-list">
        {character.equipment.map((item, index) => {
          // Convert display name to key (e.g., "Leather Armor" -> "leather")
          const itemKey = item.toLowerCase().replace(/[^a-z]/g, '')
          const description = EQUIPMENT_DESCRIPTIONS[itemKey] || "Standard adventuring equipment."
          
          return (
            <div key={index} className="equipment-item" title={description}>
              <span className="equipment-bullet">•</span>
              <span className="equipment-name">{item}</span>
            </div>
          )
        })}
      </div>
    )
  }

  // Calculate AC
  const calculateAC = () => {
    let baseAC = 10
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    
    // Check for armor
    const hasLeather = character.equipment?.some(item => item.toLowerCase().includes('leather') && !item.toLowerCase().includes('studded'))
    const hasStuddedLeather = character.equipment?.some(item => item.toLowerCase().includes('studded leather'))
    const hasChainShirt = character.equipment?.some(item => item.toLowerCase().includes('chain shirt'))
    const hasScaleMail = character.equipment?.some(item => item.toLowerCase().includes('scale mail'))
    const hasBreastplate = character.equipment?.some(item => item.toLowerCase().includes('breastplate'))
    const hasHalfPlate = character.equipment?.some(item => item.toLowerCase().includes('half plate'))
    const hasRingMail = character.equipment?.some(item => item.toLowerCase().includes('ring mail'))
    const hasChainMail = character.equipment?.some(item => item.toLowerCase().includes('chain mail'))
    const hasSplint = character.equipment?.some(item => item.toLowerCase().includes('splint'))
    const hasPlate = character.equipment?.some(item => item.toLowerCase().includes('plate') && !item.toLowerCase().includes('half'))
    const hasShield = character.equipment?.some(item => item.toLowerCase().includes('shield'))
    
    if (hasPlate) baseAC = 18
    else if (hasSplint) baseAC = 17
    else if (hasChainMail) baseAC = 16
    else if (hasHalfPlate) baseAC = 15 + Math.min(dexMod, 2)
    else if (hasBreastplate) baseAC = 14 + Math.min(dexMod, 2)
    else if (hasScaleMail) baseAC = 14 + Math.min(dexMod, 2)
    else if (hasRingMail) baseAC = 14
    else if (hasChainShirt) baseAC = 13 + Math.min(dexMod, 2)
    else if (hasStuddedLeather) baseAC = 12 + dexMod
    else if (hasLeather) baseAC = 11 + dexMod
    else baseAC = 10 + dexMod // No armor
    
    if (hasShield) baseAC += 2
    
    return baseAC
  }

  // Calculate HP
  const calculateHP = () => {
    if (!classData) return 0
    const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
    return classData.hitDie + conMod
  }

  return (
    <div className="character-sheet">
      {/* Header Section */}
      <div className="sheet-header">
        <div className="character-name-section">
          <h1 className="character-name">{character.name || 'Unnamed Character'}</h1>
          <div className="character-details">
            <span className="detail-item">{character.race || 'Unknown Race'}</span>
            <span className="detail-separator">•</span>
            <span className="detail-item">{character.class || 'Unknown Class'}</span>
            <span className="detail-separator">•</span>
            <span className="detail-item">Level 1</span>
          </div>
        </div>
        
        {character.background && (
          <div className="background-section">
            <span className="background-label">Background:</span> {character.background}
          </div>
        )}
      </div>

      {/* Main Stats Row */}
      <div className="main-stats-row">
        <div className="stat-box">
          <div className="stat-value">{calculateAC()}</div>
          <div className="stat-label">Armor Class</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{calculateHP()}</div>
          <div className="stat-label">Hit Points</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">30 ft</div>
          <div className="stat-label">Speed</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">+{getProficiencyBonus()}</div>
          <div className="stat-label">Proficiency</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="sheet-columns">
        {/* Left Column */}
        <div className="left-column">
          {/* Ability Scores */}
          <div className="sheet-section">
            <h3 className="section-title">Ability Scores</h3>
            {renderAbilityScores()}
          </div>

          {/* Saving Throws */}
          <div className="sheet-section">
            <h3 className="section-title">Saving Throws</h3>
            {renderSavingThrows()}
          </div>

          {/* Skills */}
          <div className="sheet-section">
            <h3 className="section-title">Skills</h3>
            {renderSkills()}
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Equipment */}
          <div className="sheet-section">
            <h3 className="section-title">Equipment</h3>
            {renderEquipment()}
          </div>

          {/* Features and Traits */}
          <div className="sheet-section">
            <h3 className="section-title">Features & Traits</h3>
            {renderFeaturesAndTraits()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterSheet
