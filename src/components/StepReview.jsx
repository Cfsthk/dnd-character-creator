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

  // Get recommended equipment - ADD NULL CHECKS
  const recommendedEquipment = character.class && character.race
    ? getRecommendedEquipment(character.class, character.race)
    : null

  // Get detailed equipment data with descriptions - ADD NULL CHECKS
  const equipmentDetails = character.class ? getEquipmentForClass(character.class) : null

  // ADD NULL CHECKS for prompt generation
  const generatedPrompt = character.class
    ? generateAIPrompt(character, promptOptions)
    : ''

  const platformExport = character.class
    ? exportPromptForPlatform(character, selectedPlatform, promptOptions)
    : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Character Complete!</h2>
        <p className="text-gray-600">Review your character sheet, download data, or generate AI images</p>
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
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📋 Character Sheet
        </button>
        <button
          onClick={() => {
            setShowCharacterSheet(false)
            setShowPromptGenerator(true)
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            showPromptGenerator
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎨 AI Image Generator
        </button>
      </div>

      {/* Character Sheet View */}
      {showCharacterSheet && character.class && (
        <div className="space-y-4">
          <CharacterSheet character={character} />

          {/* Download Button */}
          <div className="text-center">
            <button
              onClick={downloadJSON}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              📥 Download Character Data (JSON)
            </button>
          </div>
        </div>
      )}

      {/* No Class Selected Warning */}
      {showCharacterSheet && !character.class && (
        <div className="card bg-yellow-50 border-2 border-yellow-400 p-6 text-center">
          <p className="text-yellow-800 text-lg font-semibold mb-2">⚠️ Character Data Incomplete</p>
          <p className="text-yellow-700">Please return to the previous step to complete all required character settings</p>
          <button onClick={previousStep} className="btn btn-secondary mt-4">
            ← Back to Settings
          </button>
        </div>
      )}

      {/* AI Prompt Generator View */}
      {showPromptGenerator && character.class && (
        <div className="space-y-6">
          {/* Prompt Options */}
          <div className="card bg-white p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎨 AI Image Generation Settings</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Art Style */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Art Style
                </label>
                <select
                  value={promptOptions.style}
                  onChange={(e) => setPromptOptions({ ...promptOptions, style: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-dnd-blue focus:outline-none"
                >
                  <option value="fantasy-art">Fantasy Art</option>
                  <option value="realistic">Realistic</option>
                  <option value="anime">Anime</option>
                  <option value="comic">Comic Book</option>
                  <option value="oil-painting">Oil Painting</option>
                  <option value="watercolor">Watercolor</option>
                </select>
              </div>

              {/* View Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  View Type
                </label>
                <select
                  value={promptOptions.viewType}
                  onChange={(e) => setPromptOptions({ ...promptOptions, viewType: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-dnd-blue focus:outline-none"
                >
                  <option value="single-view">Single View</option>
                  <option value="3d-reference">3D Reference Sheet</option>
                </select>
              </div>

              {/* Pose */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pose
                </label>
                <select
                  value={promptOptions.pose}
                  onChange={(e) => setPromptOptions({ ...promptOptions, pose: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-dnd-blue focus:outline-none"
                >
                  <option value="default">Default</option>
                  <option value="action">Action Pose</option>
                  <option value="combat">Combat Ready</option>
                  <option value="casual">Casual</option>
                  <option value="heroic">Heroic</option>
                </select>
              </div>

              {/* Background */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={promptOptions.includeBackground}
                    onChange={(e) => setPromptOptions({ ...promptOptions, includeBackground: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Include Background Description
                </label>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="card bg-white p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🖼️ Select AI Platform</h3>
            <div className="flex flex-wrap gap-3">
              {['midjourney', 'stable-diffusion', 'dalle', 'leonardo'].map(platform => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                    selectedPlatform === platform
                      ? 'bg-dnd-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Prompt */}
          <div className="card bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">📝 Generated Prompt</h3>
              <button
                onClick={() => copyToClipboard(platformExport?.prompt || generatedPrompt)}
                className="btn btn-secondary"
              >
                📋 Copy
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap font-mono text-sm">
                {platformExport?.prompt || generatedPrompt || 'Please complete character setup first'}
              </p>
            </div>

            {platformExport?.negativePrompt && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Negative Prompt:</h4>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                  <p className="text-gray-800 whitespace-pre-wrap font-mono text-sm">
                    {platformExport.negativePrompt}
                  </p>
                </div>
              </div>
            )}

            {platformExport?.settings && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Recommended Settings:</h4>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  {Object.entries(platformExport.settings).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="font-medium capitalize">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Equipment Recommendations (if available) */}
          {recommendedEquipment && equipmentDetails && (
            <div className="card bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">⚔️ Recommended Equipment</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {equipmentDetails.weapons && equipmentDetails.weapons.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Weapons</h4>
                    <ul className="space-y-1">
                      {equipmentDetails.weapons.map((item, idx) => (
                        <EquipmentItem key={idx} item={item} />
                      ))}
                    </ul>
                  </div>
                )}

                {equipmentDetails.armor && equipmentDetails.armor.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Armor</h4>
                    <ul className="space-y-1">
                      {equipmentDetails.armor.map((item, idx) => (
                        <EquipmentItem key={idx} item={item} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={previousStep} className="btn btn-secondary">
          ← Previous
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          🔄 Create New Character
        </button>
      </div>
    </div>
  )
}

export default StepReview
