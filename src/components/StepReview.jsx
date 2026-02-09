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
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dnd-blue mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {recommendedEquipment.icon} 建議裝備
              </h3>
              <p className="text-gray-600 mb-4">{recommendedEquipment.description}</p>
              
              {/* Starting Items */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">起始裝備</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedEquipment.startingItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        {item.quantity && (
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      {item.stats && (
                        <p className="text-xs text-gray-500 mt-1">{item.stats}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Upgrades */}
              {recommendedEquipment.recommendedUpgrades && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">推薦升級</h4>
                  <div className="space-y-2">
                    {recommendedEquipment.recommendedUpgrades.map((upgrade, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded border border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{upgrade.name}</span>
                          <span className="text-sm text-blue-600">等級 {upgrade.level}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{upgrade.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={previousStep}
              className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
            >
              ← 返回修改
            </button>
            <button
              onClick={downloadJSON}
              className="px-6 py-2 rounded-lg bg-dnd-gold text-white font-semibold hover:bg-gray-600 transition-colors"
            >
              💾 下載角色 JSON
            </button>
          </div>
        </div>
      )}

      {/* AI Image Generator View */}
      {!showCharacterSheet && (
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dnd-blue">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎨 AI 圖像生成器</h3>
          <p className="text-gray-600 mb-6">
            根據您的角色資料生成 AI 繪圖提示詞，可用於 Midjourney、Stable Diffusion 等平台
          </p>

          {!character.class && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">⚠️ 請先完成角色創建（包括職業選擇）才能生成 AI 圖像提示詞</p>
            </div>
          )}

          {/* Platform Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              選擇平台
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
            >
              <option value="midjourney">Midjourney</option>
              <option value="stable-diffusion">Stable Diffusion</option>
              <option value="dalle">DALL-E</option>
              <option value="leonardo">Leonardo.ai</option>
            </select>
          </div>

          {/* Style Options */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              藝術風格
            </label>
            <select
              value={promptOptions.style}
              onChange={(e) => setPromptOptions({...promptOptions, style: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
            >
              <option value="fantasy-art">奇幻藝術</option>
              <option value="anime">動漫風格</option>
              <option value="realistic">寫實風格</option>
              <option value="oil-painting">油畫風格</option>
              <option value="watercolor">水彩風格</option>
              <option value="comic-book">漫畫風格</option>
            </select>
          </div>

          {/* Pose Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              角色姿勢
            </label>
            <select
              value={promptOptions.pose}
              onChange={(e) => setPromptOptions({...promptOptions, pose: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
            >
              {getPoseOptions(character.class).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              視角類型
            </label>
            <select
              value={promptOptions.viewType}
              onChange={(e) => setPromptOptions({...promptOptions, viewType: e.target.value})}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-dnd-blue focus:border-transparent"
            >
              <option value="portrait">肖像 (Portrait)</option>
              <option value="full-body">全身 (Full Body)</option>
              <option value="action-shot">動作場景 (Action Shot)</option>
              <option value="3d-reference">3D 參考 (多視角)</option>
            </select>
          </div>

          {/* Background Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={promptOptions.includeBackground}
                onChange={(e) => setPromptOptions({...promptOptions, includeBackground: e.target.checked})}
                className="w-5 h-5 text-dnd-blue rounded focus:ring-2 focus:ring-dnd-blue"
              />
              <span className="text-sm font-semibold text-gray-700">包含場景背景</span>
            </label>
          </div>

          {/* Generated Prompt Display */}
          {platformExport && character.class && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">生成的提示詞</h4>
                  <button
                    onClick={() => copyToClipboard(platformExport.prompt)}
                    className="px-3 py-1 bg-dnd-blue text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    📋 複製提示詞
                  </button>
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {platformExport.prompt}
                </p>
              </div>

              {/* Platform-specific Parameters */}
              {platformExport.parameters && (
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-gray-700 mb-2">平台參數</h4>
                  <div className="space-y-1">
                    {Object.entries(platformExport.parameters).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage Tips */}
              {platformExport.tips && (
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <h4 className="font-semibold text-gray-700 mb-2">💡 使用提示</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {platformExport.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Back Button */}
              <div className="flex justify-start mt-6">
                <button
                  onClick={() => setShowCharacterSheet(true)}
                  className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
                >
                  ← 返回角色卡
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StepReview
