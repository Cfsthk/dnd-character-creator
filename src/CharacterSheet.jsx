import { CLASSES } from '../data/classes'
import { races } from '../data/raceData'

const CharacterSheet = ({ character }) => {
  // Safety check for character prop
  if (!character) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: '#8b4513',
        fontSize: '18px'
      }}>
        No character data available. Please create a character first.
      </div>
    )
  }

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
    shortsword: "Martial melee weapon. Light, finesse. Popular among rogues and dexterous fighters.",
    longsword: "Martial melee weapon. Versatile (1d8/1d10). Classic knight's weapon, balanced and reliable.",
    greataxe: "Martial melee weapon. Two-handed, heavy. Devastating damage potential.",
    rapier: "Martial melee weapon. Finesse. Elegant dueling weapon favored by swashbucklers.",
    shortbow: "Simple ranged weapon. Two-handed, ammunition (80/320 ft). Quick and light for hunters.",
    longbow: "Martial ranged weapon. Two-handed, heavy, ammunition (150/600 ft). Powerful archer's weapon.",
    lightCrossbow: "Simple ranged weapon. Two-handed, ammunition (80/320 ft), loading. Mechanical precision.",
    handaxe: "Simple melee weapon. Light, thrown (20/60 ft). Dual-wielding and throwing option.",
    mace: "Simple melee weapon. Bludgeoning damage. Effective against armored foes.",
    quarterstaff: "Simple melee weapon. Versatile (1d6/1d8). Monk and druid favorite.",
    spear: "Simple melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). Ancient and reliable.",
    warhammer: "Martial melee weapon. Versatile (1d8/1d10). Dwarven weapon of choice.",
    battleaxe: "Martial melee weapon. Versatile (1d8/1d10). Fierce warrior's tool.",
    greatsword: "Martial melee weapon. Two-handed, heavy. Massive blade for devastating strikes.",
    maul: "Martial melee weapon. Two-handed, heavy. Crushes armor and bone alike.",
    
    // Armor
    leather: "Light armor. AC 11 + Dex modifier. Flexible and quiet.",
    studded: "Light armor. AC 12 + Dex modifier. Reinforced with metal studs.",
    chain: "Medium armor. AC 13 + Dex (max 2). Standard soldier's protection.",
    scale: "Medium armor. AC 14 + Dex (max 2), disadvantage on Stealth. Overlapping metal plates.",
    breastplate: "Medium armor. AC 14 + Dex (max 2). Protects vital areas without restricting movement.",
    halfPlate: "Medium armor. AC 15 + Dex (max 2), disadvantage on Stealth. Substantial protection.",
    ringMail: "Heavy armor. AC 14, disadvantage on Stealth. Rings sewn onto leather backing.",
    chainMail: "Heavy armor. AC 16, Str 13 req., disadvantage on Stealth. Interlocking metal rings.",
    splint: "Heavy armor. AC 17, Str 15 req., disadvantage on Stealth. Metal strips on leather.",
    plate: "Heavy armor. AC 18, Str 15 req., disadvantage on Stealth. Full suit of interlocking metal plates.",
    shield: "Shield. +2 AC. Must be wielded in one hand.",
    
    // Adventuring Gear
    backpack: "Standard adventurer's pack. Holds up to 30 lbs of gear.",
    bedroll: "Simple sleeping gear for resting during travels.",
    rope: "50 feet of hempen rope. Essential for climbing and utility.",
    torch: "Provides bright light in 20-ft radius for 1 hour.",
    rations: "One day's worth of dried food for sustenance.",
    waterskin: "Holds 4 pints of liquid for hydration.",
    healingPotion: "Restores 2d4+2 hit points when consumed. Life-saving elixir.",
    tinderbox: "Tools for starting fires. Contains flint, steel, and tinder.",
    crowbar: "Grants advantage on Strength checks for prying things open.",
    hammer: "Useful for driving pitons and general construction.",
    pitons: "Metal spikes for securing rope when climbing.",
    lantern: "Provides bright light in 30-ft radius for 6 hours per pint of oil.",
    oil: "Flask of oil. Can be used for lanterns or as a weapon.",
    chalk: "Useful for marking paths or leaving messages.",
    grappling: "Grappling hook for climbing. Attaches to rope.",
    spellbook: "Wizard's book containing known spells. Essential for spell preparation.",
    component: "Material components required for certain spells.",
    focus: "Arcane or divine focus for channeling spell energy.",
    holy: "Holy symbol of your deity. Required for clerical spells.",
    thieves: "Thieves' tools for picking locks and disarming traps. Requires proficiency.",
    disguise: "Disguise kit for altering appearance. Requires proficiency.",
    herbalism: "Herbalism kit for identifying and using plants. Requires proficiency.",
    instrument: "Musical instrument for performance. Requires proficiency."
  }

  const abilityScores = [
    { name: 'STR', fullName: 'Strength', score: character.abilityScores?.strength || 10 },
    { name: 'DEX', fullName: 'Dexterity', score: character.abilityScores?.dexterity || 10 },
    { name: 'CON', fullName: 'Constitution', score: character.abilityScores?.constitution || 10 },
    { name: 'INT', fullName: 'Intelligence', score: character.abilityScores?.intelligence || 10 },
    { name: 'WIS', fullName: 'Wisdom', score: character.abilityScores?.wisdom || 10 },
    { name: 'CHA', fullName: 'Charisma', score: character.abilityScores?.charisma || 10 }
  ]

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

  const formatSkillName = (skill) => {
    return skill
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  const getSkillModifier = (skill) => {
    const ability = skillAbilityMap[skill]
    const abilityMod = getAbilityModifierNum(character.abilityScores[ability])
    const profBonus = character.skills[skill] ? getProficiencyBonus() : 0
    const total = abilityMod + profBonus
    return total >= 0 ? `+${total}` : `${total}`
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Georgia, serif',
      backgroundColor: '#f9f6f0',
      minHeight: '100vh'
    },
    header: {
      background: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '8px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '2.5em',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      margin: '5px 0',
      fontSize: '1.2em',
      opacity: 0.9
    },
    section: {
      backgroundColor: 'white',
      padding: '25px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '2px solid #8b4513',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      color: '#8b4513',
      borderBottom: '3px solid #8b4513',
      paddingBottom: '10px',
      marginBottom: '20px',
      fontSize: '1.8em',
      fontWeight: 'bold'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    abilityCard: {
      textAlign: 'center',
      padding: '15px',
      backgroundColor: '#f5e6d3',
      borderRadius: '8px',
      border: '2px solid #8b4513',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    abilityName: {
      fontSize: '0.9em',
      color: '#666',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    abilityScore: {
      fontSize: '2.5em',
      fontWeight: 'bold',
      color: '#8b4513',
      margin: '10px 0'
    },
    abilityModifier: {
      fontSize: '1.5em',
      color: '#d2691e',
      fontWeight: 'bold'
    },
    skillsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '12px'
    },
    skillItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 15px',
      backgroundColor: '#f5e6d3',
      borderRadius: '6px',
      border: '1px solid #d2b48c',
      transition: 'all 0.2s'
    },
    skillItemProficient: {
      backgroundColor: '#e8d7c3',
      borderColor: '#8b4513',
      borderWidth: '2px',
      fontWeight: 'bold'
    },
    skillName: {
      color: '#8b4513',
      fontSize: '1em',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    skillModifier: {
      color: '#d2691e',
      fontSize: '1.2em',
      fontWeight: 'bold',
      minWidth: '40px',
      textAlign: 'right'
    },
    proficiencyDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#8b4513',
      display: 'inline-block'
    },
    itemsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '15px'
    },
    item: {
      padding: '15px',
      backgroundColor: '#f5e6d3',
      borderRadius: '6px',
      border: '2px solid #d2b48c',
      transition: 'all 0.2s'
    },
    itemName: {
      color: '#8b4513',
      fontWeight: 'bold',
      fontSize: '1.1em',
      marginBottom: '8px'
    },
    itemDescription: {
      color: '#666',
      fontSize: '0.9em',
      lineHeight: '1.4'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '20px'
    },
    statBox: {
      padding: '15px',
      backgroundColor: '#f5e6d3',
      borderRadius: '6px',
      border: '2px solid #8b4513',
      textAlign: 'center'
    },
    statLabel: {
      fontSize: '0.9em',
      color: '#666',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    statValue: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#8b4513'
    },
    featureItem: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f5e6d3',
      borderRadius: '6px',
      border: '1px solid #d2b48c'
    },
    featureName: {
      color: '#8b4513',
      fontWeight: 'bold',
      fontSize: '1.2em',
      marginBottom: '8px'
    },
    featureDescription: {
      color: '#666',
      lineHeight: '1.6'
    },
    tooltip: {
      position: 'relative',
      cursor: 'help'
    }
  }

  return (
    <div style={styles.container}>
      {/* Character Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{character.name}</h1>
        <div style={styles.subtitle}>
          Level {character.level} {character.race} {character.class}
        </div>
        <div style={styles.subtitle}>
          {character.background} • {character.alignment}
        </div>
      </div>

      {/* Combat Stats */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Combat Statistics</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Armor Class</div>
            <div style={styles.statValue}>{character.armorClass}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Initiative</div>
            <div style={styles.statValue}>{getAbilityModifier(character.abilityScores.dexterity)}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Speed</div>
            <div style={styles.statValue}>{character.speed} ft</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Hit Points</div>
            <div style={styles.statValue}>{character.hitPoints}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Hit Die</div>
            <div style={styles.statValue}>{character.hitDie}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Proficiency Bonus</div>
            <div style={styles.statValue}>+{getProficiencyBonus()}</div>
          </div>
        </div>
      </div>

      {/* Ability Scores */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ability Scores</h2>
        <div style={styles.grid}>
          {abilityScores.map(ability => (
            <div 
              key={ability.name} 
              style={styles.abilityCard}
              title={ability.fullName}
            >
              <div style={styles.abilityName}>{ability.name}</div>
              <div style={styles.abilityScore}>{ability.score}</div>
              <div style={styles.abilityModifier}>{getAbilityModifier(ability.score)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Saving Throws */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Saving Throws</h2>
        <div style={styles.skillsList}>
          {abilityScores.map(ability => {
            const abilityKey = ability.fullName.toLowerCase()
            const isProficient = character.savingThrows && character.savingThrows[abilityKey]
            const modifier = getAbilityModifierNum(ability.score)
            const profBonus = isProficient ? getProficiencyBonus() : 0
            const total = modifier + profBonus
            const displayMod = total >= 0 ? `+${total}` : `${total}`
            
            return (
              <div 
                key={ability.name}
                style={{
                  ...styles.skillItem,
                  ...(isProficient ? styles.skillItemProficient : {})
                }}
              >
                <span style={styles.skillName}>
                  {isProficient && <span style={styles.proficiencyDot} />}
                  {ability.fullName}
                </span>
                <span style={styles.skillModifier}>{displayMod}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.skillsList}>
          {skillAbilityMap && typeof skillAbilityMap === 'object' && Object.keys(skillAbilityMap).map(skill => {
            const isProficient = character.skills?.[skill]
            const description = SKILL_DESCRIPTIONS[skill]
            
            return (
              <div 
                key={skill}
                style={{
                  ...styles.skillItem,
                  ...(isProficient ? styles.skillItemProficient : {})
                }}
                title={description}
              >
                <span style={styles.skillName}>
                  {isProficient && <span style={styles.proficiencyDot} />}
                  {formatSkillName(skill)}
                </span>
                <span style={styles.skillModifier}>{getSkillModifier(skill)}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Race Traits */}
      {raceData && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Racial Traits</h2>
          <div style={styles.featureItem}>
            <div style={styles.featureName}>{raceData.name}</div>
            <div style={styles.featureDescription}>{raceData.description}</div>
          </div>
          {raceData && typeof raceData === 'object' && Object.entries(raceData).map(([key, value]) => {
            // Skip name and description as we've already shown them
            if (key === 'name' || key === 'description' || key === 'abilityScoreIncrease') return null
            
            // Format the key name
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim()
            
            // Handle different value types
            let displayValue = value
            if (Array.isArray(value)) {
              displayValue = value.join(', ')
            } else if (typeof value === 'object') {
              displayValue = JSON.stringify(value)
            }
            
            return (
              <div key={key} style={styles.featureItem}>
                <div style={styles.featureName}>{formattedKey}</div>
                <div style={styles.featureDescription}>{displayValue}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Class Features */}
      {classData && classData.features && Array.isArray(classData.features) && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Class Features</h2>
          {classData.features.map((feature, index) => (
            <div key={index} style={styles.featureItem}>
              <div style={styles.featureName}>{feature.name}</div>
              <div style={styles.featureDescription}>{feature.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Spell Slots */}
      {character.spellSlots && typeof character.spellSlots === 'object' && Object.keys(character.spellSlots).length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Spell Slots</h2>
          <div style={styles.statsGrid}>
            {character.spellSlots && Object.entries(character.spellSlots).map(([level, slots]) => (
              <div key={level} style={styles.statBox}>
                <div style={styles.statLabel}>Level {level}</div>
                <div style={styles.statValue}>{slots}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Equipment</h2>
        
        {/* Weapons */}
        {character.equipment.weapons && Array.isArray(character.equipment.weapons) && character.equipment.weapons.length > 0 && (
          <>
            <h3 style={{ color: '#8b4513', marginBottom: '15px', fontSize: '1.3em' }}>Weapons</h3>
            <div style={styles.itemsList}>
              {character.equipment.weapons.map((weapon, index) => (
                <div key={index} style={styles.item}>
                  <div style={styles.itemName}>{weapon}</div>
                  <div style={styles.itemDescription}>
                    {EQUIPMENT_DESCRIPTIONS[weapon.toLowerCase().replace(/\s+/g, '')] || 
                     EQUIPMENT_DESCRIPTIONS[weapon.toLowerCase()] || 
                     "A reliable weapon for combat."}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Armor */}
        {character.equipment.armor && (
          <>
            <h3 style={{ color: '#8b4513', margin: '20px 0 15px 0', fontSize: '1.3em' }}>Armor</h3>
            <div style={styles.itemsList}>
              <div style={styles.item}>
                <div style={styles.itemName}>{character.equipment.armor}</div>
                <div style={styles.itemDescription}>
                  {EQUIPMENT_DESCRIPTIONS[character.equipment.armor.toLowerCase().replace(/\s+/g, '')] || 
                   "Protective armor worn in combat."}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other Equipment */}
        {character.equipment.other && Array.isArray(character.equipment.other) && character.equipment.other.length > 0 && (
          <>
            <h3 style={{ color: '#8b4513', margin: '20px 0 15px 0', fontSize: '1.3em' }}>Adventuring Gear</h3>
            <div style={styles.itemsList}>
              {character.equipment.other.map((item, index) => (
                <div key={index} style={styles.item}>
                  <div style={styles.itemName}>{item}</div>
                  <div style={styles.itemDescription}>
                    {EQUIPMENT_DESCRIPTIONS[item.toLowerCase().replace(/\s+/g, '')] || 
                     EQUIPMENT_DESCRIPTIONS[item.toLowerCase()] || 
                     "Useful adventuring equipment."}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Proficiencies */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Proficiencies & Languages</h2>
        
        {character.proficiencies && character.proficiencies.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#8b4513', marginBottom: '10px', fontSize: '1.2em' }}>Proficiencies</h3>
            <div style={styles.featureDescription}>
              {character.proficiencies.join(', ')}
            </div>
          </div>
        )}

        {character.languages && character.languages.length > 0 && (
          <div>
            <h3 style={{ color: '#8b4513', marginBottom: '10px', fontSize: '1.2em' }}>Languages</h3>
            <div style={styles.featureDescription}>
              {character.languages.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Personality */}
      {character.personality && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Personality</h2>
          
          {character.personality.traits && (
            <div style={styles.featureItem}>
              <div style={styles.featureName}>Personality Traits</div>
              <div style={styles.featureDescription}>{character.personality.traits}</div>
            </div>
          )}

          {character.personality.ideals && (
            <div style={styles.featureItem}>
              <div style={styles.featureName}>Ideals</div>
              <div style={styles.featureDescription}>{character.personality.ideals}</div>
            </div>
          )}

          {character.personality.bonds && (
            <div style={styles.featureItem}>
              <div style={styles.featureName}>Bonds</div>
              <div style={styles.featureDescription}>{character.personality.bonds}</div>
            </div>
          )}

          {character.personality.flaws && (
            <div style={styles.featureItem}>
              <div style={styles.featureName}>Flaws</div>
              <div style={styles.featureDescription}>{character.personality.flaws}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CharacterSheet
