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

        {/* Age */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">年齡</label>
          <input
            type="text"
            value={character.details.age || ''}
            onChange={(e) => updateDetails('age', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="輸入年齡..."
          />
        </div>

        {/* Appearance Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-800 mb-2">眼睛顏色</label>
            <input
              type="text"
              value={character.details.eyes || ''}
              onChange={(e) => updateDetails('eyes', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：藍色"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">皮膚</label>
            <input
              type="text"
              value={character.details.skin || ''}
              onChange={(e) => updateDetails('skin', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：蒼白"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">頭髮</label>
            <input
              type="text"
              value={character.details.hair || ''}
              onChange={(e) => updateDetails('hair', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：黑色，長"
            />
          </div>
        </div>

        {/* Backstory */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">背景故事</label>
          <textarea
            value={character.details.backstory || ''}
            onChange={(e) => updateDetails('backstory', e.target.value)}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="描述您角色的歷史、動機和個性..."
          />
        </div>

        {/* Personality Traits */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">個性特徵</label>
          <input
            type="text"
            value={character.details.personality || ''}
            onChange={(e) => updateDetails('personality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="例如：勇敢、好奇、謹慎..."
          />
        </div>

        {/* Ideals */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">理想</label>
          <input
            type="text"
            value={character.details.ideals || ''}
            onChange={(e) => updateDetails('ideals', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="您的角色相信什麼？"
          />
        </div>

        {/* Bonds */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">羈絆</label>
          <input
            type="text"
            value={character.details.bonds || ''}
            onChange={(e) => updateDetails('bonds', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="誰或什麼對您的角色最重要？"
          />
        </div>

        {/* Flaws */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">缺點</label>
          <input
            type="text"
            value={character.details.flaws || ''}
            onChange={(e) => updateDetails('flaws', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="您的角色有什麼弱點？"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <button
          onClick={previousStep}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          ← 返回
        </button>
        <button
          onClick={nextStep}
          disabled={!character.name}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步 →
        </button>
      </div>
    </div>
  )
}

export default StepDetails
