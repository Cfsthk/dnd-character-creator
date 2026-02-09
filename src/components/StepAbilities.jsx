import { classes } from '../data/classData'

const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    { 
      key: 'strength', 
      name: '力量 (STR)', 
      description: 'Physical power, melee attacks',
      explanation: 'Affects melee weapon damage, athletics checks, strength checks. Primary for Fighters, Barbarians, and Paladins.'
    },
    { 
      key: 'dexterity', 
      name: '敏捷 (DEX)', 
      description: 'Agility, reflexes, ranged attacks',
      explanation: 'Affects initiative, AC (armor class), ranged weapon attacks, stealth checks. Primary for Rogues, Rangers, and Monks.'
    },
    { 
      key: 'constitution', 
      name: '體質 (CON)', 
      description: 'Health, stamina',
      explanation: 'Affects hit point maximum, concentration checks, endurance checks. Important for all classes, especially front-line fighters.'
    },
    { 
      key: 'intelligence', 
      name: '智力 (INT)', 
      description: 'Reasoning, memory',
      explanation: 'Affects spell attacks (Wizards), investigation checks, knowledge skills. Primary for Wizards.'
    },
    { 
      key: 'wisdom', 
      name: '感知 (WIS)', 
      description: 'Awareness, intuition',
      explanation: 'Affects spell attacks (Clerics/Druids), perception checks, insight checks. Primary for Clerics and Druids.'
    },
    { 
      key: 'charisma', 
      name: '魅力 (CHA)', 
      description: 'Force of personality, leadership',
      explanation: 'Affects spell attacks (Sorcerers/Bards), persuasion checks, performance checks. Primary for Sorcerers, Bards, and Paladins.'
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
        <p className="text-gray-600">標準陣列：15, 14, 13, 12, 10, 8 | 或使用點數購買（27點）</p>
      </div>

      {/* Suggestions Box */}
      {classData && (
        <div className="card max-w-2xl mx-auto bg-blue-50 border-2 border-dnd-blue p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">
                💡 {classData.name} 推薦設置
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                主要: <span className="font-bold capitalize">{classData.primaryAbility}</span> | 
                次要: <span className="font-bold capitalize">{classData.secondaryAbility}</span>
              </p>
              <div className="text-sm text-gray-600">
                <p className="mb-1">建議數值:</p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(suggestions || {}).map(([key, value]) => (
                    <li key={key}>
                      <span className="capitalize">{key}</span>: {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={applySuggestions}
              className="btn-secondary ml-4 whitespace-nowrap"
            >
              套用這些
            </button>
          </div>
        </div>
      )}

      {/* Ability Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {abilities.map(ability => {
          const score = character.abilities?.[ability.key] || 10
          const modifier = getAbilityModifier(score)
          
          return (
            <div key={ability.key} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{ability.name}</h3>
                  <p className="text-sm text-gray-600">{ability.description}</p>
                </div>
                <div className="text-center ml-4">
                  <div className="text-3xl font-bold text-dnd-red">{score}</div>
                  <div className="text-sm text-gray-600">
                    {modifier >= 0 ? '+' : ''}{modifier}
                  </div>
                </div>
              </div>
              
              <input
                type="number"
                min="3"
                max="20"
                value={score}
                onChange={(e) => {
                  const newScore = parseInt(e.target.value) || 10
                  updateCharacter({
                    abilities: {
                      ...character.abilities,
                      [ability.key]: newScore
                    }
                  })
                }}
                className="input-field w-full"
              />
              
              <p className="text-xs text-gray-500 mt-2">{ability.explanation}</p>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto pt-4">
        <button onClick={previousStep} className="btn-secondary">
          ← 上一步
        </button>
        <button onClick={nextStep} className="btn-primary">
          下一步：裝備 →
        </button>
      </div>
    </div>
  )
}

export default StepAbilities
