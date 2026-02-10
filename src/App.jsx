import { useState } from 'react'
import StepRace from './components/StepRace'
import StepClass from './components/StepClass'
import StepSubclass from './components/StepSubclass'
import StepAbilities from './components/StepAbilities'
import StepDetails from './components/StepDetails'
import StepBackground from './components/StepBackground'
import StepEquipment from './components/StepEquipment'
import StepReview from './components/StepReview'
import ProgressBar from './components/ProgressBar'

const STEPS = [
  { id: 1, name: '種族', component: StepRace },
  { id: 2, name: '職業', component: StepClass },
  { id: 3, name: '子職業', component: StepSubclass },
  { id: 4, name: '屬性', component: StepAbilities },
  { id: 5, name: '背景', component: StepBackground },
  { id: 6, name: '裝備', component: StepEquipment },
  { id: 7, name: '細節', component: StepDetails },
  { id: 8, name: '完成', component: StepReview }
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [character, setCharacter] = useState({
    race: null,
    subrace: null,
    class: null,
    subclass: null,
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    background: null,
    equipment: [],
    name: '',
    alignment: '',
    details: {
      appearance: '',
      personality: '',
      backstory: '',
      visualPreferences: {}
    }
  })

  const updateCharacter = (updates) => {
    setCharacter(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dnd-red mb-2">
            D&D 5E 角色創建器
          </h1>
          <p className="text-gray-700 text-lg">
            創造您的冒險者，開始史詩旅程
          </p>
        </header>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Main Content */}
        <div className="mt-8">
          <CurrentStepComponent
            character={character}
            updateCharacter={updateCharacter}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>基於 D&D 5E 規則 | 支援 AI 場景生成</p>
        </footer>
      </div>
    </div>
  )
}

export default App
