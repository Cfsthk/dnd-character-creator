import { CLASSES } from '../data/classes'

/**
 * Generate AI image prompt from character data
 * @param {Object} character - Character data
 * @param {Object} options - Generation options
 * @returns {string} - AI image prompt
 */
export function generateAIPrompt(character, options = {}) {
  const {
    style = 'fantasy-art',
    language = 'en',
    includeBackground = true,
    pose = 'default',
    viewType = 'single-view'
  } = options

  const classData = CLASSES[character.class]
  if (!classData) return ''

  // For 3D modeling reference, use special format
  if (viewType === '3d-reference') {
    return build3DReferencePrompt(character, classData, language, style)
  }

  const parts = []

  // 1. Character Identity
  const identity = buildIdentity(character, classData, language)
  parts.push(identity)

  // 2. Physical Appearance
  const appearance = buildAppearance(character, classData, language)
  parts.push(appearance)

  // 3. Equipment & Clothing
  const equipment = buildEquipment(classData, language)
  parts.push(equipment)

  // 4. Pose & Action
  const poseDesc = buildPose(classData, pose, language)
  parts.push(poseDesc)

  // 5. Background & Setting
  if (includeBackground) {
    const background = buildBackground(classData, language)
    parts.push(background)
  }

  // 6. Lighting & Atmosphere
  const atmosphere = buildAtmosphere(classData, language)
  parts.push(atmosphere)

  // 7. Art Style
  const styleDesc = buildStyle(style, language)
  parts.push(styleDesc)

  // 8. Quality Tags
  const quality = language === 'zh' || language === 'zh-TW'
    ? '高品質, 細緻, 專業藝術作品, 最佳品質'
    : 'high quality, detailed, professional artwork, best quality'
  parts.push(quality)

  return parts.filter(Boolean).join(', ')
}

function build3DReferencePrompt(character, classData, language, style) {
  const isZh = language === 'zh' || language === 'zh-TW'
  
  const parts = []
  
  // Character identity
  const identity = isZh
    ? `${character.race || '冒險者'} ${classData.name}`
    : `${character.race || 'adventurer'} ${classData.nameEn || classData.name}`
  parts.push(identity)
  
  // 3D modeling reference sheet specification
  const viewSpec = isZh
    ? '角色設定參考圖，四視圖展示（正面、背面、左側面、右側面），T-pose站立姿勢'
    : 'character reference sheet, turnaround views (front view, back view, left side view, right side view), T-pose standing'
  parts.push(viewSpec)
  
  // Clean outline style
  const outlineStyle = isZh
    ? '乾淨的線條輪廓，清晰的細節，適合3D建模參考'
    : 'clean outline style, clear line art, detailed for 3D modeling reference'
  parts.push(outlineStyle)
  
  // Equipment description
  const equipment = buildEquipment(classData, language)
  parts.push(equipment)
  
  // Physical appearance
  const appearance = buildAppearance(character, classData, language)
  parts.push(appearance)
  
  // White/neutral background for clarity
  const background = isZh
    ? '純白背景，無陰影，平面光照'
    : 'white background, no shadows, flat lighting'
  parts.push(background)
  
  // Style modifier
  const styleModifier = isZh
    ? '概念藝術風格，技術性插圖'
    : 'concept art style, technical illustration'
  parts.push(styleModifier)
  
  // Quality tags
  const quality = isZh
    ? '高品質，專業級別，完整細節展示'
    : 'high quality, professional grade, full detail showcase'
  parts.push(quality)
  
  return parts.filter(Boolean).join(', ')
}

function buildIdentity(character, classData, language) {
  if (language === 'zh') {
    return `${character.race || '冒險者'} ${classData.name}, ${character.alignment || '中立'}`
  }
  return `${character.race || 'adventurer'} ${classData.nameEn}, ${character.alignment || 'neutral'}`
}

function buildAppearance(character, classData, language) {
  const visual = classData.visualData.appearance
  
  if (character.details?.appearance) {
    // Use custom description if provided
    return character.details.appearance
  }

  if (language === 'zh') {
    return `${visual.build === 'muscular and athletic build' ? '肌肉發達運動體格' : '精實體格'}, ${visual.posture === 'confident battle-ready stance' ? '自信戰鬥姿態' : '警戒姿態'}`
  }
  
  return `${visual.build}, ${visual.posture}, ${visual.features || ''}`
}

function buildEquipment(classData, language) {
  const equipment = classData.visualData.equipment
  const armor = equipment.armor[0] || ''
  const weapon = equipment.weapons[0] || ''
  
  if (language === 'zh') {
    return `裝備: ${armor}, 武器: ${weapon}`
  }
  
  return `wearing ${armor}, wielding ${weapon}`
}

function buildPose(classData, pose, language) {
  const poses = classData.visualData.poses
  
  if (pose === 'default' && poses.length > 0) {
    return poses[0]
  }
  
  if (language === 'zh') {
    return '英雄姿態'
  }
  
  return 'heroic pose'
}

function buildBackground(classData, language) {
  const settings = classData.visualData.atmosphere.setting
  const setting = settings[0] || 'fantasy landscape'
  
  if (language === 'zh') {
    return `背景: ${setting}`
  }
  
  return `background: ${setting}`
}

function buildAtmosphere(classData, language) {
  const lighting = classData.visualData.atmosphere.lighting
  const mood = classData.visualData.atmosphere.mood
  
  if (language === 'zh') {
    return `氛圍: ${mood}`
  }
  
  return `${lighting}, ${mood} atmosphere`
}

function buildStyle(style, language) {
  const styles = {
    'fantasy-art': language === 'zh' ? '奇幻藝術風格' : 'fantasy art style',
    'realistic': language === 'zh' ? '寫實風格' : 'realistic style',
    'anime': language === 'zh' ? '動漫風格' : 'anime style',
    'oil-painting': language === 'zh' ? '油畫風格' : 'oil painting style',
    'digital-art': language === 'zh' ? '數位藝術風格' : 'digital art style',
    'comic-book': language === 'zh' ? '漫畫風格' : 'comic book style'
  }
  
  return styles[style] || styles['fantasy-art']
}

/**
 * Get suggested equipment options for dropdown
 */
export function getEquipmentOptions(character) {
  const classData = CLASSES[character.class]
  if (!classData) return { armor: [], weapons: [], accessories: [] }
  
  return {
    armor: classData.visualData.equipment.armor,
    weapons: classData.visualData.equipment.weapons,
    accessories: classData.visualData.equipment.accessories
  }
}

/**
 * Get suggested poses for class
 */
export function getPoseOptions(character) {
  const classData = CLASSES[character.class]
  if (!classData) return []
  
  return classData.visualData.poses
}

/**
 * Get suggested settings/backgrounds
 */
export function getBackgroundOptions(character) {
  const classData = CLASSES[character.class]
  if (!classData) return []
  
  return classData.visualData.atmosphere.setting
}

/**
 * Generate multiple prompt variations
 */
export function generatePromptVariations(character) {
  const styles = ['fantasy-art', 'realistic', 'anime', 'oil-painting']
  const variations = []
  
  styles.forEach(style => {
    const englishPrompt = generateAIPrompt(character, { style, language: 'en' })
    const chinesePrompt = generateAIPrompt(character, { style, language: 'zh' })
    
    variations.push({
      style,
      en: englishPrompt,
      zh: chinesePrompt
    })
  })
  
  return variations
}

/**
 * Export prompt for various AI image generators
 */
export function exportPromptForPlatform(character, platform = 'midjourney') {
  const basePrompt = generateAIPrompt(character, { language: 'en' })
  
  const platformFormats = {
    'midjourney': {
      prompt: `${basePrompt} --ar 2:3 --v 6`,
      instructions: 'Copy this prompt to Midjourney Discord bot'
    },
    'dalle': {
      prompt: basePrompt,
      instructions: 'Paste this prompt into DALL-E 3'
    },
    'stable-diffusion': {
      prompt: basePrompt,
      negativePrompt: 'low quality, blurry, distorted, ugly, bad anatomy',
      instructions: 'Use in Stable Diffusion with negative prompt'
    },
    'leonardo': {
      prompt: basePrompt,
      instructions: 'Use in Leonardo.AI with Fantasy Art model'
    }
  }
  
  return platformFormats[platform] || platformFormats['midjourney']
}
