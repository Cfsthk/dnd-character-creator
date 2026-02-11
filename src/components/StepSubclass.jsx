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
          建議：角色達到3級時再選擇子職業，或現在跳過此步驟
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

            {subclass.features && subclass.features.length > 0 && (
              <div className="mt-3 space-y-2">
                {subclass.features.filter(f => f.level === 3).map((feature, idx) => (
                  <div key={idx} className="bg-blue-50 p-2 rounded">
                    <p className="font-semibold text-sm">3級能力：</p>
                    <p className="text-sm font-medium">{feature.name}</p>
                    <p className="text-xs text-gray-600">{feature.nameEn}</p>
                    <p className="text-xs mt-1">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg max-w-2xl mx-4 max-h[90vh] overflow-y-auto"
          >
            {(() => {
              const subclassData = classData.subclasses.find(
                (s) => s.name === showModal
              )
              if (!subclassData) return null

              return (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{subclassData.name}</h2>
                      <p className="text-sm text-gray-500">{subclassData.nameEn}</p>
                    </div>
                    <button
                      onClick={() => setShowModal(null)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ✖
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{subclassData.description}</p>

                  {/* Display all features grouped by level */}
                  {subclassData.features && subclassData.features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg mb-2">子職業能力：</h3>
                      {subclassData.features.map((feature, idx) => (
                        <div key={idx} className="border-l-4 border-dnd-blue pl-4 py-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-dnd-blue">{feature.level}級</span>
                            <h4 className="font-semibold text-lg">{feature.name}</h4>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{feature.nameEn}</p>
                          <p className="text-gray-700">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      handleSelect(subclassData.name)
                      setShowModal(null)
                    }}
                    className="width-full btn-primary mt-4"
                  >
                    選擇此子職業
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-4xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">返回重選職業</button>
        <div className="space-x-2">
          <button onClick={handleSkip} className="btn-secondary">略過</button>
          <button onClick={handleNext} className="btn-primary">下一步</button>
        </div>
      </div>
    </div>
  )
}

export default StepSubclass
