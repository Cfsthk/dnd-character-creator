import { useState } from 'react'
import { CLASSES, CLASS_CATEGORIES, DIFFICULTY_LABELS } from '../data/classes'

const StepClass = ({ character, updateCharacter, nextStep, previousStep }) => {
  const [selectedClass, setSelectedClass] = useState(character.class)
  const [showModal, setShowModal] = useState(null)
  const [showHelper, setShowHelper] = useState(false)

  const handleSelect = (classId) => {
    setSelectedClass(classId)
    updateCharacter({ class: classId })
  }

  const handleNext = () => {
    if (selectedClass) {
      nextStep()
    } else {
      alert('請選擇一個職業')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇您的職業</h2>
        <p className="text-gray-600">職業定義了您的角色擅長什麼、擁有什麼特殊能力</p>
      </div>

      {/* Helper Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowHelper(true)}
          className="bg-dnd-gold hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
        >
          🎯 不確定選哪個？幫我選擇職業
        </button>
      </div>

      {/* Class Categories */}
      {Object.entries(CLASS_CATEGORIES).map(([categoryId, category]) => (
        <div key={categoryId} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.classes.map((classId) => {
              const classData = CLASSES[classId]
              const difficulty = DIFFICULTY_LABELS[classData.difficulty]
              
              return (
                <div
                  key={classId}
                  onClick={() => handleSelect(classId)}
                  className={`card-hover p-4 ${
                    selectedClass === classId ? 'ring-4 ring-dnd-blue' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{classData.icon}</span>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{classData.name}</h4>
                        <p className="text-xs text-gray-500">{classData.nameEn}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowModal(classId)
                      }}
                      className="text-dnd-blue hover:text-blue-700 text-xl"
                    >
                      ❓
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{classData.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-gray-700">小際電度度</span>
                      <span className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={i < classData.difficulty ? 'text-yellow-500' : 'text-gray-300'}
                          >
★
                          </span>
                        ))}
                      </span>
                      <span className="text-gray-500">({difficulty})</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-semibold">主要素:</span> {classData.primaryAbility}
                    </div>
                    <div className="text-xs text-gray-600">
                      <span className="font-semibold">生命倯</span> {classData.hitDie}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Class Modal */}
      {(() => {
        if (!showModal) return null
        
        const classData = CLASSES[showModal]
        const difficulty = DIFFICULTY_LABELS[classData.difficulty]

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={() => setShowModal(null)}>
            <div className="bg-white rounded-xl p-6 max-w-4xl max-h-[90%] overflow-y-auto shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{classData.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">{classData.name}</h3>
                    <p className="text-gray-500">{classData.nameEn}</p>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">雥度度屦:</span>
                  <span className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < classData.difficulty ? 'text-yellow-500 text-xl' : 'text-gray-300 text-xl'}
                      >
★
                      </span>
                    ))}
                  </span>
                  <span className="text-gray-500">({difficulty})</span>
                </div>

                {/* Description */}
                <p className="text-gray-600">{classData.description}</p>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">主屬性</p>
                    <p className="font-semibold">{classData.primaryAbility}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">生命倯</p>
                    <p className="font-semibold">{classData.hitDie}</p>
                  </div>
                </div>

                {/* Saving Throws */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">熆用擰楼</h4>
                  <div className="flex flex-wrap gap-2">
                    {classData.savingThrows.map((save) => (
                      <span key={save} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
{save}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">鶅合選擇給次</h4>
                  <ul className="space-y-1">
                    {classData.bestFor.map((item, i) => (
                      <li key={i} className="text-gray-600 flex items-start gap-2">
                        <span>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">關鍵特能</h4>
                  <ul className="space-y-1">
                    {classData.keyFeatures.map((feature, i) => (
                      <li key={i} className="text-gray-600 flex items-start gap-2">
                        <span>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subclasses */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">子職業 <span className="text-sm text-gray-500">(第3級現擇-強级）</span></h4>
                  <div className="space-y-3">
                    {classData.subclasses.map((subclass) => (
                      <div key={subclass.nameEn} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h5 className="font-bold text-gray-800">{subclass.name}</h5>
                            <p className="text-xs text-gray-500">{subclass.nameEn}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{subclass.description}</p>
                        <div className="space-y-2">
                          {subclass.features.map((feat) => (
                            <div key={feat.level} className="text-xs">
                              <span className="font-semibold text-gray-700">第{feat.level}缚 - {feat.name}:</span>
                              <span className="text-gray-600"> {feat.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Starting Equipment */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">初妋装傉</h4>
                  <ul className="space-y-1">
                    {classData.startingEquipment.map((item, i) => (
                      <li key={i} className="text-gray-600 flex items-start gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={previousStep}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          ♤ 上一步
        </button>
        <button
          onClick={handleNext}
          className={`${
            selectedClass
              ? 'bg-dnd-blue hover:bs-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } font-semibold py-3 px-6 rounded-lg shadow-md transition-colors flex-1`}
          disabled={!selectedClass}
        >
          下一步 ♦
        </button>
      </div>
    </div>
  )
}

export default StepClass