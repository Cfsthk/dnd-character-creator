import { races } from '../data/raceData'
import { classes } from '../data/classData'

const CharacterSheet = ({ character }) => {
  const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const getProficiencyBonus = () => '+2' // Level 1 default

  const raceData = character.race ? races[character.race] : null
  const classData = character.class ? classes[character.class] : null

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
    { name: 'Acrobatics', nameChines: '特技', ability: 'dexterity' },
    { name: 'Animal Handling', nameChinese: '馴獸動物', ability: 'wisdom' },
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
    const baseMod = Math.floor((score - 10) / 2)
    const prof = savingThrows[ability] ? 2 : 0 // Level 1 proficiency bonus
    const total = baseMod + prof
    return total >= 0 ? `+${total}` : `${total}`
  }

  const getAC = () => {
    const dexMod = Math.floor(((character.abilities?.dexterity || 10) - 10) / 2)
    if (character.armor) {
      return character.armor.ac + dexMod
    }
    return 10 + dexMod
  }

  const getInitiative = () => {
    const dexMod = Math.floor(((character.abilities?.dexterity || 10) - 10) / 2)
    return dexMod >= 0 ? `+${dexMod}` : `${dexMod}`
  }

  const getSpeed = () => {
    return raceData?.speed || 30
  }

  const getHP = () => {
    const conMod = Math.floor(((character.abilities?.constitution || 10) - 10) / 2)
    if (classData) {
      return classData.hitDie + conMod
    }
    return 8 + conMod
  }

  const getHitDice = () => {
    if (classData) {
      return `1d${classData.hitDie}`
    }
    return '1d8'
  }

  const getProficiencies = () => {
    const all = []

    if (raceData?.traits) {
      const profTrait = raceData.traits.find(t => t.name.includes('Proficiency') || t.name.includes('Training'))
      if (profTrait) {
        all.push(profTrait.description)
      }
    }

    if (classData) {
      if (classData.armorProficiencies) {
        all.push(`裝甲熟練：${classData.armorProficiencies.join('、')}`)
      }
      if (classData.weaponProficiencies) {
        all.push(`武器熟練：${classData.weaponProficiencies.join('、')}`)
      }
      if (classData.tools) {
        all.push(`工具：${classData.tools.join('、')}`)
      }
    }

    return all
  }

  const getLanguages = () => {
    const langs = ['通用'] // Default Common
    if (raceData?.languages) {
      langs.push(...raceData.languages)
    }
    return langs
  }

  const getFeaturesAndTraits = () => {
    const all = []

    if (raceData?.traits) {
      all.push(...raceData.traits)
    }

    if (classData?.features) {
      all.push(...classData.features.filter(f => f.level === 1))
    }

    return all
  }

  const getEquipment = () => {
    const items = []
    if (character.weapon) items.push(character.weapon.name)
    if (character.armor) items.push(character.armor.name)
    if (character.equipment) items.push(...character.equipment)
    return items
  }

  return (
    <div className="character-sheet px-8 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
          <h1 className="text-4xl font-bold mb-2">{character.name || '未命名角色'}</h1>
          <div className="text-xl text-gray-700">
            {character.race && raceData?.nameChinese || character.race} {' '}
            {character.class && classData?.nameChinese || character.class}
          </div>
        </div>

        {/* Ability Scores */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">能力值</h2>
          <div className="grid grid-cols-6 gap-4">
            {Object.entries(character.abilities || {}).map(([ability, score]) => {
              const modifier = getAbilityModifier(score)
              return (
                <div key={ability} className="text-center bg-gray-50 p-3 rounded">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    {abilityNames[ability] || ability}
                  </div>
                  <div className="text-3xl font-bold mb-1">{score}</div>
                  <div className="text-sm text-gray-600">{modifier}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Combat Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">裝甲值 (AC)</div>
            <div className="text-3xl font-bold">{getAC()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">先攻權 (Initiative)</div>
            <div className="text-3xl font-bold">{getInitiative()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">速度 (Speed)</div>
            <div className="text-3xl font-bold">{getSpeed()} 英尺</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">生命值 (HP)</div>
            <div className="text-3xl font-bold">{getHP()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">生命骰 (Hit Dice)</div>
            <div className="text-3xl font-bold">{getHitDice()}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <div className="text-sm text-gray-600 mb-1">熟練加值 (Proficiency Bonus)</div>
            <div className="text-3xl font-bold">{getProficiencyBonus()}</div>
          </div>
        </div>

        {/* Saving Throws */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">豁免檢定</h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(savingThrows).map(([ability, isProficient]) => (
              <div key={ability} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={isProficient} readOnly />
                  <span className="text-sm">{abilityNames[ability]}</span>
                </div>
                <span className="font-bold">{getSavingThrowModifier(ability)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">技能</h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.map(skill => {
              const modifier = getSkillModifier(skill.ability)
              return (
                <div key={skill.name} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" readOnly />
                    <span className="text-sm">{skill.nameChinese} ({abilityNames[skill.ability]})</span>
                  </div>
                  <span className="font-bold">{modifier}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Proficiencies & Languages */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-3">熟練度</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {getProficiencies().map((prof, idx) => (
                <li key={idx}>{prof}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">語言</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {getLanguages().map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features & Traits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">特質與特質</h2>
          <div className="space-y-4">
            {getFeaturesAndTraits().map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">裝備</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            {getEquipment().map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CharacterSheet
