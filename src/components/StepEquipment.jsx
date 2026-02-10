import React, { useState } from 'react';
import { equipmentByClass } from '../data/equipmentData';

function StepEquipment({ character, updateCharacter, nextStep, prevStep }) {
  const [selectedEquipment, setSelectedEquipment] = useState(character.equipment || []);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Filter equipment by character class
  const getClassEquipment = () => {
    const classKey = character.class?.toLowerCase();
    if (!classKey || !equipmentByClass[classKey]) {
      return {
        weapons: [],
        armor: [],
        tools: [],
        equipment: []
      };
    }
    return equipmentByClass[classKey];
  };

  const classEquipment = getClassEquipment();

  const toggleEquipment = (item) => {
    const itemName = item.name;
    if (selectedEquipment.includes(itemName)) {
      setSelectedEquipment(selectedEquipment.filter(eq => eq !== itemName));
    } else {
      setSelectedEquipment([...selectedEquipment, itemName]);
    }
  };

  const handleNext = () => {
    updateCharacter({ equipment: selectedEquipment });
    nextStep();
  };

  const renderEquipmentItem = (item) => {
    const isSelected = selectedEquipment.includes(item.name);

    return (
      <div 
        key={item.name} 
        className={`relative bg-white rounded-lg p-4 border-2 transition-all duration-200 ${
          isSelected 
            ? 'border-dnd-blue shadow-md bg-blue-50' 
            : 'border-gray-200 hover:border-dnd-gold hover:shadow-md'
        }`}
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleEquipment(item)}
            className="w-5 h-5 text-dnd-blue border-gray-300 rounded focus:ring-dnd-blue cursor-pointer"
          />
          <div className="flex-1">
            <div className={`font-semibold ${isSelected ? 'text-dnd-blue' : 'text-gray-800'}`}>
              {item.name}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {item.nameChinese}
            </div>
          </div>
          <button
            type="button"
            className="text-2xl hover:scale-110 transition-transform"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="More information"
          >
            ℹ️
          </button>
        </label>
        
        {hoveredItem === item.name && (
          <div className="absolute z-10 mt-2 p-4 bg-white border-2 border-dnd-gold rounded-lg shadow-xl max-w-sm left-0 right-0">
            {item.description && (
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-1">
                  <strong className="text-dnd-blue">Description:</strong> {item.description}
                </p>
                {item.descriptionChinese && (
                  <p className="text-sm text-gray-600 italic">
                    {item.descriptionChinese}
                  </p>
                )}
              </div>
            )}
            {item.damage && (
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-red-600">傷害 Damage:</strong> {item.damage}
              </p>
            )}
            {item.properties && (
              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  <strong className="text-purple-600">屬性 Properties:</strong> {item.properties}
                </p>
                {item.propertiesChinese && (
                  <p className="text-sm text-gray-600 italic">
                    {item.propertiesChinese}
                  </p>
                )}
              </div>
            )}
            {item.armorClass && (
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-green-600">護甲等級 Armor Class:</strong> {item.armorClass}
              </p>
            )}
            {item.useCase && (
              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-600">Use Case:</strong> {item.useCase}
                </p>
                {item.useCaseChinese && (
                  <p className="text-sm text-gray-600 italic">
                    {item.useCaseChinese}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (categoryName, categoryNameChinese, items, icon) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 pb-2 border-b-2 border-dnd-gold">
          <span>{icon}</span>
          <span>{categoryNameChinese} {categoryName}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map(item => renderEquipmentItem(item))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇裝備 Choose Equipment</h2>
        <p className="text-gray-600">為你的 {character.class} 選擇初始裝備</p>
        <p className="text-sm text-gray-500">Select starting equipment for your {character.class}</p>
      </div>

      {/* Equipment Categories */}
      <div className="space-y-6">
        {renderCategory('Weapons', '武器', classEquipment.weapons, '⚔️')}
        {renderCategory('Armor', '護甲', classEquipment.armor, '🛡️')}
        {renderCategory('Tools', '工具', classEquipment.tools, '🔧')}
        {renderCategory('General Equipment', '一般裝備', classEquipment.equipment, '🎒')}
      </div>

      {/* Selected Equipment Summary */}
      {selectedEquipment.length > 0 && (
        <div className="bg-blue-50 border-2 border-dnd-blue rounded-lg p-4">
          <h4 className="font-bold text-dnd-blue mb-2">已選裝備 Selected Equipment ({selectedEquipment.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedEquipment.map(item => (
              <span key={item} className="bg-white px-3 py-1 rounded-full text-sm border border-dnd-blue text-gray-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button 
          onClick={prevStep} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
        >
          ← 上一步 Previous
        </button>
        <button 
          onClick={handleNext} 
          className="bg-dnd-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
        >
          下一步 Next: Background →
        </button>
      </div>
    </div>
  );
}

export default StepEquipment;
