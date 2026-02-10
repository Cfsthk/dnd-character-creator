import { useState } from 'react'

const StepBackground = ({ character, updateCharacter, nextStep, previousStep }) => {
  const [activeTooltip, setActiveTooltip] = useState(null)

  const backgrounds = [
    { 
      id: 'acolyte', 
      name: '侍僧', 
      description: '在神殿中服務',
      details: {
        summary: '您曾在神殿、修道院或其他宗教機構中服務，致力於侍奉神祇。',
        skillProficiencies: '洞察、宗教',
        languages: '任選兩種語言',
        equipment: '聖徽、祈禱書或禱文輪、5支香、祭服、常服、腰包（內有15金幣）',
        feature: '庇護所：您與同伴可以在您信仰的神殿中得到免費的治療和照顧。信徒會支持您（僅限合理的生活方式）並提供必要的物資。',
        roleplayTips: '適合虔誠、有信仰、擅長調解和提供精神指導的角色。'
      }
    },
    { 
      id: 'criminal', 
      name: '罪犯', 
      description: '街頭生存者',
      details: {
        summary: '您曾是（或仍是）罪犯，靠非法活動為生。您熟悉犯罪網絡和地下世界。',
        skillProficiencies: '欺瞞、隱匿',
        toolProficiencies: '一種遊戲工具、盜賊工具',
        equipment: '一把撬棍、一套深色連帽常服、腰包（內有15金幣）',
        feature: '犯罪聯繫：您有可靠的犯罪聯絡人，作為您與犯罪網絡的聯繫。您知道如何通過這些管道傳遞消息，即使在陌生城市也能找到地下勢力。',
        roleplayTips: '適合狡猾、機智、善於潛行和欺騙的角色。過去可能是盜賊、走私者或詐騙犯。'
      }
    },
    { 
      id: 'folk-hero', 
      name: '民間英雄', 
      description: '平民中的英雄',
      details: {
        summary: '您來自普通民眾，但因英勇行為而在家鄉成為傳奇。您為了保護家園而挺身而出。',
        skillProficiencies: '馴獸、求生',
        toolProficiencies: '一種工匠工具、陸地載具',
        equipment: '一套工匠工具、一把鏟子、一個鐵鍋、常服、腰包（內有10金幣）',
        feature: '鄉野好客：普通民眾認得您並欽佩您的英雄事蹟，他們會為您和同伴提供食宿，在必要時甚至願意冒險庇護您。',
        roleplayTips: '適合樸實、勇敢、受人愛戴的角色。可能曾擊退盜賊、對抗暴君或拯救村莊。'
      }
    },
    { 
      id: 'noble', 
      name: '貴族', 
      description: '上流社會出身',
      details: {
        summary: '您出生於貴族家庭，擁有財富、權力和特權。您習慣上流社會的生活方式。',
        skillProficiencies: '歷史、說服',
        toolProficiencies: '一種遊戲工具',
        languages: '任選一種語言',
        equipment: '一套華服、簽名戒指、家族紋章卷軸、腰包（內有25金幣）',
        feature: '貴族地位：您受到上流社會的歡迎。平民會尊敬您，您可以覲見當地貴族。其他貴族（和新興資產階級）將您視為同等階層。',
        roleplayTips: '適合有教養、有影響力、習慣指揮的角色。可能是貴族、騎士或富商後裔。'
      }
    },
    { 
      id: 'sage', 
      name: '學者', 
      description: '知識追求者',
      details: {
        summary: '您將年輕時光投入學習，鑽研古老文本和秘密知識。您渴望解開宇宙的奧秘。',
        skillProficiencies: '奧秘、歷史',
        languages: '任選兩種語言',
        equipment: '一瓶墨水、一支羽毛筆、一把小刀、一封已故同事的信（內含您無法解答的問題）、常服、腰包（內有10金幣）',
        feature: '研究員：當您試圖學習或回憶知識時，如果您不知道該資訊，通常知道在哪裡可以獲得它（圖書館、經文室、大學，或知道答案的學者或生物）。',
        roleplayTips: '適合博學、好奇、善於調查和研究的角色。可能是學者、圖書管理員或魔法學徒。'
      }
    },
    { 
      id: 'soldier', 
      name: '士兵', 
      description: '軍事經歷',
      details: {
        summary: '您曾在軍隊中服役，經歷過戰爭的洗禮。您受過軍事訓練，懂得紀律和戰術。',
        skillProficiencies: '運動、威嚇',
        toolProficiencies: '一種遊戲工具、陸地載具',
        equipment: '代表軍階的徽章、戰利品（敵軍匕首、破損旗幟或紀念章）、骨骰或紙牌、常服、腰包（內有10金幣）',
        feature: '軍階：您擁有軍階，仍屬軍事組織。您麾下的士兵會服從命令，您可以在友軍堡壘使用軍官設施。某些情況下可要求臨時使用軍馬或裝備。',
        roleplayTips: '適合紀律嚴明、戰術思維、有領導力的角色。可能是退伍軍人、雇傭兵或民兵。'
      }
    },
  ]

  const toggleTooltip = (bgId) => {
    setActiveTooltip(activeTooltip === bgId ? null : bgId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇背景</h2>
        <p className="text-gray-600">背景決定您的過去與額外技能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {backgrounds.map((bg) => (
          <div key={bg.id} className="relative">
            <button
              onClick={() => updateCharacter({ background: bg.id })}
              className={`card-hover text-center p-4 w-full ${
                character.background === bg.id ? 'ring-4 ring-dnd-blue' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 text-lg">{bg.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleTooltip(bg.id)
                  }}
                  className="ml-2 w-6 h-6 rounded-full bg-dnd-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
                  title="詳細資訊"
                >
                  ?
                </button>
              </div>
              <p className="text-gray-600 text-sm">{bg.description}</p>
            </button>

            {activeTooltip === bg.id && (
              <div className="absolute z-10 w-80 bg-white border-2 border-dnd-blue rounded-lg shadow-xl p-4 mt-2 left-0 md:left-auto md:right-0">
                <button
                  onClick={() => setActiveTooltip(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <h4 className="font-bold text-dnd-red mb-2 pr-6">{bg.name}</h4>
                <div className="text-sm space-y-2 text-left">
                  <p className="text-gray-700">{bg.details.summary}</p>
                  
                  <div>
                    <strong className="text-dnd-blue">技能熟練：</strong>
                    <p className="text-gray-600">{bg.details.skillProficiencies}</p>
                  </div>

                  {bg.details.toolProficiencies && (
                    <div>
                      <strong className="text-dnd-blue">工具熟練：</strong>
                      <p className="text-gray-600">{bg.details.toolProficiencies}</p>
                    </div>
                  )}

                  {bg.details.languages && (
                    <div>
                      <strong className="text-dnd-blue">語言：</strong>
                      <p className="text-gray-600">{bg.details.languages}</p>
                    </div>
                  )}

                  <div>
                    <strong className="text-dnd-blue">起始裝備：</strong>
                    <p className="text-gray-600">{bg.details.equipment}</p>
                  </div>

                  <div>
                    <strong className="text-dnd-blue">特性：</strong>
                    <p className="text-gray-600">{bg.details.feature}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <strong className="text-dnd-blue">角色扮演建議：</strong>
                    <p className="text-gray-600 italic">{bg.details.roleplayTips}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between max-w-6xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <button onClick={nextStep} className="btn-primary">下一步</button>
      </div>
    </div>
  )
}

export default StepBackground