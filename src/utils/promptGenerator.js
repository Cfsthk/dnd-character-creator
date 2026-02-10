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

  // 3D PRINTING SPECIFIC: Three orthographic views
  const viewSpec = isZh
    ? '3D列印用三視圖，正面視圖、背面視圖、側面視圖'
    : '3D printing reference sheet, three orthographic views: front view, back view, side view'
  parts.push(viewSpec)

  // 3D PRINTING SPECIFIC: Standing pose for stability
  const poseSpec = isZh
    ? '直立站姿，雙腳平放地面，手臂自然垂放身側'
    : 'standing upright, feet flat on ground, arms naturally at sides'
  parts.push(poseSpec)

  // 3D PRINTING SPECIFIC: Clear outlines and solid structure
  const structureSpec = isZh
    ? '清晰輪廓線，結構扎實，無懸浮部件，所有部位與身體連接'
    : 'clear outlines, solid structure, no floating parts, all elements connected to body'
  parts.push(structureSpec)

  // 3D PRINTING SPECIFIC: Thick base for stability
  const baseSpec = isZh
    ? '加厚底座，支撐穩定'
    : 'thick base platform for stability'
  parts.push(baseSpec)

  // Equipment description - simplified for 3D printing
  const equipment = buildEquipmentFor3DPrint(classData, language)
  parts.push(equipment)

  // Physical appearance
  const appearance = buildAppearance(character, classData, language)
  parts.push(appearance)

  // 3D PRINTING SPECIFIC: White background for clarity
  const background = isZh
    ? '純白背景，無陰影，正交投影，平面光照'
    : 'pure white background, no shadows, orthographic projection, flat even lighting'
  parts.push(background)

  // 3D PRINTING SPECIFIC: Technical illustration style
  const styleModifier = isZh
    ? '技術插圖風格，3D建模參考用，簡潔設計適合列印'
    : 'technical illustration style, 3D modeling reference, simplified design for printing'
  parts.push(styleModifier)

  // Quality tags
  const quality = isZh
    ? '高品質，專業級別，完整細節展示，可列印設計'
    : 'high quality, professional grade, full detail showcase, printable design'
  parts.push(quality)

  return parts.filter(Boolean).join(', ')
}

function buildEquipmentFor3DPrint(classData, language) {
  const equipment = classData.visualData.equipment
  const armor = equipment.armor[0] || ''
  const weapon = equipment.weapons[0] || ''

  if (language === 'zh' || language === 'zh-TW') {
    return `簡化裝備適合列印：${armor}，武器與身體相連：${weapon}`
  }

  return `simplified equipment for printing: ${armor}, weapon connected to body: ${weapon}`
}

function buildIdentity(character, classData, language) {
  if (language === 'zh' || language === 'zh-TW') {
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

  if (language === 'zh' || language === 'zh-TW') {
    return `${visual.build === 'muscular and athletic build' ? '肌肉發達運動體格' : '精實體格'}, ${visual.posture === 'confident battle-ready stance' ? '自信戰鬥姿態' : '警戒姿態'}`
  }

  return `${visual.build}, ${visual.posture}, ${visual.features || ''}`
}

function buildEquipment(classData, language) {
  const equipment = classData.visualData.equipment
  const armor = equipment.armor[0] || ''
  const weapon = equipment.weapons[0] || ''

  if (language === 'zh' || language === 'zh-TW') {
    return `裝備: ${armor}, 武器: ${weapon}`
  }

  return `wearing ${armor}, wielding ${weapon}`
}

function buildPose(classData, pose, language) {
  const poses = classData.visualData.poses

  if (pose === 'default' && poses.length > 0) {
    return poses[0]
  }

  if (language === 'zh' || language === 'zh-TW') {
    return '英雄姿態'
  }

  return 'heroic pose'
}

function buildBackground(classData, language) {
  const settings = classData.visualData.atmosphere.setting
  const setting = settings[0] || 'fantasy landscape'

  if (language === 'zh' || language === 'zh-TW') {
    return `背景: ${setting}`
  }

  return `background: ${setting}`
}

function buildAtmosphere(classData, language) {
  const lighting = classData.visualData.atmosphere.lighting
  const mood = classData.visualData.atmosphere.mood

  if (language === 'zh' || language === 'zh-TW') {
    return `氛圍: ${mood}`
  }

  return `${lighting}, ${mood} atmosphere`
}

function buildStyle(style, language) {
  const styles = {
    'fantasy-art': language === 'zh' || language === 'zh-TW' ? '奇幻藝術風格' : 'fantasy art style',
    'realistic': language === 'zh' || language === 'zh-TW' ? '寫實風格' : 'realistic style',
    'anime': language === 'zh' || language === 'zh-TW' ? '動漫風格' : 'anime style',
    'oil-painting': language === 'zh' || language === 'zh-TW' ? '油畫風格' : 'oil painting style',
    'digital-art': language === 'zh' || language === 'zh-TW' ? '數位藝術風格' : 'digital art style',
    'comic-book': language === 'zh' || language === 'zh-TW' ? '漫畫風格' : 'comic book style'
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
export function exportPromptForPlatform(character, platform = 'midjourney', options = {}) {
  const basePrompt = generateAIPrompt(character, { 
    language: 'en',
    viewType: options.viewType || 'single-view'
  })

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
      negativePrompt: 'low quality, blurry, distorted, ugly, bad anatomy, floating parts, disconnected elements',
      instructions: 'Use in Stable Diffusion with negative prompt'
    },
    'leonardo': {
      prompt: basePrompt,
      instructions: 'Use in Leonardo.AI with Fantasy Art model'
    }
  }

  return platformFormats[platform] || platformFormats['midjourney']
}
