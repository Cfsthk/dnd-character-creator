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

  // Calculate Maximum HP (Hit Die + Constitution Modifier)
  const calculateMaxHP = () => {
    if (!classData) return 0
    const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
    
    // For level 1: max hit die value + CON modifier
    // E.g., d12 = 12 + CON mod, d10 = 10 + CON mod
    const hitDieValue = parseInt(classData.hitDie.replace('d', ''))
    return hitDieValue + conMod
  }

  // Calculate Spell Save DC (8 + proficiency + spellcasting ability modifier)
  const calculateSpellDC = () => {
    if (!classData) return 0
    
    // Determine spellcasting ability based on class
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

  // Calculate Spell Attack Bonus (proficiency + spellcasting ability modifier)
  const calculateSpellAttackBonus = () => {
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
    
    const bonus = getProficiencyBonus() + spellcastingAbility
    return bonus >= 0 ? `+${bonus}` : `${bonus}`
  }

  // Calculate Armor Class (AC)
  const calculateAC = () => {
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    const equipment = character.equipment || []

    const hasLightArmor = equipment.some(e => e.includes('皮甲') || e.includes('Leather'))
    const hasChainShirt = equipment.some(e => e.includes('鎖甲衫') || e.includes('Chain Shirt'))
    const hasChainMail = equipment.some(e => e.includes('鎖子甲') || e.includes('Chain Mail'))
    const hasSplint = equipment.some(e => e.includes('板條甲') || e.includes('Splint'))
    const hasPlate = equipment.some(e => e.includes('板甲') || e.includes('Plate'))
    const hasShield = equipment.some(e => e.includes('盾牌') || e.includes('Shield'))

    let baseAC = 10 + dexMod

    if (hasPlate) baseAC = 18
    else if (hasSplint) baseAC = 17
    else if (hasChainMail) baseAC = 16
    else if (hasChainShirt) baseAC = 13 + Math.min(dexMod, 2)
    else if (hasLightArmor) baseAC = 11 + dexMod

    if (hasShield) baseAC += 2

    return baseAC
  }

  // Parse weapons from equipment
  const getWeapons = () => {
    const equipment = character.equipment || []
    const weaponKeywords = [
      'sword', '劍', 'axe', '斧', 'mace', '錘', 'bow', '弓',
      'dagger', '匕首', 'spear', '矛', 'staff', '杖', 'crossbow', '弩'
    ]
    
    return equipment.filter(item => 
      weaponKeywords.some(keyword => item.toLowerCase().includes(keyword.toLowerCase()))
    )
  }

  // Calculate weapon attack bonus and damage
  const getWeaponStats = (weaponName) => {
    const strMod = getAbilityModifierNum(character.abilities?.strength || 10)
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    const profBonus = getProficiencyBonus()

    // Determine if weapon uses STR or DEX
    const isFinesseOrRanged = weaponName.match(/(bow|弓|crossbow|弩|dagger|匕首|rapier|細劍|短劍)/i)
    const attackMod = isFinesseOrRanged ? dexMod : strMod
    const attackBonus = profBonus + attackMod

    // Determine damage die based on weapon name
    let damageDie = '1d8'
    if (weaponName.match(/(greatsword|大劍|greataxe|巨斧)/i)) damageDie = '2d6'
    else if (weaponName.match(/(longsword|長劍|battleaxe|戰斧)/i)) damageDie = '1d8'
    else if (weaponName.match(/(shortsword|短劍|mace|錘)/i)) damageDie = '1d6'
    else if (weaponName.match(/(dagger|匕首)/i)) damageDie = '1d4'
    else if (weaponName.match(/(longbow|長弓)/i)) damageDie = '1d8'
    else if (weaponName.match(/(shortbow|短弓|crossbow|弩)/i)) damageDie = '1d6'

    return {
      attackBonus: attackBonus >= 0 ? `+${attackBonus}` : `${attackBonus}`,
      damage: `${damageDie}+${attackMod >= 0 ? attackMod : attackMod}`
    }
  }

  const maxHP = calculateMaxHP()
  const spellDC = calculateSpellDC()
  const spellAttackBonus = calculateSpellAttackBonus()
  const weapons = getWeapons()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#f5e6d3] border-4 border-[#8b4513] rounded-lg shadow-2xl font-serif">
      {/* Header with D&D Logo */}
      <div className="text-center mb-6 pb-4 border-b-4 border-[#8b4513]">
        <div className="text-5xl font-bold text-[#8b0000] mb-2">
          DUNGEONS & DRAGONS
        </div>
        <div className="text-xl text-gray-700">角色卡 CHARACTER SHEET</div>
      </div>

      {/* Character Basic Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1">
          <label className="text-sm text-gray-600">角色名字 Character Name</label>
          <div className="text-2xl font-bold border-b-2 border-gray-600 pb-1">
            {character.name || '未命名'}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">職業 Class</label>
          <div className="text-xl font-bold border-b-2 border-gray-600 pb-1">
            {classData?.name || character.class}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">種族 Race</label>
          <div className="text-xl font-bold border-b-2 border-gray-600 pb-1">
            {raceData?.name || character.race}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-600">等級 Level</label>
          <div className="text-xl font-bold border-b-2 border-gray-600 pb-1">1</div>
        </div>
        <div>
          <label className="text-sm text-gray-600">背景 Background</label>
          <div className="text-lg border-b-2 border-gray-600 pb-1">
            {character.background || '-'}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">陣營 Alignment</label>
          <div className="text-lg border-b-2 border-gray-600 pb-1">
            {character.alignment || '-'}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">經驗值 XP</label>
          <div className="text-lg border-b-2 border-gray-600 pb-1">0</div>
        </div>
      </div>

      {/* Main Stats Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Column: Ability Scores */}
        <div className="col-span-1 space-y-3">
          <h3 className="text-lg font-bold text-center bg-[#8b4513] text-white py-1 rounded">
            屬性值 ABILITY SCORES
          </h3>
          {[
            { key: 'strength', label: '力量 STR', labelEn: 'Strength' },
            { key: 'dexterity', label: '敏捷 DEX', labelEn: 'Dexterity' },
            { key: 'constitution', label: '體質 CON', labelEn: 'Constitution' },
            { key: 'intelligence', label: '智力 INT', labelEn: 'Intelligence' },
            { key: 'wisdom', label: '感知 WIS', labelEn: 'Wisdom' },
            { key: 'charisma', label: '魅力 CHA', labelEn: 'Charisma' }
          ].map(({ key, label, labelEn }) => {
            const score = character.abilities?.[key] || 10
            const modifier = getAbilityModifier(score)
            return (
              <div key={key} className="flex items-center justify-between bg-white p-2 rounded border-2 border-gray-400">
                <div className="flex-1">
                  <div className="text-xs text-gray-600">{label}</div>
                  <div className="text-sm font-bold">{labelEn}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-3 border-gray-600 flex items-center justify-center bg-gray-100">
                    <span className="text-2xl font-bold">{modifier}</span>
                  </div>
                  <div className="w-10 h-10 border-2 border-gray-400 flex items-center justify-center bg-white rounded">
                    <span className="text-lg">{score}</span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Proficiency Bonus */}
          <div className="bg-white p-3 rounded border-2 border-gray-400 text-center">
            <div className="text-sm text-gray-600 mb-1">熟練加值</div>
            <div className="text-sm font-bold mb-1">PROFICIENCY BONUS</div>
            <div className="text-3xl font-bold text-[#8b0000]">
              +{getProficiencyBonus()}
            </div>
          </div>
        </div>

        {/* Middle Column: Combat Stats */}
        <div className="col-span-1 space-y-4">
          {/* AC, HP, Speed */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded border-2 border-gray-400 text-center">
              <div className="text-2xl font-bold">{calculateAC()}</div>
              <div className="text-xs text-gray-600">護甲等級</div>
              <div className="text-xs font-bold">Armor Class</div>
            </div>
            <div className="bg-white p-3 rounded border-2 border-gray-400 text-center">
              <div className="text-2xl font-bold">{maxHP}</div>
              <div className="text-xs text-gray-600">最大生命值</div>
              <div className="text-xs font-bold">Hit Point Max</div>
            </div>
            <div className="bg-white p-3 rounded border-2 border-gray-400 text-center">
              <div className="text-2xl font-bold">30</div>
              <div className="text-xs text-gray-600">速度</div>
              <div className="text-xs font-bold">Speed</div>
            </div>
          </div>

          {/* Hit Dice */}
          <div className="bg-white p-3 rounded border-2 border-gray-400">
            <div className="text-sm text-gray-600 mb-1">生命骰 Hit Dice</div>
            <div className="text-2xl font-bold text-center">
              1{classData?.hitDie || 'd8'}
            </div>
            <div className="text-xs text-center text-gray-500 mt-1">
              總數 Total: 1 | 剩餘 Remaining: 1
            </div>
          </div>

          {/* Death Saves */}
          <div className="bg-white p-3 rounded border-2 border-gray-400">
            <div className="text-sm font-bold mb-2">死亡豁免 DEATH SAVES</div>
            <div className="flex justify-between text-xs">
              <div>
                <div className="font-bold mb-1">成功 Successes</div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">失敗 Failures</div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Spell DC (if spellcaster) */}
          {['cleric', 'wizard', 'sorcerer', 'bard', 'druid', 'warlock', 'paladin', 'ranger'].includes(classData?.nameEn?.toLowerCase()) && (
            <div className="bg-white p-3 rounded border-2 border-gray-400">
              <div className="text-sm font-bold mb-2 text-center">施法能力 SPELLCASTING</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8b0000]">{spellDC}</div>
                  <div className="text-xs text-gray-600">法術豁免DC</div>
                  <div className="text-xs font-bold">Spell Save DC</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8b0000]">{spellAttackBonus}</div>
                  <div className="text-xs text-gray-600">法術攻擊加值</div>
                  <div className="text-xs font-bold">Spell Attack</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Skills */}
        <div className="col-span-1">
          <div className="bg-white p-3 rounded border-2 border-gray-400 h-full">
            <h3 className="text-sm font-bold mb-2 text-center bg-[#8b4513] text-white py-1 rounded">
              技能 SKILLS
            </h3>
            <div className="space-y-1 text-xs">
              {[
                { name: '特技 Acrobatics', ability: 'dexterity' },
                { name: '動物馴養 Animal Handling', ability: 'wisdom' },
                { name: '奧秘 Arcana', ability: 'intelligence' },
                { name: '運動 Athletics', ability: 'strength' },
                { name: '欺瞞 Deception', ability: 'charisma' },
                { name: '歷史 History', ability: 'intelligence' },
                { name: '洞察 Insight', ability: 'wisdom' },
                { name: '威嚇 Intimidation', ability: 'charisma' },
                { name: '調查 Investigation', ability: 'intelligence' },
                { name: '醫藥 Medicine', ability: 'wisdom' },
                { name: '自然 Nature', ability: 'intelligence' },
                { name: '察覺 Perception', ability: 'wisdom' },
                { name: '表演 Performance', ability: 'charisma' },
                { name: '說服 Persuasion', ability: 'charisma' },
                { name: '宗教 Religion', ability: 'intelligence' },
                { name: '巧手 Sleight of Hand', ability: 'dexterity' },
                { name: '隱匿 Stealth', ability: 'dexterity' },
                { name: '生存 Survival', ability: 'wisdom' }
              ].map((skill, index) => {
                const abilityScore = character.abilities?.[skill.ability] || 10
                const modifier = getAbilityModifierNum(abilityScore)
                const isProficient = character.skills?.includes(skill.name.split(' ')[1]) || 
                                    character.skills?.includes(skill.name.split(' ')[0])
                const totalModifier = isProficient ? modifier + getProficiencyBonus() : modifier
                const displayMod = totalModifier >= 0 ? `+${totalModifier}` : `${totalModifier}`
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 border-2 rounded-full ${isProficient ? 'bg-gray-800' : 'border-gray-400'}`}></div>
                    <div className="w-8 text-right font-bold">{displayMod}</div>
                    <div className="flex-1">{skill.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Attacks & Weapons */}
      <div className="mb-6 bg-white p-4 rounded border-2 border-gray-400">
        <h3 className="text-lg font-bold mb-3 bg-[#8b4513] text-white py-1 px-2 rounded">
          攻擊 & 武器 ATTACKS & SPELLCASTING
        </h3>
        <div className="grid grid-cols-12 gap-2 text-sm font-bold mb-2 text-center">
          <div className="col-span-5">名稱 NAME</div>
          <div className="col-span-3">攻擊加值 ATK BONUS</div>
          <div className="col-span-4">傷害/類型 DAMAGE/TYPE</div>
        </div>
        {weapons.length > 0 ? (
          weapons.map((weapon, index) => {
            const stats = getWeaponStats(weapon)
            return (
              <div key={index} className="grid grid-cols-12 gap-2 text-sm py-2 border-b border-gray-300">
                <div className="col-span-5 font-bold">{weapon}</div>
                <div className="col-span-3 text-center">{stats.attackBonus}</div>
                <div className="col-span-4 text-center">{stats.damage}</div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-500 py-4">未裝備武器 No weapons equipped</div>
        )}
      </div>

      {/* Features & Traits */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Class Features */}
        <div className="bg-white p-4 rounded border-2 border-gray-400">
          <h3 className="text-lg font-bold mb-3 bg-[#8b4513] text-white py-1 px-2 rounded">
            職業能力 CLASS FEATURES
          </h3>
          <div className="space-y-2 text-sm">
            {classData?.keyFeatures && Array.isArray(classData.keyFeatures) && classData.keyFeatures.length > 0 ? (
              classData.keyFeatures.map((feature, index) => (
                <div key={index} className="pb-2 border-b border-gray-200">
                  <div className="font-bold">{feature.split(' - ')[0] || feature.split('(')[0]}</div>
                  <div className="text-gray-600 text-xs">
                    {feature.split(' - ')[1] || feature.split(')')[1] || ''}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-2">無職業能力資料</div>
            )}
          </div>
        </div>

        {/* Race Traits */}
        <div className="bg-white p-4 rounded border-2 border-gray-400">
          <h3 className="text-lg font-bold mb-3 bg-[#8b4513] text-white py-1 px-2 rounded">
            種族特性 RACE TRAITS
          </h3>
          <div className="space-y-2 text-sm">
            {raceData?.traits && Array.isArray(raceData.traits) && raceData.traits.length > 0 ? (
              raceData.traits.map((trait, index) => (
                <div key={index} className="pb-2 border-b border-gray-200">
                  <div className="font-bold">{trait.name || trait}</div>
                  <div className="text-gray-600 text-xs">
                    {trait.description || ''}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-2">無種族特性資料</div>
            )}
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white p-4 rounded border-2 border-gray-400 mb-6">
        <h3 className="text-lg font-bold mb-3 bg-[#8b4513] text-white py-1 px-2 rounded">
          裝備 EQUIPMENT
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {character.equipment && character.equipment.length > 0 ? (
            character.equipment.map((item, index) => (
              <div key={index} className="text-sm py-1 px-2 bg-gray-50 rounded border border-gray-300">
                {item}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-4">無裝備 No equipment</div>
          )}
        </div>
      </div>

      {/* Languages */}
      {character.languages && character.languages.length > 0 && (
        <div className="bg-white p-4 rounded border-2 border-gray-400">
          <h3 className="text-lg font-bold mb-3 bg-[#8b4513] text-white py-1 px-2 rounded">
            語言 LANGUAGES
          </h3>
          <div className="flex flex-wrap gap-2">
            {character.languages.map((lang, index) => (
              <div key={index} className="px-3 py-1 bg-gray-100 rounded border border-gray-300 text-sm">
                {lang}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterSheet
