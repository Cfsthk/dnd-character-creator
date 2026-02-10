import { classes } from '../data/classData'

const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    {
      key: 'strength',
      name: '力量 (STR)',
      description: '體力、近戰攻擊',
      explanation: '影響近戰武器傷害、運動檢定、力量檢定。戰士、野蠻人和聖武士的主要屬性。'
    },
    {
      key: 'dexterity',
      name: '敏捷 (DEX)',
      description: '靈活、反應、遠程攻擊',
      explanation: '影響先攻、護甲等級(AC)、遠程武器攻擊、隱匿檢定。盜賊、遊俠和武僧的主要屬性。'
    },
    {
      key: 'constitution',
      name: '體質 (CON)',
      description: '健康、耐力',
      explanation: '影響生命值上限、專注檢定、耐力檢定。對所有職業都很重要，尤其是前線戰士。'
    },
    {
      key: 'intelligence',
      name: '智力 (INT)',
      description: '推理、記憶',
      explanation: '影響法術攻擊(法師)、調查檢定、知識技能。法師的主要屬性。'
    },
    {
      key: 'wisdom',
      name: '感知 (WIS)',
      description: '覺察、直覺',
      explanation: '影響法術攻擊(牧師/德魯伊)、察覺檢定、洞察檢定。牧師和德魯伊的主要屬性。'
    },
    {
      key: 'charisma',
      name: '魅力 (CHA)',
      description: '人格魅力、領導力',
      explanation: '影響法術攻擊(術士/吟遊詩人)、說服檢定、表演檢定。術士、吟遊詩人和聖武士的主要屬性。'
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
        <p className="text-gray-600">標準陣列: 15, 14, 13, 12, 10, 8 | 或使用點數購買 (27點)</p>
      </div>

      {/* Suggestions Box */}
      {classData && (
        <div className="card max-w-2xl mx-auto bg-blue-50 border-2 border-dnd-blue p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">
                💡 {classData.nameChinese} 推薦設定
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                主要屬性: <span className="font-bold capitalize">{classData.primaryAbility}</span> |
                次要屬性: <span className="font-bold capitalize">{classData.secondaryAbility}</span>
              </p>
            </div>
            <button
              className="px-3 py-1 bg-white text-sm rounded border border-gray-300 hover:bg-gray-50 text-dnd-blue"
              onClick={applySuggestions}
            >
              套用
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {abilities.map((ability) => {
              const value = suggestions[ability.key] || 0
              const modifier = getAbilityModifier(value)
              return (
                <div key={ability.key} className="text-center">
                  <div className="font-semibold text-xs">{ability.key.toUpperCase().substring(0, 3)}</div>
                  <div className="text-2xl font-bold text-dnd-blue">{value}</div>
                  <div className="text-xs text-gray-600">{modifier >= 0 ? '+' : ''}{modifier}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Ability Score Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {abilities.map((ability) => {
          const value = character.abilities?.[ability.key] || 10
          const modifier = getAbilityModifier(value)
          return (
            <div key={ability.key} className="p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-bold text-gray-800">{ability.name}</h4>
                  <p className="text-xs text-gray-600">{ability.description}</p>
                </div>
                <div className="text-center">
                  <input
                    type="number"
                    className="form-control text-center text-2xl font-bold w-16"
                    value={value}
                    onChange={(e) => {
                      updateCharacter({
                        abilities: {
                          ...character.abilities,
                          [ability.key]: parseInt(e.target.value) || 10,
                        },
                      })
                    }}
                    min="3"
                    max="18"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    調整值: {modifier >= 0 ? '+' : ''}{modifier}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{ability.explanation}</p>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button className="btn-secondary" onClick={previousStep}>
          ← 返回職業選擇
        </button>
        <button className="btn-primary" onClick={nextStep}>
          下一步：選擇技能 →
        </button>
      </div>
    </div>
  )
}

export default StepAbilities
