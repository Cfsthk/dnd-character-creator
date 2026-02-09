import { classes } from '../data/classData'

const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    { 
      key: 'strength', 
      name: 'Strength (STR)', 
      description: 'Physical power, melee attacks',
      explanation: 'Affects melee weapon damage, athletics checks, strength checks. Primary for Fighters, Barbarians, and Paladins.'
    },
    { 
      key: 'dexterity', 
      name: 'Dexterity (DEX)', 
      description: 'Agility, reflexes, ranged attacks',
      explanation: 'Affects initiative, AC (armor class), ranged weapon attacks, stealth checks. Primary for Rogues, Rangers, and Monks.'
    },
    { 
      key: 'constitution', 
      name: 'Constitution (CON)', 
      description: 'Health, stamina',
      explanation: 'Affects hit point maximum, concentration checks, endurance checks. Important for all classes, especially front-line fighters.'
    },
    { 
      key: 'intelligence', 
      name: 'Intelligence (INT)', 
      description: 'Reasoning, memory',
      explanation: 'Affects spell attacks (Wizards), investigation checks, knowledge skills. Primary for Wizards.'
    },
    { 
      key: 'wisdom', 
      name: 'Wisdom (WIS)', 
      description: 'Awareness, intuition',
      explanation: 'Affects spell attacks (Clerics/Druids), perception checks, insight checks. Primary for Clerics and Druids.'
    },
    { 
      key: 'charisma', 
      name: 'Charisma (CHA)', 
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Assign Ability Scores</h2>
        <p className="text-gray-600">Standard Array: 15, 14, 13, 12, 10, 8 | Or use point buy (27 points)</p>
      </div>

      {/* Suggestions Box */}
      {classData && (
        <div className="card max-w-2xl mx-auto bg-blue-50 border-2 border-dnd-blue p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">
                💡 {classData.name} Recommended Setup
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Primary: <span className="font-bold capitalize">{classData.primaryAbility}</span> | 
                Secondary: <span className="font-bold capitalize ml-1">{classData.secondaryAbility}</span>
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                {abilities.map(ability => {
                  const suggestedScore = suggestions[ability.key]
                  return (
                    <span key={ability.key} className="bg-white px-2 py-1 rounded border">
                      {ability.name.split(' ')[0]}: {suggestedScore}
                    </span>
                  )
                })}
              </div>
            </div>
            <button
              onClick={applySuggestions}
              className="btn btn-secondary ml-4"
            >
              Apply Suggestions
            </button>
          </div>
        </div>
      )}

      {/* Ability Score Inputs */}
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {abilities.map((ability) => {
          const score = character.abilities?.[ability.key] || 10
          const modifier = getAbilityModifier(score)
          
          return (
            <div key={ability.key} className="card bg-white p-4 border-2 border-gray-200 hover:border-dnd-blue transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{ability.name}</h3>
                  <p className="text-sm text-gray-600">{ability.description}</p>
                </div>
                <div className="text-center ml-4">
                  <div className="text-3xl font-bold text-dnd-red">{score}</div>
                  <div className="text-sm text-gray-600">
                    Modifier: {modifier >= 0 ? '+' : ''}{modifier}
                  </div>
                </div>
              </div>
              
              <input
                type="range"
                min="3"
                max="18"
                value={score}
                onChange={(e) => updateCharacter({
                  abilities: {
                    ...character.abilities,
                    [ability.key]: parseInt(e.target.value)
                  }
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              
              <details className="mt-2">
                <summary className="text-sm text-dnd-blue cursor-pointer hover:underline">
                  📖 Learn More
                </summary>
                <p className="text-sm text-gray-600 mt-2 pl-4">
                  {ability.explanation}
                </p>
              </details>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto pt-4">
        <button onClick={previousStep} className="btn btn-secondary">
          ← Previous
        </button>
        <button onClick={nextStep} className="btn btn-primary">
          Next →
        </button>
      </div>
    </div>
  )
}

export default StepAbilities
