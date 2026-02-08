import { races } from '../data/raceData'
import { classes } from '../data/classData'

const CharacterSheet = ({ character }) => {
  const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const getProficiencyBonus = () => '+2' // Level 1 default

  const raceData = character.race ? races[character.race] : null
  const classData = character.class ? classes[character.class] : null

  const savingThrows = {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false
  }

  // Set proficiency based on class
  if (classData) {
    switch (character.class) {
      case 'barbarian':
      case 'fighter':
        savingThrows.strength = true
        savingThrows.constitution = true
        break
      case 'monk':
      case 'ranger':
      case 'rogue':
        savingThrows.strength = true
        savingThrows.dexterity = true
        break
      case 'wizard':
        savingThrows.intelligence = true
        savingThrows.wisdom = true
        break
      case 'cleric':
      case 'druid':
        savingThrows.wisdom = true
        savingThrows.charisma = true
        break
      case 'bard':
      case 'paladin':
      case 'sorcerer':
      case 'warlock':
        savingThrows.dexterity = true
        savingThrows.charisma = true
        break
    }
  }

  const skills = [
    { name: 'Acrobatics', ability: 'dexterity' },
    { name: 'Animal Handling', ability: 'wisdom' },
    { name: 'Arcana', ability: 'intelligence' },
    { name: 'Athletics', ability: 'strength' },
    { name: 'Deception', ability: 'charisma' },
    { name: 'History', ability: 'intelligence' },
    { name: 'Insight', ability: 'wisdom' },
    { name: 'Intimidation', ability: 'charisma' },
    { name: 'Investigation', ability: 'intelligence' },
    { name: 'Medicine', ability: 'wisdom' },
    { name: 'Nature', ability: 'intelligence' },
    { name: 'Perception', ability: 'wisdom' },
    { name: 'Performance', ability: 'charisma' },
    { name: 'Persuasion', ability: 'charisma' },
    { name: 'Religion', ability: 'intelligence' },
    { name: 'Sleight of Hand', ability: 'dexterity' },
    { name: 'Stealth', ability: 'dexterity' },
    { name: 'Survival', ability: 'wisdom' }
  ]

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto" id="character-sheet">
      {/* Header */}
      <div className="border-4 border-black p-4 mb-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">{character.name || 'Unnamed Character'}</h1>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Class & Level</div>
            <div className="text-lg font-semibold">{classData ? classData.name : 'None'} 1</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Race</div>
            <div className="text-lg font-semibold">{raceData ? raceData.name : 'None'}</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Subrace</div>
            <div className="text-lg font-semibold">{character.subrace || 'None'}</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Background</div>
            <div className="text-lg font-semibold">{character.background || 'None'}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Alignment</div>
            <div className="font-semibold">{character.alignment || 'Unaligned'}</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Experience Points</div>
            <div className="font-semibold">0</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">Proficiency Bonus</div>
            <div className="font-semibold">{getProficiencyBonus()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Abilities */}
        <div className="space-y-4">
          {/* Ability Scores */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-3 uppercase text-sm">Ability Scores</h3>
            {Object.entries(character.abilities).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border-b border-gray-300 py-2">
                <div>
                  <div className="font-bold uppercase text-xs">{key.slice(0, 3)}</div>
                  <div className="text-xs text-gray-600 capitalize">{key}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold border-2 border-black rounded-full w-12 h-12 flex items-center justify-center">
                    {value}
                  </div>
                  <div className="text-sm font-semibold mt-1">{getAbilityModifier(value)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Saving Throws */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-sm">Saving Throws</h3>
            {Object.entries(character.abilities).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <div className={`w-4 h-4 border-2 border-black rounded mr-2 ${savingThrows[key] ? 'bg-black' : ''}`}></div>
                  <span className="text-sm capitalize">{key}</span>
                </div>
                <span className="font-bold text-sm">{getAbilityModifier(value)}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-sm">Skills</h3>
            <div className="space-y-1">
              {skills.map((skill) => {
                const abilityScore = character.abilities[skill.ability]
                const modifier = getAbilityModifier(abilityScore)
                return (
                  <div key={skill.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-black rounded mr-2"></div>
                      <span>{skill.name}</span>
                    </div>
                    <span className="font-bold">{modifier}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Middle Column - Combat Stats */}
        <div className="space-y-4">
          {/* AC, Initiative, Speed */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border-2 border-black p-3 text-center">
              <div className="text-3xl font-bold">
                {10 + Math.floor((character.abilities.dexterity - 10) / 2)}
              </div>
              <div className="text-xs font-bold uppercase mt-1">Armor Class</div>
            </div>
            <div className="border-2 border-black p-3 text-center">
              <div className="text-3xl font-bold">
                {getAbilityModifier(character.abilities.dexterity)}
              </div>
              <div className="text-xs font-bold uppercase mt-1">Initiative</div>
            </div>
            <div className="border-2 border-black p-3 text-center">
              <div className="text-3xl font-bold">30</div>
              <div className="text-xs font-bold uppercase mt-1">Speed</div>
            </div>
          </div>

          {/* Hit Points */}
          <div className="border-2 border-black p-4">
            <div className="text-center mb-2">
              <div className="text-xs font-bold uppercase text-gray-600 mb-1">Hit Point Maximum</div>
              <div className="text-4xl font-bold border-b-2 border-black pb-2">
                {classData ? (parseInt(classData.hitDie.slice(1)) + Math.floor((character.abilities.constitution - 10) / 2)) : 10}
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-bold uppercase text-gray-600">Current Hit Points</div>
              <div className="border-2 border-black p-4 mt-1"></div>
            </div>
            <div className="text-center mt-3">
              <div className="text-xs font-bold uppercase text-gray-600">Temporary Hit Points</div>
              <div className="border-2 border-black p-2 mt-1"></div>
            </div>
          </div>

          {/* Hit Dice & Death Saves */}
          <div className="border-2 border-black p-3">
            <div className="mb-3">
              <div className="text-xs font-bold uppercase text-gray-600">Hit Dice</div>
              <div className="font-semibold">1{classData ? classData.hitDie : 'd8'}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-gray-600 mb-2">Death Saves</div>
              <div className="flex justify-between text-xs">
                <div>
                  <div className="font-bold">Successes</div>
                  <div className="flex gap-1 mt-1">
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Failures</div>
                  <div className="flex gap-1 mt-1">
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attacks & Spellcasting */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Attacks & Spellcasting</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1 text-xs font-bold border-b border-gray-400 pb-1">
                <div>Name</div>
                <div>Atk Bonus</div>
                <div>Damage/Type</div>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-3 gap-1 text-xs border-b border-gray-300 pb-1">
                  <div className="border-b border-gray-400"></div>
                  <div className="border-b border-gray-400"></div>
                  <div className="border-b border-gray-400"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Character Details */}
        <div className="space-y-4">
          {/* Physical Characteristics */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Physical Characteristics</h3>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-xs font-bold text-gray-600">Gender</div>
                <div>{character.details.gender || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-600">Height</div>
                <div>{character.details.height || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-600">Weight</div>
                <div>{character.details.weight || 'Not specified'}</div>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Personality Traits</h3>
            <div className="text-xs min-h-[60px]">
              {character.details.personality || 'Not specified'}
            </div>
          </div>

          {/* Appearance */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Appearance</h3>
            <div className="text-xs min-h-[60px]">
              {character.details.appearance || 'Not specified'}
            </div>
          </div>

          {/* Backstory */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Backstory</h3>
            <div className="text-xs min-h-[80px]">
              {character.details.backstory || 'Not specified'}
            </div>
          </div>

          {/* Equipment */}
          <div className="border-2 border-black p-3">
            <h3 className="font-bold text-center mb-2 uppercase text-xs">Equipment</h3>
            <div className="text-xs min-h-[100px] whitespace-pre-wrap">
              {character.details.equipment || 'No equipment listed'}
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center no-print">
        <button
          onClick={() => window.print()}
          className="btn-primary text-lg px-8 py-3"
        >
          🖨️ Print Character Sheet
        </button>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}

export default CharacterSheet
