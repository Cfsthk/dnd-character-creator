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
    { id: 'half-elf', icon: '🧙' },
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
                  className={`w-full text-left p-4 border-2 rounded-lg hover:border-dnd-blue transition-colors ${
                    selectedSubrace === subraceName
                      ? 'border-dnd-blue bg-blue-50 ring-2 ring-dnd-blue'
                      : 'border-gray-200'
                  }`}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    {subraceData?.name || subraceName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {subraceData?.description || '無描述'}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Race Details */}
      {currentRaceData && (
        <div className="card max-w-3xl mx-auto p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">種族特性</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">能力值加成</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentRaceData.abilityBonus || {}).map(([ability, bonus]) => (
                  <span key={ability} className="badge-primary">
                    {ability} +{bonus}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">種族特質</h4>
              <p className="text-sm text-gray-600">{currentRaceData.traits}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={!selectedRace || (subraceNames.length > 0 && !selectedSubrace)}
          className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default StepRace
