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
        <p className="text-gray-600">職業定義了您的角色擁有什麼技能、擁有什麼特殊能力</p>
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
                  onClick={() => setShowModal(classId)}
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

                  <p>{classData.description}</p>

                  {classData.bestFor && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">最適合：🎯</p>
                      <p className="text-sm text-gray-600">{classData.bestFor}</p>
                    </div>
                  )}

                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">【難度】</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: difficulty.color }}>
                        {difficulty.emoji} {difficulty.text}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const classData = CLASSES[showModal]
              const difficulty = DIFFICULTY_LABELS[classData.difficulty]

              return (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{classData.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{classData.name}</h3>
                        <p className="text-gray-600">{classData.nameEn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModal(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ✖
                    </button>
                  </div>

                  {/* Description */}
                  <p>{classData.description}</p>

                  {/* Difficulty */}
                  <div className="mt-4">
                    <h4 className="font-bold text-lg mb-2">📊 難度等級</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg" style={{ color: difficulty.color }}>
                        {difficulty.emoji} {difficulty.text}
                      </span>
                    </div>
                  </div>

                  {/* Hit Die */}
                  <div className="mt-4">
                    <h4 className="font-bold text-lg mb-2">❤️ 生命骰</h4>
                    <p className="text-gray-700">{classData.hitDie}</p>
                  </div>

                  {/* Saving Throws */}
                  {classData.savingThrows && (
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2">🛡️ 豁免擲骰</h4>
                      <p className="text-gray-700">{classData.savingThrows}</p>
                    </div>
                  )}

                  {/* Best For */}
                  {classData.bestFor && (
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2">🎯 最適合</h4>
                      <p className="text-gray-700">{classData.bestFor}</p>
                    </div>
                  )}

                  {/* Key Features */}
                  {classData.keyFeatures && (
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2">⭐ 關鍵特性</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {classData.keyFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Starting Equipment */}
                  {classData.startingEquipment && (
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2">⚔️ 起始裝備</h4>
                      <p className="text-gray-700">{classData.startingEquipment}</p>
                    </div>
                  )}

                  {/* Subclasses */}
                  {classData.subclasses && classData.subclasses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2">🌟 子職業</h4>
                      <div className="space-y-2">
                        {classData.subclasses.map((subclass, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <p className="font-medium text-gray-800">{subclass.name}</p>
                            {subclass.description && (
                              <p className="text-sm text-gray-600 mt-1">{subclass.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Helper Modal */}
      {showHelper && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowHelper(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">🎯 職業選擇助手</h3>
              <button
                onClick={() => setShowHelper(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✖
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">我想...</h4>
                <div className="space-y-2">
                  {Object.entries(CLASS_CATEGORIES).map(([catId, cat]) => (
                    <div key={catId} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{cat.icon} {cat.name}</p>
                      <p className="text-sm text-gray-600">{cat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">新手推薦</h4>
                <div className="space-y-2">
                  {Object.entries(CLASSES)
                    .filter(([_, classData]) => classData.difficulty === 'easy')
                    .map(([classId, classData]) => (
                      <div
                        key={classId}
                        onClick={() => {
                          handleSelect(classId)
                          setShowHelper(false)
                        }}
                        className="bg-green-50 p-3 rounded cursor-pointer hover:bg-green-100"
                      >
                        <p className="font-medium">{classData.icon} {classData.name}</p>
                        <p className="text-sm text-gray-600">{classData.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={previousStep}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          ← 上一步
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedClass}
          className={`flex-1 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors ${
            selectedClass
              ? 'bg-dnd-blue hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          下一步 →
        </button>
      </div>
    </div>
  )
}

export default StepClass
