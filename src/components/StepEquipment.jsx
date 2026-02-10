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
        onClick={() => toggleEquipment(item)}
        onMouseEnter={() => setHoveredItem(item.name)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
          isSelected
            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
            : 'border-gray-300 hover:border-yellow-600 hover:shadow-md'
        }`}
      >
        <div className="font-semibold text-gray-800">{item.name}</div>
        
        {/* Tooltip on hover */}
        {hoveredItem === item.name && item.description && (
          <div className="absolute z-10 left-0 top-full mt-2 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl max-w-xs">
            <div className="mb-2">{item.description}</div>
            {item.damage && (
              <div className="text-yellow-300">
                <span className="font-semibold">傷害：</span>{item.damage}
              </div>
            )}
            {item.armorClass && (
              <div className="text-blue-300">
                <span className="font-semibold">護甲等級：</span>{item.armorClass}
              </div>
            )}
            {item.properties && (
              <div className="text-green-300 mt-1">
                <span className="font-semibold">屬性：</span>{item.properties}
              </div>
            )}
            {item.useCase && (
              <div className="text-gray-300 mt-1 text-xs italic">
                {item.useCase}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (title, icon, items) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => renderEquipmentItem(item))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">選擇裝備</h2>
      
      {/* Equipment selection guidelines */}
      <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">📋 裝備選擇指南</h3>
        <div className="text-sm text-yellow-700 space-y-1">
          <div>• <strong>武器：</strong>建議選擇 1-2 件主要武器（近戰或遠程）</div>
          <div>• <strong>護甲：</strong>選擇 1 套適合你職業的護甲</div>
          <div>• <strong>工具：</strong>根據職業特性選擇專業工具或法術焦點</div>
          <div>• <strong>一般裝備：</strong>可自由選擇冒險必需品（繩索、口糧、火把等）</div>
        </div>
      </div>
      
      {/* Selected equipment count */}
      {selectedEquipment.length > 0 && (
        <div className="mb-6 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg">
          <div className="font-semibold text-blue-800">
            已選擇裝備：{selectedEquipment.length} 件
          </div>
          <div className="text-sm text-blue-600 mt-2">
            {selectedEquipment.join('、')}
          </div>
        </div>
      )}

      {/* Equipment categories */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {renderCategory('⚔️ 武器', '⚔️', classEquipment.weapons)}
        {renderCategory('🛡️ 護甲', '🛡️', classEquipment.armor)}
        {renderCategory('🔧 工具', '🔧', classEquipment.tools)}
        {renderCategory('🎒 一般裝備', '🎒', classEquipment.equipment)}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default StepEquipment;
