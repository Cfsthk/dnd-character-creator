const StepBackground = ({ character, updateCharacter, nextStep, previousStep }) => {
  const backgrounds = [
    { id: 'acolyte', name: '侍僧', description: '在神殿中服務' },
    { id: 'criminal', name: '罪犯', description: '街頭生存者' },
    { id: 'folk-hero', name: '民間英雄', description: '平民中的英雄' },
    { id: 'noble', name: '貴族', description: '上流社會出身' },
    { id: 'sage', name: '學者', description: '知識追求者' },
    { id: 'soldier', name: '士兵', description: '軍事經歷' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇背景</h2>
        <p className="text-gray-600">背景決定您的過去與額外技能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => updateCharacter({ background: bg.id })}
            className={`card-hover text-center p-4 ${
              character.background === bg.id ? 'ring-4 ring-dnd-blue' : ''
            }`}
          >
            <h3 className="font-bold text-gray-800 text-lg">{bg.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{bg.description}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between max-w-4xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <button onClick={nextStep} className="btn-primary">下一步</button>
      </div>
    </div>
  )
}

export default StepBackground
