import { classes } from '../data/classData'

const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    { key: 'strength', name: 'Strength (STR)', description: 'Physical power, melee attacks' },
    { key: 'dexterity', name: 'Dexterity (DEX)', description: 'Agility, AC, ranged attacks' },
    { key: 'constitution', name: 'Constitution (CON)', description: 'Hit points, endurance' },
    { key: 'intelligence', name: 'Intelligence (INT)', description: 'Reasoning, knowledge' },
    { key: 'wisdom', name: 'Wisdom (WIS)', description: 'Awareness, insight' },
    { key: 'charisma', name: 'Charisma (CHA)', description: 'Personality, influence' },
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Assign Ability Scores</h2>
        <p className="text-gray-600">Standard Array: 15, 14, 13, 12, 10, 8 | Or use Point Buy (27 points)</p>
      </div>

      {/* Suggestions Box */}
      {classData && (
        <div className="card max-w-2xl mx-auto bg-blue-50 border-2 border-dnd-blue p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">
                💡 Recommended for {classData.name}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Primary: <span className="font-bold capitalize">{classData.primaryAbility}</span> | 
                Secondary: <span className="font-bold capitalize ml-1">{classData.secondaryAbility}</span>
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
              Use These
            </button>
          </div>
        </div>
      )}

      {/* Ability Score Input */}
      <div className="card max-w-2xl mx-auto space-y-4">
        {abilities.map((ability) => {
          const score = character.abilities[ability.key]
          const modifier = getAbilityModifier(score)
          const isPrimary = classData && classData.primaryAbility === ability.key
          const isSecondary = classData && classData.secondaryAbility === ability.key
          
          return (
            <div 
              key={ability.key} 
              className={`flex items-center justify-between p-3 rounded-lg ${
                isPrimary ? 'bg-blue-100 border-2 border-dnd-blue' : 
                isSecondary ? 'bg-blue-50 border border-dnd-blue' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">
                  {ability.name}
                  {isPrimary && <span className="ml-2 text-xs bg-dnd-blue text-white px-2 py-1 rounded">PRIMARY</span>}
                  {isSecondary && <span className="ml-2 text-xs bg-blue-400 text-white px-2 py-1 rounded">SECONDARY</span>}
                </h3>
                <p className="text-sm text-gray-600">{ability.description}</p>
                {suggestions && (
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested: {suggestions[ability.key]}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="3"
                  max="20"
                  value={score}
                  onChange={(e) => updateCharacter({
                    abilities: { ...character.abilities, [ability.key]: parseInt(e.target.value) || 10 }
                  })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
                />
                <div className="w-16 text-center">
                  <div className="text-xs text-gray-500">Modifier</div>
                  <div className="font-bold text-lg">
                    {modifier >= 0 ? '+' : ''}{modifier}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Point Buy Helper */}
      <div className="text-center text-sm text-gray-600 max-w-2xl mx-auto">
        <p>Standard scores range from 8-15 before racial bonuses. Racial bonuses will be applied automatically.</p>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">Previous</button>
        <button onClick={nextStep} className="btn-primary">Next</button>
      </div>
    </div>
  )
}

export default StepAbilities
