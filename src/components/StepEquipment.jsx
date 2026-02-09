import React, { useState } from 'react';
import equipmentData from '../data/equipmentData';

function StepEquipment({ character, updateCharacter, nextStep, prevStep }) {
  const [selectedEquipment, setSelectedEquipment] = useState(character.equipment || []);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Filter equipment by character class
  const getClassEquipment = () => {
    const classKey = character.characterClass?.toLowerCase();
    if (!classKey || !equipmentData[classKey]) {
      return {
        weapons: [],
        armor: [],
        tools: [],
        gear: []
      };
    }
    return equipmentData[classKey];
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
          <span 
            className="tooltip-icon"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            ❓
          </span>
        </label>
        {hoveredItem === item.name && (
          <div className="tooltip-content">
            {item.description && <p><strong>說明：</strong>{item.description}</p>}
            {item.damage && <p><strong>傷害：</strong>{item.damage}</p>}
            {item.properties && <p><strong>屬性：</strong>{item.properties}</p>}
            {item.armorClass && <p><strong>護甲等級：</strong>{item.armorClass}</p>}
            {item.useCase && <p><strong>用途：</strong>{item.useCase}</p>}
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
      <h2>選擇裝備</h2>
      <p className="instruction">為你的 {character.characterClass} 選擇起始裝備</p>
      
      <div className="equipment-categories">
        {renderCategory('武器 (Weapons)', classEquipment.weapons)}
        {renderCategory('護甲 (Armor)', classEquipment.armor)}
        {renderCategory('工具 (Tools)', classEquipment.tools)}
        {renderCategory('裝備 (Gear)', classEquipment.gear)}
      </div>

      <div className="selected-summary">
        <h3>已選擇的裝備：</h3>
        {selectedEquipment.length > 0 ? (
          <ul>
            {selectedEquipment.map(eq => <li key={eq}>{eq}</li>)}
          </ul>
        ) : (
          <p>尚未選擇任何裝備</p>
        )}
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="btn-secondary">返回</button>
        <button onClick={handleNext} className="btn-primary">下一步</button>
      </div>

      <style jsx>{`
        .step-equipment {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h2 {
          color: #8b4513;
          font-size: 2em;
          margin-bottom: 10px;
        }

        .instruction {
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1em;
        }

        .equipment-categories {
          margin-bottom: 30px;
        }

        .equipment-category {
          margin-bottom: 30px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          border: 2px solid #ddd;
        }

        .equipment-category h3 {
          color: #8b4513;
          margin-bottom: 15px;
          font-size: 1.3em;
          border-bottom: 2px solid #8b4513;
          padding-bottom: 8px;
        }

        .equipment-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .equipment-item {
          position: relative;
          padding: 10px;
          background: white;
          border-radius: 6px;
          border: 1px solid #ddd;
          transition: all 0.2s;
        }

        .equipment-item:hover {
          border-color: #8b4513;
          box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
        }

        .equipment-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 1.05em;
        }

        .equipment-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .equipment-name {
          flex: 1;
          font-weight: 500;
        }

        .tooltip-icon {
          font-size: 1.2em;
          cursor: help;
          padding: 0 5px;
          transition: transform 0.2s;
        }

        .tooltip-icon:hover {
          transform: scale(1.2);
        }

        .tooltip-content {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          padding: 15px;
          background: #2c2c2c;
          color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          min-width: 300px;
          max-width: 400px;
          font-size: 0.95em;
          line-height: 1.5;
        }

        .tooltip-content p {
          margin: 8px 0;
        }

        .tooltip-content strong {
          color: #ffd700;
          margin-right: 5px;
        }

        .selected-summary {
          margin: 30px 0;
          padding: 20px;
          background: #e8f5e9;
          border-radius: 8px;
          border: 2px solid #4caf50;
        }

        .selected-summary h3 {
          color: #2e7d32;
          margin-bottom: 10px;
        }

        .selected-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .selected-summary li {
          padding: 5px 10px;
          margin: 5px 0;
          background: white;
          border-radius: 4px;
          border-left: 3px solid #4caf50;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 30px;
          font-size: 1.1em;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
        }

        .btn-primary {
          background: #8b4513;
          color: white;
        }

        .btn-primary:hover {
          background: #a0522d;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }

        .btn-secondary {
          background: #666;
          color: white;
        }

        .btn-secondary:hover {
          background: #777;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .step-equipment {
            padding: 15px;
          }

          .tooltip-content {
            left: 10px;
            right: 10px;
            transform: none;
            min-width: auto;
          }

          .button-group {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default StepEquipment;