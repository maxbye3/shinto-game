# Shinto Game

A simple 2D browser-based game that explores Shinto themes and Japanese spiritual concepts. Navigate through a peaceful environment while learning about kami (神) and traditional Japanese religious practices.

## 🎮 Game Overview

The Shinto Game is an educational and contemplative experience that combines simple gameplay mechanics with cultural learning. Players control a character in a serene environment, moving around to discover interactive elements and learn about Shinto beliefs and practices.

## ✨ Features

- **Smooth Character Movement**: 8-directional movement using arrow keys or WASD
- **Interactive Controls**: On-screen buttons for movement and interaction
- **Educational Content**: Learn about Shinto concepts and kami through interactive messages
- **Collision Detection**: Interact with signs and objects in the game world
- **Responsive Design**: Works on different screen sizes
- **Sprite Animation**: Animated character movement with directional sprites

## 🎯 Objective

The main goal is to reach the green reset area while exploring the environment and learning about Shinto culture through interactive signs and messages.

## 🕹️ Controls

### Movement
- **Arrow Keys**: Move in 8 directions (up, down, left, right, and diagonals)
- **WASD Keys**: Alternative movement controls
- **On-screen Buttons**: Click the movement buttons for touch-friendly control

### Interaction
- **Cycle Message Button**: Cycle through different Shinto educational messages
- **Sign Interaction**: Approach the red sign to trigger educational content

## 🚀 Installation & Setup

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **No additional setup required** - the game runs entirely in the browser

### File Structure
```
shinto game/
├── index.html          # Main game interface
├── game.html          # Game canvas (iframe)
├── css/               # Stylesheets
│   ├── layout.css     # Main layout styles
│   ├── controls.css   # Control panel styles
│   ├── game.css       # Game area styles
│   ├── player.css     # Player character styles
│   ├── gameover.css   # Game over screen styles
│   └── sign.css       # Sign interaction styles
├── js/                # JavaScript modules
│   ├── characterMove.js # Character movement and animation
│   ├── collision.js    # Collision detection system
│   ├── sign.js         # Sign interaction and messages
│   ├── gameover.js     # Game over handling
│   └── iframe.js       # Iframe communication
├── img/               # Game assets
│   └── SpriteSheet.png # Character sprites
└── fonts/             # Custom fonts
    ├── ARCADECLASSIC.ttf
    ├── Exo2-ExtraLight.ttf
    └── PressStart2P.ttf
```

## 🎨 Technical Details

### Technologies Used
- **HTML5**: Game structure and layout
- **CSS3**: Styling and animations
- **Vanilla JavaScript**: Game logic and interactions
- **Canvas/Iframe**: Game rendering

### Key Components
- **Character Movement System**: Smooth 8-directional movement with sprite animation
- **Collision Detection**: Precise collision checking for interactive elements
- **Message System**: Educational content about Shinto beliefs
- **Responsive Layout**: Adapts to different screen sizes

### Game Mechanics
- **Player Position**: Tracks character position with boundary checking
- **Animation System**: Sprite-based character animation with directional sprites
- **Message Cycling**: Interactive educational content about Shinto concepts
- **Iframe Communication**: Seamless integration between main interface and game area

## 🌸 Educational Content

The game includes educational messages about Shinto concepts:

- **Kami (神)**: Sacred spirits and forces in Shinto belief
- **Torii Gates**: Traditional Japanese gateways to sacred spaces
- **Prayer Practices**: Understanding respectful connection with natural forces
- **Cultural Context**: Historical and spiritual significance of Shinto practices

## 🎯 Game Elements

- **Player Character**: Animated sprite with directional movement
- **Green Reset Area**: Goal destination for the player
- **Interactive Signs**: Red signs that trigger educational messages
- **Blue Message Boxes**: Display educational content about Shinto
- **Movement Controls**: Both keyboard and on-screen button options

## 🔧 Customization

The game is easily customizable:
- Modify `shintoMessages` array in `sign.js` to add new educational content
- Adjust character speed and animation in `characterMove.js`
- Change visual styles in the CSS files
- Add new interactive elements by extending the collision system

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 License

This project is open source and available for educational and personal use.

---

*Experience the peaceful world of Shinto through this simple yet meaningful browser game.* 