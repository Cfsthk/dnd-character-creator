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
        <p className="text-gray-600">職業定義了您的角色擁長什麼、擅有什麼特殊能力</p>
      </div>

      {/* Helper Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowHelper(true)}
          className="bg-dnd-gold hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
        >
          🎯 不確選哪個？幫我選擇職業
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
                  className={`card-hover p-4 cursor-pointer ${
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
                      ❔️
                    </button>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 text-gray-700 w-fit">
                    上手難度：{difficulty}
                  </div>

                  {/* Preview Stats */}
                  <div className="space-y-2 mt-3">
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {classData.description.slice(0, 50)}...
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {selectedClass && (
        <button
          onClick={handleNext}
          className="btn-primary w-full"
        >
          下一步：選擇種族
        </button>
      )}

      {/* Class Detail Modal */}
      {showModal && (() => {
        const classData = CLASSES[showModal]
        const difficulty = DIFFICULTY_LABELS[classData.difficulty]

        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(null)}>
            <div
              className="bg-white rounded-xl p-6 w-full max-w-6xl m-4 overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{classData.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{classData.name}</h3>
                    <p className="text-gray-500">{classData.nameEn}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 text-gray-700 w-fit mb-4">
                上手難度：{difficulty}
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {classData.description}
                </p>

                {/* Primary Abilities */}
                {classData.primaryAbilities && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">主要屬性</h4>
                    <p className="text-gray-600">{classData.primaryAbilities}</p>
                  </div>
                )}

                {/* Hit Dice */}
                {classData.hitDice && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">生命骰,1層</h4>
                    <p className="text-gray-600">{classData.hitDice}</p>
                  </div>
                )}

                {/* Proficiencies */}
                {classData.proficiencies && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">熟練</h4>
                    <div className="space-y-2">
                      {classData.proficiencies.map((prof, i) => (
                        <li key={i} className="text-gray-600">{prof}</li>
                      ))}
                    </div>
                  </div>
                )}

                {/* Starting Equipment */}
                {classData.equipment && classData.equipment.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">初期裝備</h4>
                    <div className="space-y-2">
                      {classData.equipment.map((item, i) => (
                        <li key={i} className="text-gray-600">{item}</li>
                      ))}
                    </div>
                  </div>
                )}

                {/* Spellcasting */}
                {classData.spellcasting && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">施法能力</h4>
                    <div className="space-y-2">
                      {classData.spellcasting.map((item, i) => (
                        <li key={i} className="text-gray-600">{item}</li>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subclasses */}
                {classData.subclasses && classData.subclasses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">子職選項</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {classData.subclasses.map((sub, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-semibold text-gray-800">{sub.name}</p>
                          <p className="text-sm text-gray-600">{sub.nameEn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  關閉
                </button>
                {selectedClass === showModal ? (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
                    disabled
                  >
                    ✓ 已選擇此職業
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleSelect(showModal)
                      setShowModal(null)
                    }}
                    className="px-4 py-2 bg-dnd-blue text-white rounded-lg hover:bg-blue-600"
                  >
                    選擇此職業
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })()}

      {/* Helper Modal */}
      {showHelper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowHelper(false)}>
          <div
            className="bg-white rounded-xl p-6 w-full max-w-4xl m-4 overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">如何選該職業?</h3>
              <button
                onClick={() => setShowHelper(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(CLASS_CATEGORIES).map(([categoryId, category]) => (
                <div key={categoryId} className="border-b pb-4 mb-4">
                  <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.classes.map((classId) => (
                      <span key={classId} className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-700">
                        {CLASSES[classId].name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>提示。</strong> 你喜歡玩 職業時先試這些職業：
                  <br/>
                  • 特人、鄙臧 和忙 《墮庄》《蜘螢》 (效果什麼)
                  <br/>
                  • 修壊壌、笛期夛 和 克工夛 《徭徴》《灼灼》 (可靠性)
                  <br/>
                  • 木尐人 《圄彩畊》 (全能力能角色)
                  <br/>
                  • 牡狯人、打衞能 《燐燐》 (初害家與效果)
                  <br/>
                  。然侙再佻情覓選擇！
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepClass
