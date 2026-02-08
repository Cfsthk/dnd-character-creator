const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep >= step.id
                    ? 'bg-dnd-blue text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.id}
              </div>
              <div className="mt-2 text-sm font-medium text-center">
                {step.name}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 transition-colors ${
                  currentStep > step.id ? 'bg-dnd-blue' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
