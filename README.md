# D&D 5E Character Creator

A comprehensive character creation tool for Dungeons & Dragons 5th Edition with integrated AI image prompt generator.

![D&D Character Creator](https://img.shields.io/badge/D%26D-5E-red)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)

## Features

### 🎲 Complete Character Creation
- **All 12 Basic D&D Classes**: Fighter, Rogue, Cleric, Wizard, Paladin, Barbarian, Ranger, Monk, Sorcerer, Bard, Druid, Warlock
- **Step-by-Step Process**: 6-step wizard for guided character building
- **Race Selection**: Multiple fantasy races with racial traits
- **Ability Scores**: Point-buy system for attribute allocation
- **Background & Details**: Personality, appearance, and backstory

### 🎯 Beginner-Friendly Features
- **Class Difficulty Ratings**: ⭐⭐ (Beginner) to ⭐⭐⭐⭐ (Advanced)
- **Interactive Questionnaire**: Get personalized class recommendations
- **Detailed Class Information**: Comprehensive tooltips and modal descriptions
- **Class Categories**: Organized by playstyle (Martial, Agile, Arcane, Divine)

### 🎨 AI Image Generation Integration
- **Automatic Prompt Generation**: Creates optimized prompts based on character data
- **Multiple Art Styles**: Fantasy Art, Realistic, Anime, Oil Painting, Digital Art, Comic Book
- **Platform Support**: 
  - Midjourney (with parameters)
  - DALL-E 3
  - Stable Diffusion (with negative prompts)
  - Leonardo.AI
- **Bilingual Prompts**: English and Traditional Chinese
- **Class-Specific Visual Data**: Each class has unique visual characteristics

### 📊 Class Information Database
Each class includes:
- Hit Die and primary/secondary abilities
- Core features and mechanics
- Subclass options (at level 3)
- Starting equipment
- Skill proficiencies
- Visual appearance data for AI generation
- Recommended playstyles

## Installation

```bash
# Clone the repository
git clone https://github.com/Cfsthk/dnd-character-creator.git

# Navigate to project directory
cd dnd-character-creator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Usage

### Creating a Character

1. **Choose Race**: Select from available fantasy races
2. **Choose Class**: Pick from 12 D&D classes with beginner guidance
3. **Allocate Abilities**: Distribute attribute points
4. **Select Background**: Choose character background
5. **Add Details**: Name, alignment, appearance, personality, backstory
6. **Review & Generate**: Download character data and generate AI prompts

### Using the AI Prompt Generator

1. Complete your character creation
2. On the Review step, click "展開" (Expand) in the AI Image Generation section
3. Select your preferred:
   - Art Style (Fantasy, Realistic, Anime, etc.)
   - Language (English recommended for most AI platforms)
   - Target Platform (Midjourney, DALL-E, etc.)
4. Copy the generated prompt
5. Paste into your chosen AI image generator

### Class Selection Helper

Click "🎯 不確定選哪個？幫我選擇職業" to:
1. Answer 3 simple questions about your playstyle
2. Get top 3 class recommendations with match percentages
3. See detailed explanations for each recommendation

## Technology Stack

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

## Project Structure

```
src/
├── components/
│   ├── ProgressBar.jsx       # Step progress indicator
│   ├── StepRace.jsx          # Race selection
│   ├── StepClass.jsx         # Class selection with helper
│   ├── StepAbilities.jsx     # Ability score allocation
│   ├── StepBackground.jsx    # Background selection
│   ├── StepDetails.jsx       # Character details
│   └── StepReview.jsx        # Review & AI prompt generator
├── data/
│   └── classes.js            # Complete D&D class database
├── utils/
│   └── promptGenerator.js    # AI prompt generation logic
├── App.jsx                   # Main application
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## AI Prompt Generation

The prompt generator intelligently combines:
- Character race and class
- Physical appearance and build
- Equipment and armor
- Poses and actions
- Background settings
- Lighting and atmosphere
- Art style preferences

Example generated prompt:
```
human Fighter, neutral, muscular and athletic build, confident battle-ready stance, 
wearing heavy plate armor, wielding longsword and shield, combat stance with weapon drawn, 
background: training grounds, dramatic side lighting emphasizing muscle definition, 
determined and battle-ready atmosphere, fantasy art style, high quality, detailed, 
professional artwork, best quality --ar 2:3 --v 6
```

## D&D Classes Overview

| Class | Icon | Difficulty | Hit Die | Role | Magic |
|-------|------|-----------|---------|------|-------|
| Fighter | ⚔️ | ⭐⭐ | d10 | Tank/DPS | No |
| Rogue | 🗡️ | ⭐⭐ | d8 | DPS/Utility | No |
| Cleric | ✨ | ⭐⭐⭐ | d8 | Support/Healer | Full |
| Wizard | 🔮 | ⭐⭐⭐⭐ | d6 | DPS/Control | Full |
| Paladin | 🛡️ | ⭐⭐⭐ | d10 | Tank/Support | Half |
| Barbarian | ⚡ | ⭐⭐ | d12 | Tank/DPS | No |
| Ranger | 🏹 | ⭐⭐⭐ | d10 | DPS/Utility | Half |
| Monk | 🥋 | ⭐⭐⭐ | d8 | DPS/Mobility | No |
| Sorcerer | 💫 | ⭐⭐⭐ | d6 | DPS | Full |
| Bard | 🎵 | ⭐⭐⭐ | d8 | Support/Utility | Full |
| Druid | 🌿 | ⭐⭐⭐⭐ | d8 | Support/Control | Full |
| Warlock | 👁️ | ⭐⭐⭐ | d8 | DPS | Pact |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own D&D campaigns!

## Credits

- Based on D&D 5E rules by Wizards of the Coast
- Built with React, Vite, and Tailwind CSS
- Icons from Lucide React

## Acknowledgments

This tool is designed to help players create D&D characters more easily and visualize them through AI art. It is a fan-made project and is not affiliated with or endorsed by Wizards of the Coast.

---

Made with ❤️ for the D&D community
