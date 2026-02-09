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

## Live Demo

🎮 **[Try it now on GitHub Pages](https://cfsthk.github.io/dnd-character-creator/)**

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
2. On the Review step, click "展開" (Expand) to see AI prompts
3. Choose your preferred AI platform (Midjourney, DALL-E, Stable Diffusion, Leonardo)
4. Select an art style
5. Copy the generated prompt and use it in your chosen AI platform

## Technology Stack

- **Frontend**: React 18.3, Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Reactinis/Hero Icons
- **Data Storage**: Local State Management
- **Deployment**: GitHub Pages

## Project Structure

```
src/
├── components/ 
│   ├── App.jsx                # Main application component
│   ├── CharacterCreator.jsx    # Main wizard component
│   ├── StepRace.jsx            # Race selection
│   ├── StepClass.jsx           # Class selection with questionnaire
│   ├── StepAbilities.jsx       # Ability score allocation
│   ├── StepEquipment.jsx       # Equipment selection
│   ├── StepDetails.jsx         # Character details and background
│   └── StepReview.jsx          # Final review and AI prompt generator
├── data/
│   ├── classes.jsx             # Class information database
│   ├── visualData.jsx          # AI image generation data
│   └── backgrounds.jsx         # Character backgrounds
├── styles/
│   └── index.css               # Global styles
└── main.jsx                    # Application entry point
```

## Development Roadmap

- [x] Basic character creation workflow
- [x] All 12 basic classes with detailed information
- [x] Interactive questionnaire for class recommendation
- [x] AI image prompt generator with multiple styles
- [x] Bilingual support (EN/ZH)
- [ ] Subclass selection (Planned)
- [ ] Feat selection (Planned)
- [ ] Spell selection for spellcasters (Planned)
- [ ] PDF export of character sheet (Planned)
- [ ] Save/load characters to local storage (Planned)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License - See LICENSE file for details

## Acknowledgments

This project is not affiliated with Wizards of the Coast. D&D is a trademark of Wizards of the Coast.

---

✨ Created with ❤ by your friendly neighborhood DM (with some help from Claude)

Last updated: 2026-02-09 23:41 UTC