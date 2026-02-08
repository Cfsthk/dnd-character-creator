const StepRace = ({ character, updateCharacter, nextStep }) => {
  const races = [
    { id: 'human', name: '人類', icon: '👤', description: '適應力強的全能種族' },
    { id: 'elf', name: '精靈', icon: '🧝', description: '優雅敏捷的長生種族' },
    { id: 'dwarf', name: '矮人', icon: '⛏️', description: '堅韌強壯的工匠種族' },
    { id: 'halfling', name: '半身人', icon: '🌾', description: '幸運靈活的小型種族' },
  ]

  const handleSelect = (raceId) => {
    updateCharacter({ race: raceId })
    setTimeout(nextStep, 300)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇您的種族</h2>
        <p className="text-gray-600">種族決定了您的基礎能力與特性</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {races.map((race) => (
          <button
            key={race.id}
            onClick={() => handleSelect(race.id)}
            className={`card-hover text-left p-6 ${
              character.race === race.id ? 'ring-4 ring-dnd-blue' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{race.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{race.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{race.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StepRace
