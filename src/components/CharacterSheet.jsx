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
    sleightOfHand: "扒竊、隱匿小物、靈巧或埋藏需要手指靈活度的行為。",
    stealth: "隱藏自己或在不被他人注意的情況下移動。",
    survival: "追蹤、狩獵、引導、預測天氣和避免自然危險。"
  }

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
              {classData?.name_zh || character.class} 3級
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
                  <div key={skill.key} className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={isProficient}
                      readOnly
                      className="mr-2"
                    />
                    <span className="w-8 font-semibold">{formatModifier(modifier)}</span>
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-gray-600 ml-2">
                      {SKILL_DESCRIPTIONS[skill.key]}
                    </span>
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
            {10 + getAbilityModifierNum(character.abilities.dexterity)}
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
              {classData ? parseInt(classData.hitDie.replace('d', '')) * 3 + getAbilityModifierNum(character.abilities.constitution) * 3 : 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">當前生命值</div>
            <input
              type="number"
              className="w-full text-center text-2xl border-2 border-[#8b4513] rounded bg-white"
              defaultValue={classData ? classData.hit * 3 + getAbilityModifierNum(character.abilities.constitution) * 3 : 0}
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
          <div className="text-xl">3{classData?.hitDie || 8}</div>
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
            {(() => {
              // Import equipment data to get weapon details
              const classKey = character.class?.toLowerCase();
              const classEquipment = equipmentByClass[classKey];
              
              if (!classEquipment || !character.equipment) {
                return (
                  <tr>
                    <td colSpan="3" className="p-2 text-center text-gray-500">無武器</td>
                  </tr>
                );
              }

              // Get all weapons for this class
              const allWeapons = classEquipment.weapons || [];
              
              // Find weapons in character's equipment
              const characterWeapons = character.equipment
                .map(equipItem => {
                  // Try to match equipment item with weapon data
                  const weapon = allWeapons.find(w => 
                    equipItem.includes(w.name) || w.name.includes(equipItem)
                  );
                  return weapon ? { ...weapon, equipName: equipItem } : null;
                })
                .filter(Boolean);

              if (characterWeapons.length === 0) {
                return (
                  <tr>
                    <td colSpan="3" className="p-2 text-center text-gray-500">無武器</td>
                  </tr>
                );
              }

              // Determine which ability to use based on weapon properties
              const getWeaponAbility = (weapon) => {
                if (weapon.properties?.includes('靈巧')) {
                  return character.abilities.dexterity;
                }
                // Default to strength for melee, dexterity for ranged
                if (weapon.properties?.includes('彈藥') || weapon.properties?.includes('投擲')) {
                  return character.abilities.dexterity;
                }
                return character.abilities.strength;
              };

              return characterWeapons.map((weapon, index) => {
                const ability = getWeaponAbility(weapon);
                const abilityMod = getAbilityModifierNum(ability);
                const attackBonus = abilityMod + getProficiencyBonus();
                
                return (
                  <tr key={index} className="border-b border-[#8b4513]">
                    <td className="p-2">{weapon.name}</td>
                    <td className="text-center">{formatModifier(attackBonus)}</td>
                    <td>{weapon.damage.split('（')[0]} + {abilityMod} {weapon.damage.includes('揮砍') ? '揮砍' : weapon.damage.includes('穿刺') ? '穿刺' : '鈍擊'}</td>
                  </tr>
                );
              });
            })()}
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
                • {item}
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
          {classData?.keyFeatures && Array.isArray(classData.keyFeatures) && classData.keyFeatures.length > 0 && (
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
