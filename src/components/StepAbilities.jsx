import { classes } from '../data/classData'

const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    { 
      key: 'strength', 
      name: '力量 (STR)', 
      description: '物理力量，近戰攻擊',
      explanation: '影響近戰武器傷害、運動能力檢定、力量檢定。戰士、野蠻人、聖武士的主要屬性。'
    },
    { 
      key: 'dexterity', 
      name: '敏捷 (DEX)', 
      description: '靈活度、護甲等級、遠程攻擊',
      explanation: '影響先攻值、AC（護甲等級）、遠程武器攻擊、靈巧檢定。遊俠、盜賊、武僧的主要屬性。'
    },
    { 
      key: 'constitution', 
      name: '體質 (CON)', 
      description: '生命值、耐力',
      explanation: '影響生命值上限、專注檢定、耐力檢定。對所有職業都很重要，特別是前排角色。'
    },
    { 
      key: 'intelligence', 
      name: '智力 (INT)', 
      description: '推理、知識',
      explanation: '影響法術攻擊（法師）、調查檢定、知識類技能。法師的主要屬性。'
    },
    { 
      key: 'wisdom', 
      name: '感知 (WIS)', 
      description: '洞察力、覺察',
      explanation: '影響法術攻擊（牧師/德魯伊）、察覺檢定、洞察檢定。牧師、德魯伊的主要屬性。'
    },
    { 
      key: 'charisma', 
      name: '魅力 (CHA)', 
      description: '個性、影響力',
      explanation: '影響法術攻擊（術士/吟遊詩人）、說服檢定、表演檢定。術士、吟遊詩人、聖武士的主要屬性。'
    },
  ]

  // Get suggestions based on selected class
  const classData = character.class ? classes[character.class] : null
  const suggestions = classData ? classData.recommendedScores : null

  const getAbilityModifier = (score) => {
    return Math.floor((score - 10) / 2)
  }

  const applySuggestions = () => {
    if (suggestions) {
      updateCharacter({ abilities: { ...suggestions } })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">分配屬性值</h2>
        <p className="text-gray-600">標準陣列：15、14、13、12、10、8 | 或使用點數購買（27點）</p>
      </div>

      {/* Suggestions Box */}
      {classData && (
        <div className="card max-w-2xl mx-auto bg-blue-50 border-2 border-dnd-blue p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">
                💡 {classData.name} 推薦配置
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                主要屬性：<span className="font-bold capitalize">{classData.primaryAbility}</span> | 
                次要屬性：<span className="font-bold capitalize ml-1">{classData.secondaryAbility}</span>
              </p>
              <div className="grid grid-cols-6 gap-2 text-xs">
                {Object.entries(suggestions).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="font-bold uppercase text-gray-600">{key.slice(0, 3)}</div>
                    <div className="font-bold text-dnd-blue">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={applySuggestions}
              className="btn-secondary text-sm ml-4"
            >
              使用推薦
            </button>
          </div>
        </div>
      )}

      {/* Ability Score Input */}
      <div className="card max-w-2xl mx-auto space-y-4">
        {abilities.map((ability) => {
          const score = character.abilities[ability.key]
          const modifier = getAbilityModifier(score)
          const modifierText = modifier >= 0 ? `+${modifier}` : modifier

          return (
            <div key={ability.key} className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="font-semibold text-gray-800">
                    {ability.name}
                  </label>
                  <p className="text-sm text-gray-600">{ability.description}</p>
                </div>

                <input
                  type="number"
                  min="3"
                  max="20"
                  value={score}
                  onChange={(e) => updateCharacter({
                    abilities: {
                      ...character.abilities,
                      [ability.key]: parseInt(e.target.value) || 0,
                    },
                  })}
                  className="input w-20 text-center text-lg font-bold"
                />

                <div className="text-center w-16">
                  <div className="text-xs text-gray-600">調整值</div>
                  <div className="text-xl font-bold text-dnd-blue">{modifierText}</div>
                </div>
              </div>
              
              {/* Explanation tooltip */}
              <div className="ml-4 pl-4 border-l-2 border-blue-200 bg-blue-50 p-2 rounded text-sm text-gray-700">
                ℹ️ {ability.explanation}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">
          ← 返回
        </button>
        <button onClick={nextStep} className="btn-primary">
          繼續 →
        </button>
      </div>
    </div>
  )
}

export default StepAbilities
