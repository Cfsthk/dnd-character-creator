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
      <div key={item.name} className="equipment-item">
        <label className="equipment-label">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleEquipment(item)}
          />
          <span className="equipment-name">
            {item.nameChinese || item.name}
            {item.name !== (item.nameChinese || item.name) && (
              <span className="equipment-name-en"> ({item.name})</span>
            )}
          </span>
          <button
            type="button"
            className="tooltip-button"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="更多資訊"
          >
            ?
          </button>
        </label>
        {hoveredItem === item.name && (
          <div className="tooltip-content">
            {item.description && <p><strong>說明：</strong> {item.description}</p>}
            {item.damage && <p><strong>傷害：</strong> {item.damage}</p>}
            {item.properties && <p><strong>特性：</strong> {item.properties}</p>}
            {item.armorClass && <p><strong>護甲等級：</strong> {item.armorClass}</p>}
            {item.useCase && <p><strong>用途：</strong> {item.useCase}</p>}
          </div>
        )}
      </div>
    );
  };

  const renderCategory = (categoryName, items) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="equipment-category">
        <h3>{categoryName}</h3>
        <div className="equipment-list">
          {items.map(item => renderEquipmentItem(item))}
        </div>
      </div>
    );
  };

  const categoryNames = {
    weapons: '武器',
    armor: '護甲',
    tools: '工具',
    equipment: '一般裝備'
  };

  return (
    <div className="step-equipment">
      <h2>選擇裝備</h2>
      <p className="instruction">
        為您的 {character.class} 選擇起始裝備
        <br />
        <small>選中的裝備將會出現在您的角色卡上</small>
      </p>

      <div className="equipment-categories">
        {renderCategory(categoryNames.weapons, classEquipment.weapons)}
        {renderCategory(categoryNames.armor, classEquipment.armor)}
        {renderCategory(categoryNames.tools, classEquipment.tools)}
        {renderCategory(categoryNames.equipment, classEquipment.equipment)}
      </div>

      {selectedEquipment.length === 0 && (
        <div className="warning-message">
          ⚠️ 建議至少選擇一件裝備
        </div>
      )}

      <div className="selected-summary">
        <strong>已選擇：</strong> {selectedEquipment.length} 件裝備
      </div>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="prev-button">← 返回技能選擇</button>
        <button onClick={handleNext} className="next-button">下一步：選擇背景 →</button>
      </div>
    </div>
  );
}

export default StepEquipment;
