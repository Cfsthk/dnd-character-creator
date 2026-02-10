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

            {subclass.level3Feature && (
              <div className="mt-3 bg-blue-50 p-2 rounded">
                <p className="text-xs font-semibold text-blue-800">3級特性</p>
                <p className="text-xs text-blue-700">{subclass.level3Feature}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <div className="flex gap-2">
          <button onClick={handleSkip} className="btn-secondary">跳過（稍後選擇）</button>
          <button onClick={handleNext} className="btn-primary">下一步</button>
        </div>
      </div>

      {/* Subclass Detail Modal */}
      {showModal && (
        <SubclassModal
          subclass={classData.subclasses.find(s => s.name === showModal)}
          className={classData.name}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  )
}

const SubclassModal = ({ subclass, className, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{subclass.name}</h3>
              <p className="text-gray-600">{className} - {subclass.nameEn}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">子職業概述</h4>
            <p className="text-gray-700">{subclass.description}</p>
          </div>

          {subclass.level3Feature && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">3級特性</h4>
              <p className="text-gray-700">{subclass.level3Feature}</p>
            </div>
          )}

          {subclass.features && subclass.features.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">核心特性</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {subclass.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {subclass.playstyle && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">遊玩風格</h4>
              <p className="text-gray-700">{subclass.playstyle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepSubclass
