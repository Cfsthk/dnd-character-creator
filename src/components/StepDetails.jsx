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
              體重 <span className="text-sm text-gray-500">(例如：{weightSuggestion})</span>
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

        {/* Age and Alignment Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-800 mb-2">年齡</label>
            <input
              type="text"
              value={character.details.age || ''}
              onChange={(e) => updateDetails('age', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如: 25"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">陣營</label>
            <select
              value={character.alignment || ''}
              onChange={(e) => updateCharacter({ alignment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">選擇...</option>
              <option value="lawful-good">守序善良</option>
              <option value="neutral-good">中立善良</option>
              <option value="chaotic-good">混亂善良</option>
              <option value="lawful-neutral">守序中立</option>
              <option value="true-neutral">絕對中立</option>
              <option value="chaotic-neutral">混亂中立</option>
              <option value="lawful-evil">守序邪惡</option>
              <option value="neutral-evil">中立邪惡</option>
              <option value="chaotic-evil">混亂邪惡</option>
            </select>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">外貌</label>
          <textarea
            value={character.details.appearance || ''}
            onChange={(e) => updateDetails('appearance', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
            placeholder="描述您角色的外貌－髮型、眼睛、捕捉動作、穿著特性 …"
          />
        </div>

        {/* Personality */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">性格</label>
          <textarea
            value={character.details.personality || ''}
            onChange={(e) => updateDetails('personality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
            placeholder="描述您角色的性格，信念、價值觀和抱負…"
          />
        </div>

        {/* Backstory */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">背景故事</label>
          <textarea
            value={character.details.backstory || ''}
            onChange={(e) => updateDetails('backstory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
            placeholder="分享您角色的過去，如何使他們來到這裡…"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={previousStep}
          className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          上一步
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          輸入細節
        </button>
      </div>
    </div>
  )
}

export default StepDetails
