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
  const subraces = currentRaceData ? currentRaceData.subraces : []

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
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{races[race.id].descriptionChinese}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subrace Selection */}
      {selectedRace && subraces.length > 0 && (
        <div className="card max-w-3xl mx-auto p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            選擇 {races[selectedRace].nameChinese} 亞種
          </h3>
          <div className="space-y-3">
            {subraces.map((subrace, index) => (
              <button
                key={index}
                onClick={() => handleSubraceSelect(subrace.name)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedSubrace === subrace.name
                    ? 'border-dnd-blue bg-blue-50'
                    : 'border-gray-300 hover:border-dnd-blue'
                }`}
              >
                <h4 className="font-bold text-gray-800 mb-2">{subrace.nameChinese}</h4>
                <p className="text-gray-600 text-sm">{subrace.descriptionChinese}</p>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    能力加值: {Object.entries(subrace.abilityBonuses).map(([key, value]) => 
                      `${key} +${value}`
                    ).join(', ')}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Race Details */}
      {selectedRace && (
        <div className="card max-w-3xl mx-auto p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {races[selectedRace].nameChinese} 特性
          </h3>
          <p className="text-gray-600 mb-4">{races[selectedRace].descriptionChinese}</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-gray-800">體型:</h4>
              <p className="text-gray-600">{races[selectedRace].sizeChinese}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800">速度:</h4>
              <p className="text-gray-600">{races[selectedRace].speed} 呎</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800">種族特性:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {races[selectedRace].traitsChinese.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {selectedRace && selectedSubrace && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-dnd-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一步
          </button>
        </div>
      )}
    </div>
  )
}

export default StepRace
