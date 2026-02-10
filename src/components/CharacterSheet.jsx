import { CLASSES } from '../data/classes'
import { races } from '../data/raceData'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const CharacterSheet = ({ character }) => {
  const sheetRef = useRef(null)

  // PDF Export Function
  const exportToPDF = async () => {
    if (!sheetRef.current) return
    
    try {
      const canvas = await html2canvas(sheetRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f4e4c1'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`${character.name || '角色卡'}_CharacterSheet.pdf`)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('PDF導出失敗，請重試')
    }
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
    battleaxe: "Martial melee weapon. Versatile (1d8/1d10). A sturdy one-handed or two-handed axe.",
    greataxe: "Martial melee weapon. Two-handed, heavy. A brutal two-handed axe for maximum damage.",
    handaxe: "Simple melee weapon. Light, thrown (20/60 ft). Can be thrown or used in melee.",
    warhammer: "Martial melee weapon. Versatile (1d8/1d10). A solid, reliable bludgeoning weapon.",
    mace: "Simple melee weapon. Basic but effective bludgeoning damage.",
    quarterstaff: "Simple melee weapon. Versatile (1d6/1d8). A simple wooden staff.",
    spear: "Simple melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). Good for melee or ranged.",
    rapier: "Martial melee weapon. Finesse. An elegant piercing blade for dexterous fighters.",
    club: "Simple melee weapon. Light. A crude but effective bludgeoning tool.",
    flail: "Martial melee weapon. A chain-connected spiked ball.",
    morningstar: "Martial melee weapon. Combines piercing and bludgeoning damage.",
    pike: "Martial melee weapon. Heavy, reach, two-handed. Long polearm for keeping enemies at bay.",
    trident: "Martial melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). A three-pronged spear.",
    whip: "Martial melee weapon. Finesse, reach. Unique 10-foot reach weapon.",
    
    // Ranged Weapons
    shortbow: "Simple ranged weapon. Ammunition (80/320 ft), two-handed. A compact bow.",
    longbow: "Martial ranged weapon. Ammunition (150/600 ft), heavy, two-handed. Superior range and power.",
    crossbow: "Simple ranged weapon. Ammunition (80/320 ft), loading, two-handed. Easy to use but slow.",
    lightCrossbow: "Simple ranged weapon. Ammunition (80/320 ft), loading, two-handed. Compact crossbow.",
    heavyCrossbow: "Martial ranged weapon. Ammunition (100/400 ft), heavy, loading, two-handed. Powerful but cumbersome.",
    handCrossbow: "Martial ranged weapon. Ammunition (30/120 ft), light, loading. One-handed crossbow.",
    sling: "Simple ranged weapon. Ammunition (30/120 ft). Basic but effective projectile weapon.",
    
    // Armor
    leather: "Light armor. AC 11 + Dex mod. Made from supple leather for minimal protection and maximum mobility.",
    studdedLeather: "Light armor. AC 12 + Dex mod. Leather reinforced with metal studs.",
    chainMail: "Heavy armor. AC 16. Strength 13 required. Made of interlocking metal rings. Disadvantage on Stealth.",
    chainShirt: "Medium armor. AC 13 + Dex mod (max 2). Flexible metal armor covering the torso.",
    scaleMail: "Medium armor. AC 14 + Dex mod (max 2). Coat covered in overlapping metal pieces. Disadvantage on Stealth.",
    breastplate: "Medium armor. AC 14 + Dex mod (max 2). Metal chest piece leaving limbs flexible.",
    halfPlate: "Medium armor. AC 15 + Dex mod (max 2). Shaped metal plates covering most of the body. Disadvantage on Stealth.",
    plateMail: "Heavy armor. AC 18. Strength 15 required. Full suit of interlocking metal plates. Disadvantage on Stealth.",
    splint: "Heavy armor. AC 17. Strength 15 required. Narrow vertical metal strips on leather backing. Disadvantage on Stealth.",
    ringMail: "Heavy armor. AC 14. Leather armor with heavy rings sewn into it. Disadvantage on Stealth.",
    
    // Shields and Accessories
    shield: "AC +2. Wood or metal. Can be donned or doffed as an action.",
    
    // Adventuring Gear
    backpack: "1 cubic foot / 30 pounds of gear capacity. Essential for carrying equipment.",
    beddingRoll: "Sleeping gear for resting during long rests in the wilderness.",
    rope: "50 feet of hempen rope. 2 hit points, can be burst with DC 17 Strength check.",
    torch: "Bright light 20 ft, dim light 20 ft. Burns for 1 hour.",
    rations: "Dried food suitable for extended travel. One ration = one day's food.",
    waterskin: "Holds 4 pints of liquid. Essential for survival.",
    tinderbox: "Used to start fires. Contains flint, fire steel, and tinder.",
    crowbar: "Grants advantage on Strength checks where leverage helps.",
    hammer: "Useful for construction, driving pitons, or as an improvised weapon.",
    lantern: "Bright light 30 ft, dim light 30 ft for 6 hours on 1 pint of oil.",
    oil: "Fuel for lanterns or can be used as a splash weapon.",
    potion: "Magic potion with various effects. Most common: Potion of Healing (2d4+2 HP).",
    healingPotion: "Restores 2d4+2 hit points when consumed as an action.",
    holyWater: "As an action, throw at a creature within 20 feet. Deals 2d6 radiant damage to fiends/undead.",
    holySymbol: "Symbol of a deity or pantheon. Required for clerics and paladins to cast spells.",
    spellbook: "Contains wizard spells. Essential for preparing wizard spells.",
    componentPouch: "Small watertight leather pouch for material spell components.",
    arcaneBook: "Contains arcane knowledge, spell formulas, and magical theory.",
    thieves: "Proficiency required. Includes lockpicks, small mirror, scissors, and pliers.",
    thievesTools: "Set of tools for picking locks and disarming traps. Requires proficiency.",
    disguiseKit: "Contains cosmetics, hair dye, props for creating disguises.",
    herbalismKit: "Contains pouches, vials, tools for identifying and creating herbal remedies.",
    musicalInstrument: "Requires proficiency. Used for performance and certain spells.",
    
    // Default for unknown items
    default: "Adventuring gear or equipment."
  }

  // Get skill modifier
  const getSkillModifier = (skill, abilityScore) => {
    const baseMod = getAbilityModifierNum(abilityScore)
    const profBonus = getProficiencyBonus()
    const isProficient = classData?.skillProficiencies?.includes(skill)
    return isProficient ? baseMod + profBonus : baseMod
  }

  // Calculate AC
  const calculateAC = () => {
    let baseAC = 10
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    
    if (character.equipment) {
      const armor = character.equipment.find(item => 
        ['leather', 'studdedLeather', 'chainMail', 'chainShirt', 'scaleMail', 
         'breastplate', 'halfPlate', 'plateMail', 'splint', 'ringMail'].includes(item)
      )
      
      if (armor === 'leather') baseAC = 11 + dexMod
      else if (armor === 'studdedLeather') baseAC = 12 + dexMod
      else if (armor === 'chainShirt') baseAC = 13 + Math.min(dexMod, 2)
      else if (armor === 'scaleMail') baseAC = 14 + Math.min(dexMod, 2)
      else if (armor === 'breastplate') baseAC = 14 + Math.min(dexMod, 2)
      else if (armor === 'halfPlate') baseAC = 15 + Math.min(dexMod, 2)
      else if (armor === 'ringMail') baseAC = 14
      else if (armor === 'chainMail') baseAC = 16
      else if (armor === 'splint') baseAC = 17
      else if (armor === 'plateMail') baseAC = 18
      else baseAC = 10 + dexMod
      
      if (character.equipment.includes('shield')) {
        baseAC += 2
      }
    } else {
      baseAC = 10 + dexMod
    }
    
    return baseAC
  }

  // Get equipment description
  const getEquipmentDescription = (item) => {
    const key = item.toLowerCase().replace(/\s+/g, '')
    return EQUIPMENT_DESCRIPTIONS[key] || EQUIPMENT_DESCRIPTIONS.default
  }

  // Calculate HP
  const hitDice = classData?.hitDice || 8
  const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
  const maxHP = hitDice + conMod

  return (
    <div>
      {/* PDF Export Button */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px'
      }}>
        <button
          onClick={exportToPDF}
          style={{
            padding: '12px 30px',
            fontSize: '1.1em',
            fontFamily: '"Book Antiqua", "Palatino Linotype", serif',
            fontWeight: 'bold',
            color: '#f4e4c1',
            backgroundColor: '#8b4513',
            border: '3px solid #5c2e0f',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#5c2e0f'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#8b4513'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          📄 導出為PDF
        </button>
      </div>

      <div ref={sheetRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Book Antiqua", "Palatino Linotype", serif',
      backgroundColor: '#f4e4c1',
      backgroundImage: `
        linear-gradient(to bottom, rgba(139, 69, 19, 0.05) 1px, transparent 1px),
        linear-gradient(135deg, transparent 48%, rgba(139, 69, 19, 0.03) 49%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)
      `,
      backgroundSize: '100% 2px, 4px 4px',
      border: '3px solid #8b4513',
      borderRadius: '4px',
      boxShadow: '0 0 20px rgba(139, 69, 19, 0.3), inset 0 0 40px rgba(139, 69, 19, 0.1)',
      color: '#2c1810'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        fontSize: '2.5em',
        textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
        color: '#5c2e0f',
        fontWeight: 'bold'
      }}>
        角色卡
      </h1>
      
      {/* Basic Info */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px',
        backgroundColor: 'rgba(255, 248, 220, 0.7)',
        border: '2px solid #8b4513',
        borderRadius: '4px',
        boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
      }}>
        <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
          基本資料
        </h2>
        <p><strong>姓名:</strong> {character.name}</p>
        <p><strong>種族:</strong> {raceData?.name || character.race}</p>
        <p><strong>職業:</strong> {classData?.name || character.class}</p>
        <p><strong>等級:</strong> 1</p>
        <p><strong>背景:</strong> {character.background || '冒險者'}</p>
      </div>

      {/* Combat Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '15px', 
        marginBottom: '20px' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5c2e0f', fontWeight: 'bold' }}>護甲等級</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#8b4513' }}>{calculateAC()}</div>
        </div>
        <div style={{ 
          textAlign: 'center', 
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5c2e0f', fontWeight: 'bold' }}>生命值</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#8b4513' }}>{maxHP}</div>
        </div>
        <div style={{ 
          textAlign: 'center', 
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <div style={{ fontSize: '0.9em', color: '#5c2e0f', fontWeight: 'bold' }}>速度</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#8b4513' }}>{raceData?.speed || 30} 尺</div>
        </div>
      </div>

      {/* Ability Scores */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: 'rgba(255, 248, 220, 0.7)',
        border: '2px solid #8b4513',
        borderRadius: '4px',
        boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
      }}>
        <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
          屬性值
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {[
            { key: 'strength', label: '力量', abbr: 'STR' },
            { key: 'dexterity', label: '敏捷', abbr: 'DEX' },
            { key: 'constitution', label: '體質', abbr: 'CON' },
            { key: 'intelligence', label: '智力', abbr: 'INT' },
            { key: 'wisdom', label: '感知', abbr: 'WIS' },
            { key: 'charisma', label: '魅力', abbr: 'CHA' }
          ].map(({ key, label, abbr }) => (
            <div key={key} style={{ 
              textAlign: 'center',
              padding: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: '2px solid #8b4513',
              borderRadius: '4px'
            }}>
              <div style={{ fontSize: '0.8em', fontWeight: 'bold', color: '#5c2e0f' }}>{label}</div>
              <div style={{ fontSize: '0.7em', color: '#666' }}>{abbr}</div>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#8b4513' }}>
                {character.abilities?.[key] || 10}
              </div>
              <div style={{ fontSize: '1em', color: '#666' }}>
                ({getAbilityModifier(character.abilities?.[key] || 10)})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: 'rgba(255, 248, 220, 0.7)',
        border: '2px solid #8b4513',
        borderRadius: '4px',
        boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
      }}>
        <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
          技能
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {[
            { key: 'acrobatics', label: '特技', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'animalHandling', label: '馴獸', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'arcana', label: '秘法', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'athletics', label: '運動', ability: 'strength', abilityLabel: '力量' },
            { key: 'deception', label: '欺瞞', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'history', label: '歷史', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'insight', label: '洞察', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'intimidation', label: '威嚇', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'investigation', label: '調查', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'medicine', label: '醫療', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'nature', label: '自然', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'perception', label: '察覺', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'performance', label: '表演', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'persuasion', label: '遊說', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'religion', label: '宗教', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'sleightOfHand', label: '巧手', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'stealth', label: '隱匿', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'survival', label: '求生', ability: 'wisdom', abilityLabel: '感知' }
          ].map(({ key, label, ability, abilityLabel }) => {
            const isProficient = classData?.skillProficiencies?.includes(key)
            const modifier = getSkillModifier(key, character.abilities?.[ability] || 10)
            const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`
            
            return (
              <div key={key} style={{
                padding: '8px',
                backgroundColor: isProficient ? 'rgba(139, 69, 19, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                border: isProficient ? '2px solid #8b4513' : '1px solid #8b4513',
                borderRadius: '4px',
                fontSize: '0.9em'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold', color: '#5c2e0f' }}>
                    {isProficient && '●'} {label} <span style={{ fontSize: '0.8em', color: '#666' }}>({abilityLabel})</span>
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#8b4513', fontSize: '1.1em' }}>
                    {modifierStr}
                  </span>
                </div>
                <div style={{ fontSize: '0.75em', color: '#666', fontStyle: 'italic' }}>
                  {SKILL_DESCRIPTIONS[key]}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Equipment */}
      {character.equipment && character.equipment.length > 0 && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            裝備
          </h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {character.equipment.map((item, index) => (
              <div key={index} style={{
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid #8b4513',
                borderRadius: '4px',
                fontSize: '0.9em'
              }}>
                <div style={{ fontWeight: 'bold', color: '#5c2e0f', marginBottom: '4px' }}>
                  {item}
                </div>
                <div style={{ fontSize: '0.85em', color: '#666', fontStyle: 'italic' }}>
                  {getEquipmentDescription(item)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Class Features */}
      {classData?.features && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            職業特性
          </h2>
          <ul style={{ marginLeft: '20px' }}>
            {classData.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '8px', color: '#2c1810' }}>
                <strong>{feature.name}:</strong> {feature.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Racial Traits */}
      {raceData?.traits && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            種族特性
          </h2>
          <ul style={{ marginLeft: '20px' }}>
            {raceData.traits.map((trait, index) => (
              <li key={index} style={{ marginBottom: '8px', color: '#2c1810' }}>
                <strong>{trait.name}:</strong> {trait.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}

export default CharacterSheet
