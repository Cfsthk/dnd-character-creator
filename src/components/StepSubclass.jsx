import { useState } from 'react'
import { CLASSES } from '../data/classes'

const StepSubclass = ({ character, updateCharacter, nextStep, previousStep }) => {
  const [selectedSubclass, setSelectedSubclass] = useState(character.subclass)
  const [showModal, setShowModal] = useState(null)

  // Get the current class data
  const classData = character.class ? CLASSES[character.class] : null

  const handleSelect = (subclassName) => {
    setSelectedSubclass(subclassName)
    updateCharacter({ subclass: subclassName })
  }

  const handleNext = () => {
    if (selectedSubclass) {
      nextStep()
    } else {
      alert('請選擇一個子職業')
    }
  }

  const handleSkip = () => {
    // Allow skipping if character level is not 3+
    updateCharacter({ subclass: null })
    nextStep()
  }

  if (!classData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">請先選擇職業</h2>
          <p className="text-gray-600">您需要先選擇職業才能選擇子職業</p>
        </div>
        <div className="flex justify-between max-w-4xl mx-auto">
          <button onClick={previousStep} className="btn-secondary">返回選擇職業</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">選擇您的子職業</h2>
        <p className="text-gray-600">
          {classData.name}在3級時可以選擇子職業，定義您的專精方向
        </p>
        <p className="text-sm text-gray-500 mt-2">
          建議：角色達到3級時再選擇子職業，或珽在跳過此步驟
        </p>
      </div>

      {/* Subclass Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classData.subclasses.map((subclass) => (
          <div
            key={subclass.name}
            onClick={() => handleSelect(subclass.name)}
            className={`card-hover p-4 ${
              selectedSubclass === subclass.name ? 'ring-4 ring-dnd-blue' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-bold text-lg text-gray-800">{subclass.name}</h4>
                <p className="text-xs text-gray-500">{subclass.nameEn}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowModal(subclass.name)
                }}
                className="text-dnd-blue hover:text-blue-700 text-xl"
              >
                ❓
              </button>
            </div>

            <p className="text-gray-700 text-sm mt-2">{subclass.description}</p>

            {subclass.level3Feature && (
              <div className="mt-3 bg-blue-50 p-2 rounded">
                <h5 className="font-semibold text-xs text-blue-900 mb-1">3級特銼</h5>
                <p className="text-xs text-blue-800">{subclass.level3Feature}</p>
                {subclass.skills && subclass.skills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-blue-900">技能轮顯：</p>
                    <ul className="list-disc list-inside text-xs text-blue-800">
                      {subclass.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                      </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for details */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            {classData.subclasses
              .filter((s) => s.name === showModal)
              .map((subclass) => (
                <div key={subclass.name}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{subclass.name}</h3>
                 <p className="text-sm text-gray-600 mb-4">{subclass.nameEn}</p>
                  <p className="text-gray-700 mb-4">{subclass.detail}</p>

                  {subclass.level3Feature && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-blue-900 mb-2">3級特銋</h4>
                      <p className="text-blue-800">{subclass.level3Feature}</p>
                      {subclass.skills && subclass.skills.length > 0 && (
                        <div className="mt-3">
                          <p className="font-semibold text-blue-900 mb-1">抿能辭熫：</p>
                          <ul className="list-disc list-inside text-blue-800">
                            {subclass.skills.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-4xl mx-auto mt-8">
        <button onClick={previousStep} className="btn-secondary">返回選擇職業</button>
        <div className="flex gap-2">
          <button onClick={handleSkip} className="btn-secondary">讬过此高</button>
          <button onClick={handleNext} className="btn-primary">績络</button>
        </div>
      </div>
    </div>
  )
}

export default StepSubclass
