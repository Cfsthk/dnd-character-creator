import { useState, useEffect } from 'react'
import { equipmentByClass } from '../data/equipmentData'

function StepEquipment({ character, updateCharacter, nextStep, previousStep }) {
  const [selectedEquipment, setSelectedEquipment] = useState(character.equipment || [])
  const [showTooltip, setShowTooltip] = useState(null)

  // Get equipment options based on selected class
  const classKey = character.characterClass?.toLowerCase()
  const equipmentOptions = equipmentByClass[classKey] || null

  useEffect(() => {
    if (!equipmentOptions) return
    
    // Initialize with empty equipment array if not set
    if (!character.equipment) {
      updateCharacter({ equipment: [] })
    }
  }, [character.characterClass])

  const handleToggleEquipment = (item) => {
    const itemKey = `${item.nameChienese || item.nameChinese}-${item.name}`
    const isSelected = selectedEquipment.some(eq => 
      `${eq.nameChienese || eq.nameChinese}-${eq.name}` === itemKey
    )
    
    let newEquipment
    if (isSelected) {
      newEquipment = selectedEquipment.filter(eq => 
        `${eq.nameChienese || eq.nameChinese}-${eq.name}` !== itemKey
      )
    } else {
      newEquipment = [...selectedEquipment, item]
    }
    
    setSelectedEquipment(newEquipment)
    updateCharacter({ equipment: newEquipment })
  }

  const isSelected = (item) => {
    const itemKey = `${item.nameChienese || item.nameChinese}-${item.name}`
    return selectedEquipment.some(eq => 
      `${eq.nameChienese || eq.nameChinese}-${eq.name}` === itemKey
    )
  }

  const toggleTooltip = (itemKey) => {
    setShowTooltip(showTooltip === itemKey ? null : itemKey)
  }

  if (!character.characterClass) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dnd-red mb-6">選擇裝備</h2>
        <p className="text-gray-600 mb-6">請先選擇職業才能選擇裝備。</p>
        <div className="flex gap-4">
          <button
            onClick={previousStep}
            className="px-6 py-2 border-2 border-dnd-red text-dnd-red rounded-lg hover:bg-dnd-red hover:text-white transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  if (!equipmentOptions) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dnd-red mb-6">選擇裝備</h2>
        <p className="text-gray-600 mb-6">此職業暫無可用裝備選項。</p>
        <div className="flex gap-4">
          <button
            onClick={previousStep}
            className="px-6 py-2 border-2 border-dnd-red text-dnd-red rounded-lg hover:bg-dnd-red hover:text-white transition-colors"
          >
            返回
          </button>
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-dnd-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            下一步
          </button>
        </div>
      </div>
    )
  }

  const renderEquipmentCategory = (categoryName, categoryNameChinese, items) => {
    if (!items || items.length === 0) return null

    return (
      <div key={categoryName} className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {categoryNameChinese} ({categoryName})
        </h3>
        <div className="space-y-2">
          {items.map((item, idx) => {
            const itemKey = `${categoryName}-${idx}`
            return (
              <div key={itemKey} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  id={itemKey}
                  checked={isSelected(item)}
                  onChange={() => handleToggleEquipment(item)}
                  className="w-5 h-5 text-dnd-red border-gray-300 rounded focus:ring-dnd-red"
                />
                <label htmlFor={itemKey} className="flex-1 cursor-pointer text-gray-700">
                  <span className="font-medium">{item.nameChienese || item.nameChinese}</span>
                  <span className="text-gray-500 text-sm ml-2">({item.name})</span>
                </label>
                <button
                  onClick={() => toggleTooltip(itemKey)}
                  className="text-blue-600 hover:text-blue-800 font-bold text-lg relative"
                  title="查看說明"
                >
                  ❓
                  {showTooltip === itemKey && (
                    <div className="absolute right-0 top-8 z-10 w-64 p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl">
                      <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"></div>
                      {item.description}
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-dnd-red mb-2">選擇裝備</h2>
      <p className="text-gray-600 mb-6">
        為您的 <span className="font-semibold">{equipmentOptions.nameChienese || equipmentOptions.nameChinese}</span> 選擇起始裝備
      </p>

      <div className="mb-8">
        {renderEquipmentCategory('Weapons', '武器', equipmentOptions.weapons)}
        {renderEquipmentCategory('Armor', '護甲', equipmentOptions.armor)}
        {renderEquipmentCategory('Equipment', '裝備', equipmentOptions.equipment)}
      </div>

      {selectedEquipment.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">已選擇的裝備：</h4>
          <ul className="list-disc list-inside text-gray-700">
            {selectedEquipment.map((item, idx) => (
              <li key={idx}>
                {item.nameChienese || item.nameChinese} ({item.name})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={previousStep}
          className="px-6 py-2 border-2 border-dnd-red text-dnd-red rounded-lg hover:bg-dnd-red hover:text-white transition-colors"
        >
          返回
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-dnd-red text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default StepEquipment
