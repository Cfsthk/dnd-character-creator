import { useState } from 'react'
import { races } from '../data/raceData'

const StepRace = ({ character, updateCharacter, nextStep }) => {
  const [selectedRace, setSelectedRace] = useState(character.race)
  const [selectedSubrace, setSelectedSubrace] = useState(character.subrace)

  const raceList = [
    { id: 'human', icon: '👤' },
    { id: 'elf', icon: '🧝' },
    { id: 'dwarf', icon: '⛏️' },
    { id: 'halfling', icon: '🌾' },
    { id: 'dragonborn', icon: '🐉' },
    { id: 'gnome', icon: '🎩' },
    { id: 'half-elf', icon: '🧥' },
    { id: 'half-orc', icon: '💪' },
    { id: 'tiefling', icon: '😈' },
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
        <p className="text-gray-600">你的種族決定了基礎能力和特性</p>
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
                  className={`card-hover text-left p-4 ${
                    selectedSubrace === subraceName ? 'ring-4 ring-dnd-blue bg-blue-50' : ''
                  }`}
                >
                  <h4 className="font-bold text-gray-800 mb-2">{subraceName}</h4>
                  {subraceData && (
                    <p className="text-sm text-gray-600">{subraceData.description}</p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!selectedRace || !selectedSubrace}
        className={`${
          selectedRace && selectedSubrace
            ? 'bg-dnd-blue hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        } font-semibold py-3 px-6 rounded-lg shadow-md transition-colors w-full`}
      >
        下一步
      </button>
    </div>
  )
}

export default StepRace