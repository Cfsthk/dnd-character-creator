import { races } from '../data/raceData'

const StepDetails = ({ character, updateCharacter, nextStep, previousStep }) => {
  // Get height and weight suggestions based on race - CONVERTED TO METRIC
  const raceData = character.race ? races[character.race] : null
  
  // Convert imperial height to metric (cm)
  const getMetricHeight = () => {
    if (!raceData) return 168; // Default 168cm (5'6")
    const totalInches = (raceData.heightRange.avgFeet * 12) + raceData.heightRange.avgInches;
    return Math.round(totalInches * 2.54);
  }
  
  // Convert imperial weight to metric (kg)
  const getMetricWeight = () => {
    if (!raceData) return 68; // Default 68kg (~150 lbs)
    return Math.round(raceData.weightRange.avg * 0.453592);
  }
  
  const heightSuggestion = `${getMetricHeight()} cm`
  const weightSuggestion = `${getMetricWeight()} kg`

  const updateDetails = (field, value) => {
    updateCharacter({
      details: { ...character.details, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">角色細節</h2>
        <p className="text-gray-600">添加您角色的個性和外觀特徵</p>
      </div>

      <div className="card max-w-2xl mx-auto space-y-4">
        {/* Name */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">角色名稱 *</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="輸入角色名稱..."
          />
        </div>

        {/* Physical Characteristics Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-800 mb-2">性別</label>
            <select
              value={character.details.gender || ''}
              onChange={(e) => updateDetails('gender', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">選擇...</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="non-binary">非二元</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">
              身高 <span className="text-sm text-gray-500">(例如：{heightSuggestion})</span>
            </label>
            <input
              type="text"
              value={character.details.height || ''}
              onChange={(e) => updateDetails('height', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={heightSuggestion}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">
              體重 <span className="text-sm text-gray-500">({weightSuggestion})</span>
            </label>
            <input
              type="text"
              value={character.details.weight || ''}
              onChange={(e) => updateDetails('weight', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={weightSuggestion}
            />
          </div>
        </div>

        {/* Alignment */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">陣營</label>
          <select
            value={character.alignment || ''}
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">選擇陣營...</option>
            <option value="lawful-good">守序善良</option>
            <option value="neutral-good">中立善良</option>
            <option value="chaotic-good">混亂善良</option>
            <option value="lawful-neutral">守序中立</option>
            <option value="neutral">絕對中立</option>
            <option value="chaotic-neutral">混亂中立</option>
            <option value="lawful-evil">守序邪惡</option>
            <option value="neutral-evil">中立邪惡</option>
            <option value="chaotic-evil">混亂邪惡</option>
          </select>
        </div>

        {/* Appearance */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">外貌</label>
          <textarea
            value={character.details.appearance || ''}
            onChange={(e) => updateDetails('appearance', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={3}
            placeholder="描述您角色的外貌特徵..."
          />
        </div>

        {/* Personality */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">個性</label>
          <textarea
            value={character.details.personality || ''}
            onChange={(e) => updateDetails('personality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={3}
            placeholder="描述您角色的個性特質..."
          />
        </div>

        {/* Backstory */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">背景故事</label>
          <textarea
            value={character.details.backstory || ''}
            onChange={(e) => updateDetails('backstory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={5}
            placeholder="講述您角色的故事..."
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={previousStep}
          className="btn btn-secondary"
        >
          返回
        </button>
        <button
          onClick={nextStep}
          disabled={!character.name}
          className="btn btn-primary"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default StepDetails
