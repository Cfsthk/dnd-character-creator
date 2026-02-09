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

  // Get recommended equipment with null checks
  const recommendedEquipment = character?.class && character?.race
    ? getRecommendedEquipment(character.class, character.race)
    : null

  // Get detailed equipment data with null checks
  const equipmentDetails = character?.class ? getEquipmentForClass(character.class) : null

  // Generate prompts with null checks
  const generatedPrompt = character?.class
    ? generateAIPrompt(character, promptOptions)
    : ''

  const platformExport = character?.class
    ? exportPromptForPlatform(character, selectedPlatform, promptOptions)
    : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已複製到剪貼簿！')
  }

  // Helper component for equipment item with tooltip
  const EquipmentItem = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
      <li 
        className="text-gray-700 relative group cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="flex items-center gap-1">
          {item.nameChinese || item.name}
          <span className="text-blue-500 text-xs">❓</span>
        </span>
        
        {showTooltip && item.description && (
          <div className="absolute left-0 top-full mt-1 z-10 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg w-64">
            <div className="font-semibold mb-1">{item.nameChinese || item.name}</div>
            <div className="text-gray-200">{item.description}</div>
            <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-900"></div>
          </div>
        )}
      </li>
    )
  }

  // If character is incomplete, show fallback UI
  if (!character || !character.name || !character.class) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dnd-gold mb-4">
            角色資料不完整
          </h2>
          <p className="text-gray-600">
            請先完成前面的步驟，填寫所有必要資料。
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={previousStep} className="btn btn-secondary">
            ← 返回上一步
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-dnd-gold mb-4">
          你的角色已完成
        </h2>
        <p className="text-gray-600">
          總結、檢視你的角色資料、下載角色表或保存你的創作！
        </p>
      </div>

      {/* Tabs to switch between views */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => {
            setShowCharacterSheet(true)
            setShowPromptGenerator(false)
          }}
          className={`btn ${showCharacterSheet ? 'btn-primary' : 'btn-secondary'}`}
        >
          角色信息
        </button>
        <button
          onClick={() => {
            setShowCharacterSheet(false)
            setShowPromptGenerator(true)
          }}
          className={`btn ${showPromptGenerator ? 'btn-primary' : 'btn-secondary'}`}
        >
          AI繪圖生成
        </button>
      </div>

      {showCharacterSheet ? (
        <CharacterSheet character={character} />
      ) : (
        <div className="space-y-6">
          {/* Prompt Options */}
          <div className="card p-6">
            <h3 className="font-bold text-xl mb-4">自訂選項</h3>

            {/* Platform Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">選擇繪圖平台</label>
              <select
                className="text-input"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="midjourney">Midjourney</option>
                <option value="stable-diffusion">Stable Diffusion</option>
                <option value="dall-e">DALL-E</option>
                <option value="hero-forge">HeroForge</option>
              </select>
            </div>

            {/* Style */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">風格選項：</label>
              <select
                className="text-input"
                value={promptOptions.style}
                onChange={(e) => setPromptOptions({ ...promptOptions, style: e.target.value })}
              >
                {getEquipmentOptions().map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Pose */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">姿勢</label>
              <select
                className="text-input"
                value={promptOptions.pose}
                onChange={(e) => setPromptOptions({ ...promptOptions, pose: e.target.value })}
              >
                {getPoseOptions().map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {/* Background Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">背景</label>
              <select
                className="text-input"
                value={promptOptions.includeBackground ? 'included' : 'none'}
                onChange={(e) => setPromptOptions({ ...promptOptions, includeBackground: e.target.value === 'included' })}
              >
                <option value="included">包含某旋背景 ({character.background})</option>
                <option value="none">簡單背景</option>
                {getBackgroundOptions().map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* View Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">視角類型</label>
              <select
                className="text-input"
                value={promptOptions.viewType}
                onChange={(e) => setPromptOptions({ ...promptOptions, viewType: e.target.value })}
              >
                <option value="concept-art">概念圖 (Concept Art)</option>
                <option value="3d-reference">3D 參考 (3D Reference)</option>
                <option value="portrait">肖像 (Portrait)</option>
                <option value="full-body">全身像 (Full Body)</option>
              </select>
            </div>

          </div>

          {/* Generated Prompt */}
          <div className="card p-6">
            <h3 className="font-bold text-xl mb-4">生成的提示詞</h3>

            {/* Platform-optimized export */}
            {platformExport && (
              <>
                <div className="bg-blue-50 border-blue-300 border-2 p-4 rounded-lg mb-4">
                  <p><em>{platformExport}</em></p>
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => copyToClipboard(platformExport)}
                    className="btn btn-secondary flex-1"
                  >
                    複製個別專用
                  </button>
                </div>
              </>
            )}

            {/* Full generic prompt */}
            {generatedPrompt && (
              <>
                <div className="bg-gray-50 border-gray-300 border-2 p-4 rounded-lg mb-4">
                  <p><em>{generatedPrompt}</em></p>
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => copyToClipboard(generatedPrompt)}
                    className="btn btn-secondary flex-1"
                  >
                    複製完整提示詞
                  </button>
                </div>
              </>
            )}

            {/* If no data available */}
            {generatedPrompt === '' && (
              <p className="text-gray-500">
                完成角色創建後即可生成AI提示詞
              </p>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={previousStep} className="btn btn-secondary">
          ← 上一步
        </button>
        <button onClick={downloadJSON} className="btn btn-primary">
          保存角色表
        </button>
      </div>
    </div>
  )
}

export default StepReview
