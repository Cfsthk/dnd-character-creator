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
          <span className="equipment-name">{item.name}</span>
          <button
            type="button"
            className="tooltip-button"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="More information"
          >
            ❓
          </button>
        </label>
        {hoveredItem === item.name && (
          <div className="tooltip-content">
            {item.description && <p><strong>Description:</strong> {item.description}</p>}
            {item.damage && <p><strong>Damage:</strong> {item.damage}</p>}
            {item.properties && <p><strong>Properties:</strong> {item.properties}</p>}
            {item.armorClass && <p><strong>Armor Class:</strong> {item.armorClass}</p>}
            {item.useCase && <p><strong>Use Case:</strong> {item.useCase}</p>}
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

  return (
    <div className="step-equipment">
      <h2>Choose Equipment</h2>
      <p className="instruction">Select starting equipment for your {character.class}</p>
      
      <div className="equipment-categories">
        {renderCategory('Weapons', classEquipment.weapons)}
        {renderCategory('Armor', classEquipment.armor)}
        {renderCategory('Tools', classEquipment.tools)}
        {renderCategory('General Equipment', classEquipment.equipment)}
      </div>
      
      <div className="navigation-buttons">
        <button onClick={prevStep} className="prev-button">← Previous</button>
        <button onClick={handleNext} className="next-button">Next: Background →</button>
      </div>
    </div>
  );
}

export default StepEquipment;
