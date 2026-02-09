import { useState } from 'react'
import { generateAIPrompt, exportPromptForPlatform, getEquipmentOptions, getPoseOptions, getBackgroundOptions } from '../utils/promptGenerator'
import { getRecommendedEquipment } from '../data/equipmentData'
import CharacterSheet from './CharacterSheet'

const StepReview = ({ character, previousStep }) => {
  const [showCharacterSheet, setShowCharacterSheet] = useState(true)
  const [showPromptGenerator, setShowPromptGenerator] = useState(false)
  const [promptOptions, setPromptOptions] = useState({
    style: 'fantasy-art',
    language: 'zh-TW',
    includeBackground: true,
    pose: 'default',
    viewType: '3d-reference' // New: for 3D modeling reference
  })
  const [selectedPlatform, setSelectedPlatform] = useState('midjourney')

  const downloadJSON = () => {
    const dataStr = JSON.stringify(character, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${character.name || 'character'}.json`
    link.click()
  }

  // Get recommended equipment
  const recommendedEquipment = character.class && character.race
    ? getRecommendedEquipment(character.class, character.race)
    : null

  const generatedPrompt = character.class
    ? generateAIPrompt(character, promptOptions)
    : ''

  const platformExport = character.class
    ? exportPromptForPlatform(character, selectedPlatform, promptOptions)
    : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('已複製到ŉ�貼簿！')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">角色創建完成！</h2>
        <p className="text-gray-600">檢視您的角色卡並生成圖像</p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowCharacterSheet(true)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            showCharacterSheet
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📄 角色卡
        </button>
        <button
          onClick={() => setShowCharacterSheet(false)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            !showCharacterSheet
              ? 'bg-dnd-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🎨 AI 圖像生成器
        </button>
      </div>

      {/* Character Sheet View */}
      {showCharacterSheet && (
        <div>
          <CharacterSheet character={character} />
          
          {/* Recommended Equipment Section */}
          {recommendedEquipment && (
            <div className="bg-gray-50 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🖡️ 建硒({character.class}曼灦裝</h3>
              
              {/* Weapons */}
              {recommendedEquipment.weapons && recommendedEquipment.weapons.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">武器:</h4>
                  <ul className="list-disc space-y-1 ml-6">
                    {recommendedEquipment.weapons.map((weapon, idx) => (
                      <li key={idx} className="text-gray-600">
                        {weapon.name}
                        {weapon.damage && <span className="text-sm text-gray-500"> — {�weapon.damage}傷害，{weapon.damageType}伤宰�/span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Armor */}
              {(recommendedEquipment.armor || recommendedEquipment.shield) && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">随疐:</h4>
                  <ul className="list-disc space-y-1 ml-6">
                    {recommendedEquipment.armor && (
                      <li className="text-gray-600">
                        {recommendedEquipment.armor.name}
                        {recommendedEquipment.armor.ac && <span className="text-sm text-gray-500"> — AC: {recommendedEquipment.armor.ac}</span>}
                      </li>
                    )}
                    {recommendedEquipment.shield && (
                      <li className="text-gray-600">
                        {recommendedEquipment.shield.name}
                        {recommendedEquipment.shield.acBonus && <span className="text-sm text-gray-500"> — +{recommendedEquipment.shield.acBonus} AC</span>}
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {/* Other Items */}
              {recommendedEquipment.other && recommendedEquipment.other.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">其他物啫)</h4>
                  <ul className="list-disc space-y-1 ml-6">
                    {recommendedEquipment.other.map((item, idx) => (
                      <li key={idx} className="text-gray-600">{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */�H]��\�Ә[YOH��^�\M]M�����]ۂ�ې�X��^��ۛ�Y��ӟB��\�Ә[YOH��^LH��Y�X�YH^]�]HKL�M���[�Y[��۝\�[ZX��ݙ\����X�YKM��[��][ۋX��ܜȏ��<'��9."�/"���ӂ�؝]ۏ���]ۂ�ې�X��^��]�[�\��\B��\�Ә[YOH��^LH��Yܘ^KL�^Yܘ^KM�KL�M���[�Y[��۝\�[ZX��ݙ\����Yܘ^KM�[��][ۋX��ܜȏ��<'�&H9f�b,9."�. 9�iB�؝]ۏ���]����]���
_B���ʈRH��\�[�\�]܈�Y]�
��B��\����\�X�\��Y]	���\�X�\���\��	��
�]���]��\�Ә[YOH���Yܘ^KML��[�Y[�M������\�Ә[YOH�^^�۝\�[ZX��^Yܘ^KNX�M��'�RH9g%�`���'��$9fj�ς���ʈ��\�[ۜ�
��B�]��\�Ә[YOH��X�K^KMX�M�����ʈ�[H
��B�]��\�Ә[YOH��X�K^KL����X�[�\�Ә[YOH������۝[YY][H^Yܘ^KM���'�9g%�`��i���.��X�[���[X���[YO^���\�[ۜ˜�[_B�ې�[��O^�JHO��]��\�[ۜ�������\�[ۜ��[N�K�\��]��[YHJ_B��\�Ә[YOH��Y�[L��ܙ\��ܙ\�Yܘ^KL���[�Y[����\Θ�ܙ\�Y�X�YH���\Λ�][�K[�ۙH�����[ۈ�[YOH��[�\�KX\���ia�nm�&�z"*����[ۏ���[ۈ�[YOH��X[\�Xȏ�m�n��k�k�..�*�h���[ۏ���[ۈ�[YOH�[�[YH����ze�:,hO��[ۏ���[ۈ�[YOH��\��ۈ��chz`&�h���[ۏ���[ۈ�[YOH�Z[�[�ȏ��l9/cy�)y�jO��[ۏ���[ۈ�[YOH��[[�[���9�(yg��c��  ���[ۏ����[X����]�����ʈ�Y]�\H
��B�]��\�Ә[YOH��X�K^KL����X�[�\�Ә[YOH������۝[YY][H^Yܘ^KM���'宏9���f��b�n���X�[���[X���[YO^���\�[ۜ˝�Y]�\_B�ې�[��O^�JHO��]��\�[ۜ�������\�[ۜ��Y]�\N�K�\��]��[YHJ_B��\�Ә[YOH��Y�[L��ܙ\��ܙ\�Yܘ^KL���[�Y[����\Θ�ܙ\�Y�X�YH���\Λ�][�K[�ۙH�����[ۈ�[YOH�Y�][��aj:.��`���"9�&y����"O��[ۏ���[ۈ�[YOH�ܝ�Z]�� ��`���":h%�`�9�%�*'�`���"O��[ۏ���[ۈ�[YOH�X�[ۈ��b�y�b��k�yb!�`���"9�,:-���%��.y���"O��[ۏ���[ۈ�[YOH��\�Y�\�[��H��� 9k�/k�.��`���"�9�(yg��)����9g%�c��*&��oyg��(�y�b�#��.��9��/k��c�`c��"O��[ۏ����[X����]�����ʈ��H
��ۈۛHY��Y]�\H\�	�X�[ۉ�H
��B����\�[ۜ˝�Y]�\HOOH	�X�[ۉ�	��
�]��\�Ә[YOH��X�K^KL����X�[�\�Ә[YOH������۝[YY][H^Yܘ^KM���'�9g���b��X�[���[X���[YO^���\�[ۜ˜��_B�ې�[��O^�JHO��]��\�[ۜ�������\�[ۜ���N�K�\��]��[YHJ_B��\�Ә[YOH��Y�[L��ܙ\��ܙ\�Yܘ^KL���[�Y[����\Θ�ܙ\�Y�X�YH���\Λ�][�K[�ۙH������]��S�[ۜ��\�X�\���\��K�X\
��HO�
��[ۈ�^O^���K��[Y_H�[YO^���K��[Y_O����K�X�[O��[ۏ��
J_B���[X����]���
_B���ʈ�X��ܛ�[�
��B�]��\�Ә[YOH��X�K^KL����X�[�\�Ә[YOH������۝[YY][H^Yܘ^KM���'�!�: �9�k��.�)�9k���"�X�[��]��\�Ә[YOH��^][\�X�[�\��\L����[�]�\OH��X�؛����X��Y^���\�[ۜ˚[��YP�X��ܛ�[�B�ې�[��O^�JHO��]��\�[ۜ�������\�[ۜ�[��YP�X��ܛ�[��K�\��]��X��YJ_B��\�Ә[YOH��MM��ς��[��\�Ә[YOH�^Yܘ^KM���c!yd*�o�9�k�*+yk���"Y˘Y�k�9�d�$g9�k�9�`�hc�he�h���b{�"O��[����]����]����]�����ʈ�[�\�]Y��\
��B�]��\�Ә[YOH��X�K^KL�����\�Ә[YOH��۝[YY][H^Yܘ^KM����'��$9�RH9��9�.�	��]��\�Ә[YOH���]�]H�ܙ\��ܙ\�Yܘ^KL���[�Y[�MZ[�ZV�̜�[WHX^ZV͍�[WHݙ\����^KX]]Ȃ��[O^���]T�X�N�	��K]ܘ\	��ܙܘ\�	؜�XZ�]�ܙ	�_O���\�Ә[YOH�^\�H^Yܘ^KM�XY[��\�[^Y�����[�\�]Y��\	�,�����a�� �� �� ��B�����]����]ۂ�ې�X��^�
HO���U��\��\�
�[�\�]Y��\
_B��\�Ә[YOH��Y�[��Y�X�YH^]�]HKL�M���[�Y[��۝\�[ZX��ݙ\����X�YKM��[��][ۋX��ܜ�]L�����<'���:)!�(�y��9�.��":`jy�*9b���"�ZY��\��^yg,9nl��bJ��"B�؝]ۏ���]�����ʈ]�ܛKT�X�Y�X�^ܝ
��B�]��\�Ә[YOH��X�K^KM]M�M��ܙ\�]�ܙ\�Yܘ^KL�����\�Ә[YOH��۝[YY][H^Yܘ^KM�X�Lȏ�'�H9o!�b,9�빪&ynl�!��)���o#������ʈ]�ܛH�[X�܈
��B�]��\�Ә[YOH��^�\L�X�M������^N�	�ZY��\��^I�X�[�	�ZY��\��^I�K���^N�	��X�KYY��\�[ۉ�X�[�	��X�HY��\�[ۉ�K���^N�	�[I�X�[�	�S0��l ' },
                  { key: 'leonardo', label: 'Leonardo.Ai' },
                  { key: 'comhy', label: 'ComfyUI' }
                ].map(platform => (
                  <button
                    key={platform.key}
                    onClick={() => setSelectedPlatform(platform.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatform === platform.key
                        ? 'bg-dnd-blue text-white'
                        : 'bg-gray-200 text-gray-700 hover:bo-gray-300'
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>

              {/* Platform-Specific Prompt */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 min-h-[16rem] max-h-[48rem] overflow-y-auto"
                   style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {platformExport ? platformExport.prompt : '訋释。。。'}
                </p>
              </div>
              
              {/* Platform-Specific Parameters */}
              {platformExport && platformExport.parameters && (
                <div className="mt-4 space-y-2">
                  <h5 className="font-medium text-gray-700 mb-2">建硒 參數:h5>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    {Object.entries(platformExport.parameters).map(([key, value]) => (
                      <div key={key} className="text-gray-700 mb-1">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => copyToClipboard(platformExport ? platformExport.prompt : '')}
                className="w-full bg-dnd-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-3"
              >
                📋 複製弇到目標平至皊觔示（釉遨用隬 {selectedPlatform})
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={downloadJSON}
              className="flex-1 bg-dnd-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
               📾 下輢oJSON
            </button>
            <button
              onClick={previousStep}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              🔙 回到9.�K���
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepReview