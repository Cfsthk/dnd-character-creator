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

                  <div className="space-y-1 text-sm">
                    <p className={`font-semibold ${difficulty.color}`}>
                      難度: {difficulty.text} {difficulty.stars}
                    </p>
                    <p className="text-gray-600">生命骰: {classData.hitDie}</p>
                    <p className="text-gray-600">主要: {classData.primaryAbility}</p>
                  </div>

                  <p className="text-gray-700 text-sm mt-2">{classData.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">上一步</button>
        <button onClick={handleNext} className="btn-primary">下一步</button>
      </div>

      {/* Class Detail Modal */}
      {showModal && (
        <ClassModal
          classData={CLASSES[showModal]}
          onClose={() => setShowModal(null)}
        />
      )}

      {/* Helper Modal */}
      {showHelper && (
        <HelperModal
          onClose={() => setShowHelper(false)}
          onSelect={(classId) => {
            handleSelect(classId)
            setShowHelper(false)
          }}
        />
      )}
    </div>
  )
}

const ClassModal = ({ classData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{classData.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{classData.name}</h3>
                <p className="text-gray-600">{classData.nameEn}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">職業概述</h4>
            <p className="text-gray-700">{classData.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">適合玩家</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {classData.bestFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">核心特性</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {classData.keyFeatures.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">子職業選項</h4>
            <div className="space-y-2">
              {classData.subclasses.map((subclass, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800">{subclass.name}</p>
                  <p className="text-sm text-gray-600">{subclass.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">基礎資訊</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-semibold">生命骰:</span> {classData.hitDie}
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-semibold">難度:</span> {DIFFICULTY_LABELS[classData.difficulty].text}
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-semibold">主要屬性:</span> {classData.primaryAbility}
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="font-semibold">次要屬性:</span> {classData.secondaryAbility}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">豁免擅長</h4>
            <p className="text-gray-700">{classData.savingThrows.join('、')}</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-2">起始裝備</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {classData.startingEquipment.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const HelperModal = ({ onClose, onSelect }) => {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})

  const questions = [
    {
      id: 'combat',
      question: '您偏好什麼樣的戰鬥方式？',
      options: [
        { value: 'melee', label: '近戰肉搏', points: { fighter: 3, barbarian: 3, paladin: 2 } },
        { value: 'ranged', label: '遠程攻擊', points: { ranger: 3, rogue: 2, fighter: 1 } },
        { value: 'magic', label: '施放法術', points: { wizard: 3, sorcerer: 3, warlock: 2 } },
        { value: 'support', label: '支援隊友', points: { cleric: 3, bard: 3, druid: 2 } }
      ]
    },
    {
      id: 'complexity',
      question: '您喜歡多複雜的職業？',
      options: [
        { value: 'simple', label: '簡單直接', points: { fighter: 3, barbarian: 3, rogue: 2 } },
        { value: 'moderate', label: '中等複雜', points: { paladin: 2, ranger: 2, bard: 2 } },
        { value: 'complex', label: '複雜策略', points: { wizard: 3, druid: 2, cleric: 2 } }
      ]
    },
    {
      id: 'role',
      question: '您想在團隊中扮演什麼角色？',
      options: [
        { value: 'tank', label: '前線坦克', points: { fighter: 3, paladin: 3, barbarian: 2 } },
        { value: 'damage', label: '輸出傷害', points: { rogue: 3, wizard: 3, warlock: 2 } },
        { value: 'healer', label: '治療者', points: { cleric: 3, druid: 2, bard: 1 } },
        { value: 'utility', label: '多功能', points: { bard: 3, rogue: 2, ranger: 2 } }
      ]
    }
  ]

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option })
    if (step < questions.length) {
      setStep(step + 1)
    }
  }

  const calculateResults = () => {
    const scores = {}
    Object.values(answers).forEach(answer => {
      Object.entries(answer.points).forEach(([classId, points]) => {
        scores[classId] = (scores[classId] || 0) + points
      })
    })
    
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
    
    return sorted.map(([classId, score]) => ({
      classId,
      classData: CLASSES[classId],
      score,
      percentage: Math.round((score / 9) * 100)
    }))
  }

  const results = Object.keys(answers).length === questions.length ? calculateResults() : null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">🎯 職業選擇助手</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {!results ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>問題 {step} / {questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-dnd-blue h-2 rounded-full transition-all"
                    style={{ width: `${(step / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {questions[step - 1] && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-800">{questions[step - 1].question}</h4>
                  <div className="space-y-2">
                    {questions[step - 1].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(questions[step - 1].id, option)}
                        className="w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:border-dnd-blue hover:bg-blue-50 transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">推薦結果</h4>
              <p className="text-gray-600">根據您的偏好，以下是最適合您的職業：</p>
              
              {results.map((result, idx) => (
                <div
                  key={result.classId}
                  className="border-2 border-gray-300 rounded-lg p-4 hover:border-dnd-blue cursor-pointer"
                  onClick={() => onSelect(result.classId)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{result.classData.icon}</span>
                      <div>
                        <h5 className="font-bold text-lg text-gray-800">
                          {idx === 0 && '🏆 '}
                          {result.classData.name}
                        </h5>
                        <p className="text-sm text-gray-600">匹配度: {result.percentage}%</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{result.classData.description}</p>
                </div>
              ))}

              <button onClick={onClose} className="w-full btn-secondary">
                自己選擇
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepClass
