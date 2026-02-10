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
    animalHandling: "安撫、訓練動物或直覺感知動物意圖。解讀肢體語言和行為。",
    arcana: "回想關於魔法、法術、魔法物品、神秘符號和魔法傳統的知識。",
    athletics: "攀爬、跳躍、游泳和其他體能要求高的活動。",
    deception: "透過誤導、誤導性陳述或徹頭徹尾的謊言來隱藏真相。",
    history: "回想歷史事件、傳奇人物、古代王國、過去的衝突和失落的文明。",
    insight: "判斷生物的真實意圖、解讀肢體語言和察覺謊言。",
    intimidation: "透過威脅、敵對行為和肢體暴力來影響他人。",
    investigation: "尋找線索、推理演繹和解決謎題或神秘事件。",
    medicine: "穩定垂死的同伴、診斷疾病和治療傷口。",
    nature: "回想關於地形、植物、動物、天氣和自然循環的知識。",
    perception: "使用感官發現、聽到或察覺某物的存在。",
    performance: "透過音樂、舞蹈、表演、說故事或其他娛樂來取悅觀眾。",
    persuasion: "透過機智、社交禮儀或善良天性來影響他人。",
    religion: "回想關於神祇、儀式、祈禱、宗教階層和神聖符號的知識。",
    sleightOfHand: "扒竊、隱藏物品、表演魔術和其他手部靈巧的技藝。",
    stealth: "無聲移動、躲避他人和避免被發現。",
    survival: "追蹤生物、狩獵野味、在荒野中導航、預測天氣和避免自然危害。"
  }

  // Equipment descriptions in Traditional Chinese
  const EQUIPMENT_DESCRIPTIONS = {
    // Weapons - 武器
    dagger: "簡易近戰武器。輕型、靈巧、投擲(20/60呎)。適合刺擊或投擲。",
    shortsword: "軍用近戰武器。輕型、靈巧。適合快速攻擊的短刃。",
    longsword: "軍用近戰武器。多用途(1d8/1d10)。經典的騎士之劍。",
    greatsword: "軍用近戰武器。雙手、重型。需雙手揮舞的巨大劍刃。",
    battleaxe: "軍用近戰武器。多用途(1d8/1d10)。堅固的單手或雙手斧。",
    greataxe: "軍用近戰武器。雙手、重型。造成最大傷害的殘暴雙手斧。",
    handaxe: "簡易近戰武器。輕型、投擲(20/60呎)。可投擲或近戰使用。",
    warhammer: "軍用近戰武器。多用途(1d8/1d10)。堅實可靠的鈍擊武器。",
    mace: "簡易近戰武器。基本但有效的鈍擊傷害。",
    quarterstaff: "簡易近戰武器。多用途(1d6/1d8)。簡單的木製長棍。",
    spear: "簡易近戰武器。投擲(20/60呎)、多用途(1d6/1d8)。適合近戰或遠程。",
    rapier: "軍用近戰武器。靈巧。敏捷戰士的優雅穿刺劍。",
    club: "簡易近戰武器。輕型。粗糙但有效的鈍擊工具。",
    flail: "軍用近戰武器。鏈條連接的尖刺球。",
    morningstar: "軍用近戰武器。結合穿刺和鈍擊傷害。",
    pike: "軍用近戰武器。重型、觸及、雙手。保持敵人距離的長柄武器。",
    trident: "軍用近戰武器。投擲(20/60呎)、多用途(1d6/1d8)。三叉戟。",
    whip: "軍用近戰武器。靈巧、觸及。獨特的10呎觸及武器。",
    
    // Ranged Weapons - 遠程武器
    shortbow: "簡易遠程武器。彈藥(80/320呎)、雙手。小巧的弓。",
    longbow: "軍用遠程武器。彈藥(150/600呎)、重型、雙手。卓越的射程和威力。",
    crossbow: "簡易遠程武器。彈藥(80/320呎)、上膛、雙手。易用但較慢。",
    lightCrossbow: "簡易遠程武器。彈藥(80/320呎)、上膛、雙手。小型十字弓。",
    heavyCrossbow: "軍用遠程武器。彈藥(100/400呎)、重型、上膛、雙手。強力但笨重。",
    handCrossbow: "軍用遠程武器。彈藥(30/120呎)、輕型、上膛。單手十字弓。",
    sling: "簡易遠程武器。彈藥(30/120呎)。基本但有效的投射武器。",
    
    // Armor - 護甲
    leather: "輕甲。AC 11 + 敏捷調整。柔軟皮革製成，提供最小保護和最大機動性。",
    studdedLeather: "輕甲。AC 12 + 敏捷調整。以金屬釘加固的皮革。",
    chainMail: "重甲。AC 16。需力量13。互鎖金屬環製成。隱匿劣勢。",
    chainShirt: "中甲。AC 13 + 敏捷調整(最多2)。覆蓋軀幹的柔韌金屬甲。",
    scaleMail: "中甲。AC 14 + 敏捷調整(最多2)。覆蓋重疊金屬片的外套。隱匿劣勢。",
    breastplate: "中甲。AC 14 + 敏捷調整(最多2)。金屬胸甲，四肢保持靈活。",
    halfPlate: "中甲。AC 15 + 敏捷調整(最多2)。覆蓋大部分身體的成型金屬板。隱匿劣勢。",
    plateMail: "重甲。AC 18。需力量15。全套互鎖金屬板甲。隱匿劣勢。",
    splint: "重甲。AC 17。需力量15。皮革背襯上的窄垂直金屬條。隱匿劣勢。",
    ringMail: "重甲。AC 14。縫有重環的皮甲。隱匿劣勢。",
    
    // Shields and Accessories - 盾牌和配件
    shield: "AC +2。木製或金屬。可作為一個動作穿戴或卸下。",
    
    // Adventuring Gear - 冒險裝備
    backpack: "1立方呎/30磅裝備容量。攜帶裝備的必需品。",
    beddingRoll: "長休息時在野外休息的睡眠裝備。",
    rope: "50呎麻繩。2生命值，可用DC 17力量檢定掙脫。",
    torch: "明亮光線20呎，昏暗光線20呎。燃燒1小時。",
    rations: "適合長途旅行的乾糧。一份口糧=一天的食物。",
    waterskin: "容納4品脫液體。生存必需品。",
    tinderbox: "用於生火。包含火石、火鋼和火絨。",
    crowbar: "在槓桿有幫助時給予力量檢定優勢。",
    hammer: "用於建造、釘釘子或作為臨時武器。",
    lantern: "明亮光線30呎，昏暗光線30呎，一品脫油可用6小時。",
    oil: "燈籠燃料或可作為潑濺武器使用。",
    potion: "具有各種效果的魔法藥水。最常見：治療藥水(2d4+2 HP)。",
    healingPotion: "作為一個動作飲用時恢復2d4+2生命值。",
    holyWater: "作為一個動作，投擲到20呎內的生物。對惡魔/不死生物造成2d6光輝傷害。",
    holySymbol: "神祇或萬神殿的符號。牧師和聖武士施法所需。",
    spellbook: "包含法師法術。準備法師法術的必需品。",
    componentPouch: "用於材料法術成分的小型防水皮袋。",
    arcaneBook: "包含奧術知識、法術公式和魔法理論。",
    thieves: "需要熟練度。包括撬鎖器、小鏡子、剪刀和鉗子。",
    thievesTools: "開鎖和解除陷阱的工具組。需要熟練度。",
    disguiseKit: "包含化妝品、染髮劑、創建偽裝的道具。",
    herbalismKit: "包含小袋、小瓶、識別和製作草藥療法的工具。",
    musicalInstrument: "需要熟練度。用於表演和某些法術。",
    
    // Default for unknown items
    default: "冒險裝備或器材。"
  }

  // Get skill modifier
  const getSkillModifier = (skill, abilityScore) => {
    const baseMod = getAbilityModifierNum(abilityScore)
    const profBonus = getProficiencyBonus()
    const isProficient = classData?.skillProficiencies?.includes(skill)
    return isProficient ? baseMod + profBonus : baseMod
  }

  // Calculate AC
  const calculateAC = () => {
    let baseAC = 10
    const dexMod = getAbilityModifierNum(character.abilities?.dexterity || 10)
    
    if (character.equipment) {
      const armor = character.equipment.find(item => 
        ['leather', 'studdedLeather', 'chainMail', 'chainShirt', 'scaleMail', 
         'breastplate', 'halfPlate', 'plateMail', 'splint', 'ringMail'].includes(item)
      )
      
      if (armor === 'leather') baseAC = 11 + dexMod
      else if (armor === 'studdedLeather') baseAC = 12 + dexMod
      else if (armor === 'chainShirt') baseAC = 13 + Math.min(dexMod, 2)
      else if (armor === 'scaleMail') baseAC = 14 + Math.min(dexMod, 2)
      else if (armor === 'breastplate') baseAC = 14 + Math.min(dexMod, 2)
      else if (armor === 'halfPlate') baseAC = 15 + Math.min(dexMod, 2)
      else if (armor === 'ringMail') baseAC = 14
      else if (armor === 'chainMail') baseAC = 16
      else if (armor === 'splint') baseAC = 17
      else if (armor === 'plateMail') baseAC = 18
      else baseAC = 10 + dexMod
      
      if (character.equipment.includes('shield')) {
        baseAC += 2
      }
    } else {
      baseAC = 10 + dexMod
    }
    
    return baseAC
  }

  // Get equipment description
  const getEquipmentDescription = (item) => {
    const key = item.toLowerCase().replace(/\s+/g, '')
    return EQUIPMENT_DESCRIPTIONS[key] || EQUIPMENT_DESCRIPTIONS.default
  }

  // Calculate HP
  const hitDice = classData?.hitDice || 8
  const conMod = getAbilityModifierNum(character.abilities?.constitution || 10)
  const maxHP = hitDice + conMod

  return (
    <div>
      {/* PDF Export Button */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px'
      }}>
        <button
          onClick={exportToPDF}
          style={{
            padding: '12px 30px',
            fontSize: '1.1em',
            fontFamily: '"Book Antiqua", "Palatino Linotype", serif',
            fontWeight: 'bold',
            color: '#f4e4c1',
            backgroundColor: '#8b4513',
            border: '3px solid #5c2e0f',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#5c2e0f'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#8b4513'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          📄 導出為PDF
        </button>
      </div>

      <div ref={sheetRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Book Antiqua", "Palatino Linotype", serif',
      backgroundColor: '#f4e4c1',
      backgroundImage: `
        linear-gradient(to bottom, rgba(139, 69, 19, 0.05) 1px, transparent 1px),
        linear-gradient(135deg, transparent 48%, rgba(139, 69, 19, 0.03) 49%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)
      `,
      backgroundSize: '100% 2px, 4px 4px',
      border: '3px solid #8b4513',
      borderRadius: '4px',
      boxShadow: '0 0 20px rgba(139, 69, 19, 0.3), inset 0 0 40px rgba(139, 69, 19, 0.1)',
      color: '#2c1810'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        fontSize: '2.5em',
        textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
        color: '#5c2e0f',
        fontWeight: 'bold'
      }}>
        龍與地下城
        <div style={{ fontSize: '0.5em', marginTop: '5px' }}>角色卡 CHARACTER SHEET</div>
      </h1>
      
      {/* Basic Info */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px',
        backgroundColor: 'rgba(255, 248, 220, 0.7)',
        border: '2px solid #8b4513',
        borderRadius: '4px',
        boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
      }}>
        <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
          基本資料
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <p><strong>角色名 Character Name:</strong> {character.name}</p>
          <p><strong>種族 Race:</strong> {raceData?.name || character.race}</p>
          <p><strong>職業 Class:</strong> {classData?.name || character.class}</p>
          <p><strong>等級 Level:</strong> 1</p>
          <p><strong>背景 Background:</strong> {character.background || '冒險者'}</p>
          <p><strong>陣營 Alignment:</strong> -</p>
        </div>
      </div>

      {/* Ability Scores and Combat Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '20px' }}>
        {/* Ability Scores */}
        <div style={{ 
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f', marginBottom: '15px' }}>
            屬性值 ABILITY SCORES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { key: 'strength', label: '力量 STR', shortLabel: 'Strength' },
              { key: 'dexterity', label: '敏捷 DEX', shortLabel: 'Dexterity' },
              { key: 'constitution', label: '體質 CON', shortLabel: 'Constitution' },
              { key: 'intelligence', label: '智力 INT', shortLabel: 'Intelligence' },
              { key: 'wisdom', label: '感知 WIS', shortLabel: 'Wisdom' },
              { key: 'charisma', label: '魅力 CHA', shortLabel: 'Charisma' }
            ].map(({ key, label, shortLabel }) => {
              const score = character.abilities?.[key] || 10
              const modifier = getAbilityModifier(score)
              return (
                <div key={key} style={{
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '2px solid #8b4513',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '0.75em', fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>
                    {label}
                  </div>
                  <div style={{ 
                    fontSize: '1.8em', 
                    fontWeight: 'bold', 
                    color: '#8b4513',
                    margin: '5px 0'
                  }}>
                    {modifier}
                  </div>
                  <div style={{ 
                    fontSize: '1.2em',
                    padding: '5px',
                    backgroundColor: 'white',
                    border: '1px solid #8b4513',
                    borderRadius: '4px'
                  }}>
                    {score}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '15px', textAlign: 'center', padding: '10px', backgroundColor: 'rgba(139, 69, 19, 0.1)', borderRadius: '4px' }}>
            <strong>熟練加值 PROFICIENCY BONUS</strong>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#8b4513' }}>
              +{getProficiencyBonus()}
            </div>
          </div>
        </div>

        {/* Combat Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: 'rgba(255, 248, 220, 0.7)',
            border: '2px solid #8b4513',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
          }}>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#666' }}>
              護甲等級<br/>Armor Class
            </div>
            <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#8b4513', margin: '10px 0' }}>
              {calculateAC()}
            </div>
          </div>

          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: 'rgba(255, 248, 220, 0.7)',
            border: '2px solid #8b4513',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
          }}>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#666' }}>
              生命值<br/>Hit Points
            </div>
            <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#8b4513', margin: '10px 0' }}>
              {maxHP}
            </div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              生命骰 Hit Dice: 1d{hitDice}
            </div>
          </div>

          <div style={{ 
            textAlign: 'center', 
            padding: '15px',
            backgroundColor: 'rgba(255, 248, 220, 0.7)',
            border: '2px solid #8b4513',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
          }}>
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#666' }}>
              速度<br/>Speed
            </div>
            <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#8b4513', margin: '10px 0' }}>
              30呎
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: 'rgba(255, 248, 220, 0.7)',
        border: '2px solid #8b4513',
        borderRadius: '4px',
        boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
      }}>
        <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
          技能 SKILLS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {[
            { key: 'acrobatics', label: '特技 Acrobatics', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'animalHandling', label: '馴獸 Animal Handling', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'arcana', label: '秘法 Arcana', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'athletics', label: '運動 Athletics', ability: 'strength', abilityLabel: '力量' },
            { key: 'deception', label: '欺瞞 Deception', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'history', label: '歷史 History', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'insight', label: '洞察 Insight', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'intimidation', label: '威嚇 Intimidation', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'investigation', label: '調查 Investigation', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'medicine', label: '醫療 Medicine', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'nature', label: '自然 Nature', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'perception', label: '察覺 Perception', ability: 'wisdom', abilityLabel: '感知' },
            { key: 'performance', label: '表演 Performance', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'persuasion', label: '遊說 Persuasion', ability: 'charisma', abilityLabel: '魅力' },
            { key: 'religion', label: '宗教 Religion', ability: 'intelligence', abilityLabel: '智力' },
            { key: 'sleightOfHand', label: '巧手 Sleight of Hand', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'stealth', label: '隱匿 Stealth', ability: 'dexterity', abilityLabel: '敏捷' },
            { key: 'survival', label: '求生 Survival', ability: 'wisdom', abilityLabel: '感知' }
          ].map(({ key, label, ability, abilityLabel }) => {
            const isProficient = classData?.skillProficiencies?.includes(key)
            const modifier = getSkillModifier(key, character.abilities?.[ability] || 10)
            const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`
            
            return (
              <div key={key} style={{
                padding: '8px',
                backgroundColor: isProficient ? 'rgba(139, 69, 19, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                border: isProficient ? '2px solid #8b4513' : '1px solid #8b4513',
                borderRadius: '4px',
                fontSize: '0.85em'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold', color: '#5c2e0f' }}>
                    {isProficient && '●'} {label}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#8b4513', fontSize: '1.2em' }}>
                    {modifierStr}
                  </span>
                </div>
                <div style={{ fontSize: '0.85em', color: '#666', fontStyle: 'italic', lineHeight: '1.3' }}>
                  {SKILL_DESCRIPTIONS[key]}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Equipment */}
      {character.equipment && character.equipment.length > 0 && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            裝備 EQUIPMENT
          </h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {character.equipment.map((item, index) => (
              <div key={index} style={{
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid #8b4513',
                borderRadius: '4px',
                fontSize: '0.9em'
              }}>
                <div style={{ fontWeight: 'bold', color: '#5c2e0f', marginBottom: '4px', fontSize: '1em' }}>
                  {item}
                </div>
                <div style={{ fontSize: '0.85em', color: '#666', fontStyle: 'italic', lineHeight: '1.4' }}>
                  {getEquipmentDescription(item)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Class Features */}
      {classData?.features && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            職業特性 CLASS FEATURES
          </h2>
          <div style={{ marginTop: '10px' }}>
            {classData.features.map((feature, index) => (
              <div key={index} style={{ 
                marginBottom: '12px', 
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                borderLeft: '4px solid #8b4513'
              }}>
                <div style={{ fontWeight: 'bold', color: '#5c2e0f', marginBottom: '5px' }}>
                  {feature.name}
                </div>
                <div style={{ color: '#2c1810', fontSize: '0.9em', lineHeight: '1.5' }}>
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Racial Traits */}
      {raceData?.traits && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255, 248, 220, 0.7)',
          border: '2px solid #8b4513',
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(139, 69, 19, 0.1)'
        }}>
          <h2 style={{ borderBottom: '2px solid #8b4513', paddingBottom: '5px', color: '#5c2e0f' }}>
            種族特性 RACE TRAITS
          </h2>
          <div style={{ marginTop: '10px' }}>
            {Array.isArray(raceData.traits) ? (
              raceData.traits.map((trait, index) => (
                <div key={index} style={{ 
                  marginBottom: '12px', 
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  borderLeft: '4px solid #8b4513'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#5c2e0f', marginBottom: '5px' }}>
                    {trait.name}
                  </div>
                  <div style={{ color: '#2c1810', fontSize: '0.9em', lineHeight: '1.5' }}>
                    {trait.description}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                borderLeft: '4px solid #8b4513',
                color: '#2c1810', 
                fontSize: '0.9em', 
                lineHeight: '1.5' 
              }}>
                {raceData.traits}
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default CharacterSheet
