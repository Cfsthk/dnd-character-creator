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

  // Ability names in Traditional Chinese
  const abilityNames = {
    strength: '力量',
    dexterity: '敏捷',
    constitution: '體質',
    intelligence: '智力',
    wisdom: '睿智',
    charisma: '魅力'
  }

  const skills = [
    { name: 'Acrobatics', nameChinese: '特技', ability: 'dexterity' },
    { name: 'Animal Handling', nameChinese: '馴養動物', ability: 'wisdom' },
    { name: 'Arcana', nameChinese: '奧秘', ability: 'intelligence' },
    { name: 'Athletics', nameChinese: '運動', ability: 'strength' },
    { name: 'Deception', nameChinese: '欺瞞', ability: 'charisma' },
    { name: 'History', nameChinese: '歷史', ability: 'intelligence' },
    { name: 'Insight', nameChinese: '洞察', ability: 'wisdom' },
    { name: 'Intimidation', nameChinese: '威嚇', ability: 'charisma' },
    { name: 'Investigation', nameChinese: '調查', ability: 'intelligence' },
    { name: 'Medicine', nameChinese: '醫藥', ability: 'wisdom' },
    { name: 'Nature', nameChinese: '自然', ability: 'intelligence' },
    { name: 'Perception', nameChinese: '察覺', ability: 'wisdom' },
    { name: 'Performance', nameChinese: '表演', ability: 'charisma' },
    { name: 'Persuasion', nameChinese: '說服', ability: 'charisma' },
    { name: 'Religion', nameChinese: '宗教', ability: 'intelligence' },
    { name: 'Sleight of Hand', nameChinese: '巧手', ability: 'dexterity' },
    { name: 'Stealth', nameChinese: '隱匿', ability: 'dexterity' },
    { name: 'Survival', nameChinese: '生存', ability: 'wisdom' }
  ]

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto" id="character-sheet">
      {/* Header */}
      <div className="border-4 border-black p-4 mb-4">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">{character.name || '未命名角色'}</h1>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">職業與等級</div>
            <div className="text-lg font-semibold">{classData ? classData.name : '無'} 1</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">背景</div>
            <div className="text-lg font-semibold">{character.background || '無'}</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">種族</div>
            <div className="text-lg font-semibold">{character.race || '無'}</div>
          </div>
          <div>
            <div className="font-bold uppercase text-xs text-gray-600">陣營</div>
            <div className="text-lg font-semibold">{character.alignment || '無'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Ability Scores & Skills */}
        <div className="space-y-4">
          {/* Ability Scores */}
          <div className="space-y-2">
            {Object.entries(character.abilityScores || {}).map(([ability, score]) => (
              <div key={ability} className="border-2 border-gray-800 rounded-lg p-3 text-center">
                <div className="text-xs font-bold uppercase text-gray-600">{abilityNames[ability]}</div>
                <div className="text-3xl font-bold">{getAbilityModifier(score)}</div>
                <div className="text-sm text-gray-600">{score}</div>
              </div>
            ))}
          </div>

          {/* Proficiency Bonus */}
          <div className="border-2 border-gray-800 rounded-lg p-3 text-center">
            <div className="text-xs font-bold uppercase text-gray-600">熟練加值</div>
            <div className="text-2xl font-bold">{getProficiencyBonus()}</div>
          </div>

          {/* Saving Throws */}
          <div className="border-2 border-gray-800 rounded-lg p-3">
            <div className="text-sm font-bold uppercase text-gray-600 mb-2">豁免檢定</div>
            {Object.entries(savingThrows).map(([ability, proficient]) => (
              <div key={ability} className="flex items-center text-sm py-1">
                <input type="checkbox" checked={proficient} readOnly className="mr-2" />
                <span className="flex-1">{abilityNames[ability]}</span>
                <span className="font-semibold">
                  {getAbilityModifier(character.abilityScores?.[ability] || 10)}
                </span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="border-2 border-gray-800 rounded-lg p-3">
            <div className="text-sm font-bold uppercase text-gray-600 mb-2">技能</div>
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center text-sm py-1">
                <input type="checkbox" className="mr-2" />
                <span className="flex-1">{skill.nameChinese}</span>
                <span className="font-semibold text-xs text-gray-500 mr-2">
                  ({abilityNames[skill.ability]})
                </span>
                <span className="font-semibold">
                  {getAbilityModifier(character.abilityScores?.[skill.ability] || 10)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Combat Stats */}
        <div className="space-y-4">
          {/* Armor Class */}
          <div className="border-2 border-gray-800 rounded-lg p-4 text-center">
            <div className="text-xs font-bold uppercase text-gray-600">護甲等級</div>
            <div className="text-4xl font-bold">
              {10 + Math.floor((character.abilityScores?.dexterity - 10) / 2)}
            </div>
          </div>

          {/* Initiative */}
          <div className="border-2 border-gray-800 rounded-lg p-4 text-center">
            <div className="text-xs font-bold uppercase text-gray-600">先攻</div>
            <div className="text-4xl font-bold">
              {getAbilityModifier(character.abilityScores?.dexterity || 10)}
            </div>
          </div>

          {/* Speed */}
          <div className="border-2 border-gray-800 rounded-lg p-4 text-center">
            <div className="text-xs font-bold uppercase text-gray-600">速度</div>
            <div className="text-4xl font-bold">30 呎</div>
          </div>

          {/* Hit Points */}
          <div className="border-2 border-gray-800 rounded-lg p-4">
            <div className="text-xs font-bold uppercase text-gray-600 text-center mb-2">
              生命值
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {classData 
                  ? parseInt(classData.hitDie.substring(1)) + Math.floor((character.abilityScores?.constitution - 10) / 2)
                  : 10
                }
              </div>
              <div className="text-xs text-gray-500 mt-1">
                最大生命值（1級）
              </div>
            </div>
          </div>

          {/* Hit Dice */}
          <div className="border-2 border-gray-800 rounded-lg p-4 text-center">
            <div className="text-xs font-bold uppercase text-gray-600">生命骰</div>
            <div className="text-2xl font-bold">
              1{classData?.hitDie || 'd8'}
            </div>
          </div>

          {/* Death Saves */}
          <div className="border-2 border-gray-800 rounded-lg p-4">
            <div className="text-xs font-bold uppercase text-gray-600 mb-2">死亡豁免</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <span className="w-12">成功：</span>
                <div className="flex gap-1">
                  <input type="checkbox" className="w-4 h-4" />
                  <input type="checkbox" className="w-4 h-4" />
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-12">失敗：</span>
                <div className="flex gap-1">
                  <input type="checkbox" className="w-4 h-4" />
                  <input type="checkbox" className="w-4 h-4" />
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features & Traits */}
        <div className="space-y-4">
          {/* Physical Characteristics */}
          <div className="border-2 border-gray-800 rounded-lg p-4">
            <div className="text-sm font-bold uppercase text-gray-600 mb-3">
              外觀特徵
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">年齡：</span>
                <span className="font-semibold">{character.age || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">身高：</span>
                <span className="font-semibold">{character.height || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">體重：</span>
                <span className="font-semibold">{character.weight || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">眼睛：</span>
                <span className="font-semibold">{character.eyeColor || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">膚色：</span>
                <span className="font-semibold">{character.skinColor || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">頭髮：</span>
                <span className="font-semibold">{character.hairColor || '-'}</span>
              </div>
            </div>
          </div>

          {/* Racial Traits */}
          {raceData && (
            <div className="border-2 border-gray-800 rounded-lg p-4">
              <div className="text-sm font-bold uppercase text-gray-600 mb-2">
                種族特性
              </div>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{raceData.nameChinese || raceData.name}</p>
                {character.subrace && (
                  <p className="text-gray-600">亞種：{character.subrace}</p>
                )}
                {raceData.description && (
                  <p className="text-xs text-gray-600 mt-2">{raceData.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Class Features */}
          {classData && (
            <div className="border-2 border-gray-800 rounded-lg p-4">
              <div className="text-sm font-bold uppercase text-gray-600 mb-2">
                職業特性
              </div>
              <div className="text-sm">
                <p className="font-semibold mb-2">{classData.name} 特性</p>
                <p className="text-gray-600 text-xs">{classData.description}</p>
              </div>
            </div>
          )}

          {/* Languages */}
          <div className="border-2 border-gray-800 rounded-lg p-4">
            <div className="text-sm font-bold uppercase text-gray-600 mb-2">
              語言
            </div>
            <div className="text-sm text-gray-600">
              通用語 + 種族語言
            </div>
          </div>

          {/* Equipment */}
          <div className="border-2 border-gray-800 rounded-lg p-4">
            <div className="text-sm font-bold uppercase text-gray-600 mb-2">
              裝備
            </div>
            <div className="text-sm text-gray-600">
              基於職業和背景的起始裝備
            </div>
          </div>
        </div>
      </div>

      {/* Personality & Backstory */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border-2 border-gray-800 rounded-lg p-4">
          <div className="text-sm font-bold uppercase text-gray-600 mb-2">
            性格特質
          </div>
          <p className="text-sm text-gray-700">{character.personalityTraits || '無'}</p>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-4">
          <div className="text-sm font-bold uppercase text-gray-600 mb-2">
            理念
          </div>
          <p className="text-sm text-gray-700">{character.ideals || '無'}</p>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-4">
          <div className="text-sm font-bold uppercase text-gray-600 mb-2">
            羈絆
          </div>
          <p className="text-sm text-gray-700">{character.bonds || '無'}</p>
        </div>
        <div className="border-2 border-gray-800 rounded-lg p-4">
          <div className="text-sm font-bold uppercase text-gray-600 mb-2">
            缺陷
          </div>
          <p className="text-sm text-gray-700">{character.flaws || '無'}</p>
        </div>
      </div>

      <div className="border-2 border-gray-800 rounded-lg p-4 mt-4">
        <div className="text-sm font-bold uppercase text-gray-600 mb-2">
          背景故事
        </div>
        <p className="text-sm text-gray-700">{character.backstory || '無'}</p>
      </div>
    </div>
  )
}

export default CharacterSheet
