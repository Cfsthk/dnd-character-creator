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

  // Get detailed equipment data with descriptions
  const equipmentDetails = character.class ? getEquipmentForClass(character.class) : null

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
          {equipmentDetails && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-6 shadow-md mt-6">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <span>⚔️</span>
                推薦裝備（{equipmentDetails.nameChinese}）
                <span className="text-sm font-normal text-amber-700">（懸停在 ❓ 上查看說明）</span>
              </h3>
              
              <div className="space-y-4">
                {/* Weapons */}
                {equipmentDetails.weapons && equipmentDetails.weapons.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">🗡️ 武器</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {equipmentDetails.weapons.map((weapon, index) => (
                        <EquipmentItem key={index} item={weapon} />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Armor */}
                {equipmentDetails.armor && equipmentDetails.armor.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">🛡️ 護甲</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {equipmentDetails.armor.map((armor, index) => (
                        <EquipmentItem key={index} item={armor} />
                      ))}
                    </ul>
                  </div>
                )}

                {/* Equipment (other items) */}
                {equipmentDetails.equipment && equipmentDetails.equipment.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">🎒 其他裝備</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {equipmentDetails.equipment.map((item, index) => (
                        <EquipmentItem key={index} item={item} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={downloadJSON}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              📥 下載角色資料 (JSON)
            </button>
            <button
              onClick={previousStep}
              className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
            >
              🔙 返回編輯
            </button>
          </div>
        </div>
      )}

      {/* Prompt Generator View */}
      {!showCharacterSheet && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🎨 AI 圖像生成器設置</h3>
            
            {/* Style Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">風格選擇：</h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {(
                  [
                    { key: 'fantasy-art', label: '美術風格繪畫' },
                    { key: 'realistic', label: '寫實崇雕像風格' },
                    { key: 'anime', label: '卡通/漫畫動漫風格' },
                    { key: 'digital-art', label: '數位圖畫排版' },
                    { key: 'painting', label: '繪畫風格（油畫）' },
                    { key: 'simple-color', label: '純色平面浪漫漫畫' }
                  ]
                ).map(style => (
                  <button
                    key={style.key}
                    onClick={() => setPromptOptions({ ...promptOptions, style: style.key })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      promptOptions.style === style.key
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pose Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">姿勢態度：</h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {getPoseOptions().map(pose => (
                  <button
                    key={pose.key}
                    onClick={() => setPromptOptions({ ...promptOptions, pose: pose.key })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      promptOptions.pose === pose.key
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pose.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Type Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">視角</h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                { [
                  { key: 'default', label: '標準圖像' },
                  { key: 'full-body', label: '全身像素視角' },
                  { key: 'portrait', label: '肖像特寫細膩攝影' },
                  { key: '3d-reference', label: '3D建模參考陣型視角' }
                ].map(view => (
                  <button
                    key={view.key}
                    onClick={() => setPromptOptions({ ...promptOptions, viewType: view.key })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      promptOptions.viewType === view.key
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">選擇平台：</h4>
              <div className="flex justify-center gap-3">
                { [
                  { key: 'midjourney', label: 'Midjourney' },
                  { key: 'dalle', label: 'DALL·E-3' },
                  { key: 'stable-diffusion', label: 'Stable Diffusion' },
                  { key: 'leonardo', label: 'Leonardo.Ai' },
                  { key: 'comfy', label: 'ComfyUI' }
                ].map(platform => (
                  <button
                    key={platform.key}
                    onClick={() => setSelectedPlatform(platform.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatform === platform.key
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>

              {/* Platform-Specific Prompt */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 min-h-[16rem] max-h-[48rem] overflow-y-auto mt-4"
                   style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {platformExport ? platformExport.prompt : '處理中...'}
                </p>
              </div>
              
              {/* Platform-Specific Parameters */}
              {platformExport && platformExport.parameters && (
                <div className="mt-4 space-y-2">
                  <h5 className="font-medium text-gray-700 mb-2">建議 參數：</h5>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    {Object.entries(platformExport.parameters).map(([key, value]) => (
                      <div key={key} className="text-gray-700 mb-1">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => copyToClipboard(platformExport ? platformExport.prompt : '')}
                className="w-full bg-dnd-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-3"
              >
                📋 複製到剪貼簿（適用於 {selectedPlatform}）
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={downloadJSON}
              className="flex-1 bg-dnd-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📥 下載 JSON
            </button>
            <button
              onClick={previousStep}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              🔙 回到編輯
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepReview
