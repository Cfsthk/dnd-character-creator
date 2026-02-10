import { races } from '../data/raceData'
import { classes } from '../data/classData'

const CharacterSheet = ({ character }) => {
  const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const getAbilityModifierNum = (score) => {
    return Math.floor((score - 10) / 2)
  }

  const getProficiencyBonus = () => 2 // Level 1 default

  const raceData = character.race ? races[character.race] : null
  const classData = character.class ? classes[character.class] : null

  // Calculate Armor Class (AC)
  const calculateAC = () => {
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    const equipment = character.equipment || []
    
    // Check for armor
    const hasLightArmor = equipment.some(e => e.includes('皮甲') || e.includes('Leather'))
    const hasChainShirt = equipment.some(e => e.includes('鎖甲衫') || e.includes('Chain Shirt'))
    const hasChainMail = equipment.some(e => e.includes('鎖子甲') || e.includes('Chain Mail'))
    const hasSplint = equipment.some(e => e.includes('板條甲') || e.includes('Splint'))
    const hasPlate = equipment.some(e => e.includes('板甲') || e.includes('Plate'))
    const hasShield = equipment.some(e => e.includes('盾牌') || e.includes('Shield'))
    
    let baseAC = 10 + dexMod // Unarmored
    
    if (hasPlate) baseAC = 18
    else if (hasSplint) baseAC = 17
    else if (hasChainMail) baseAC = 16
    else if (hasChainShirt) baseAC = 13 + Math.min(dexMod, 2)
    else if (hasLightArmor) baseAC = 11 + dexMod
    
    // Monk unarmored defense
    if (character.class === 'monk' && !hasLightArmor && !hasChainShirt && !hasChainMail && !hasSplint && !hasPlate) {
      const wisMod = getAbilityModifierNum(character.abilities?.wisdom || 10)
      baseAC = 10 + dexMod + wisMod
    }
    
    // Barbarian unarmored defense
    if (character.class === 'barbarian' && !hasLightArmor && !hasChainShirt && !hasChainMail && !hasSplint && !hasPlate) {
      const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
      baseAC = 10 + dexMod + conMod
    }
    
    // Add shield bonus
    if (hasShield) baseAC += 2
    
    return baseAC
  }

  // Calculate Spell Save DC
  const calculateSpellDC = () => {
    if (!classData) return null
    
    let spellcastingAbility = null
    switch (character.class) {
      case 'wizard':
        spellcastingAbility = 'intelligence'
        break
      case 'cleric':
      case 'druid':
      case 'ranger':
        spellcastingAbility = 'wisdom'
        break
      case 'bard':
      case 'paladin':
      case 'sorcerer':
      case 'warlock':
        spellcastingAbility = 'charisma'
        break
      default:
        return null
    }
    
    if (!spellcastingAbility) return null
    
    const abilityMod = getAbilityModifierNum(character.abilities?.[spellcastingAbility] || 10)
    const profBonus = getProficiencyBonus()
    return 8 + profBonus + abilityMod
  }

  // Calculate weapon damage
  const calculateWeaponDamage = (weaponName) => {
    const strMod = getAbilityModifierNum(character.abilities?.strength || 10)
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    const profBonus = getProficiencyBonus()
    
    // Weapon damage dice mapping
    const weaponData = {
      '長劍': { damage: '1d8', finesse: false, versatile: '1d10' },
      'Longsword': { damage: '1d8', finesse: false, versatile: '1d10' },
      '短劍': { damage: '1d6', finesse: true },
      'Shortsword': { damage: '1d6', finesse: true },
      '匕首': { damage: '1d4', finesse: true },
      'Dagger': { damage: '1d4', finesse: true },
      '長弓': { damage: '1d8', finesse: false, ranged: true },
      'Longbow': { damage: '1d8', finesse: false, ranged: true },
      '短弓': { damage: '1d6', finesse: false, ranged: true },
      'Shortbow': { damage: '1d6', finesse: false, ranged: true },
      '戰斧': { damage: '1d8', finesse: false, versatile: '1d10' },
      'Battleaxe': { damage: '1d8', finesse: false, versatile: '1d10' },
      '巨劍': { damage: '2d6', finesse: false, twohanded: true },
      'Greatsword': { damage: '2d6', finesse: false, twohanded: true },
      '巨斧': { damage: '1d12', finesse: false, twohanded: true },
      'Greataxe': { damage: '1d12', finesse: false, twohanded: true },
      '長槍': { damage: '1d6', finesse: false, versatile: '1d8' },
      'Spear': { damage: '1d6', finesse: false, versatile: '1d8' },
      '輕弩': { damage: '1d8', finesse: false, ranged: true },
      'Light Crossbow': { damage: '1d8', finesse: false, ranged: true },
      '重弩': { damage: '1d10', finesse: false, ranged: true },
      'Heavy Crossbow': { damage: '1d10', finesse: false, ranged: true },
      '戰錘': { damage: '1d8', finesse: false, versatile: '1d10' },
      'Warhammer': { damage: '1d8', finesse: false, versatile: '1d10' },
      '木棒': { damage: '1d4', finesse: false },
      'Club': { damage: '1d4', finesse: false },
      '法杖': { damage: '1d6', finesse: false, versatile: '1d8' },
      'Quarterstaff': { damage: '1d6', finesse: false, versatile: '1d8' }
    }
    
    const weapon = weaponData[weaponName]
    if (!weapon) return null
    
    const useDex = weapon.finesse || weapon.ranged
    const abilityMod = useDex ? Math.max(strMod, dexMod) : (weapon.ranged ? dexMod : strMod)
    const attackBonus = abilityMod + profBonus
    const attackBonusStr = attackBonus >= 0 ? `+${attackBonus}` : `${attackBonus}`
    const damageMod = abilityMod >= 0 ? `+${abilityMod}` : `${abilityMod}`
    
    return {
      attack: attackBonusStr,
      damage: `${weapon.damage}${damageMod}`,
      versatile: weapon.versatile ? `${weapon.versatile}${damageMod}` : null
    }
  }

  // Get spell damage by level
  const getSpellDamage = () => {
    if (!classData) return []
    
    const spells = {
      wizard: [
        { name: '火焰箭 (Fire Bolt)', damage: '1d10', type: '火焰' },
        { name: '光芒閃爍 (Ray of Frost)', damage: '1d8', type: '寒冷' },
        { name: '魔法飛彈 (Magic Missile)', damage: '3 × (1d4+1)', type: '力場' },
        { name: '燃燒之手 (Burning Hands)', damage: '3d6', type: '火焰', save: true }
      ],
      cleric: [
        { name: '聖焰 (Sacred Flame)', damage: '1d8', type: '光耀', save: true },
        { name: '導引箭矢 (Guiding Bolt)', damage: '4d6', type: '光耀' },
        { name: '造成傷口 (Inflict Wounds)', damage: '3d10', type: '黯蝕' }
      ],
      druid: [
        { name: '荊棘鞭 (Thorn Whip)', damage: '1d6', type: '穿刺' },
        { name: '雷鳴波 (Thunderwave)', damage: '2d8', type: '雷鳴', save: true },
        { name: '導引箭矢 (Guiding Bolt)', damage: '4d6', type: '光耀' }
      ],
      sorcerer: [
        { name: '火焰箭 (Fire Bolt)', damage: '1d10', type: '火焰' },
        { name: '魔法飛彈 (Magic Missile)', damage: '3 × (1d4+1)', type: '力場' },
        { name: '燃燒之手 (Burning Hands)', damage: '3d6', type: '火焰', save: true }
      ],
      warlock: [
        { name: '魔能爆 (Eldritch Blast)', damage: '1d10', type: '力場' },
        { name: '魔焰劍 (Hellish Rebuke)', damage: '2d10', type: '火焰', save: true },
        { name: '妖火 (Hex)', damage: '+1d6', type: '黯蝕' }
      ],
      bard: [
        { name: '惡意嘲諷 (Vicious Mockery)', damage: '1d4', type: '心靈', save: true },
        { name: '雷鳴波 (Thunderwave)', damage: '2d8', type: '雷鳴', save: true },
        { name: '失心狂笑 (Tasha\\'s Hideous Laughter)', damage: '無', type: '控制' }
      ],
      paladin: [
        { name: '制裁邪惡 (Divine Smite)', damage: '+2d8', type: '光耀', note: '近戰時額外傷害' }
      ],
      ranger: [
        { name: '獵人印記 (Hunter\\'s Mark)', damage: '+1d6', type: '額外', note: '標記目標' }
      ]
    }
    
    return spells[character.class] || []
  }

  const savingThrows = {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false
  }

  // Set proficiency based on class
  if (classData) {
    switch (character.class) {
      case 'barbarian':
      case 'fighter':
        savingThrows.strength = true
        savingThrows.constitution = true
        break
      case 'monk':
      case 'ranger':
      case 'rogue':
        savingThrows.strength = true
        savingThrows.dexterity = true
        break
      case 'wizard':
        savingThrows.intelligence = true
        savingThrows.wisdom = true
        break
      case 'cleric':
      case 'druid':
        savingThrows.wisdom = true
        savingThrows.charisma = true
        break
      case 'bard':
      case 'paladin':
      case 'sorcerer':
      case 'warlock':
        savingThrows.dexterity = true
        savingThrows.charisma = true
        break
    }
  }

  // Ability names in Traditional Chinese
  const abilityNames = {
    strength: '力量',
    dexterity: '敏捷',
    constitution: '體質',
    intelligence: '智力',
    wisdom: '睿智',
    charisma: '魅力'
  }

  const skills = [
    { name: 'Acrobatics', nameChinese: '特技', ability: 'dexterity' },
    { name: 'Animal Handling', nameChinese: '馴獸', ability: 'wisdom' },
    { name: 'Arcana', nameChinese: '奧秘', ability: 'intelligence' },
    { name: 'Athletics', nameChinese: '運動', ability: 'strength' },
    { name: 'Deception', nameChinese: '欺瞞', ability: 'charisma' },
    { name: 'History', nameChinese: '歷史', ability: 'intelligence' },
    { name: 'Insight', nameChinese: '洞察', ability: 'wisdom' },
    { name: 'Intimidation', nameChinese: '威嚇', ability: 'charisma' },
    { name: 'Investigation', nameChinese: '調查', ability: 'intelligence' },
    { name: 'Medicine', nameChinese: '醫術', ability: 'wisdom' },
    { name: 'Nature', nameChinese: '自然', ability: 'intelligence' },
    { name: 'Perception', nameChinese: '察覺', ability: 'wisdom' },
    { name: 'Performance', nameChinese: '表演', ability: 'charisma' },
    { name: 'Persuasion', nameChinese: '說服', ability: 'charisma' },
    { name: 'Religion', nameChinese: '宗教', ability: 'intelligence' },
    { name: 'Sleight of Hand', nameChinese: '巧手', ability: 'dexterity' },
    { name: 'Stealth', nameChinese: '隱匿', ability: 'dexterity' },
    { name: 'Survival', nameChinese: '生存', ability: 'wisdom' }
  ]

  const getSkillModifier = (ability) => {
    const score = character.abilities?.[ability] || 10
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const getSavingThrowModifier = (ability) => {
    const score = character.abilities?.[ability] || 10
    const mod = Math.floor((score - 10) / 2)
    const profBonus = savingThrows[ability] ? 2 : 0
    const total = mod + profBonus
    return total >= 0 ? `+${total}` : `${total}`
  }

  const ac = calculateAC()
  const spellDC = calculateSpellDC()
  const spellDamageList = getSpellDamage()

  return (
    <div className="character-sheet">
      <div className="sheet-header">
        <h1>{character.name || '未命名角色'}</h1>
        <div className="character-info">
          <p>種族: {raceData?.name || '未選擇'}</p>
          <p>職業: {classData?.name || '未選擇'}</p>
          <p>背景: {character.background || '未選擇'}</p>
          <p>等級: 1</p>
        </div>
      </div>

      {/* Combat Stats Section */}
      <div className="combat-stats-section">
        <h2>戰鬥數據</h2>
        <div className="combat-stats-grid">
          <div className="stat-box">
            <div className="stat-label">護甲等級 (AC)</div>
            <div className="stat-value large">{ac}</div>
          </div>
          {spellDC && (
            <div className="stat-box">
              <div className="stat-label">法術豁免DC</div>
              <div className="stat-value large">{spellDC}</div>
            </div>
          )}
          <div className="stat-box">
            <div className="stat-label">生命值 (HP)</div>
            <div className="stat-value large">
              {classData?.hitDie ? classData.hitDie + getAbilityModifierNum(character.abilities?.constitution || 10) : '---'}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">先攻加值</div>
            <div className="stat-value large">
              {getAbilityModifier(character.abilities?.dexterity || 10)}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">熟練加值</div>
            <div className="stat-value large">+{getProficiencyBonus()}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">速度</div>
            <div className="stat-value large">{raceData?.speed || 30} 呎</div>
          </div>
        </div>
      </div>

      {/* Weapons Section */}
      {character.equipment && character.equipment.length > 0 && (
        <div className="weapons-section">
          <h2>武器與攻擊</h2>
          <div className="weapons-list">
            {character.equipment.filter(e => {
              const weaponKeywords = ['劍', '弓', '斧', '槍', '錘', '弩', '棒', '杖', 'sword', 'bow', 'axe', 'spear', 'hammer', 'crossbow', 'club', 'staff']
              return weaponKeywords.some(keyword => e.toLowerCase().includes(keyword.toLowerCase()))
            }).map((weapon, index) => {
              const damageData = calculateWeaponDamage(weapon)
              if (!damageData) return null
              return (
                <div key={index} className="weapon-item">
                  <div className="weapon-name">{weapon}</div>
                  <div className="weapon-stats">
                    <span className="attack-bonus">命中: {damageData.attack}</span>
                    <span className="damage">傷害: {damageData.damage}</span>
                    {damageData.versatile && (
                      <span className="versatile">雙手: {damageData.versatile}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Spells Section */}
      {spellDamageList.length > 0 && (
        <div className="spells-section">
          <h2>法術與傷害</h2>
          <div className="spells-list">
            {spellDamageList.map((spell, index) => (
              <div key={index} className="spell-item">
                <div className="spell-name">{spell.name}</div>
                <div className="spell-stats">
                  <span className="spell-damage">傷害: {spell.damage}</span>
                  <span className="damage-type">類型: {spell.type}</span>
                  {spell.save && <span className="spell-save">DC {spellDC} 豁免</span>}
                  {spell.note && <span className="spell-note">{spell.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Abilities Section */}
      <div className="abilities-section">
        <h2>屬性值</h2>
        <div className="abilities-grid">
          {Object.entries(abilityNames).map(([key, name]) => (
            <div key={key} className="ability-box">
              <div className="ability-name">{name}</div>
              <div className="ability-score">{character.abilities?.[key] || 10}</div>
              <div className="ability-modifier">{getAbilityModifier(character.abilities?.[key] || 10)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Saving Throws Section */}
      <div className="saves-section">
        <h2>豁免擲骰</h2>
        <div className="saves-list">
          {Object.entries(abilityNames).map(([key, name]) => (
            <div key={key} className="save-item">
              <input 
                type="checkbox" 
                checked={savingThrows[key]} 
                readOnly 
              />
              <span className="save-modifier">{getSavingThrowModifier(key)}</span>
              <span className="save-name">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2>技能</h2>
        <div className="skills-list">
          {skills.map((skill, index) => {
            const isProficient = character.skills?.includes(skill.name)
            const abilityScore = character.abilities?.[skill.ability] || 10
            const abilityMod = Math.floor((abilityScore - 10) / 2)
            const profBonus = isProficient ? 2 : 0
            const total = abilityMod + profBonus
            const modifier = total >= 0 ? `+${total}` : `${total}`
            
            return (
              <div key={index} className="skill-item">
                <input 
                  type="checkbox" 
                  checked={isProficient} 
                  readOnly 
                />
                <span className="skill-modifier">{modifier}</span>
                <span className="skill-name">{skill.nameChinese}</span>
                <span className="skill-ability">({abilityNames[skill.ability]})</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Equipment Section */}
      {character.equipment && character.equipment.length > 0 && (
        <div className="equipment-section">
          <h2>裝備</h2>
          <ul className="equipment-list">
            {character.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Features Section */}
      <div className="features-section">
        <h2>特性與能力</h2>
        <div className="features-list">
          {raceData?.traits && (
            <div className="feature-group">
              <h3>種族特性</h3>
              <ul>
                {raceData.traits.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>
          )}
          {classData?.features && (
            <div className="feature-group">
              <h3>職業特性</h3>
              <ul>
                {classData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .character-sheet {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }
        
        .sheet-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #8b4513;
        }
        
        .sheet-header h1 {
          font-size: 2.5em;
          margin: 0 0 10px 0;
          color: #2c1810;
        }
        
        .character-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          font-size: 1.1em;
        }
        
        .combat-stats-section {
          margin: 30px 0;
          padding: 20px;
          background: #f5f5dc;
          border-radius: 8px;
          border: 2px solid #8b4513;
        }
        
        .combat-stats-section h2 {
          text-align: center;
          color: #8b4513;
          margin-top: 0;
        }
        
        .combat-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .stat-box {
          background: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #d2691e;
        }
        
        .stat-label {
          font-size: 0.9em;
          color: #666;
          margin-bottom: 8px;
        }
        
        .stat-value {
          font-size: 1.5em;
          font-weight: bold;
          color: #2c1810;
        }
        
        .stat-value.large {
          font-size: 2em;
        }
        
        .weapons-section,
        .spells-section {
          margin: 30px 0;
          padding: 20px;
          background: #fff9e6;
          border-radius: 8px;
          border: 2px solid #8b4513;
        }
        
        .weapons-section h2,
        .spells-section h2 {
          color: #8b4513;
          margin-top: 0;
        }
        
        .weapons-list,
        .spells-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .weapon-item,
        .spell-item {
          background: white;
          padding: 12px 15px;
          border-radius: 6px;
          border-left: 4px solid #d2691e;
        }
        
        .weapon-name,
        .spell-name {
          font-weight: bold;
          font-size: 1.1em;
          color: #2c1810;
          margin-bottom: 5px;
        }
        
        .weapon-stats,
        .spell-stats {
          display: flex;
          gap: 15px;
          font-size: 0.95em;
          color: #555;
        }
        
        .attack-bonus,
        .damage,
        .versatile,
        .spell-damage,
        .damage-type,
        .spell-save,
        .spell-note {
          padding: 3px 8px;
          background: #f0f0f0;
          border-radius: 4px;
        }
        
        .abilities-section {
          margin: 30px 0;
        }
        
        .abilities-section h2 {
          text-align: center;
          color: #8b4513;
        }
        
        .abilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }
        
        .ability-box {
          background: #f5f5dc;
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }
        
        .ability-name {
          font-weight: bold;
          color: #8b4513;
          margin-bottom: 5px;
        }
        
        .ability-score {
          font-size: 2em;
          font-weight: bold;
          color: #2c1810;
        }
        
        .ability-modifier {
          font-size: 1.2em;
          color: #666;
          margin-top: 5px;
        }
        
        .saves-section,
        .skills-section {
          margin: 30px 0;
        }
        
        .saves-section h2,
        .skills-section h2 {
          color: #8b4513;
        }
        
        .saves-list,
        .skills-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 8px;
        }
        
        .save-item,
        .skill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        
        .save-modifier,
        .skill-modifier {
          min-width: 40px;
          text-align: center;
          font-weight: bold;
          color: #2c1810;
        }
        
        .equipment-section {
          margin: 30px 0;
        }
        
        .equipment-section h2 {
          color: #8b4513;
        }
        
        .equipment-list {
          list-style-type: none;
          padding: 0;
        }
        
        .equipment-list li {
          padding: 8px 12px;
          margin: 5px 0;
          background: #f9f9f9;
          border-left: 3px solid #d2691e;
          border-radius: 4px;
        }
        
        .features-section {
          margin: 30px 0;
        }
        
        .features-section h2 {
          color: #8b4513;
        }
        
        .feature-group {
          margin: 20px 0;
        }
        
        .feature-group h3 {
          color: #2c1810;
        }
        
        .feature-group ul {
          list-style-type: disc;
          padding-left: 25px;
        }
        
        .feature-group li {
          margin: 8px 0;
          line-height: 1.6;
        }
        
        @media print {
          .character-sheet {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default CharacterSheet
