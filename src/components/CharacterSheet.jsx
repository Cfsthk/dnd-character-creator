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

  const classData = character.class ? CLASSES[character.class] : null
  const raceData = character.race ? races[character.race] : null
  
  // Get subclass data
  const subclassData = character.subclass && classData 
    ? classData.subclasses.find(s => s.name === character.subclass)
    : null

  // Skill descriptions in Traditional Chinese
  const SKILL_DESCRIPTIONS = {
    acrobatics: "平衡、翻滾、空中特技和在困難地形上保持直立。",
    animalHandling: "安撫、訓練或理解動物的行為和情緒。",
    arcana: "回憶關於法術、魔法物品、神秘符號和魔法傳統的知識。",
    athletics: "攀爬、跳躍、游泳和其他需要身體力量的活動。",
    deception: "通過言語或行為隱藏真相、誤導他人或偽裝。",
    history: "回憶歷史事件、傳說人物、古代王國和過去的紛爭。",
    insight: "判斷他人的真實意圖、閱讀肢體語言和察覺謊言。",
    intimidation: "通過威脅、敵對行為或暴力來影響他人。",
    investigation: "尋找線索、進行推理並根據證據得出結論。",
    medicine: "診斷疾病、穩定垂死的同伴或確定死因。",
    nature: "回憶關於地形、植物、動物、天氣和自然循環的知識。",
    perception: "通過視覺、聽覺或其他感官發現、檢測或注意到事物。",
    performance: "娛樂觀眾，包括音樂、舞蹈、演戲、講故事或其他娛樂形式。",
    persuasion: "通過談判、社交技巧或善意來影響他人。",
    religion: "回憶關於神祇、儀式、祈禱、宗教階層和神聖符號的知識。",
    sleightOfHand: "扒竊、開鎖、使用工具或其他需要手部靈巧的任務。",
    stealth: "在不被發現的情況下隱藏或悄悄移動。",
    survival: "跟蹤、狩獵野味、引導團隊穿越荒野或識別自然危險的跡象。"
  }

  // Map skills to their related abilities
  const skillAbilities = {
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

  // Calculate skill modifier
  const getSkillModifier = (skillName) => {
    const ability = skillAbilities[skillName]
    const abilityMod = getAbilityModifierNum(character.abilities?.[ability] || 10)
    const profBonus = character.skills?.[skillName] ? getProficiencyBonus() : 0
    const total = abilityMod + profBonus
    return total >= 0 ? `+${total}` : `${total}`
  }

  // Calculate saving throw modifier
  const getSavingThrowModifier = (ability) => {
    const abilityMod = getAbilityModifierNum(character.abilities?.[ability] || 10)
    const profBonus = character.savingThrows?.[ability] ? getProficiencyBonus() : 0
    const total = abilityMod + profBonus
    return total >= 0 ? `+${total}` : `${total}`
  }

  // Skill names in Traditional Chinese
  const SKILL_NAMES = {
    acrobatics: '特技',
    animalHandling: '馴獸',
    arcana: '奧秘',
    athletics: '運動',
    deception: '欺瞞',
    history: '歷史',
    insight: '洞察',
    intimidation: '威嚇',
    investigation: '調查',
    medicine: '醫學',
    nature: '自然',
    perception: '察覺',
    performance: '表演',
    persuasion: '說服',
    religion: '宗教',
    sleightOfHand: '巧手',
    stealth: '隱匿',
    survival: '求生'
  }

  // Ability names in Traditional Chinese
  const ABILITY_NAMES = {
    strength: '力量',
    dexterity: '敏捷',
    constitution: '體質',
    intelligence: '智力',
    wisdom: '感知',
    charisma: '魅力'
  }

  // Class names in Traditional Chinese
  const CLASS_NAMES = {
    Fighter: '戰士',
    Wizard: '法師',
    Rogue: '盜賊',
    Cleric: '牧師',
    Ranger: '遊俠',
    Paladin: '聖武士',
    Barbarian: '野蠻人',
    Bard: '吟遊詩人',
    Druid: '德魯伊',
    Monk: '武僧',
    Sorcerer: '術士',
    Warlock: '邪術師'
  }

  // Race names in Traditional Chinese
  const RACE_NAMES = {
    Human: '人類',
    Elf: '精靈',
    Dwarf: '矮人',
    Halfling: '半身人',
    Dragonborn: '龍裔',
    Gnome: '侏儒',
    'Half-Elf': '半精靈',
    'Half-Orc': '半獸人',
    Tiefling: '魔人'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      {/* Export Button */}
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={exportToPDF}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          匯出 PDF
        </button>
      </div>

      {/* Character Sheet */}
      <div ref={sheetRef} className="max-w-4xl mx-auto bg-[#f4e4c1] rounded-lg shadow-2xl p-8 border-4 border-amber-800">
        {/* Header with Character Name and Basic Info */}
        <div className="text-center mb-6 border-b-2 border-amber-800 pb-4">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">{character.name || '未命名角色'}</h1>
          <div className="flex justify-center gap-8 text-lg">
            <span className="text-amber-800">
              <strong>種族：</strong>{RACE_NAMES[character.race] || character.race}
            </span>
            <span className="text-amber-800">
              <strong>職業：</strong>{CLASS_NAMES[character.class] || character.class}
            </span>
            {character.subclass && (
              <span className="text-amber-800">
                <strong>子職：</strong>{character.subclass}
              </span>
            )}
            <span className="text-amber-800">
              <strong>等級：</strong>{character.level || 3}
            </span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Ability Scores */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">屬性值</h2>
            <div className="space-y-2">
              {Object.entries(character.abilities || {}).map(([ability, score]) => (
                <div key={ability} className="flex justify-between items-center bg-amber-100 p-2 rounded">
                  <span className="font-semibold text-amber-900">{ABILITY_NAMES[ability]}:</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-xl font-bold text-amber-900">{score}</span>
                    <span className="text-sm bg-amber-700 text-white px-2 py-1 rounded">
                      {getAbilityModifier(score)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combat Stats */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {/* HP and AC */}
              <div className="bg-red-100 border-2 border-red-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-red-900 mb-2">生命值 (HP)</h3>
                <div className="text-4xl font-bold text-red-900 text-center">
                  {character.hp?.current || 0} / {character.hp?.max || 0}
                </div>
              </div>
              <div className="bg-blue-100 border-2 border-blue-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-900 mb-2">護甲等級 (AC)</h3>
                <div className="text-4xl font-bold text-blue-900 text-center">
                  {character.armorClass || 10}
                </div>
              </div>

              {/* Initiative and Speed */}
              <div className="bg-green-100 border-2 border-green-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">先攻</h3>
                <div className="text-3xl font-bold text-green-900 text-center">
                  {getAbilityModifier(character.abilities?.dexterity || 10)}
                </div>
              </div>
              <div className="bg-purple-100 border-2 border-purple-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-purple-900 mb-2">速度</h3>
                <div className="text-3xl font-bold text-purple-900 text-center">
                  {character.speed || 30} 呎
                </div>
              </div>

              {/* Proficiency Bonus */}
              <div className="bg-yellow-100 border-2 border-yellow-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">熟練加值</h3>
                <div className="text-3xl font-bold text-yellow-900 text-center">
                  +{getProficiencyBonus()}
                </div>
              </div>

              {/* Hit Dice - FIXED to use classData.hitDice */}
              <div className="bg-orange-100 border-2 border-orange-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-orange-900 mb-2">生命骰</h3>
                <div className="text-2xl font-bold text-orange-900 text-center">
                  {character.level || 3}d{classData?.hitDice || 8}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saving Throws */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">豁免檢定</h2>
          <div className="grid grid-cols-6 gap-2">
            {Object.keys(ABILITY_NAMES).map((ability) => (
              <div
                key={ability}
                className={`p-2 rounded text-center ${
                  character.savingThrows?.[ability]
                    ? 'bg-green-200 border-2 border-green-700'
                    : 'bg-gray-200 border border-gray-400'
                }`}
              >
                <div className="text-sm font-semibold">{ABILITY_NAMES[ability]}</div>
                <div className="text-lg font-bold">{getSavingThrowModifier(ability)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">技能</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(SKILL_NAMES).map(([skillKey, skillName]) => (
              <div
                key={skillKey}
                className={`p-2 rounded flex justify-between items-center ${
                  character.skills?.[skillKey]
                    ? 'bg-green-200 border-2 border-green-700'
                    : 'bg-gray-200 border border-gray-400'
                }`}
                title={SKILL_DESCRIPTIONS[skillKey]}
              >
                <span className="font-semibold text-sm">
                  {character.skills?.[skillKey] && '★ '}
                  {skillName} ({ABILITY_NAMES[skillAbilities[skillKey]].charAt(0)})
                </span>
                <span className="text-lg font-bold">{getSkillModifier(skillKey)}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-amber-800 italic">
            ★ = 熟練 | 將滑鼠懸停在技能上可查看說明
          </div>
        </div>

        {/* Features and Traits */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">特性與能力</h2>
          
          {/* Race Features */}
          {raceData?.traits && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">種族特性</h3>
              <div className="space-y-2">
                {raceData.traits.map((trait, index) => (
                  <div key={index} className="bg-amber-100 p-3 rounded">
                    <div className="font-semibold text-amber-900">{trait.name}</div>
                    <div className="text-sm text-amber-800">{trait.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Class Features */}
          {classData?.features && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">職業特性</h3>
              <div className="space-y-2">
                {classData.features
                  .filter(feature => feature.level <= (character.level || 3))
                  .map((feature, index) => (
                    <div key={index} className="bg-blue-100 p-3 rounded">
                      <div className="font-semibold text-blue-900">
                        {feature.name} <span className="text-sm text-blue-700">(Lv.{feature.level})</span>
                      </div>
                      <div className="text-sm text-blue-800">{feature.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Subclass Features - NEW SECTION */}
          {subclassData?.features && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                子職特性 ({subclassData.name})
              </h3>
              <div className="space-y-2">
                {subclassData.features
                  .filter(feature => feature.level <= (character.level || 3))
                  .map((feature, index) => (
                    <div key={index} className="bg-purple-100 p-3 rounded">
                      <div className="font-semibold text-purple-900">
                        {feature.name} <span className="text-sm text-purple-700">(Lv.{feature.level})</span>
                      </div>
                      <div className="text-sm text-purple-800">{feature.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Equipment and Weapons */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Weapons - FIXED to use character.equipment */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">武器</h2>
            <div className="space-y-2">
              {character.equipment && character.equipment.length > 0 ? (
                character.equipment
                  .filter(item => item.type === 'weapon')
                  .map((weapon, index) => {
                    const abilityMod = weapon.properties?.finesse
                      ? Math.max(
                          getAbilityModifierNum(character.abilities?.strength || 10),
                          getAbilityModifierNum(character.abilities?.dexterity || 10)
                        )
                      : weapon.properties?.ranged
                      ? getAbilityModifierNum(character.abilities?.dexterity || 10)
                      : getAbilityModifierNum(character.abilities?.strength || 10)

                    const attackBonus = abilityMod + getProficiencyBonus()
                    const damageBonus = abilityMod

                    return (
                      <div key={index} className="bg-red-50 border border-red-700 rounded p-3">
                        <div className="font-bold text-red-900">{weapon.name}</div>
                        <div className="text-sm text-red-800">
                          <div>命中: +{attackBonus}</div>
                          <div>
                            傷害: {weapon.damage}
                            {damageBonus >= 0 ? ` + ${damageBonus}` : ` ${damageBonus}`}
                          </div>
                          {weapon.properties && (
                            <div className="text-xs text-red-700 mt-1">
                              {Object.entries(weapon.properties)
                                .filter(([_, value]) => value === true)
                                .map(([key]) => key)
                                .join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="text-sm text-amber-700 italic">無武器</div>
              )}
            </div>
          </div>

          {/* Armor and Equipment */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">裝備</h2>
            <div className="space-y-2">
              {character.equipment && character.equipment.length > 0 ? (
                character.equipment
                  .filter(item => item.type !== 'weapon')
                  .map((item, index) => (
                    <div key={index} className="bg-amber-100 p-2 rounded">
                      <div className="font-semibold text-amber-900">{item.name}</div>
                      {item.ac && (
                        <div className="text-sm text-amber-800">AC: {item.ac}</div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-sm text-amber-700 italic">無裝備</div>
              )}
            </div>
          </div>
        </div>

        {/* Background and Notes */}
        {character.background && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-amber-900 mb-3 border-b border-amber-700">背景故事</h2>
            <div className="bg-amber-100 p-4 rounded">
              <p className="text-amber-900 whitespace-pre-wrap">{character.background}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet