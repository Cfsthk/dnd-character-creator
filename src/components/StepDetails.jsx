const StepDetails = ({ character, updateCharacter, nextStep, previousStep }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">角色細節</h2>
        <p className="text-gray-600">為您的角色添加個性與故事</p>
      </div>

      <div className="card max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block font-bold text-gray-800 mb-2">角色名稱</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="輸入角色名稱..."
          />
        </div>

        <div>
          <label className="block font-bold text-gray-800 mb-2">陣營</label>
          <select
            value={character.alignment}
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">選擇陣營...</option>
            <option value="lg">守序善良</option>
            <option value="ng">中立善良</option>
            <option value="cg">混亂善良</option>
            <option value="ln">守序中立</option>
            <option value="n">絕對中立</option>
            <option value="cn">混亂中立</option>
            <option value="le">守序邪惡</option>
            <option value="ne">中立邪惡</option>
            <option value="ce">混亂邪惡</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-gray-800 mb-2">外觀描述</label>
          <textarea
            value={character.details.appearance}
            onChange={(e) => updateCharacter({
              details: { ...character.details, appearance: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="描述角色的外觀..."
          />
        </div>

        <div>
          <label className="block font-bold text-gray-800 mb-2">個性特質</label>
          <textarea
            value={character.details.personality}
            onChange={(e) => updateCharacter({
              details: { ...character.details, personality: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="描述角色的個性..."
          />
        </div>

        <div>
          <label className="block font-bold text-gray-800 mb-2">背景故事</label>
          <textarea
            value={character.details.backstory}
            onChange={(e) => updateCharacter({
              details: { ...character.details, backstory: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="講述角色的過去..."
          />
        </div>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <button onClick={nextStep} className="btn-primary">下一步</button>
      </div>
    </div>
  )
}

export default StepDetails
