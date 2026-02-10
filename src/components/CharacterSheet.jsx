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
    battleaxe: "Martial melee weapon. Versatile (1d8/1d10). A single-bladed axe for chopping foes.",
    greataxe: "Martial melee weapon. Two-handed, heavy. A massive two-handed axe.",
    warhammer: "Martial melee weapon. Versatile (1d8/1d10). A hammer designed for battle.",
    maul: "Martial melee weapon. Two-handed, heavy. A massive two-handed hammer.",
    rapier: "Martial melee weapon. Finesse. A thin, elegant blade designed for thrusting.",
    handaxe: "Simple melee weapon. Light, thrown (20/60 ft). A small axe that can be thrown.",
    mace: "Simple melee weapon. A heavy club with a metal head.",
    quarterstaff: "Simple melee weapon. Versatile (1d6/1d8). A simple wooden staff.",
    club: "Simple melee weapon. Light. A basic wooden club.",
    spear: "Simple melee weapon. Thrown (20/60 ft), versatile (1d6/1d8). A shaft with a pointed head.",
    lightCrossbow: "Simple ranged weapon. Ammunition (80/320 ft), loading, two-handed. A mechanical bow.",
    shortbow: "Simple ranged weapon. Ammunition (80/320 ft), two-handed. A small bow.",
    longbow: "Martial ranged weapon. Ammunition (150/600 ft), heavy, two-handed. A tall bow with long range.",
    
    // Armor
    leather: "Light armor. Flexible protection made from boiled and hardened leather. AC 11 + Dex modifier.",
    studded: "Light armor. Leather reinforced with metal studs. AC 12 + Dex modifier.",
    hide: "Medium armor. Crude armor from thick furs and pelts. AC 12 + Dex modifier (max 2).",
    chainShirt: "Medium armor. Made of interlocking metal rings. AC 13 + Dex modifier (max 2).",
    scaleMail: "Medium armor. Coat of leather with overlapping metal pieces. AC 14 + Dex modifier (max 2). Disadvantage on Stealth.",
    breastplate: "Medium armor. Fitted metal chest piece. AC 14 + Dex modifier (max 2).",
    halfPlate: "Medium armor. Separate armor pieces covering most of the body. AC 15 + Dex modifier (max 2). Disadvantage on Stealth.",
    ringMail: "Heavy armor. Leather armor with heavy rings sewn on. AC 14. Disadvantage on Stealth.",
    chainMail: "Heavy armor. Interlocking metal rings covering the body. AC 16. Str 13 required. Disadvantage on Stealth.",
    splint: "Heavy armor. Narrow vertical metal strips riveted to backing. AC 17. Str 15 required. Disadvantage on Stealth.",
    plate: "Heavy armor. Interlocking metal plates covering the entire body. AC 18. Str 15 required. Disadvantage on Stealth.",
    shield: "Add +2 to AC. Must be wielded in one hand.",
    
    // Tools
    thievesTools: "Picks, files, and small tools for disabling traps and picking locks. Proficiency allows adding proficiency bonus to checks.",
    artisanTools: "Specialized tools for crafting items (blacksmith's, carpenter's, etc.). Proficiency allows adding proficiency bonus to checks.",
    musicalInstrument: "An instrument (lute, flute, drum, etc.). Proficiency allows adding proficiency bonus to Performance checks.",
    
    // Packs
    explorersPack: "Includes backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days rations, waterskin, 50 ft rope.",
    dungeoneersPack: "Includes backpack, crowbar, hammer, 10 pitons, 10 torches, tinderbox, 10 days rations, waterskin, 50 ft rope.",
    priestsPack: "Includes backpack, blanket, 10 candles, tinderbox, alms box, incense, censer, vestments, 2 days rations, waterskin.",
    scholarsPack: "Includes backpack, book of lore, ink, ink pen, 10 parchment sheets, small bag of sand, small knife.",
    diplomatsPack: "Includes chest, 2 cases for maps/scrolls, fine clothes, ink, 5 ink sheets, lamp, 2 oil flasks, 5 paper sheets, perfume, sealing wax, soap."
  }

  // Get ability scores with defensive checks
  const abilities = character.abilities || {}
  const str = abilities.strength || 10
  const dex = abilities.dexterity || 10
  const con = abilities.constitution || 10
  const int = abilities.intelligence || 10
  const wis = abilities.wisdom || 10
  const cha = abilities.charisma || 10

  // Calculate skill modifiers
  const skillAbilities = {
    acrobatics: dex,
    animalHandling: wis,
    arcana: int,
    athletics: str,
    deception: cha,
    history: int,
    insight: wis,
    intimidation: cha,
    investigation: int,
    medicine: wis,
    nature: int,
    perception: wis,
    performance: cha,
    persuasion: cha,
    religion: int,
    sleightOfHand: dex,
    stealth: dex,
    survival: wis
  }

  const getSkillModifier = (skill) => {
    const abilityScore = skillAbilities[skill]
    const mod = getAbilityModifierNum(abilityScore)
    const proficient = character.skills?.includes(skill)
    const total = proficient ? mod + getProficiencyBonus() : mod
    return total >= 0 ? `+${total}` : `${total}`
  }

  const isProficient = (skill) => character.skills?.includes(skill)

  // Calculate saving throw modifiers
  const getSavingThrowModifier = (ability) => {
    let abilityScore
    switch(ability) {
      case 'strength': abilityScore = str; break
      case 'dexterity': abilityScore = dex; break
      case 'constitution': abilityScore = con; break
      case 'intelligence': abilityScore = int; break
      case 'wisdom': abilityScore = wis; break
      case 'charisma': abilityScore = cha; break
      default: abilityScore = 10
    }
    
    const mod = getAbilityModifierNum(abilityScore)
    const proficient = classData?.savingThrows?.includes(ability)
    const total = proficient ? mod + getProficiencyBonus() : mod
    return total >= 0 ? `+${total}` : `${total}`
  }

  const isSaveProficient = (ability) => classData?.savingThrows?.includes(ability)

  // Calculate HP
  const hitDice = classData?.hitDice || 8
  const hp = hitDice + getAbilityModifierNum(con)

  // Calculate AC
  let ac = 10 + getAbilityModifierNum(dex)
  if (character.armor) {
    // Simplified AC calculation - would need full armor data for complete implementation
    if (character.armor.includes('leather')) ac = 11 + getAbilityModifierNum(dex)
    if (character.armor.includes('studded')) ac = 12 + getAbilityModifierNum(dex)
    if (character.armor.includes('hide')) ac = 12 + Math.min(getAbilityModifierNum(dex), 2)
    if (character.armor.includes('chainShirt')) ac = 13 + Math.min(getAbilityModifierNum(dex), 2)
    if (character.armor.includes('scaleMail')) ac = 14 + Math.min(getAbilityModifierNum(dex), 2)
    if (character.armor.includes('breastplate')) ac = 14 + Math.min(getAbilityModifierNum(dex), 2)
    if (character.armor.includes('halfPlate')) ac = 15 + Math.min(getAbilityModifierNum(dex), 2)
    if (character.armor.includes('ringMail')) ac = 14
    if (character.armor.includes('chainMail')) ac = 16
    if (character.armor.includes('splint')) ac = 17
    if (character.armor.includes('plate')) ac = 18
  }
  if (character.equipment?.includes('shield')) ac += 2

  // Format equipment names
  const formatEquipmentName = (item) => {
    return item
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }

  // Get equipment description
  const getEquipmentDescription = (item) => {
    return EQUIPMENT_DESCRIPTIONS[item] || "Standard adventuring equipment."
  }

  return (
    <div className="character-sheet">
      <div className="sheet-header">
        <h1>{character.name || 'Unnamed Character'}</h1>
        <p className="subtitle">
          Level 1 {raceData?.name || character.race} {classData?.name || character.class}
        </p>
      </div>

      <div className="sheet-grid">
        {/* Ability Scores */}
        <section className="ability-scores">
          <h2>Ability Scores</h2>
          <div className="abilities-grid">
            <div className="ability-box">
              <div className="ability-name">STR</div>
              <div className="ability-modifier">{getAbilityModifier(str)}</div>
              <div className="ability-score">{str}</div>
            </div>
            <div className="ability-box">
              <div className="ability-name">DEX</div>
              <div className="ability-modifier">{getAbilityModifier(dex)}</div>
              <div className="ability-score">{dex}</div>
            </div>
            <div className="ability-box">
              <div className="ability-name">CON</div>
              <div className="ability-modifier">{getAbilityModifier(con)}</div>
              <div className="ability-score">{con}</div>
            </div>
            <div className="ability-box">
              <div className="ability-name">INT</div>
              <div className="ability-modifier">{getAbilityModifier(int)}</div>
              <div className="ability-score">{int}</div>
            </div>
            <div className="ability-box">
              <div className="ability-name">WIS</div>
              <div className="ability-modifier">{getAbilityModifier(wis)}</div>
              <div className="ability-score">{wis}</div>
            </div>
            <div className="ability-box">
              <div className="ability-name">CHA</div>
              <div className="ability-modifier">{getAbilityModifier(cha)}</div>
              <div className="ability-score">{cha}</div>
            </div>
          </div>
        </section>

        {/* Combat Stats */}
        <section className="combat-stats">
          <h2>Combat Stats</h2>
          <div className="stat-group">
            <div className="stat-box">
              <div className="stat-label">Armor Class</div>
              <div className="stat-value">{ac}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Hit Points</div>
              <div className="stat-value">{hp}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Speed</div>
              <div className="stat-value">{raceData?.speed || 30} ft</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Initiative</div>
              <div className="stat-value">{getAbilityModifier(dex)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Proficiency Bonus</div>
              <div className="stat-value">+{getProficiencyBonus()}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Hit Dice</div>
              <div className="stat-value">1d{hitDice}</div>
            </div>
          </div>
        </section>

        {/* Saving Throws */}
        <section className="saving-throws">
          <h2>Saving Throws</h2>
          <div className="saves-list">
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
              <div key={ability} className={`save-item ${isSaveProficient(ability) ? 'proficient' : ''}`}>
                <span className="proficiency-dot">{isSaveProficient(ability) ? '●' : '○'}</span>
                <span className="save-name">{ability.charAt(0).toUpperCase() + ability.slice(1)}</span>
                <span className="save-bonus">{getSavingThrowModifier(ability)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-list">
            {Object.keys(skillAbilities).map(skill => (
              <div 
                key={skill} 
                className={`skill-item ${isProficient(skill) ? 'proficient' : ''}`}
                title={SKILL_DESCRIPTIONS[skill]}
              >
                <span className="proficiency-dot">{isProficient(skill) ? '●' : '○'}</span>
                <span className="skill-name">
                  {skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <span className="skill-bonus">{getSkillModifier(skill)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features & Traits */}
        <section className="features">
          <h2>Features & Traits</h2>
          
          {raceData?.traits && (
            <div className="trait-group">
              <h3>Racial Traits</h3>
              {Array.isArray(raceData.traits) ? (
                raceData.traits.map((trait, index) => (
                  <div key={index} className="trait-item">
                    <strong>{trait.name}:</strong> {trait.description}
                  </div>
                ))
              ) : (
                <div className="trait-item">{raceData.traits}</div>
              )}
            </div>
          )}

          {classData?.features && (
            <div className="trait-group">
              <h3>Class Features</h3>
              {classData.features[1]?.map((feature, index) => (
                <div key={index} className="trait-item">
                  <strong>{feature.name}:</strong> {feature.description}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Equipment */}
        <section className="equipment">
          <h2>Equipment</h2>
          
          {character.weapons && character.weapons.length > 0 && (
            <div className="equipment-group">
              <h3>Weapons</h3>
              <ul>
                {character.weapons.map((weapon, index) => (
                  <li key={index} title={getEquipmentDescription(weapon)}>
                    {formatEquipmentName(weapon)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {character.armor && character.armor.length > 0 && (
            <div className="equipment-group">
              <h3>Armor</h3>
              <ul>
                {character.armor.map((armor, index) => (
                  <li key={index} title={getEquipmentDescription(armor)}>
                    {formatEquipmentName(armor)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {character.equipment && character.equipment.length > 0 && (
            <div className="equipment-group">
              <h3>Other Equipment</h3>
              <ul>
                {character.equipment.map((item, index) => (
                  <li key={index} title={getEquipmentDescription(item)}>
                    {formatEquipmentName(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Spellcasting */}
        {classData?.spellcasting && (
          <section className="spellcasting">
            <h2>Spellcasting</h2>
            <div className="spellcasting-info">
              <div className="stat-box">
                <div className="stat-label">Spellcasting Ability</div>
                <div className="stat-value">{classData.spellcasting.ability.toUpperCase()}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Spell Save DC</div>
                <div className="stat-value">
                  {8 + getProficiencyBonus() + getAbilityModifierNum(
                    classData.spellcasting.ability === 'intelligence' ? int :
                    classData.spellcasting.ability === 'wisdom' ? wis :
                    classData.spellcasting.ability === 'charisma' ? cha : 10
                  )}
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Spell Attack Bonus</div>
                <div className="stat-value">
                  +{getProficiencyBonus() + getAbilityModifierNum(
                    classData.spellcasting.ability === 'intelligence' ? int :
                    classData.spellcasting.ability === 'wisdom' ? wis :
                    classData.spellcasting.ability === 'charisma' ? cha : 10
                  )}
                </div>
              </div>
            </div>
            
            {character.spells && character.spells.length > 0 && (
              <div className="spells-known">
                <h3>Spells Known</h3>
                <ul>
                  {character.spells.map((spell, index) => (
                    <li key={index}>{spell}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet