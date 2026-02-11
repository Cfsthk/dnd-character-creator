export const subclasses = {
  barbarian: [
    {
      name: '狂暴之徑',
      description: '狂暴者走上狂暴之徑，將原始憤怒化為戰鬥狂熱。',
      features: {
        3: { name: '狂怒', description: '狂暴時可以進行額外攻擊作為獎勵動作' },
        6: { name: '無畏狂怒', description: '狂暴時免疫魅惑和恐懼' },
        10: { name: '威嚇存在', description: '使用動作恐嚇一個生物' },
        14: { name: '報復', description: '受到傷害時可以使用反應進行近戰武器攻擊' }
      }
    },
    {
      name: '圖騰戰士',
      description: '圖騰戰士從靈獸獲得力量，與自然之靈結合。',
      features: {
        3: { name: '靈魂探索者', description: '獲得動物之靈儀式和野獸語言' },
        3: { name: '圖騰靈魂', description: '選擇熊、鷹或狼圖騰獲得狂暴增益' },
        6: { name: '圖騰守護', description: '從你的圖騰動物獲得魔法守護' },
        10: { name: '靈魂行者', description: '可以施放與自然交流法術' },
        14: { name: '圖騰協調', description: '狂暴時獲得強大圖騰能力' }
      }
    }
  ],
  
  bard: [
    {
      name: '博學學院',
      description: '博學詩人掌握廣泛知識，收集各類學問和秘密。',
      features: {
        3: { name: '額外熟練', description: '獲得三項技能熟練' },
        3: { name: '妙語連珠', description: '可以減少敵人攻擊檢定、屬性檢定或傷害骰' },
        6: { name: '萬事通', description: '可以將靈感骰的一半加到不熟練的屬性檢定' },
        14: { name: '無雙技藝', description: '屬性檢定擲出9或更低時視為10' }
      }
    },
    {
      name: '勇武學院',
      description: '勇武詩人是戰士詩人，結合武藝與魔法。',
      features: {
        3: { name: '額外熟練', description: '獲得中甲、盾牌和武器熟練' },
        3: { name: '戰鬥靈感', description: '生物可以用靈感骰增加傷害或AC' },
        6: { name: '額外攻擊', description: '攻擊動作時可以攻擊兩次' },
        14: { name: '戰鬥魔法', description: '施法後可以用獎勵動作進行武器攻擊' }
      }
    }
  ],
  
  cleric: [
    {
      name: '知識領域',
      description: '知識之神重視學習和理解，珍視知識勝過一切。',
      features: {
        1: { name: '領域法術', description: '獲得命令、鑑定、占卜、困惑等領域法術' },
        1: { name: '知識祝福', description: '獲得兩項技能或語言熟練' },
        2: { name: '知識引導神力', description: '使用引導神力獲得技能或工具熟練10分鐘' },
        6: { name: '知識引導神力：讀心', description: '讀取生物表層思想' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8心靈傷害' },
        17: { name: '知識異象', description: '獲得高等神術' }
      }
    },
    {
      name: '生命領域',
      description: '生命領域專注於治療和保護的正能量。',
      features: {
        1: { name: '領域法術', description: '獲得祝福術、次級復原術、靈體衛士、死者復活等' },
        1: { name: '額外熟練', description: '獲得重甲熟練' },
        1: { name: '治療弟子', description: '治療法術額外恢復2+法術環級生命值' },
        2: { name: '生命引導神力', description: '治療30呎內最多生命值為五倍牧師等級的生物' },
        6: { name: '受祝福治療者', description: '治療法術額外為自己或他人恢復2+法術環級生命值' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8光耀傷害' },
        17: { name: '至高治療', description: '治療法術自動擲出最大值' }
      }
    },
    {
      name: '光明領域',
      description: '光明之神促進真理、警覺和對黑暗的再生抵抗。',
      features: {
        1: { name: '領域法術', description: '獲得燃燒之手、妖火、火球術、破邪焰擊等' },
        1: { name: '額外戲法', description: '獲得光明術戲法' },
        1: { name: '守護閃光', description: '對攻擊者施加劣勢並造成光耀傷害' },
        2: { name: '光明引導神力', description: '釋放光芒對敵人造成光耀傷害' },
        6: { name: '遏阻黑暗', description: '熄滅魔法黑暗並對進入你光芒的敵人造成傷害' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8光耀傷害' },
        17: { name: '光明之冠', description: '持續散發日光並對敵人造成光耀傷害' }
      }
    },
    {
      name: '自然領域',
      description: '自然之神是自然世界的守護者。',
      features: {
        1: { name: '領域法術', description: '獲得動物夥伴、尖刺生長、植物滋長、蟲群術等' },
        1: { name: '自然學徒', description: '獲得一項德魯伊戲法和技能熟練' },
        1: { name: '額外熟練', description: '獲得重甲熟練' },
        2: { name: '自然引導神力', description: '魅惑動物和植物' },
        6: { name: '遏阻不死和野獸', description: '引導神力可以驅散不死生物或野獸和植物' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8冰、火或閃電傷害' },
        17: { name: '自然大師', description: '命令動物和植物生物' }
      }
    },
    {
      name: '風暴領域',
      description: '風暴之神統治海洋和天空，是雷霆與破壞之主。',
      features: {
        1: { name: '領域法術', description: '獲得霧雲術、雷鳴波、風雨呼喚、操控水體等' },
        1: { name: '額外熟練', description: '獲得武器和重甲熟練' },
        1: { name: '風暴之怒', description: '對攻擊你的生物造成閃電或雷鳴傷害' },
        2: { name: '風暴引導神力', description: '造成最大傷害並推開大型或更小生物' },
        6: { name: '雷霆之擊', description: '對造成閃電或雷鳴傷害的目標施加推開效果' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8雷鳴傷害' },
        17: { name: '風暴之子', description: '獲得飛行速度和閃電與雷鳴傷害抗性' }
      }
    },
    {
      name: '詭詐領域',
      description: '詭詐之神是欺騙和盜賊的守護神。',
      features: {
        1: { name: '領域法術', description: '獲得魅惑人類、鏡影術、閃現術、變形自己等' },
        1: { name: '詭詐祝福', description: '可以對一名生物施加優勢或劣勢' },
        2: { name: '詭詐引導神力', description: '創造幻象分身並獲得優勢攻擊' },
        6: { name: '詭詐引導神力：隱蔽斗篷', description: '變為隱形直到攻擊或施法' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8毒素傷害' },
        17: { name: '改善複製', description: '創建四個幻象分身' }
      }
    },
    {
      name: '戰爭領域',
      description: '戰爭之神關注榮譽戰鬥、英勇和武藝精通。',
      features: {
        1: { name: '領域法術', description: '獲得神恩術、靈武器、十字軍鬥篷、行動自如等' },
        1: { name: '額外熟練', description: '獲得武器和重甲熟練' },
        1: { name: '戰爭祭司', description: '進行武器攻擊作為獎勵動作' },
        2: { name: '戰爭引導神力', description: '攻擊檢定獲得+10加值' },
        6: { name: '戰爭引導神力：戰爭之神頭像', description: '反應進行武器攻擊' },
        8: { name: '神力打擊', description: '武器攻擊附加1d8額外傷害' },
        17: { name: '戰爭頭像', description: '獲得對非魔法武器攻擊的抗性' }
      }
    }
  ],
  
  druid: [
    {
      name: '大地之環',
      description: '大地之環德魯伊與特定地域的魔法共鳴。',
      features: {
        2: { name: '額外戲法', description: '獲得一項德魯伊戲法' },
        2: { name: '自然復原', description: '短休恢復法術位' },
        2: { name: '環境法術', description: '根據選擇地形獲得額外法術' },
        6: { name: '大地行者', description: '在困難地形移動不耗費額外移動力' },
        10: { name: '自然守護', description: '對元素和妖精免疫魅惑和恐懼' },
        14: { name: '自然庇護', description: '在困難地形中躲藏和野獸不攻擊' }
      }
    },
    {
      name: '月之環',
      description: '月之環德魯伊是凶猛的戰鬥變形者。',
      features: {
        2: { name: '戰鬥野性變身', description: '可以野性變身為戰鬥變形並用獎勵動作變身' },
        2: { name: '環境形態', description: '野性變身時可以選擇更高挑戰等級的生物' },
        6: { name: '原始打擊', description: '野獸形態攻擊視為魔法' },
        10: { name: '元素野性變身', description: '可以變身為元素生物' },
        14: { name: '千面', description: '可以隨意施放變形自己' }
      }
    }
  ],
  
  fighter: [
    {
      name: '戰技大師',
      description: '戰技大師精通各種戰鬥技巧，使用特殊戰技操控戰場。',
      features: {
        3: { name: '戰鬥優越', description: '獲得優越骰和戰技' },
        3: { name: '學者', description: '獲得一項技能熟練或工具熟練' },
        7: { name: '自知之明', description: '獲得額外優越骰' },
        10: { name: '改良戰鬥優越', description: '優越骰提升為d10' },
        15: { name: '不屈', description: '每回合開始恢復優越骰' },
        18: { name: '改良戰鬥優越', description: '優越骰提升為d12' }
      }
    },
    {
      name: '鬥士',
      description: '鬥士專注於純粹的身體卓越，將身體磨練至完美。',
      features: {
        3: { name: '改良重擊', description: '重擊範圍擴大到19-20' },
        7: { name: '卓越運動員', description: '跳躍距離增加，力量、敏捷、體質檢定加值' },
        10: { name: '額外戰鬥風格', description: '獲得第二個戰鬥風格' },
        15: { name: '高等重擊', description: '重擊範圍擴大到18-20' },
        18: { name: '倖存者', description: '每回合回合開始恢復生命值' }
      }
    },
    {
      name: '魔戰士',
      description: '魔戰士將武術與法術結合，是戰士與法師的混合體。',
      features: {
        3: { name: '施法', description: '獲得法術位和法師法術' },
        3: { name: '武器連結', description: '與武器建立魔法連結' },
        7: { name: '戰爭魔法', description: '施放戲法後可以進行武器攻擊' },
        10: { name: '魔法打擊', description: '武器攻擊視為魔法' },
        15: { name: '秘法衝擊', description: '對抗法術豁免檢定獲得優勢' },
        18: { name: '改良戰爭魔法', description: '施放法術後可以進行武器攻擊' }
      }
    }
  ],
  
  monk: [
    {
      name: '開掌之道',
      description: '開掌之道武僧掌握徒手戰鬥的終極技巧。',
      features: {
        3: { name: '開掌技巧', description: '使用氣進行特殊打擊效果' },
        6: { name: '渾圓守護', description: '使用反應偏轉投射物' },
        11: { name: '靜心', description: '結束魅惑或恐懼效果' },
        17: { name: '震懾掌', description: '使用氣點即死或造成大量傷害' }
      }
    },
    {
      name: '暗影之道',
      description: '暗影武僧掌握暗影魔法，成為完美刺客。',
      features: {
        3: { name: '暗影藝術', description: '獲得次要幻術戲法和暗影法術' },
        6: { name: '暗影步伐', description: '從陰影傳送到陰影' },
        11: { name: '暗影斗篷', description: '在陰暗處變為隱形' },
        17: { name: '機會主義者', description: '對被驚訝的生物攻擊獲得優勢' }
      }
    },
    {
      name: '四元素之道',
      description: '四元素武僧掌握元素之力，調和氣與元素魔法。',
      features: {
        3: { name: '元素弟子', description: '學習元素訓練並施放元素法術' },
        6: { name: '額外元素訓練', description: '學習額外元素訓練' },
        11: { name: '額外元素訓練', description: '學習額外元素訓練' },
        17: { name: '額外元素訓練', description: '學習額外元素訓練' }
      }
    }
  ],
  
  paladin: [
    {
      name: '虔誠誓約',
      description: '虔誠聖武士堅守正義、榮譽和仁慈的理想。',
      features: {
        3: { name: '誓約法術', description: '獲得庇護所、次級復原術、信標、行動自如等' },
        3: { name: '引導神力：神聖武器', description: '武器散發光芒並獲得攻擊加值' },
        3: { name: '引導神力：驅散邪惡', description: '驅散不死和邪魔' },
        7: { name: '虔誠靈光', description: '你和友軍免疫魅惑' },
        15: { name: '純淨靈魂', description: '持續處於防護邪惡善良法術效果下' },
        20: { name: '神聖顯靈', description: '變身成發光聖者' }
      }
    },
    {
      name: '遠古誓約',
      description: '遠古聖武士守護光明、美麗和生命對抗黑暗。',
      features: {
        3: { name: '誓約法術', description: '獲得糾纏術、月光束、植物滋長、冰風暴等' },
        3: { name: '引導神力：自然之怒', description: '使用藤蔓束縛敵人' },
        3: { name: '引導神力：驅散不忠', description: '驅散邪魔和妖精' },
        7: { name: '遠古靈光', description: '你和友軍對法術獲得抗性' },
        15: { name: '不屈哨兵', description: '生命值降至0時恢復1點' },
        20: { name: '遠古鬥士', description: '變身成遠古力量的化身' }
      }
    },
    {
      name: '復仇誓約',
      description: '復仇聖武士是懲罰邪惡的黑暗騎士。',
      features: {
        3: { name: '誓約法術', description: '獲得禍害、誤導術、加速、放逐術等' },
        3: { name: '引導神力：懲戒敵人', description: '獲得對一個敵人的攻擊優勢' },
        3: { name: '引導神力：復仇誓言', description: '對傷害隊友的敵人獲得額外移動' },
        7: { name: '無情復仇者', description: '對擊中友軍的敵人進行機會攻擊' },
        15: { name: '靈魂復仇', description: '殺死敵人時恐懼周圍生物' },
        20: { name: '復仇天使', description: '變身成帶翼復仇者' }
      }
    }
  ],
  
  ranger: [
    {
      name: '獵人',
      description: '獵人專精於對抗特定敵人，運用各種戰術。',
      features: {
        3: { name: '獵人獵物', description: '選擇巨人殺手、群體殺手或追蹤獵殺者能力' },
        7: { name: '防禦戰術', description: '選擇逃脫群體、多重攻擊防禦或鋼鐵意志' },
        11: { name: '多重攻擊', description: '選擇齊射、旋風攻擊或凌空射擊' },
        15: { name: '高等獵人防禦', description: '選擇閃避、反擊或站定陣地' }
      }
    },
    {
      name: '馴獸師',
      description: '馴獸師與動物夥伴並肩作戰，形成強大聯繫。',
      features: {
        3: { name: '遊俠夥伴', description: '獲得動物夥伴並共同戰鬥' },
        7: { name: '夥伴異常防禦', description: '動物夥伴在豁免中獲得熟練' },
        11: { name: '動獸獸協同', description: '動物夥伴可以用反應進行近戰攻擊' },
        15: { name: '增強野獸', description: '動物夥伴攻擊視為魔法' }
      }
    }
  ],
  
  rogue: [
    {
      name: '盜賊',
      description: '盜賊精通潛行、偷竊和快速行動，是完美的小偷。',
      features: {
        3: { name: '快手', description: '可以用獎勵動作使用巧手、解除裝置或隱藏' },
        9: { name: '至高潛行', description: '攀爬速度等於正常移動速度' },
        13: { name: '用毒高手', description: '使用毒藥作為獎勵動作並免疫毒素傷害' },
        17: { name: '神偷', description: '對敏捷檢定獲得優勢並使用魔法物品' }
      }
    },
    {
      name: '刺客',
      description: '刺客是死亡大師，精通偽裝、毒藥和致命打擊。',
      features: {
        3: { name: '額外熟練', description: '獲得偽裝工具和毒藥工具熟練' },
        3: { name: '暗殺', description: '對未行動生物獲得優勢且重擊被驚訝的生物' },
        9: { name: '滲透專精', description: '創造假身份並完美模仿聲音和行為' },
        13: { name: '騙子', description: '讀心和不被讀心' },
        17: { name: '死亡打擊', description: '偷襲失敗時造成雙倍傷害' }
      }
    },
    {
      name: '秘法詭術師',
      description: '秘法詭術師將盜賊技巧與附魔和幻術魔法結合。',
      features: {
        3: { name: '施法', description: '獲得法術位和法師法術' },
        3: { name: '魔法之手', description: '使用法師之手戲法且可隱形' },
        9: { name: '魔法伏擊', description: '攻擊被你法術影響的生物獲得優勢' },
        13: { name: '多才', description: '對屬性檢定使用魔法誤導' },
        17: { name: '法術盜賊', description: '偷取其他施法者的法術知識' }
      }
    }
  ],
  
  sorcerer: [
    {
      name: '龍裔血統',
      description: '龍之魔法在你血脈中流淌，賦予你龍類力量。',
      features: {
        1: { name: '龍族祖先', description: '選擇龍類型並獲得對應元素抗性' },
        1: { name: '龍語', description: '學會龍語並在魅力檢定中獲得雙倍熟練' },
        6: { name: '元素親和', description: '對應元素法術傷害+魅力調整值' },
        14: { name: '龍翼', description: '獲得飛行速度' },
        18: { name: '龍之存在', description: '散發恐懼或魅惑光環' }
      }
    },
    {
      name: '狂野魔法',
      description: '你的魔法源自混沌原始力量，難以控制但極其強大。',
      features: {
        1: { name: '狂野魔法激增', description: '施法時可能觸發狂野魔法效果' },
        1: { name: '潮汐混沌', description: '攻擊檢定、屬性檢定或豁免骰可以獲得優勢' },
        6: { name: '彎曲運氣', description: '使用法術點影響其他生物骰子結果' },
        14: { name: '控制混沌', description: '狂野魔法激增時擲兩次選一個' },
        18: { name: '法術轟擊', description: '施法時可以額外產生狂野魔法效果' }
      }
    }
  ],
  
  warlock: [
    {
      name: '仙靈',
      description: '你與來自妖精荒野的古老仙靈締結契約。',
      features: {
        1: { name: '擴充法術列表', description: '獲得妖火、睡眠術、魅影幻象、支配野獸等' },
        1: { name: '妖精存在', description: '魅惑或恐懼一個生物' },
        6: { name: '迷霧逃脫', description: '受傷時變為隱形並傳送' },
        10: { name: '抵禦魅惑', description: '免疫魅惑並可以反轉魅惑' },
        14: { name: '黑暗譫妄', description: '讓生物陷入幻覺或沉睡' }
      }
    },
    {
      name: '魔王',
      description: '你與來自地獄位面的強大魔王締結契約。',
      features: {
        1: { name: '擴充法術列表', description: '獲得燃燒之手、命令術、蠍熱射線、火球術等' },
        1: { name: '黑暗祝福', description: '將生物降至0生命值時獲得臨時生命值' },
        6: { name: '地獄運氣', description: '對屬性檢定或豁免骰增加d10' },
        10: { name: '烈焰抗性', description: '獲得火焰傷害抗性並使敵人燃燒' },
        14: { name: '投入地獄', description: '將生物放逐至地獄並造成心靈傷害' }
      }
    },
    {
      name: '舊日支配者',
      description: '你與超越凡人理解的宇宙異界存在締結契約。',
      features: {
        1: { name: '擴充法術列表', description: '獲得虛亂心靈、偵測思想、飢餓黑暗觸手、支配野獸等' },
        1: { name: '異界心靈', description: '對心靈造成傷害並導致生物恐慌' },
        6: { name: '思維護盾', description: '獲得對心靈傷害抗性並反彈心靈傷害' },
        10: { name: '思維穿透', description: '讀取任何生物思想' },
        14: { name: '創造奴僕', description: '使無力生物成為永久僕從' }
      }
    }
  ],
  
  wizard: [
    {
      name: '防護學派',
      description: '防護學派專精於保護魔法和防禦法術。',
      features: {
        2: { name: '防護學者', description: '抄寫防護法術花費更少' },
        2: { name: '秘法護盾', description: '施放防護法術時創造魔法護盾' },
        6: { name: '投影護盾', description: '使用反應保護附近友軍' },
        10: { name: '改良防護', description: '增加防護法術持續時間' },
        14: { name: '法術抗性', description: '對法術豁免獲得優勢' }
      }
    },
    {
      name: '咒法學派',
      description: '咒法學派專精於召喚生物和創造物體。',
      features: {
        2: { name: '咒法學者', description: '抄寫咒法法術花費更少' },
        2: { name: '次等咒法', description: '召喚生物或創造物體作為獎勵動作' },
        6: { name: '仁慈傳送', description: '傳送時交換兩個生物位置' },
        10: { name: '專注召喚', description: '對召喚咒法法術專注無法被傷害打斷' },
        14: { name: '持久召喚', description: '召喚持續時間增加' }
      }
    },
    {
      name: '預言學派',
      description: '預言學派專精於探知魔法和預見未來。',
      features: {
        2: { name: '預言學者', description: '抄寫預言法術花費更少' },
        2: { name: '卜卦', description: '擲兩個d20並在之後使用' },
        6: { name: '專家預言', description: '恢復法術位當你施放預言法術' },
        10: { name: '第三隻眼', description: '獲得黑暗視覺、靈視、透視或理解語言' },
        14: { name: '高等卜卦', description: '每次擲三個預言骰' }
      }
    },
    {
      name: '惑控學派',
      description: '惑控學派專精於魅惑和支配他人心靈。',
      features: {
        2: { name: '惑控學者', description: '抄寫惑控法術花費更少' },
        2: { name: '催眠凝視', description: '魅惑附近生物' },
        6: { name: '本能魅惑', description: '使用反應重定向對你的攻擊' },
        10: { name: '分裂惑控', description: '惑控法術同時影響兩個目標' },
        14: { name: '改變記憶', description: '修改被魅惑生物的記憶' }
      }
    },
    {
      name: '塑能學派',
      description: '塑能學派專精於操控能量和製造破壞性效果。',
      features: {
        2: { name: '塑能學者', description: '抄寫塑能法術花費更少' },
        2: { name: '塑能法術', description: '塑能戲法造成額外傷害' },
        6: { name: '力能護盾', description: '塑能法術提供臨時生命值' },
        10: { name: '力能法術', description: '對一個塑能法術增加一個額外傷害骰' },
        14: { name: '超載', description: '塑能法術造成最大傷害' }
      }
    },
    {
      name: '幻術學派',
      description: '幻術學派專精於欺騙感官和製造幻象。',
      features: {
        2: { name: '幻術學者', description: '抄寫幻術法術花費更少' },
        2: { name: '改良次要幻術', description: '創建聲音和圖像幻象' },
        6: { name: '可塑幻象', description: '改變施放的幻術法術效果' },
        10: { name: '幻象自我', description: '創建幻象替身' },
        14: { name: '虛幻真實', description: '讓幻術變為部分真實' }
      }
    },
    {
      name: '死靈學派',
      description: '死靈學派專精於操控生死和不死生物。',
      features: {
        2: { name: '死靈學者', description: '抄寫死靈法術花費更少' },
        2: { name: '收割死者', description: '用法術殺死敵人時恢復生命值' },
        6: { name: '不死僕從', description: '創造更強大持久的不死生物' },
        10: { name: '不朽不死', description: '對不死免疫恐懼和魅惑效果' },
        14: { name: '命令不死', description: '使用魔法控制不死生物' }
      }
    },
    {
      name: '變化學派',
      description: '變化學派專精於改變物質和生物形態。',
      features: {
        2: { name: '變化學者', description: '抄寫變化法術花費更少' },
        2: { name: '次等煉金', description: '臨時改變物品材質' },
        6: { name: '變形師之石', description: '創建寶石獲得各種增益' },
        10: { name: '變形大師', description: '施放變形自己不需專注且可影響裝備' },
        14: { name: '大師變化師', description: '對變化法術獲得豁免優勢並可以忽略部分生命值' }
      }
    }
  ]
};