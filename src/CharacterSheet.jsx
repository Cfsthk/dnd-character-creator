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
    shortsword: "Martial melee weapon. Light, finesse. A short blade ideal for quick strikes.",
    longsword: "Martial melee weapon. Versatile (1d8/1d10). The classic knight's blade.",
    greatsword: "Martial melee weapon. Two-handed, heavy. A massive blade wielded with both hands.",
    battleaxe: "Martial melee weapon. Versatile (1d8/1d10). A single-bladed axe for chopping.",
    greataxe: "Martial melee weapon. Two-handed, heavy. A huge axe that deals devastating damage.",
    warhammer: "Martial melee weapon. Versatile (1d8/1d10). A heavy hammer for crushing blows.",
    mace: "Simple melee weapon. A flanged or spiked metal club.",
    rapier: "Martial melee weapon. Finesse. A thin, elegant blade for precise thrusts.",
    shortbow: "Simple ranged weapon. Two-handed. Range 80/320 ft. A short bow for quick shots.",
    longbow: "Martial ranged weapon. Two-handed, heavy. Range 150/600 ft. A powerful war bow.",
    crossbow: "Simple ranged weapon. Loading, two-handed. Range 80/320 ft. A mechanical bow.",
    handaxe: "Simple melee weapon. Light, thrown (20/60 ft). A small hatchet.",
    spear: "Simple melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). A thrusting pole weapon.",
    quarterstaff: "Simple melee weapon. Versatile (1d6/1d8). A wooden staff.",
    // Armor
    leather: "Light armor. AC 11 + Dex modifier. Boiled leather pieces covering vital areas.",
    studded: "Light armor. AC 12 + Dex modifier. Leather reinforced with metal studs.",
    chainmail: "Heavy armor. AC 16. Interlocking metal rings. Disadvantage on Stealth.",
    platemail: "Heavy armor. AC 18. Shaped metal plates covering the body. Disadvantage on Stealth.",
    scalemail: "Medium armor. AC 14 + Dex (max 2). Overlapping metal scales. Disadvantage on Stealth.",
    shield: "+2 AC. A portable barrier held in one hand.",
    // Common items
    rope: "50 feet of hempen rope. Can support 1,500 pounds.",
    torch: "Burns for 1 hour, providing bright light in 20-foot radius.",
    backpack: "Holds 1 cubic foot or 30 pounds of gear.",
    bedroll: "Cloth sheets and padding for sleeping on the ground.",
    rations: "Dried foods suitable for extended travel. One day's sustenance.",
    waterskin: "A leather container that holds 4 pints of liquid.",
    healingpotion: "Potion of Healing. Restores 2d4+2 hit points when consumed."
  }

  // Calculate Maximum HP (Hit Die + Constitution Modifier)
  const calculateMaxHP = () => {
    if (!classData) return 0
    const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
    
    // For level 1: max hit die value + CON modifier
    const hitDieValue = parseInt(classData.hitDie.replace('d', ''))
    return hitDieValue + conMod
  }

  // Calculate Spell Save DC
  const calculateSpellDC = () => {
    if (!classData) return 0
    
    let spellcastingAbility = 0
    const className = classData.nameEn?.toLowerCase()
    
    if (['cleric', 'druid', 'ranger'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.wisdom || 10)
    } else if (['wizard'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.intelligence || 10)
    } else if (['bard', 'sorcerer', 'warlock', 'paladin'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.charisma || 10)
    }
    
    return 8 + getProficiencyBonus() + spellcastingAbility
  }

  // Calculate Spell Attack Bonus
  const calculateSpellAttack = () => {
    if (!classData) return 0
    
    let spellcastingAbility = 0
    const className = classData.nameEn?.toLowerCase()
    
    if (['cleric', 'druid', 'ranger'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.wisdom || 10)
    } else if (['wizard'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.intelligence || 10)
    } else if (['bard', 'sorcerer', 'warlock', 'paladin'].includes(className)) {
      spellcastingAbility = getAbilityModifierNum(character.abilities?.charisma || 10)
    }
    
    return getProficiencyBonus() + spellcastingAbility
  }

  // Calculate weapon attack bonus
  const getWeaponAttackBonus = (weapon) => {
    if (!weapon) return 0
    
    // Finesse or ranged weapons can use DEX, melee uses STR
    const weaponName = weapon.name?.toLowerCase() || ''
    const isFinesse = ['dagger', 'shortsword', 'rapier'].includes(weaponName)
    const isRanged = ['shortbow', 'longbow', 'crossbow'].includes(weaponName)
    
    const strMod = getAbilityModifierNum(character.abilities?.strength || 10)
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    
    let abilityMod = strMod
    if (isFinesse) {
      abilityMod = Math.max(strMod, dexMod)
    } else if (isRanged) {
      abilityMod = dexMod
    }
    
    return getProficiencyBonus() + abilityMod
  }

  // Print function
  const handlePrint = () => {
    window.print()
  }

  // Get skill modifier
  const getSkillModifier = (skill, abilityScore) => {
    const abilityMod = getAbilityModifierNum(abilityScore)
    const isProficient = character.skills?.[skill] || false
    const profBonus = isProficient ? getProficiencyBonus() : 0
    const total = abilityMod + profBonus
    return total >= 0 ? `+${total}` : `${total}`
  }

  // Get equipment description
  const getEquipmentDescription = (itemName) => {
    const key = itemName?.toLowerCase().replace(/\s+/g, '') || ''
    return EQUIPMENT_DESCRIPTIONS[key] || "Standard adventuring equipment."
  }

  // Get skill description
  const getSkillDescription = (skillName) => {
    return SKILL_DESCRIPTIONS[skillName] || ""
  }

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      fontFamily: "'Modesto Condensed', 'Crimson Text', Georgia, serif",
      background: 'linear-gradient(to bottom, #f4e8d0 0%, #e8dcc0 100%)',
      padding: '30px',
      boxShadow: '0 0 30px rgba(0,0,0,0.3)',
      position: 'relative'
    }}>
      {/* Print Button */}
      <button 
        onClick={handlePrint}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: '#8b4513',
          color: '#f4e8d0',
          border: '2px solid #654321',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
        className="no-print"
      >
        🖨️ Print Sheet
      </button>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        borderBottom: '3px solid #8b4513',
        marginBottom: '20px',
        paddingBottom: '15px'
      }}>
        <h1 style={{
          margin: '0',
          fontSize: '36px',
          color: '#2c1810',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          {character.name || 'Character Name'}
        </h1>
        <div style={{
          fontSize: '18px',
          color: '#654321',
          marginTop: '8px'
        }}>
          Level {character.level || 1} {raceData?.nameEn || character.race} {classData?.nameEn || character.class}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Left Column */}
        <div>
          {/* Ability Scores */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Ability Scores</h3>
            
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
              <div key={ability} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                borderRadius: '5px'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#654321',
                  textTransform: 'capitalize',
                  fontSize: '14px'
                }}>{ability}</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2c1810'
                  }}>{character.abilities?.[ability] || 10}</span>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid #8b4513',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f4e8d0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#8b4513'
                  }}>
                    {getAbilityModifier(character.abilities?.[ability] || 10)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency Bonus */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '12px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#654321',
              marginBottom: '5px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>Proficiency Bonus</div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#8b4513'
            }}>+{getProficiencyBonus()}</div>
          </div>

          {/* Saving Throws */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Saving Throws</h3>
            
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => {
              const isProficient = classData?.savingThrows?.includes(ability)
              const abilityMod = getAbilityModifierNum(character.abilities?.[ability] || 10)
              const profBonus = isProficient ? getProficiencyBonus() : 0
              const total = abilityMod + profBonus
              
              return (
                <div key={ability} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '5px'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #8b4513',
                      borderRadius: '50%',
                      display: 'inline-block',
                      backgroundColor: isProficient ? '#8b4513' : 'transparent'
                    }}></span>
                    <span style={{
                      textTransform: 'capitalize',
                      fontSize: '14px',
                      color: '#654321'
                    }}>{ability.slice(0, 3).toUpperCase()}</span>
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: '#2c1810',
                    fontSize: '14px'
                  }}>{total >= 0 ? `+${total}` : total}</span>
                </div>
              )
            })}
          </div>

          {/* Race Traits */}
          {raceData && (
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                color: '#8b4513',
                textTransform: 'uppercase',
                borderBottom: '2px solid #8b4513',
                paddingBottom: '5px'
              }}>Race Traits</h3>
              
              <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#2c1810' }}>
                {/* Race Name and Description */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#8b4513', marginBottom: '4px' }}>
                    {raceData.name}
                  </div>
                  <div style={{ paddingLeft: '10px', color: '#654321', marginBottom: '8px' }}>
                    {raceData.description}
                  </div>
                </div>
                
                {/* Race Traits String */}
                {raceData.traits && typeof raceData.traits === 'string' && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#8b4513', marginBottom: '4px' }}>
                      Racial Traits
                    </div>
                    <div style={{ paddingLeft: '10px', color: '#654321' }}>
                      {raceData.traits}
                    </div>
                  </div>
                )}
                
                {/* Subrace Info */}
                {character.subrace && raceData.subraceDetails?.[character.subrace] && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#8b4513', marginBottom: '4px' }}>
                      {raceData.subraceDetails[character.subrace].name}
                    </div>
                    <div style={{ paddingLeft: '10px', color: '#654321' }}>
                      {raceData.subraceDetails[character.subrace].description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Combat Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '15px'
          }}>
            {/* Armor Class */}
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#654321',
                marginBottom: '5px',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>Armor Class</div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#8b4513'
              }}>{character.armorClass || 10}</div>
            </div>

            {/* Initiative */}
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#654321',
                marginBottom: '5px',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>Initiative</div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#8b4513'
              }}>{getAbilityModifier(character.abilities?.dexterity || 10)}</div>
            </div>

            {/* Speed */}
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#654321',
                marginBottom: '5px',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>Speed</div>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#8b4513'
              }}>{raceData?.speed || 30} ft</div>
            </div>
          </div>

          {/* Hit Points */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Hit Points</h3>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#654321', marginBottom: '5px' }}>Maximum HP</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b4513' }}>
                  {calculateMaxHP()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#654321', marginBottom: '5px' }}>Current HP</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2c1810',
                  border: '2px solid #8b4513',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {character.currentHP || calculateMaxHP()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#654321', marginBottom: '5px' }}>Hit Dice</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b4513' }}>
                  {classData?.hitDie || 'd8'}
                </div>
              </div>
            </div>
          </div>

          {/* Attacks & Spellcasting */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Attacks & Spellcasting</h3>
            
            {/* Weapons */}
            {character.equipment?.weapons?.length > 0 && Array.isArray(character.equipment.weapons) && character.equipment.weapons.map((weapon, index) => {
              if (!weapon || !weapon.equipped) return null
              
              const attackBonus = getWeaponAttackBonus(weapon)
              const description = getEquipmentDescription(weapon.name)
              
              return (
                <div key={index} style={{
                  marginBottom: '15px',
                  padding: '12px',
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  borderRadius: '5px',
                  borderLeft: '4px solid #8b4513'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <span style={{ fontWeight: 'bold', color: '#8b4513', fontSize: '15px' }}>
                      {weapon.name}
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#2c1810' }}>
                      +{attackBonus} | {weapon.damage}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#654321', fontStyle: 'italic' }}>
                    {description}
                  </div>
                </div>
              )
            })}

            {/* Spell Stats for spellcasters */}
            {classData && ['Wizard', 'Cleric', 'Druid', 'Sorcerer', 'Bard', 'Warlock', 'Paladin', 'Ranger'].includes(classData.nameEn) && (
              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '15px',
                padding: '12px',
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                borderRadius: '5px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#654321', marginBottom: '3px' }}>Spell Save DC</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b4513' }}>
                    {calculateSpellDC()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#654321', marginBottom: '3px' }}>Spell Attack</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b4513' }}>
                    +{calculateSpellAttack()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Skills</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { name: 'acrobatics', ability: 'dexterity' },
                { name: 'animalHandling', ability: 'wisdom' },
                { name: 'arcana', ability: 'intelligence' },
                { name: 'athletics', ability: 'strength' },
                { name: 'deception', ability: 'charisma' },
                { name: 'history', ability: 'intelligence' },
                { name: 'insight', ability: 'wisdom' },
                { name: 'intimidation', ability: 'charisma' },
                { name: 'investigation', ability: 'intelligence' },
                { name: 'medicine', ability: 'wisdom' },
                { name: 'nature', ability: 'intelligence' },
                { name: 'perception', ability: 'wisdom' },
                { name: 'performance', ability: 'charisma' },
                { name: 'persuasion', ability: 'charisma' },
                { name: 'religion', ability: 'intelligence' },
                { name: 'sleightOfHand', ability: 'dexterity' },
                { name: 'stealth', ability: 'dexterity' },
                { name: 'survival', ability: 'wisdom' }
              ].map(skill => {
                const isProficient = character.skills?.[skill.name] || false
                const modifier = getSkillModifier(skill.name, character.abilities?.[skill.ability] || 10)
                const description = getSkillDescription(skill.name)
                
                return (
                  <div key={skill.name} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px',
                    backgroundColor: isProficient ? 'rgba(139, 69, 19, 0.15)' : 'transparent',
                    borderRadius: '3px'
                  }} title={description}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px'
                    }}>
                      <span style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid #8b4513',
                        borderRadius: '50%',
                        display: 'inline-block',
                        backgroundColor: isProficient ? '#8b4513' : 'transparent'
                      }}></span>
                      <span style={{ color: '#654321' }}>
                        {skill.name.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </span>
                    <span style={{
                      fontWeight: 'bold',
                      color: '#2c1810',
                      fontSize: '13px'
                    }}>{modifier}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Equipment */}
          <div style={{
            border: '2px solid #8b4513',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '8px'
          }}>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '18px',
              color: '#8b4513',
              textTransform: 'uppercase',
              borderBottom: '2px solid #8b4513',
              paddingBottom: '5px'
            }}>Equipment</h3>
            
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#2c1810' }}>
              {/* Armor */}
              {character.equipment?.armor && (
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', color: '#8b4513' }}>Armor: </span>
                  <span>{character.equipment.armor.name}</span>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#654321', 
                    fontStyle: 'italic',
                    marginLeft: '10px',
                    marginTop: '3px'
                  }}>
                    {getEquipmentDescription(character.equipment.armor.name)}
                  </div>
                </div>
              )}
              
              {/* Other Equipment */}
              {character.equipment?.other?.length > 0 && Array.isArray(character.equipment.other) && (
                <div>
                  <div style={{ fontWeight: 'bold', color: '#8b4513', marginBottom: '6px' }}>Other Items:</div>
                  {character.equipment.other.map((item, index) => (
                    <div key={index} style={{ marginLeft: '10px', marginBottom: '8px' }}>
                      <div>• {item.name} {item.quantity > 1 ? `(×${item.quantity})` : ''}</div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#654321', 
                        fontStyle: 'italic',
                        marginLeft: '15px',
                        marginTop: '2px'
                      }}>
                        {getEquipmentDescription(item.name)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Class Features */}
          {classData?.features && (
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                color: '#8b4513',
                textTransform: 'uppercase',
                borderBottom: '2px solid #8b4513',
                paddingBottom: '5px'
              }}>Class Features</h3>
              
              <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#2c1810' }}>
                {Array.isArray(classData.features) && classData.features.map((feature, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#8b4513' }}>• {feature.name}: </span>
                    <span>{feature.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {character.languages?.length > 0 && (
            <div style={{
              border: '2px solid #8b4513',
              padding: '15px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px'
            }}>
              <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '18px',
                color: '#8b4513',
                textTransform: 'uppercase',
                borderBottom: '2px solid #8b4513',
                paddingBottom: '5px'
              }}>Languages</h3>
              <div style={{ fontSize: '14px', color: '#2c1810' }}>
                {character.languages.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  )
}

export default CharacterSheet
