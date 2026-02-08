import { useState } from 'react'
import { generateAIPrompt, exportPromptForPlatform, getEquipmentOptions, getPoseOptions, getBackgroundOptions } from '../utils/promptGenerator'
import CharacterSheet from './CharacterSheet'

const StepReview = ({ character, previousStep }) => {
  const [showCharacterSheet, setShowCharacterSheet] = useState(true)
  const [showPromptGenerator, setShowPromptGenerator] = useState(false)
  const [promptOptions, setPromptOptions] = useState({
    style: 'fantasy-art',
    language: 'en',
    includeBackground: true,
    pose: 'default'
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

  const generatedPrompt = character.class
    ? generateAIPrompt(character, promptOptions)
    : ''

  const platformExport = character.class
    ? exportPromptForPlatform(character, selectedPlatform)
    : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已複製到剪貼簿！')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Character Complete!</h2>
        <p className="text-gray-600">Review your character sheet and generate images</p>
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
          📄 Character Sheet
        </button>
        <button
          onClick={() => setShowCharacterSheet(false)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            !showCharacterSheet
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎨 AI Image Generator
        </button>
      </div>

      {/* Character Sheet View */}
      {showCharacterSheet && (
        <div>
          <CharacterSheet character={character} />
        </div>
      )}

      {/* AI Image Generator View */}
      {!showCharacterSheet && (
        <div className="space-y-6">
          <div className="card max-w-2xl mx-auto space-y-4">
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold text-dnd-blue">{character.name || '未命名角色'}</h3>
              <p className="text-gray-600 mt-1">
                {character.race} {character.class} | {character.alignment}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-2">屬性值</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(character.abilities).map(([key, value]) => (
                  <div key={key} className="bg-gray-100 p-2 rounded text-center">
                    <div className="text-sm text-gray-600 capitalize">{key}</div>
                    <div className="font-bold text-lg">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {character.details.appearance && (
              <div>
                <h4 className="font-bold text-gray-800 mb-2">外觀</h4>
                <p className="text-gray-700">{character.details.appearance}</p>
              </div>
            )}

            {character.details.personality && (
              <div>
                <h4 className="font-bold text-gray-800 mb-2">個性</h4>
                <p className="text-gray-700">{character.details.personality}</p>
              </div>
            )}

            {character.details.backstory && (
              <div>
                <h4 className="font-bold text-gray-800 mb-2">背景故事</h4>
                <p className="text-gray-700">{character.details.backstory}</p>
              </div>
            )}
          </div>

          {/* AI Prompt Generator Section */}
          {character.class && (
            <div className="card max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800 text-xl">🎨 AI 圖像生成</h4>
            <button
              onClick={() => setShowPromptGenerator(!showPromptGenerator)}
              className="text-dnd-blue hover:text-blue-700 font-semibold"
            >
              {showPromptGenerator ? '收起' : '展開'}
            </button>
          </div>

          {showPromptGenerator && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                根據您的角色自動生成 AI 繪圖提示詞，可用於 Midjourney、DALL-E、Stable Diffusion 等平台
              </p>

              {/* Style Selection */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">藝術風格</label>
                <select
                  value={promptOptions.style}
                  onChange={(e) => setPromptOptions({ ...promptOptions, style: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="fantasy-art">奇幻藝術 (Fantasy Art)</option>
                  <option value="realistic">寫實風格 (Realistic)</option>
                  <option value="anime">動漫風格 (Anime)</option>
                  <option value="oil-painting">油畫風格 (Oil Painting)</option>
                  <option value="digital-art">數位藝術 (Digital Art)</option>
                  <option value="comic-book">漫畫風格 (Comic Book)</option>
                </select>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">提示詞語言</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="en"
                      checked={promptOptions.language === 'en'}
                      onChange={(e) => setPromptOptions({ ...promptOptions, language: e.target.value })}
                      className="mr-2"
                    />
                    English (推薦)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="zh"
                      checked={promptOptions.language === 'zh'}
                      onChange={(e) => setPromptOptions({ ...promptOptions, language: e.target.value })}
                      className="mr-2"
                    />
                    繁體中文
                  </label>
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">目標平台</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="midjourney">Midjourney</option>
                  <option value="dalle">DALL-E 3</option>
                  <option value="stable-diffusion">Stable Diffusion</option>
                  <option value="leonardo">Leonardo.AI</option>
                </select>
              </div>

              {/* Generated Prompt Display */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-semibold text-gray-700">生成的提示詞</label>
                  <button
                    onClick={() => copyToClipboard(platformExport.prompt)}
                    className="text-sm bg-dnd-blue hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    📋 複製
                  </button>
                </div>
                <textarea
                  value={platformExport.prompt}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  rows="6"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 {platformExport.instructions}
                </p>
              </div>

              {/* Negative Prompt for SD */}
              {selectedPlatform === 'stable-diffusion' && platformExport.negativePrompt && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-semibold text-gray-700">負面提示詞</label>
                    <button
                      onClick={() => copyToClipboard(platformExport.negativePrompt)}
                      className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      📋 複製
                    </button>
                  </div>
                  <textarea
                    value={platformExport.negativePrompt}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                    rows="2"
                  />
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">💡 使用提示</h5>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>複製提示詞到您選擇的 AI 繪圖平台</li>
                  <li>可以根據需求調整細節（如服裝、表情、場景）</li>
                  <li>Midjourney 使用者：建議加上 --ar 2:3 獲得人物肖像比例</li>
                  <li>多嘗試幾次以獲得最佳結果</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      )}

      <div className="flex justify-between max-w-2xl mx-auto mt-8">
        <button onClick={previousStep} className="btn-secondary">Previous</button>
        <button onClick={downloadJSON} className="btn-primary">Download Character Data</button>
      </div>
    </div>
  )
}

export default StepReview
