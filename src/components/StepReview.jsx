import { useState } from 'react'
import { generateAIPrompt, exportPromptForPlatform, getEquipmentOptions, getPoseOptions, getBackgroundOptions } from '../utils/promptGenerator'
import { getRecommendedEquipment, getEquipmentForClass } from '../data/equipmentData'
import CharacterSheet from './CharacterSheet'

const StepReview = ({ character, previousStep }) => {
  const [showCharacterSheet, setShowCharacterSheet] = useState(true)
  const [showPromptGenerator, setShowPromptGenerator] = useState(false)
  const [promptOptions, setPromptOptions] = useState({
    style: 'fantasy-art',
    language: 'zh-TW',
    includeBackground: true,
    pose: 'default',
    viewType: '3d-reference'
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

  // Get recommended equipment with null safety
  const recommendedEquipment = character?.class && character?.race
    ? getRecommendedEquipment(character.class, character.race)
    : null

  // Get detailed equipment data with null safety
  const equipmentDetails = character?.class 
    ? getEquipmentForClass(character.class)
    : null

  const generatePrompt = () => {
    try {
      return generateAIPrompt(character, promptOptions)
    } catch (error) {
      console.error('Error generating prompt:', error)
      return '無法生成提示詞。請檢查角色數據。'
    }
  }

  const exportForPlatform = () => {
    try {
      const result = exportPromptForPlatform(character, selectedPlatform, promptOptions)
      // exportPromptForPlatform returns {prompt, instructions}
      // Extract just the prompt string for display
      return typeof result === 'object' && result.prompt ? result.prompt : result
    } catch (error) {
      console.error('Error exporting prompt:', error)
      return '無法匯出提示詞。'
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已複製到剪貼簿！')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">角色完成</h2>
        <p className="text-gray-600">檢視您的角色並生成 AI 圖像提示詞</p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setShowCharacterSheet(true)
            setShowPromptGenerator(false)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            showCharacterSheet
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📋 角色卡
        </button>
        <button
          onClick={() => {
            setShowCharacterSheet(false)
            setShowPromptGenerator(true)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            showPromptGenerator
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎨 AI 圖像生成
        </button>
      </div>

      {/* Character Sheet View */}
      {showCharacterSheet && (
        <div className="card">
          <CharacterSheet character={character} />
          
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={downloadJSON}
              className="btn-secondary"
            >
              💾 下載角色 JSON
            </button>
          </div>
        </div>
      )}

      {/* AI Prompt Generator View */}
      {showPromptGenerator && (
        <div className="card space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">AI 圖像生成提示詞</h3>
            <p className="text-sm text-gray-600 mb-4">
              根據您的角色生成適合的 AI 圖像提示詞，可用於 Midjourney、DALL-E 等平台
            </p>

            {/* Platform Selection */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">選擇平台：</label>
              <div className="flex gap-2">
                {['midjourney', 'dalle', 'stable-diffusion'].map(platform => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedPlatform === platform
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {platform === 'midjourney' && 'Midjourney'}
                    {platform === 'dalle' && 'DALL-E'}
                    {platform === 'stable-diffusion' && 'Stable Diffusion'}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Options */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">風格：</label>
                <select
                  value={promptOptions.style}
                  onChange={(e) => setPromptOptions({...promptOptions, style: e.target.value})}
                  className="input-field"
                >
                  <option value="fantasy-art">奇幻藝術</option>
                  <option value="realistic">寫實風格</option>
                  <option value="anime">動漫風格</option>
                  <option value="oil-painting">油畫風格</option>
                  <option value="digital-art">數位藝術</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">姿勢：</label>
                <select
                  value={promptOptions.pose}
                  onChange={(e) => setPromptOptions({...promptOptions, pose: e.target.value})}
                  className="input-field"
                >
                  <option value="default">預設姿勢</option>
                  <option value="action">戰鬥姿勢</option>
                  <option value="portrait">肖像特寫</option>
                  <option value="full-body">全身站立</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={promptOptions.includeBackground}
                  onChange={(e) => setPromptOptions({...promptOptions, includeBackground: e.target.checked})}
                />
                <span>包含背景環境描述</span>
              </label>
            </div>

            {/* Generated Prompt */}
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">生成的提示詞：</h4>
                <button
                  onClick={() => copyToClipboard(exportForPlatform())}
                  className="btn-secondary text-sm"
                >
                  📋 複製
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {exportForPlatform()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={previousStep} className="btn-secondary">
          ← 上一步
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          🎲 創建新角色
        </button>
      </div>
    </div>
  )
}

export default StepReview
