import { useState } from 'react'
import { equipmentByClass } from '../data/equipmentData'

function StepEquipment({ character, updateCharacter, nextStep, previousStep }) {
  const [selectedEquipment, setSelectedEquipment] = useState(character.equipment || [])
  const [showTooltip, setShowTooltip] = useState(null)

  // Get equipment options for the selected class
  const classKey = character.characterClass?.toLowerCase().replace(/\s+/g, '')
  const equipmentOptions = equipmentByClass[classKey] || null

  const handleToggleEquipment = (item, category) => {
    const itemKey = `${category}-${item.name}`
    const isSelected = selectedEquipment.some(e => e.key === itemKey)
    
    if (isSelected) {
      setSelectedEquipment(selectedEquipment.filter(e => e.key !== itemKey))
    } else {
      setSelectedEquipment([...selectedEquipment, {
        key: itemKey,
        name: item.name,
        nameChinese: item.nameChinese,
        category,
        description: item.description
      }])
    }
  }

  const handleNext = () => {
    updateCharacter({ equipment: selectedEquipment })
    nextStep()
  }

  const Tooltip = ({ text }) => (
    <div className="absolute z-10 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-8 transform -translate-y-full">
      <div className="relative">
        {text}
        <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 -bottom-4 left-4"></div>
      </div>
    </div>
  )

  const EquipmentCheckbox = ({ item, category, categoryLabel }) => {
    const itemKey = `${category}-${item.name}`
    const isSelected = selectedEquipment.some(e => e.key === itemKey)
    
    return (
      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <input
          type="checkbox"
          id={itemKey}
          checked={isSelected}
          onChange={() => handleToggleEquipment(item, categoryLabel)}
          className="mt-1 w-5 h-5 text-dnd-red border-gray-300 rounded focus:ring-dnd-red"
        />
        <label htmlFor={itemKey} className="flex-1 cursor-pointer">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{item.nameChinese}</span>
            <span className="text-sm text-gray-500">({item.name})</span>
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(itemKey)}
                onMouseLeave={() => setShowTooltip(null)}
                className="text-gray-400 hover:text-dnd-red transition-colors w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-xs font-bold"
              >
                ❓
              </button>
              {showTooltip === itemKey && <Tooltip text={item.description} />}
            </div>
          </div>
        </label>
      </div>
    )
  }

  if (!character.characterClass) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dnd-red mb-4">選擇裝備</h2>
          <p className="text-gray-600 mb-6">請先選擇職業才能查看裝備選項</p>
          <button
            onClick={previousStep}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            返回選擇職業
          </button>
        </div>
      </div>
    )
  }

  if (!equipmentOptions) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dnd-red mb-4">選擇裝備</h2>
          <p className="text-gray-600 mb-6">此職業暫無裝備數據</p>
          <div className="flex justify-between mt-8">
            <button
              onClick={previousStep}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              上一步
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-dnd-red text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-red mb-2">選擇裝備</h2>
        <p className="text-gray-600">
          為你的 <span className="font-semibold text-dnd-red">{equipmentOptions.nameChinese}</span> 選擇起始裝備
        </p>
        <p className="text-sm text-gray-500 mt-2">
          點擊 ❓ 圖標查看裝備說明
        </p>
      </div>

      <div className="space-y-8 mb-8">
        {/* Weapons */}
        {equipmentOptions.weapons && equipmentOptions.weapons.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-dnd-red">
              武器 (Weapons)
            </h3>
            <div className="space-y-2">
              {equipmentOptions.weapons.map((weapon, idx) => (
                <EquipmentCheckbox
                  key={`weapon-${idx}`}
                  item={weapon}
                  category="weapons"
                  categoryLabel="武器"
                />
              ))}
            </div>
          </div>
        )}

        {/* Armor */}
        {equipmentOptions.armor && equipmentOptions.armor.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-dnd-red">
              護甲 (Armor)
            </h3>
            <div className="space-y-2">
              {equipmentOptions.armor.map((armor, idx) => (
                <EquipmentCheckbox
                  key={`armor-${idx}`}
                  item={armor}
                  category="armor"
                  categoryLabel="護甲"
                />
              ))}
            </div>
          </div>
        )}

        {/* Equipment/Tools */}
        {equipmentOptions.equipment && equipmentOptions.equipment.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-dnd-red">
              裝備 (Equipment)
            </h3>
            <div className="space-y-2">
              {equipmentOptions.equipment.map((equip, idx) => (
                <EquipmentCheckbox
                  key={`equipment-${idx}`}
                  item={equip}
                  category="equipment"
                  categoryLabel="裝備"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Equipment Summary */}
      {selectedEquipment.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <h4 className="font-semibold text-gray-800 mb-2">
            已選擇 ({selectedEquipment.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map((item) => (
              <span
                key={item.key}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
              >
                {item.nameChinese}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={previousStep}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-dnd-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default StepEquipment
