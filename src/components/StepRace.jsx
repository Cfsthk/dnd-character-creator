import { useState } from 'react'
import { races } from '../data/raceData'

const StepRace = ({ character, updateCharacter, nextStep }) => {
  const [selectedRace, setSelectedRace] = useState(character.race)
  const [selectedSubrace, setSelectedSubrace] = useState(character.subrace)

  const raceList = [
    { id: 'human', icon: '👤' },
    { id: 'elf', icon: '🧝' },
    { id: 'dwarf', icon: '⚒️' },
    { id: 'halfling', icon: '🌾' },
    { id: 'dragonborn', icon: '🐉' },
    { id: 'gnome', icon: '🎩' },
    { id: 'half-elf', icon: '🧙' },
    { id: 'half-orc', icon: '💪' },
    { id: 'tiefling', icon: '😈' },
    { id: 'tabaxi', icon: '🐆' },
    { id: 'aasimar', icon: '😇' },
    { id: 'kenku', icon: '🐦' },
    { id: 'goliath', icon: '🗿' },
    { id: 'firbolg', icon: '🌲' },
    { id: 'yuanti', icon: '🐍' },
  ]

  const handleRaceSelect = (raceId) => {
    setSelectedRace(raceId)
    setSelectedSubrace(null)
    updateCharacter({ race: raceId, subrace: null })
  }

  const handleSubraceSelect = (subrace) => {
    setSelectedSubrace(subrace)
    updateCharacter({ race: selectedRace, subrace: subrace })
  }

  const handleNext = () => {
    if (selectedRace && selectedSubrace) {
      nextStep()
    }
  }

  const currentRaceData = selectedRace ? races[selectedRace] : null
  const subraceNames = currentRaceData ? currentRaceData.subraces : []
  const subraceDetails = currentRaceData ? currentRaceData.subraceDetails : {}

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇你的種族</h2>
        <p className="text-gray-600">你的種族決定了你的基礎能力和特性</p>
      </div>

      {/* Race Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">選擇種族</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {raceList.map((race) => (
            <button
              key={race.id}
              onClick={() => handleRaceSelect(race.id)}
              className={`card-hover text-left p-4 ${
                selectedRace === race.id ? 'ring-4 ring-dnd-blue bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{race.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{races[race.id].nameChinese}</h4>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{races[race.id].description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subrace Selection */}
      {selectedRace && subraceNames.length > 0 && (
        <div className="card max-w-3xl mx-auto p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            選擇 {races[selectedRace].nameChinese} 亞種
          </h3>
          <div className="space-y-3">
            {subraceNames.map((subraceName, index) => {
              const subraceData = subraceDetails[subraceName]
              return (
                <button
                  key={index}
                  onClick={() => handleSubraceSelect(subraceName)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSubrace === subraceName
                      ? 'border-dnd-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-bold text-gray-800">{subraceData?.nameChinese || subraceName}</h4>
                  <p className="text-gray-600 text-sm mt-1">{subraceData?.description || ''}</p>
                  {subraceData?.abilityScoreIncrease && (
                    <p className="text-dnd-red text-sm mt-2">
                      能力值加成: {subraceData.abilityScoreIncrease}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedRace || !selectedSubrace}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default StepRace
