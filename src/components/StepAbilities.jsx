const StepAbilities = ({ character, updateCharacter, nextStep, previousStep }) => {
  const abilities = [
    { key: 'strength', name: '力量', description: '物理力量' },
    { key: 'dexterity', name: '敏捷', description: '靈活反應' },
    { key: 'constitution', name: '體質', description: '生命耐力' },
    { key: 'intelligence', name: '智力', description: '學習推理' },
    { key: 'wisdom', name: '感知', description: '洞察覺察' },
    { key: 'charisma', name: '魅力', description: '個性影響' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">分配屬性值</h2>
        <p className="text-gray-600">總點數: 27 | 使用點買系統分配</p>
      </div>

      <div className="card max-w-2xl mx-auto space-y-4">
        {abilities.map((ability) => (
          <div key={ability.key} className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{ability.name}</h3>
              <p className="text-sm text-gray-600">{ability.description}</p>
            </div>
            <input
              type="number"
              min="8"
              max="15"
              value={character.abilities[ability.key]}
              onChange={(e) => updateCharacter({
                abilities: { ...character.abilities, [ability.key]: parseInt(e.target.value) }
              })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <button onClick={nextStep} className="btn-primary">下一步</button>
      </div>
    </div>
  )
}

export default StepAbilities
