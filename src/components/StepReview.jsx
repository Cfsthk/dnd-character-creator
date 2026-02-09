import { useState } from 'react'
import { generateAIPrompt, exportPromptForPlatform, getEquipmentOptions, getPoseOptions, getBackgroundOptions } from '../utils/promptGenerator'
import { getRecommendedEquipment } from '../data/equipmentData'
import CharacterSheet from './CharacterSheet'

const StepReview = ({ character, previousStep }) => {
  const [showCharacterSheet, setShowCharacterSheet] = useState(true)
  const [showPromptGenerator, setShowPromptGenerator] = useState(false)
  const [promptOptions, setPromptOptions] = useState({
    style: 'fantasy-art',
    language: 'zh-TW',
    includeBackground: true,
    pose: 'default',
    viewType: '3d-reference' // New: for 3D modeling reference
  })
  const [selectedPlatform, setSelectedPlatform] = useState('midjourney')

  const downloadJSON = () => {
    const dataStr = JSON.stringify(character, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${character.name || 'character'}.json`
    link.click()
  }

  // Get recommended equipment
  const recommendedEquipment = character.class && character.race
    ? getRecommendedEquipment(character.class, character.race)
    : null

  const generatedPrompt = character.class
    ? generateAIPrompt(character, promptOptions)
    : ''

  const platformExport = character.class
    ? exportPromptForPlatform(character, selectedPlatform, promptOptions)
    : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已複製到剪貼簿！')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">角色創建完成！</h2>
        <p className="text-gray-600">檢視您的角色卡並生成圖像</p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowCharacterSheet(true)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            showCharacterSheet
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📄 角色卡
        </button>
        <button
          onClick={() => setShowCharacterSheet(false)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            !showCharacterSheet
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎨 AI 圖像生成器
        </button>
      </div>

      {/* Character Sheet View */}
      {showCharacterSheet && (
        <div>
          <CharacterSheet character={character} />
          
          {/* Recommended Equipment Section */}
          {recommendedEquipment && (
            <div className="card max-w-5xl mx-auto mt-6">
              <h3 className="text-2xl font-bold text-dnd-blue mb-4">建議裝備</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Class Equipment */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    {recommendedEquipment.classEquipment.nameChinese} 職業裝備
                  </h4>
                  
                  {/* Weapons */}
                  {recommendedEquipment.classEquipment.weapons && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">武器：</p>
                      <ul className="space-y-2">
                        {recommendedEquipment.classEquipment.weapons.map((weapon, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-dnd-blue mr-2">⚔️</span>
                            <div>
                              <span className="font-semibold">{weapon.nameChinese}</span>
                              <span className="text-xs text-gray-500 ml-2">({weapon.name})</span>
                              <p className="text-sm text-gray-600">{weapon.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Armor */}
                  {recommendedEquipment.classEquipment.armor && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">護甲：</p>
                      <ul className="space-y-2">
                        {recommendedEquipment.classEquipment.armor.map((armor, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-dnd-blue mr-2">🛡️</span>
                            <div>
                              <span className="font-semibold">{armor.nameChinese}</span>
                              <span className="text-xs text-gray-500 ml-2">({armor.name})</span>
                              <p className="text-sm text-gray-600">{armor.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Equipment */}
                  {recommendedEquipment.classEquipment.equipment && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">裝備：</p>
                      <ul className="space-y-2">
                        {recommendedEquipment.classEquipment.equipment.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-dnd-blue mr-2">🎒</span>
                            <div>
                              <span className="font-semibold">{item.nameChinese}</span>
                              <span className="text-xs text-gray-500 ml-2">({item.name})</span>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Race Bonus Equipment */}
                {recommendedEquipment.raceBonus.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">種族額外裝備</h4>
                    <ul className="space-y-2">
                      {recommendedEquipment.raceBonus.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-dnd-blue mr-2">✨</span>
                          <div>
                            <span className="font-semibold">{item.nameChinese}</span>
                            <span className="text-xs text-gray-500 ml-2">({item.name})</span>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Image Generator View */}
      {!showCharacterSheet && (
        <div className="space-y-6">
          <div className="card max-w-2xl mx-auto space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold text-dnd-blue">{character.name || '未命名角色'}</h3>
              <p className="text-gray-600 mt-1">
                {character.race} {character.subrace} {character.class}
              </p>
            </div>

            {/* Prompt Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  藝術風格
                </label>
                <select
                  value={promptOptions.style}
                  onChange={(e) => setPromptOptions({ ...promptOptions, style: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
                >
                  <option value="fantasy-art">奇幻藝術</option>
                  <option value="anime">動漫風格</option>
                  <option value="realistic">寫實風格</option>
                  <option value="concept-art">概念藝術</option>
                  <option value="comic-book">漫畫風格</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  圖像類型
                </label>
                <select
                  value={promptOptions.viewType}
                  onChange={(e) => setPromptOptions({ ...promptOptions, viewType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
                >
                  <option value="single-view">單一視角</option>
                  <option value="3d-reference">3D建模參考（前/後/左/右視圖）</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  角色姿勢
                </label>
                <select
                  value={promptOptions.pose}
                  onChange={(e) => setPromptOptions({ ...promptOptions, pose: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
                >
                  {getPoseOptions().map(option => (
                    <option key={option.value} value={option.value}>
                      {option.labelChinese || option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeBackground"
                  checked={promptOptions.includeBackground}
                  onChange={(e) => setPromptOptions({ ...promptOptions, includeBackground: e.target.checked })}
                  className="w-4 h-4 text-dnd-blue border-gray-300 rounded focus:ring-dnd-blue"
                />
                <label htmlFor="includeBackground" className="ml-2 text-sm text-gray-700">
                  包含背景設定
                </label>
              </div>
            </div>

            {/* Generated Prompt */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  生成的提示詞
                </label>
                <button
                  onClick={() => copyToClipboard(generatedPrompt)}
                  className="text-sm text-dnd-blue hover:text-dnd-blue-dark font-medium"
                >
                  📋 複製
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                {generatedPrompt || '完成角色創建以生成提示詞'}
              </div>
            </div>

            {/* Platform-Specific Export */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                平台專用格式
              </label>
              <div className="flex gap-2 mb-3">
                {['midjourney', 'dalle', 'stable-diffusion'].map(platform => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatform === platform
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {platform === 'midjourney' && '🎨 Midjourney'}
                    {platform === 'dalle' && '🤖 DALL-E'}
                    {platform === 'stable-diffusion' && '🎯 Stable Diffusion'}
                  </button>
                ))}
              </div>
              {platformExport && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      已針對 {selectedPlatform} 優化
                    </span>
                    <button
                      onClick={() => copyToClipboard(platformExport.prompt)}
                      className="text-sm text-dnd-blue hover:text-dnd-blue-dark font-medium"
                    >
                      📋 複製
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                    {platformExport.prompt}
                  </div>
                  {platformExport.parameters && (
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>建議參數：</strong> {platformExport.parameters}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="card max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-dnd-blue mb-2">💡 獲得更好結果的提示</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 調整藝術風格以符合您偏好的美學</li>
              <li>• 選擇「3D建模參考」可生成前後左右四視圖，適合建模使用</li>
              <li>• 嘗試不同姿勢以展現不同的角色形象</li>
              <li>• 使用平台專用格式以獲得最佳效果</li>
              <li>• 實驗背景設定以增加情境感</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={previousStep}
          className="btn-secondary"
        >
          ← 返回
        </button>
        <button
          onClick={downloadJSON}
          className="btn-primary"
        >
          💾 下載角色 JSON
        </button>
      </div>
    </div>
  )
}

export default StepReview
