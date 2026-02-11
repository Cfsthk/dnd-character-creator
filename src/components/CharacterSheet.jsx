import { CLASSES } from '../data/classes'
import { races } from '../data/raceData'
import { equipmentByClass } from '../data/equipmentData'
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

  // Get languages based on D&D 5e rules
  const getLanguages = () => {
    const languages = []
    
    // All characters know Common
    languages.push('通用語 (Common)')
    
    // Race-based languages according to D&D 5e PHB
    const raceLanguages = {
      'human': [], // Humans get one extra language of choice
      'elf': ['精靈語 (Elvish)'],
      'dwarf': ['矮人語 (Dwarvish)'],
      'halfling': ['半身人語 (Halfling)'],
      'dragonborn': ['龍語 (Draconic)'],
      'gnome': ['侏儒語 (Gnomish)'],
      'half-elf': ['精靈語 (Elvish)'],
      'half-orc': ['獸人語 (Orc)'],
      'tiefling': ['地獄語 (Infernal)']
    }
    
    if (character.race && raceLanguages[character.race]) {
      languages.push(...raceLanguages[character.race])
    }
    
    // Class-based bonus languages (Druids get Druidic)
    if (character.class === 'druid') {
      languages.push('德魯伊語 (Druidic)')
    }
    
    // Rogues with Thieves' Cant
    if (character.class === 'rogue') {
      languages.push('盜賊黑話 (Thieves\' Cant)')
    }
    
    return languages
  }

  // Skill descriptions in Traditional Chinese
  const SKILL_DESCRIPTIONS = {
    acrobatics: "平衡、翻滾、空中特技和在困難地形上保持直立。",
    animalHandling: "安撫、訓練動物或察覺動物意圖。解讀駭訛詐訊和行為。",
    arcana: "回憶關於法術、法陣、法陣、魔物、異能虛假和魔法傳統的知識。",
    athletics: "攀爬、跳躍、游泳和其他需要高度體力活動。",
    deception: "透過誤導、隱瞞性質擺真相的詐欺。",
    history: "回憶歷史事件、傳奇人物、古代王國、過去的文明。",
    insight: "判斷生物的真實意圖、解讀肢體語言和察覺詐欺。",
    intimidation: "透過威脅、敵意行為和暴力嚇阻他人。",
    investigation: "尋找線索、推理邏輯和解讀謎團或奇事件。",
    medicine: "穩定瀕死的傷患、診斷疾病和治療傷口。",
    nature: "回憶關於地形、植物、動物、天氣和自然循環的知識。",
    perception: "使用感官發現、聽到或察覺某物的存在。",
    performance: "透過音樂、舞蹈、表演、詐唬故事或其他娛樂侖取悅觀眾。",
    persuasion: "透過機敏、社交禮儀或善良性侖影響他人。",
    religion: "回憶關於神祇、儀式、祈禱、宗教隸屬和神聖傳統的知識。",
    sleightOfHand: "扒竊、隱匿小物件和需要手指靈活的小事。",
    stealth: "隱藏、潛行、避免被他人注意。",
    survival: "追蹤、狩獵、引導群體、預測天氣和避開自然危險。"
  }

  const SKILL_NAMES = {
    acrobatics: "特技",
    animalHandling: "動物駕馭",
    arcana: "神秘",
    athletics: "運動",
    deception: "欺瞞",
    history: "歷史",
    insight: "洞察",
    intimidation: "威嚇",
    investigation: "調查",
    medicine: "醫藥",
    nature: "自然",
    perception: "知覺",
    performance: "表演",
    persuasion: "說服",
    religion: "宗教",
    sleightOfHand: "巧手法",
    stealth: "隱匿",
    survival: "生存"
  }

  const getSkillModifier = (skillKey) => {
    const skillMapping = {
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

    const ability = skillMapping[skillKey]
    const abilityScore = character.abilities[ability] || 10
    const mod = getAbilityModifierNum(abilityScore)

    // Check if proficient
    const isProficient = character.skills && character.skills[skillKey]
    const bonus = mod + (isProficient ? getProficiencyBonus() : 0)

    return bonus >= 0 ? `+${bonus}` : `${bonus}`
  }

  const getSavingThrowModifier = (ability) => {
    const abilityScore = character.abilities[ability] || 10
    const mod = getAbilityModifierNum(abilityScore)

    // Check if proficient in this saving throw
    const isProficient = classData?.saves?.includes(ability)
    const bonus = mod + (isProficient ? getProficiencyBonus() : 0)

    return bonus >= 0 ? `+${bonus}` : `${bonus}`
  }

  // Get equipment for character
  const getEquipment = () => {
    if (!character.class) return []
    const classEquipment = equipmentByClass[character.class] || []
    return classEquipment
  }

  // Get class features
  const getClassFeatures = () => {
    if (!classData) return []
    
    const charLevel = character.level || 3
    const features = []
    
    // Get main class features
    Object.entries(classData.features).forEach(([level, featureList]) => {
      if (parseInt(level) <= charLevel) {
        features.push(...featureList)
      }
    })
    
    // Get subclass features if available
    if (character.subclass && classData.subclasses) {
      const subclassData = classData.subclasses[character.subclass]
      if (subclassData?.features) {
        Object.entries(subclassData.features).forEach(([level, featureList]) => {
          if (parseInt(level) <= charLevel) {
            features.push(...featureList.map(f => `• ${f}`))
          }
        })
      }
    }
    
    return features
  }

  const equipment = getEquipment()
  const classFeatures = getClassFeatures()
  const languages = getLanguages()

  return (
    <div className="min-h-screen bg-[#f4e4c1] p-8">
      {/* Export Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={exportToPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300"
        >
          導出為 PDF
        </button>
      </div>

      <div
        ref={sheetRef}
        className="max-w-4xl mx-auto bg-[#f9f6ee] rounded-lg shadow-xl overflow-hidden border-4 border-[#8b7355]"
      >
        {/* Header */}
        <div className="bg-[#8b7355] text-[#f9f6ee] p-6 text-center border-b-4 border-[#5e4033]">
          <h1 className="text-4xl font-bold mb-2">{character.name || '角色卡'}</h1>
          <div className="text-lg opacity-90">
            {raceData?.name} {classData?.name} {character.subclass && `- ${classData?.subclasses?.[character.subclass]?.name || ''}`}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Basic Info */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
              <div className="text-sm text-gray-600 font-semibold">等級</div>
              <div className="text-2xl font-bold text-[#8b7355]">{character.level || 3}</div>
            </div>
            <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
              <div className="text-sm text-gray-600 font-semibold">生命值</div>
              <div className="text-2xl font-bold text-red-600">{character.hp || 0}</div>
            </div>
            <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
              <div className="text-sm text-gray-600 font-semibold">防禦等級</div>
              <div className="text-2xl font-bold text-blue-600">{10 + getAbilityModifierNum(character.abilities.dexterity || 10)}</div>
            </div>
          </div>

          {/* Ability Scores */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#8b7355] mb-4">能力值</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'strength', label: '力量' },
                { key: 'dexterity', label: '敏捷' },
                { key: 'constitution', label: '體質' },
                { key: 'intelligence', label: '智力' },
                { key: 'wisdom', label: '感知' },
                { key: 'charisma', label: '魅力' }
              ].map((ability) => (
                <div key={ability.key} className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355] text-center">
                  <div className="text-sm font-semibold text-gray-600 mb-1">{ability.label}</div>
                  <div className="text-3xl font-bold text-[#8b7355] mb-1">
                    {character.abilities[ability.key] || 10}
                  </div>
                  <div className="text-xl text-gray-600">
                    {getAbilityModifier(character.abilities[ability.key] || 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saving Throws */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#8b7355] mb-4">豁免投擲檢定</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'strength', label: '力量' },
                { key: 'dexterity', label: '敏捷' },
                { key: 'constitution', label: '體質' },
                { key: 'intelligence', label: '智力' },
                { key: 'wisdom', label: '感知' },
                { key: 'charisma', label: '魅力' }
              ].map((ability) => {
                const isProficient = classData?.saves?.includes(ability.key)
                return (
                  <div
                    key={ability.key}
                    className={`bg-[#ffffff] p-3 rounded-lg shadow-md border-2 border-[#8b7355] flex items-center justify-between ${isProficient ? 'ring-2 ring-green-500' : ''}`}
                  >
                    <span className="text-sm font-semibold text-gray-700">{ability.label}</span>
                    <span className="text-xl font-bold text-[#8b7355]">
                      {getSavingThrowModifier(ability.key)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#8b7355] mb-4">技能</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(SKILL_NAMES).map((skillKey) => {
                const isProficient = character.skills && character.skills[skillKey]
                return (
                  <div
                    key={skillKey}
                    className={`bg-[#ffffff] p-3 rounded-lg shadow-md border-2 border-[#8b7355] flex items-center justify-between ${isProficient ? 'ring-2 ring-green-500' : ''}`}
                    title={SKILL_DESCRIPTIONS[skillKey]}
                  >
                    <span className="text-sm font-semibold text-gray-700">{SKILL_NAMES[skillKey]}</span>
                    <span className="text-xl font-bold text-[#8b7355]">
                      {getSkillModifier(skillKey)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Class Features */}
          {classFeatures.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#8b7355] mb-4">職業特性</h2>
              <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
                <ul className="space-y-2">
                  {classFeatures.map((feature, idx) => (
                    <li key={idx} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Equipment */}
          {equipment.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#8b7355] mb-4">裝備</h2>
              <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
                <div className="flex flex-wrap gap-2">
                  {equipment.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-[#f4e4c1] px-3 py-1 rounded-full text-sm text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages - NEW SECTION */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#8b7355] mb-4">語言</h2>
              <div className="bg-[#ffffff] p-4 rounded-lg shadow-md border-2 border-[#8b7355]">
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-[#e8d4b8] px-3 py-1 rounded-full text-sm font-medium text-gray-800 border border-[#8b7355]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CharacterSheet
