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
                Secondary: <span className="font-bold capitalize">{classData.secondaryAbility}</span>
              </p>
            </div>
            <button
              className="px-3 py-1 bg-white text-sm rounded border border-gray-300 hover:bg-gray-50 text-dnd-blue"
              onClick={applySuggestions}
            >
              Apply
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
            <div key={ability.key} className="p.4 border border-gray-300 rounded-lg">
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
                    Mod: {modifier >= 0 ? '+' : ''}{modifier}
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
          ← Back to Class
        </button>
        <button className="btn-primary" onClick={nextStep}>
          Next: Choose Skills →
        </button>
      </div>
    </div>
  )
}

export default StepAbilities
