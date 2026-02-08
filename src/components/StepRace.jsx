import { useState } from 'react'
import { races } from '../data/raceData'

const StepRace = ({ character, updateCharacter, nextStep }) => {
  const [selectedRace, setSelectedRace] = useState(character.race)
  const [selectedSubrace, setSelectedSubrace] = useState(character.subrace)

  const raceList = [
    { id: 'human', icon: '👤', description: 'Versatile and adaptable' },
    { id: 'elf', icon: '🧝', description: 'Graceful and long-lived' },
    { id: 'dwarf', icon: '⛏️', description: 'Strong and resilient' },
    { id: 'halfling', icon: '🌾', description: 'Lucky and nimble' },
    { id: 'dragonborn', icon: '🐉', description: 'Draconic heritage and breath weapon' },
    { id: 'gnome', icon: '🎩', description: 'Inventive and curious' },
    { id: 'half-elf', icon: '🧙', description: 'Diplomatic and versatile' },
    { id: 'half-orc', icon: '💪', description: 'Fierce and enduring' },
    { id: 'tiefling', icon: '😈', description: 'Infernal heritage and charisma' },
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Race</h2>
        <p className="text-gray-600">Your race determines your base abilities and traits</p>
      </div>

      {/* Race Selection */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Select Race</h3>
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
                  <h4 className="font-bold text-gray-800">{races[race.id].name}</h4>
                  <p className="text-gray-600 text-xs mt-1">{race.description}</p>
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
            Choose Your {currentRaceData.name} Subrace
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Height: {currentRaceData.heightRange.min} - {currentRaceData.heightRange.max} | 
            Weight: {currentRaceData.weightRange.min} - {currentRaceData.weightRange.max} lbs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subraces.map((subrace) => (
              <button
                key={subrace}
                onClick={() => handleSubraceSelect(subrace)}
                className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubrace === subrace
                    ? 'border-dnd-blue bg-blue-50 text-dnd-blue'
                    : 'border-gray-300 hover:border-dnd-blue'
                }`}
              >
                {subrace}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end max-w-3xl mx-auto">
        <button 
          onClick={handleNext}
          disabled={!selectedRace || !selectedSubrace}
          className={`btn-primary ${(!selectedRace || !selectedSubrace) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StepRace
