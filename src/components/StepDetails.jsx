import { races } from '../data/raceData'

const StepDetails = ({ character, updateCharacter, nextStep, previousStep }) => {
  // Get height and weight suggestions based on race
  const raceData = character.race ? races[character.race] : null
  const heightSuggestion = raceData ? `${raceData.heightRange.avgFeet}'${raceData.heightRange.avgInches}"` : "5'6\""
  const weightSuggestion = raceData ? raceData.weightRange.avg : 150

  const updateDetails = (field, value) => {
    updateCharacter({
      details: { ...character.details, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Character Details</h2>
        <p className="text-gray-600">Add personality and physical characteristics to your character</p>
      </div>

      <div className="card max-w-2xl mx-auto space-y-4">
        {/* Name */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Character Name *</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter character name..."
          />
        </div>

        {/* Physical Characteristics Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-800 mb-2">Gender</label>
            <select
              value={character.details.gender || ''}
              onChange={(e) => updateDetails('gender', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">
              Height <span className="text-sm text-gray-500">(e.g., {heightSuggestion})</span>
            </label>
            <input
              type="text"
              value={character.details.height || ''}
              onChange={(e) => updateDetails('height', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={heightSuggestion}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-2">
              Weight <span className="text-sm text-gray-500">({weightSuggestion} lbs)</span>
            </label>
            <input
              type="text"
              value={character.details.weight || ''}
              onChange={(e) => updateDetails('weight', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={`${weightSuggestion} lbs`}
            />
          </div>
        </div>

        {/* Alignment */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Alignment</label>
          <select
            value={character.alignment}
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Choose alignment...</option>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="True Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
          </select>
        </div>

        {/* Carried Items */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Starting Equipment / Carried Items</label>
          <textarea
            value={character.details.equipment || ''}
            onChange={(e) => updateDetails('equipment', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="List your character's equipment and items (e.g., Longsword, Shield, Backpack, Rope, Rations...)"
          />
        </div>

        {/* Appearance */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Appearance Description</label>
          <textarea
            value={character.details.appearance}
            onChange={(e) => updateDetails('appearance', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Describe your character's appearance (hair color, eye color, distinctive features...)"
          />
        </div>

        {/* Personality */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Personality Traits</label>
          <textarea
            value={character.details.personality}
            onChange={(e) => updateDetails('personality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Describe your character's personality (brave, cautious, friendly, gruff...)"
          />
        </div>

        {/* Backstory */}
        <div>
          <label className="block font-bold text-gray-800 mb-2">Backstory</label>
          <textarea
            value={character.details.backstory}
            onChange={(e) => updateDetails('backstory', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Tell your character's story (origin, motivation, goals...)"
          />
        </div>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <button onClick={previousStep} className="btn-secondary">Previous</button>
        <button onClick={nextStep} className="btn-primary">Next</button>
      </div>
    </div>
  )
}

export default StepDetails
