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

  // Skill descriptions in Traditional Chinese
  const SKILL_DESCRIPTIONS = {
    acrobatics: "平衡、翻滾、空中特技和在困難地形上保持直立。",
    animalHandling: "安撫、訓練動物或察覺動物意圖。解讀馴騎語言和行為。",
    arcana: "回想關於法術、法陣、法陣、魔物、神祕符號和魔法傳統的知識。",
    athletics: "攀爬、跳躍、游泳和其他需要高度體力活動。",
    deception: "透過說謊、隱瞞性質騙擾真相的說謊。",
    history: "回憶歷史事件、傳奇人物、古代王國、過去的文明。",
    insight: "判斷生物的真實意圖、解讀肢體語言和尋覓說謊。",
    intimidation: "透過威脅、敵意行為和暴力嚇唬他人。",
    investigation: "尋找線索、推理邏輯和解讀謎團或神秘事件。",
    medicine: "穩定垂死的同伴、診斷疾病和治療傷口。",
    nature: "回想關於地形、植物、動物、天氣和自然循環的知識。",
    perception: "使用感官發現、聽到或察覺某物的存在。",
    performance: "透過音樂、舞蹈、表演、說書故事或其他劇意來取悅觀眾。",
    persuasion: "透過機敏、社交禮儀或良好性來影響他人。",
    religion: "回想關於神祇、儀式、祈禱、宗教階級和神聖象徵的知識。",
    sleightOfHand: "扒竊、藏匿小物、開鎖或執行需要手指靈活的任務。",
    stealth: "在不被發現的情況下隱藏或安靜移動。",
    survival: "追蹤、狩獵、引導隊伍、預測天氣和避免自然危險。"
  }

  // Calculate skill bonuses
  const getSkillBonus = (skill) => {
    const abilityMap = {
      acrobatics: character.dexterity,
      animalHandling: character.wisdom,
      arcana: character.intelligence,
      athletics: character.strength,
      deception: character.charisma,
      history: character.intelligence,
      insight: character.wisdom,
      intimidation: character.charisma,
      investigation: character.intelligence,
      medicine: character.wisdom,
      nature: character.intelligence,
      perception: character.wisdom,
      performance: character.charisma,
      persuasion: character.charisma,
      religion: character.intelligence,
      sleightOfHand: character.dexterity,
      stealth: character.dexterity,
      survival: character.wisdom
    }

    const ability = abilityMap[skill]
    const abilityMod = getAbilityModifierNum(ability)
    const isProficient = character.skills && character.skills.includes(skill)
    const profBonus = isProficient ? getProficiencyBonus() : 0
    const total = abilityMod + profBonus

    return {
      total: total >= 0 ? `+${total}` : `${total}`,
      isProficient
    }
  }

  // Get skill name in Traditional Chinese
  const getSkillName = (skill) => {
    const skillNames = {
      acrobatics: '特技',
      animalHandling: '馴獸',
      arcana: '祕法',
      athletics: '運動',
      deception: '欺瞞',
      history: '歷史',
      insight: '洞察',
      intimidation: '威嚇',
      investigation: '調查',
      medicine: '醫藥',
      nature: '自然',
      perception: '察覺',
      performance: '表演',
      persuasion: '說服',
      religion: '宗教',
      sleightOfHand: '巧手',
      stealth: '隱匿',
      survival: '求生'
    }
    return skillNames[skill] || skill
  }

  // Get ability name in Traditional Chinese
  const getAbilityName = (ability) => {
    const abilityNames = {
      strength: '力量',
      dexterity: '敏捷',
      constitution: '體質',
      intelligence: '智力',
      wisdom: '感知',
      charisma: '魅力'
    }
    return abilityNames[ability.toLowerCase()] || ability
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
      {/* Export Button */}
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={exportToPDF}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
        >
          📥 匯出角色卡 (PDF)
        </button>
      </div>

      {/* Character Sheet */}
      <div ref={sheetRef} className="max-w-4xl mx-auto bg-[#f4e4c1] rounded-lg shadow-2xl p-8 border-4 border-amber-800">
        {/* Header Section */}
        <div className="border-b-4 border-amber-800 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center font-medieval">
            {character.name || '未命名角色'}
          </h1>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-amber-100 p-3 rounded border-2 border-amber-700">
              <div className="text-sm text-amber-700 font-semibold">種族</div>
              <div className="text-xl font-bold text-amber-900">
                {raceData?.name || character.race || '-'}
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded border-2 border-amber-700">
              <div className="text-sm text-amber-700 font-semibold">職業</div>
              <div className="text-xl font-bold text-amber-900">
                {classData?.name || character.class || '-'}
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded border-2 border-amber-700">
              <div className="text-sm text-amber-700 font-semibold">等級</div>
              <div className="text-xl font-bold text-amber-900">3</div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Ability Scores */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
              屬性值
            </h2>
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability) => (
              <div key={ability} className="bg-amber-100 p-3 rounded border-2 border-amber-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-900">
                    {getAbilityName(ability)}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-900">
                      {character[ability] || 10}
                    </div>
                    <div className="text-sm text-amber-700">
                      ({getAbilityModifier(character[ability] || 10)})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Column - Combat Stats */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
              戰鬥數據
            </h2>
            
            <div className="bg-amber-100 p-4 rounded border-2 border-amber-700 text-center">
              <div className="text-sm text-amber-700 font-semibold">護甲等級</div>
              <div className="text-3xl font-bold text-amber-900">
                {10 + getAbilityModifierNum(character.dexterity || 10)}
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded border-2 border-amber-700 text-center">
              <div className="text-sm text-amber-700 font-semibold">生命值</div>
              <div className="text-3xl font-bold text-amber-900">
                {(classData?.hitDie || 8) + getAbilityModifierNum(character.constitution || 10) * 3}
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded border-2 border-amber-700 text-center">
              <div className="text-sm text-amber-700 font-semibold">速度</div>
              <div className="text-3xl font-bold text-amber-900">
                {raceData?.speed || 30} 呎
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded border-2 border-amber-700 text-center">
              <div className="text-sm text-amber-700 font-semibold">熟練加值</div>
              <div className="text-3xl font-bold text-amber-900">
                +{getProficiencyBonus()}
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded border-2 border-amber-700 text-center">
              <div className="text-sm text-amber-700 font-semibold">先攻值</div>
              <div className="text-3xl font-bold text-amber-900">
                {getAbilityModifier(character.dexterity || 10)}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
              技能
            </h2>
            <div className="space-y-2">
              {Object.keys(SKILL_DESCRIPTIONS).map((skill) => {
                const bonus = getSkillBonus(skill)
                return (
                  <div 
                    key={skill} 
                    className={`p-2 rounded border ${bonus.isProficient ? 'bg-amber-200 border-amber-800 border-2' : 'bg-amber-50 border-amber-600'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${bonus.isProficient ? 'font-bold' : 'font-medium'} text-amber-900`}>
                        {bonus.isProficient && '★ '}{getSkillName(skill)}
                      </span>
                      <span className="font-bold text-amber-900">{bonus.total}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Features & Traits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class Features */}
          <div className="bg-amber-100 p-4 rounded border-2 border-amber-700">
            <h2 className="text-xl font-bold text-amber-900 mb-3 border-b-2 border-amber-700 pb-2">
              職業特性
            </h2>
            <div className="space-y-2">
              {classData?.features?.filter(feature => !feature.level || feature.level <= 3).map((feature, index) => (
                <div key={index} className="bg-white p-3 rounded border border-amber-600">
                  <div className="font-bold text-amber-900">{feature.name}</div>
                  <div className="text-sm text-gray-700 mt-1">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Racial Traits */}
          <div className="bg-amber-100 p-4 rounded border-2 border-amber-700">
            <h2 className="text-xl font-bold text-amber-900 mb-3 border-b-2 border-amber-700 pb-2">
              種族特性
            </h2>
            <div className="space-y-2">
              {raceData?.traits?.map((trait, index) => (
                <div key={index} className="bg-white p-3 rounded border border-amber-600">
                  <div className="font-bold text-amber-900">{trait.name}</div>
                  <div className="text-sm text-gray-700 mt-1">{trait.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="mt-6 bg-amber-100 p-4 rounded border-2 border-amber-700">
          <h2 className="text-xl font-bold text-amber-900 mb-3 border-b-2 border-amber-700 pb-2">
            裝備
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {character.equipment && character.equipment.length > 0 ? (
              character.equipment.map((item, index) => (
                <div key={index} className="bg-white p-2 rounded border border-amber-600">
                  <span className="text-amber-900">{item}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic col-span-2">尚未選擇裝備</div>
            )}
          </div>
        </div>

        {/* Background Section */}
        {character.background && (
          <div className="mt-6 bg-amber-100 p-4 rounded border-2 border-amber-700">
            <h2 className="text-xl font-bold text-amber-900 mb-3 border-b-2 border-amber-700 pb-2">
              背景故事
            </h2>
            <div className="bg-white p-3 rounded border border-amber-600">
              <p className="text-gray-700 whitespace-pre-wrap">{character.background}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet
