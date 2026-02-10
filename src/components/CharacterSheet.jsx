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
    return 2 // Level 3 proficiency bonus
  }

  const getCharacterLevel = () => {
    return 3 // Level 3 character
  }

  // Calculate AC based on armor and dexterity
  const calculateAC = () => {
    let baseAC = 10
    let dexMod = getAbilityModifierNum(character.abilities.dexterity)
    
    // Check if character has armor in equipment
    if (character.equipment && Array.isArray(character.equipment)) {
      const armor = character.equipment.find(item => 
        typeof item === 'object' && item.type === 'armor'
      )
      
      if (armor && armor.ac) {
        // Use armor AC
        baseAC = armor.ac
        // Some armors limit dex bonus (e.g., heavy armor = 0, medium armor = max 2)
        if (armor.dexModCap !== undefined) {
          dexMod = Math.min(dexMod, armor.dexModCap)
        }
      }
    }
    
    return baseAC + dexMod
  }

  // Calculate max HP for the character
  const calculateMaxHP = () => {
    if (!classData) return 0
    
    const level = getCharacterLevel()
    const conMod = getAbilityModifierNum(character.abilities.constitution)
    
    // Level 1: Max hit die + CON modifier
    // Levels 2+: Average of hit die (rounded up) + CON modifier per level
    // For simplicity with level 3: use proper calculation
    const firstLevelHP = classData.hitDice + conMod
    const additionalLevels = level - 1
    const avgHitDie = Math.floor(classData.hitDice / 2) + 1 // Average roll
    const additionalHP = additionalLevels * (avgHitDie + conMod)
    
    return firstLevelHP + additionalHP
  }

  // Extract weapons from equipment
  const getWeapons = () => {
    if (!character.equipment || !Array.isArray(character.equipment)) {
      return []
    }
    
    return character.equipment.filter(item => 
      typeof item === 'object' && item.type === 'weapon'
    )
  }

  // Get hit dice based on class
  const getHitDice = () => {
    if (!classData) return 'd8' // Default
    return `d${classData.hitDice}`
  }

  // Get class data
  const classData = character.characterClass ? CLASSES[character.characterClass] : null
  const raceData = character.race ? races[character.race] : null

  const SKILLS = [
    { name: '特技', key: 'acrobatics', ability: 'dexterity' },
    { name: '馴獸', key: 'animalHandling', ability: 'wisdom' },
    { name: '奧秘', key: 'arcana', ability: 'intelligence' },
    { name: '運動', key: 'athletics', ability: 'strength' },
    { name: '欺瞞', key: 'deception', ability: 'charisma' },
    { name: '歷史', key: 'history', ability: 'intelligence' },
    { name: '洞察', key: 'insight', ability: 'wisdom' },
    { name: '威嚇', key: 'intimidation', ability: 'charisma' },
    { name: '調查', key: 'investigation', ability: 'intelligence' },
    { name: '醫藥', key: 'medicine', ability: 'wisdom' },
    { name: '自然', key: 'nature', ability: 'intelligence' },
    { name: '察覺', key: 'perception', ability: 'wisdom' },
    { name: '表演', key: 'performance', ability: 'charisma' },
    { name: '說服', key: 'persuasion', ability: 'charisma' },
    { name: '宗教', key: 'religion', ability: 'intelligence' },
    { name: '巧手', key: 'sleightOfHand', ability: 'dexterity' },
    { name: '隱匿', key: 'stealth', ability: 'dexterity' },
    { name: '求生', key: 'survival', ability: 'wisdom' }
  ]

  const calculateSkillModifier = (skill) => {
    const abilityScore = character.abilities[skill.ability]
    const abilityMod = getAbilityModifierNum(abilityScore)
    const profBonus = character.skills?.[skill.key] ? getProficiencyBonus() : 0
    return abilityMod + profBonus
  }

  const formatModifier = (num) => {
    return num >= 0 ? `+${num}` : `${num}`
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#f4e4c1] min-h-screen" ref={sheetRef}>
      {/* Export Button */}
      <div className="mb-4 flex justify-end print:hidden">
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-[#8b4513] text-white rounded hover:bg-[#654321] transition-colors"
        >
          匯出 PDF
        </button>
      </div>

      {/* Header */}
      <div className="border-4 border-[#8b4513] p-6 mb-4 bg-[#fdf5e6]">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-600">角色名稱</label>
            <div className="text-2xl font-bold border-b-2 border-[#8b4513]">
              {character.name || '未命名角色'}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">職業與等級</label>
            <div className="text-xl border-b-2 border-[#8b4513]">
              {classData?.name_zh || character.characterClass} 3級
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">種族</label>
            <div className="text-xl border-b-2 border-[#8b4513]">
              {raceData?.name || character.race}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-xs text-gray-600">背景</label>
            <div className="border-b-2 border-[#8b4513]">
              {character.background || '無'}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">陣營</label>
            <div className="border-b-2 border-[#8b4513]">
              {character.alignment || '未選擇'}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600">經驗值</label>
            <div className="border-b-2 border-[#8b4513]">900</div>
          </div>
        </div>
      </div>

      {/* Main Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Left Column - Abilities */}
        <div className="space-y-2">
          {[
            { name: '力量 (Strength)', key: 'strength', abbr: 'STR' },
            { name: '敏捷 (Dexterity)', key: 'dexterity', abbr: 'DEX' },
            { name: '體質 (Constitution)', key: 'constitution', abbr: 'CON' },
            { name: '智力 (Intelligence)', key: 'intelligence', abbr: 'INT' },
            { name: '感知 (Wisdom)', key: 'wisdom', abbr: 'WIS' },
            { name: '魅力 (Charisma)', key: 'charisma', abbr: 'CHA' }
          ].map(ability => (
            <div key={ability.key} className="border-2 border-[#8b4513] bg-[#fdf5e6] p-2 text-center">
              <div className="text-sm font-bold">{ability.name}</div>
              <div className="text-3xl font-bold">{character.abilities[ability.key]}</div>
              <div className="text-xl border-t-2 border-[#8b4513] mt-1 pt-1">
                {getAbilityModifier(character.abilities[ability.key])}
              </div>
            </div>
          ))}
        </div>

        {/* Middle Column - Skills and Saves */}
        <div className="col-span-2 space-y-4">
          {/* Inspiration, Proficiency, Perception */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-2 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs">靈感</div>
            </div>
            <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-2 text-center">
              <div className="text-2xl font-bold">+{getProficiencyBonus()}</div>
              <div className="text-xs">熟練加值</div>
            </div>
            <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-2 text-center">
              <div className="text-2xl font-bold">
                {formatModifier(calculateSkillModifier({ key: 'perception', ability: 'wisdom' }))}
              </div>
              <div className="text-xs">被動察覺</div>
            </div>
          </div>

          {/* Saving Throws */}
          <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-3">
            <div className="text-sm font-bold mb-2 text-center">豁免</div>
            <div className="space-y-1">
              {[
                { name: '力量', key: 'strength' },
                { name: '敏捷', key: 'dexterity' },
                { name: '體質', key: 'constitution' },
                { name: '智力', key: 'intelligence' },
                { name: '感知', key: 'wisdom' },
                { name: '魅力', key: 'charisma' }
              ].map(save => {
                const isProficient = classData?.savingThrows?.includes(save.key)
                const modifier = getAbilityModifierNum(character.abilities[save.key]) +
                               (isProficient ? getProficiencyBonus() : 0)
                return (
                  <div key={save.key} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={isProficient}
                      readOnly
                      className="mr-2"
                    />
                    <span className="w-10">{formatModifier(modifier)}</span>
                    <span>{save.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-3">
            <div className="text-sm font-bold mb-2 text-center">技能</div>
            <div className="space-y-1">
              {SKILLS.map(skill => {
                const isProficient = character.skills?.[skill.key] || false
                const modifier = calculateSkillModifier(skill)
                return (
                  <div key={skill.key} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={isProficient}
                      readOnly
                      className="mr-2"
                    />
                    <span className="w-10">{formatModifier(modifier)}</span>
                    <span>{skill.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Combat Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 text-center">
          <div className="text-xs text-gray-600 mb-1">護甲等級</div>
          <div className="text-4xl font-bold">
            {calculateAC()}
          </div>
        </div>
        <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 text-center">
          <div className="text-xs text-gray-600 mb-1">先攻</div>
          <div className="text-4xl font-bold">
            {getAbilityModifier(character.abilities.dexterity)}
          </div>
        </div>
        <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 text-center">
          <div className="text-xs text-gray-600 mb-1">速度</div>
          <div className="text-4xl font-bold">{raceData?.speed || 30}呎</div>
        </div>
      </div>

      {/* Hit Points */}
      <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">生命值上限</div>
            <div className="text-3xl font-bold">
              {calculateMaxHP()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">當前生命值</div>
            <input
              type="number"
              className="w-full text-center text-2xl border-2 border-[#8b4513] rounded bg-white"
              defaultValue={calculateMaxHP()}
            />
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">臨時生命值</div>
            <input
              type="number"
              className="w-full text-center text-2xl border-2 border-[#8b4513] rounded bg-white"
              defaultValue={0}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-600 mb-1">生命骰</div>
          <div className="text-xl">{getCharacterLevel()}{getHitDice()}</div>
        </div>
      </div>

      {/* Attacks & Spellcasting */}
      <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 mb-4">
        <div className="text-sm font-bold mb-3 text-center">攻擊與施法</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#8b4513]">
              <th className="text-left p-2">名稱</th>
              <th className="text-center p-2">命中加值</th>
              <th className="text-left p-2">傷害/類型</th>
            </tr>
          </thead>
          <tbody>
            {getWeapons().length > 0 ? (
              getWeapons().map((weapon, index) => {
                const attackAbility = weapon.finesse ? 
                  Math.max(character.abilities.strength, character.abilities.dexterity) :
                  (weapon.ranged ? character.abilities.dexterity : character.abilities.strength)
                const attackMod = getAbilityModifierNum(attackAbility)
                const isProficient = true // Assume proficiency for equipped weapons
                
                return (
                  <tr key={index} className="border-b border-[#8b4513]">
                    <td className="p-2">{weapon.name}</td>
                    <td className="text-center">
                      {formatModifier(attackMod + (isProficient ? getProficiencyBonus() : 0))}
                    </td>
                    <td>{weapon.damage} + {attackMod} {weapon.damageType}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-2">無武器</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Spellcasting Stats - Only for spellcasting classes */}
      {classData?.spellcastingAbility && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-2 border border-[#8b4513] rounded bg-white">
            <div className="text-xs text-gray-600">法術攻擊加值</div>
            <div className="text-lg font-bold">
              {formatModifier(getAbilityModifierNum(character.abilities[classData.spellcastingAbility]) + getProficiencyBonus())}
            </div>
          </div>
          <div className="text-center p-2 border border-[#8b4513] rounded bg-white">
            <div className="text-xs text-gray-600">法術豁免 DC</div>
            <div className="text-lg font-bold">
              {8 + getAbilityModifierNum(character.abilities[classData.spellcastingAbility]) + getProficiencyBonus()}
            </div>
          </div>
        </div>
      )}

      {/* Equipment */}
      <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 mb-4">
        <div className="text-sm font-bold mb-3 text-center">裝備</div>
        <div className="space-y-2">
          {character.equipment && Array.isArray(character.equipment) && character.equipment.length > 0 ? (
            character.equipment.map((item, index) => (
              <div key={index} className="border-b border-[#8b4513] pb-1">
                • {typeof item === 'object' ? item.name : item}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">無裝備</div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center border-t-2 border-[#8b4513] pt-2">
          <span className="font-bold">金幣 (GP):</span>
          <input
            type="number"
            className="w-24 text-center border-2 border-[#8b4513] rounded bg-white"
            defaultValue={0}
          />
        </div>
      </div>

      {/* Features & Traits */}
      <div className="border-2 border-[#8b4513] bg-[#fdf5e6] p-4 mb-4">
        <div className="text-sm font-bold mb-3 text-center">特性與特質</div>
        <div className="space-y-3">
          {/* Race Features */}
          {raceData?.traits && typeof raceData.traits === 'string' && (
            <div>
              <div className="font-bold text-sm mb-1">種族特性:</div>
              <div className="text-xs text-gray-700 pl-2">
                {raceData.traits}
              </div>
            </div>
          )}

          {/* Class Features */}
          {classData?.keyFeatures && Array.isArray(classData.keyFeatures) && (
            <div className="mt-3">
              <div className="font-bold text-sm mb-1">職業特性:</div>
              {classData.keyFeatures.map((feature, index) => (
                <div key={index} className="text-xs text-gray-700 pl-2 mb-1">
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default CharacterSheet
