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
    return 2 // Level 1 default
  }

  const classData = character.class ? CLASSES[character.class] : null
  const raceData = character.race ? races[character.race] : null

  // Skill descriptions in Traditional Chinese
  const SKILL_DESCRIPTIONS = {
    acrobatics: "平衡、翻滾、空中特技和在困難地形上保持直立。",
    animalHandling: "安撫、訓練動物或直觀感知動物意圖。解讀獸類語言和行為。",
    arcana: "回想閣樓魔法、法術、法陣、魔物、神秘符號和魔法傳統的知識。",
    athletics: "攀爬、跳躍、游泳和其他需要高度體能活動。",
    deception: "透過謊言、隱藏性陷阱或彈壓對真相的謊言。",
    history: "回憶歷史事件、傳奇人物、古代王國、過去的角爭和遺落的文明。",
    insight: "判斷生物的真實意圖、解讀肢體語言和察覺謊言。",
    intimidation: "透過威脅、敵對行為和暴力威嚇他人。",
    investigation: "尋找線索、推理邏輯和解讀謎題或神秘事件。",
    medicine: "穩定垂死的同伴、診斷疾病和治療傷口。",
    nature: "回想閣樓地形、植物、動物、天氣和自然循環的知識。",
    perception: "使用感官發現、聽到或察覺某物的存在。",
    performance: "透過音樂、舞蹈、表演、誦詩故事或其他創意來取悅觀眾。",
    persuasion: "透過機檯、社交禮儀或善良性來影響他人。",
    religion: "回想閣樓神祇、儀式、祈禱、宗教階級和神聖符號的知識。",
    sleightOfHand: "扒竊、藏匿小物、開鎖或其他需要手部靈巧的行動。",
    stealth: "避開耳目、潛行和在不被發現的情況下移動。",
    survival: "追蹤、狩獵、引導穿越荒野和避開自然危險。"
  }

  const getSkillModifier = (skill) => {
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

    const abilityScore = abilityMap[skill] || 10
    const abilityMod = getAbilityModifierNum(abilityScore)
    const profBonus = character.skills?.[skill] ? getProficiencyBonus() : 0
    
    return abilityMod + profBonus
  }

  const formatModifier = (value) => {
    return value >= 0 ? `+${value}` : `${value}`
  }

  const renderSkills = () => {
    const skills = [
      { name: 'acrobatics', label: '特技 (敏捷)' },
      { name: 'animalHandling', label: '馴養動物 (睿智)' },
      { name: 'arcana', label: '奧祕 (智力)' },
      { name: 'athletics', label: '運動 (力量)' },
      { name: 'deception', label: '欺瞞 (魅力)' },
      { name: 'history', label: '歷史 (智力)' },
      { name: 'insight', label: '洞察 (睿智)' },
      { name: 'intimidation', label: '威嚇 (魅力)' },
      { name: 'investigation', label: '調查 (智力)' },
      { name: 'medicine', label: '醫藥 (睿智)' },
      { name: 'nature', label: '自然 (智力)' },
      { name: 'perception', label: '察覺 (睿智)' },
      { name: 'performance', label: '表演 (魅力)' },
      { name: 'persuasion', label: '說服 (魅力)' },
      { name: 'religion', label: '宗教 (智力)' },
      { name: 'sleightOfHand', label: '巧手 (敏捷)' },
      { name: 'stealth', label: '隱匿 (敏捷)' },
      { name: 'survival', label: '求生 (睿智)' }
    ]

    return skills.map(skill => {
      const modifier = getSkillModifier(skill.name)
      const isProficient = character.skills?.[skill.name]
      
      return (
        <div key={skill.name} className="skill-row group">
          <div className="skill-main">
            <input 
              type="checkbox" 
              checked={isProficient || false}
              readOnly
              className="skill-checkbox"
            />
            <span className="skill-modifier">{formatModifier(modifier)}</span>
            <span className="skill-label">{skill.label}</span>
          </div>
          <div className="skill-description">
            {SKILL_DESCRIPTIONS[skill.name]}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="character-sheet-container">
      <button onClick={exportToPDF} className="export-button">
        匯出 PDF
      </button>
      
      <div ref={sheetRef} className="character-sheet">
        {/* Header */}
        <div className="sheet-header">
          <div className="header-row">
            <div className="header-field large">
              <label>角色名稱</label>
              <div className="value">{character.name || '未命名角色'}</div>
            </div>
          </div>
          <div className="header-row">
            <div className="header-field">
              <label>職業</label>
              <div className="value">{classData?.name || character.class || '-'}</div>
            </div>
            <div className="header-field">
              <label>等級</label>
              <div className="value">1</div>
            </div>
            <div className="header-field">
              <label>背景</label>
              <div className="value">{character.background || '-'}</div>
            </div>
            <div className="header-field">
              <label>種族</label>
              <div className="value">{raceData?.name || character.race || '-'}</div>
            </div>
            <div className="header-field">
              <label>陣營</label>
              <div className="value">{character.alignment || '-'}</div>
            </div>
          </div>
        </div>

        {/* Main Stats Section */}
        <div className="main-stats">
          {/* Left Column - Ability Scores */}
          <div className="ability-scores">
            {[
              { key: 'strength', label: '力量', short: 'STR' },
              { key: 'dexterity', label: '敏捷', short: 'DEX' },
              { key: 'constitution', label: '體質', short: 'CON' },
              { key: 'intelligence', label: '智力', short: 'INT' },
              { key: 'wisdom', label: '睿智', short: 'WIS' },
              { key: 'charisma', label: '魅力', short: 'CHA' }
            ].map(ability => (
              <div key={ability.key} className="ability-score">
                <div className="ability-name">{ability.label}</div>
                <div className="ability-modifier">
                  {getAbilityModifier(character[ability.key] || 10)}
                </div>
                <div className="ability-value">
                  {character[ability.key] || 10}
                </div>
              </div>
            ))}
          </div>

          {/* Middle Column - Skills and Saves */}
          <div className="middle-column">
            {/* Proficiency Bonus */}
            <div className="stat-box">
              <div className="stat-circle">
                <span className="stat-value">+{getProficiencyBonus()}</span>
              </div>
              <label>熟練加值</label>
            </div>

            {/* Saving Throws */}
            <div className="saving-throws">
              <h3>豁免檢定</h3>
              {[
                { key: 'strength', label: '力量' },
                { key: 'dexterity', label: '敏捷' },
                { key: 'constitution', label: '體質' },
                { key: 'intelligence', label: '智力' },
                { key: 'wisdom', label: '睿智' },
                { key: 'charisma', label: '魅力' }
              ].map(save => {
                const isProficient = classData?.savingThrows?.includes(save.key)
                const modifier = getAbilityModifierNum(character[save.key] || 10) + 
                               (isProficient ? getProficiencyBonus() : 0)
                return (
                  <div key={save.key} className="save-row">
                    <input type="checkbox" checked={isProficient || false} readOnly />
                    <span className="save-modifier">{formatModifier(modifier)}</span>
                    <span className="save-label">{save.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Skills */}
            <div className="skills-section">
              <h3>技能</h3>
              {renderSkills()}
            </div>

            {/* Passive Perception */}
            <div className="stat-box">
              <div className="stat-value-inline">
                {10 + getSkillModifier('perception')}
              </div>
              <label>被動察覺</label>
            </div>
          </div>

          {/* Right Column - Combat Stats */}
          <div className="right-column">
            {/* Armor Class */}
            <div className="stat-box large">
              <div className="stat-circle large">
                <span className="stat-value">
                  {10 + getAbilityModifierNum(character.dexterity || 10)}
                </span>
              </div>
              <label>護甲等級</label>
            </div>

            {/* Initiative */}
            <div className="stat-box">
              <div className="stat-circle">
                <span className="stat-value">
                  {getAbilityModifier(character.dexterity || 10)}
                </span>
              </div>
              <label>先攻</label>
            </div>

            {/* Speed */}
            <div className="stat-box">
              <div className="stat-circle">
                <span className="stat-value">{raceData?.speed || 30}</span>
              </div>
              <label>速度</label>
            </div>

            {/* Hit Points */}
            <div className="hp-section">
              <label>生命值上限</label>
              <div className="hp-max">
                {(classData?.hitDie || 8) + getAbilityModifierNum(character.constitution || 10)}
              </div>
              <label>當前生命值</label>
              <div className="hp-current">
                {/* Empty box for current HP */}
              </div>
              <label>臨時生命值</label>
              <div className="hp-temp">
                {/* Empty box for temp HP */}
              </div>
            </div>

            {/* Hit Dice */}
            <div className="hit-dice">
              <label>生命骰</label>
              <div className="hit-dice-value">
                1d{classData?.hitDie || 8}
              </div>
            </div>

            {/* Death Saves */}
            <div className="death-saves">
              <label>死亡豁免</label>
              <div className="saves-grid">
                <div className="save-type">
                  <span>成功</span>
                  <div className="checkboxes">
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                  </div>
                </div>
                <div className="save-type">
                  <span>失敗</span>
                  <div className="checkboxes">
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spellcasting Stats */}
            {classData?.spellcastingAbility && (
              <div className="spellcasting-section">
                <h3>施法屬性</h3>
                <div className="spell-stats">
                  <div className="stat-box">
                    <div className="stat-circle">
                      <span className="stat-value">
                        {formatModifier(
                          getAbilityModifierNum(character[classData.spellcastingAbility] || 10) + 
                          getProficiencyBonus()
                        )}
                      </span>
                    </div>
                    <label>法術攻擊加值</label>
                  </div>
                  <div className="stat-box">
                    <div className="stat-circle">
                      <span className="stat-value">
                        {8 + getAbilityModifierNum(character[classData.spellcastingAbility] || 10) + 
                        getProficiencyBonus()}
                      </span>
                    </div>
                    <label>法術豁免 DC</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features & Traits */}
        <div className="features-section">
          <h3>特性與特質</h3>
          <div className="features-content">
            {/* Race Features */}
            {raceData?.traits && (
              <div className="feature-group">
                <h4>種族特性</h4>
                {raceData.traits.map((trait, index) => (
                  <div key={index} className="feature-item">
                    <strong>{trait.name}:</strong> {trait.description}
                  </div>
                ))}
              </div>
            )}
            
            {/* Class Features */}
            {classData?.features && (
              <div className="feature-group">
                <h4>職業特性</h4>
                {classData.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <strong>{feature.name}:</strong> {feature.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Equipment */}
        <div className="equipment-section">
          <h3>裝備</h3>
          <div className="equipment-content">
            {character.equipment && character.equipment.length > 0 ? (
              <ul>
                {character.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>無裝備</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .character-sheet-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .export-button {
          margin-bottom: 20px;
          padding: 10px 20px;
          background-color: #8b4513;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .export-button:hover {
          background-color: #654321;
        }

        .character-sheet {
          background-color: #f4e4c1;
          padding: 40px;
          border: 2px solid #8b4513;
          border-radius: 8px;
          font-family: 'Georgia', serif;
        }

        .sheet-header {
          margin-bottom: 30px;
        }

        .header-row {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .header-field {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .header-field.large {
          flex: 2;
        }

        .header-field label {
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }

        .header-field .value {
          padding: 8px;
          border-bottom: 2px solid #8b4513;
          font-weight: bold;
          min-height: 24px;
        }

        .main-stats {
          display: grid;
          grid-template-columns: 150px 1fr 250px;
          gap: 30px;
          margin-bottom: 30px;
        }

        .ability-scores {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .ability-score {
          text-align: center;
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 10px;
          background-color: white;
        }

        .ability-name {
          font-size: 12px;
          font-weight: bold;
          color: #8b4513;
          margin-bottom: 5px;
        }

        .ability-modifier {
          font-size: 24px;
          font-weight: bold;
          margin: 5px 0;
        }

        .ability-value {
          font-size: 18px;
          border-top: 1px solid #ccc;
          padding-top: 5px;
        }

        .middle-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          border: 2px solid #8b4513;
          border-radius: 8px;
          background-color: white;
        }

        .stat-circle {
          width: 60px;
          height: 60px;
          border: 2px solid #8b4513;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
        }

        .stat-circle.large {
          width: 80px;
          height: 80px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
        }

        .stat-value-inline {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .saving-throws, .skills-section {
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
        }

        .saving-throws h3, .skills-section h3 {
          margin: 0 0 15px 0;
          font-size: 16px;
          color: #8b4513;
        }

        .save-row, .skill-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          padding: 5px;
          border-radius: 4px;
        }

        .skill-row {
          flex-direction: column;
          align-items: stretch;
        }

        .skill-main {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .skill-description {
          display: none;
          font-size: 12px;
          color: #666;
          padding: 8px;
          margin-top: 5px;
          background-color: #f9f9f9;
          border-left: 3px solid #8b4513;
          border-radius: 4px;
        }

        .skill-row.group:hover .skill-description {
          display: block;
        }

        .save-row:hover, .skill-main:hover {
          background-color: #f0f0f0;
        }

        .save-modifier, .skill-modifier {
          font-weight: bold;
          min-width: 30px;
        }

        .skill-checkbox {
          margin: 0;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hp-section {
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
        }

        .hp-section label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-top: 10px;
          margin-bottom: 5px;
        }

        .hp-section label:first-child {
          margin-top: 0;
        }

        .hp-max, .hp-current, .hp-temp {
          width: 100%;
          padding: 10px;
          border: 2px solid #8b4513;
          border-radius: 4px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }

        .hit-dice {
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
          text-align: center;
        }

        .hit-dice label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }

        .hit-dice-value {
          font-size: 18px;
          font-weight: bold;
        }

        .death-saves {
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
        }

        .death-saves label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
        }

        .saves-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .save-type {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .checkboxes {
          display: flex;
          gap: 5px;
        }

        .spellcasting-section {
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
        }

        .spellcasting-section h3 {
          margin: 0 0 15px 0;
          font-size: 16px;
          color: #8b4513;
        }

        .spell-stats {
          display: flex;
          gap: 10px;
        }

        .spell-stats .stat-box {
          flex: 1;
        }

        .features-section, .equipment-section {
          margin-top: 30px;
          border: 2px solid #8b4513;
          border-radius: 8px;
          padding: 20px;
          background-color: white;
        }

        .features-section h3, .equipment-section h3 {
          margin: 0 0 15px 0;
          color: #8b4513;
          border-bottom: 2px solid #8b4513;
          padding-bottom: 10px;
        }

        .feature-group {
          margin-bottom: 20px;
        }

        .feature-group h4 {
          color: #8b4513;
          margin-bottom: 10px;
        }

        .feature-item {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }

        .equipment-content ul {
          list-style-type: none;
          padding: 0;
        }

        .equipment-content li {
          padding: 8px;
          margin-bottom: 5px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }

        @media print {
          .export-button {
            display: none;
          }
          
          .character-sheet {
            border: none;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default CharacterSheet
