# PitchCraft - AI-Powered Pitch Generation

A modern React application that uses AI to generate compelling startup pitches, analyze them, and provide marketing suggestions. Built with a robust DataProvider architecture for scalable data management.

## 🚀 Features

- **AI-Powered Pitch Generation**: Generate tailored pitches using Gemini AI
- **Multiple Pitch Styles**: Elevator pitches, investor decks, social media blurbs, and more
- **Pitch Analysis**: Get feedback from an AI venture capitalist
- **Marketing Suggestions**: Receive creative slogans and marketing angles
- **User Dashboard**: View pitch history and manage credits
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Sticky Footer Layout**: Professional UI with proper footer positioning
- **DataProvider Architecture**: Centralized data flow control with swappable implementations

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI API**: Google Gemini AI
- **Architecture**: DataProvider pattern with Factory design
- **State Management**: React Hooks + DataProvider abstraction
- **Storage**: LocalStorage with Memory fallback

## 📁 Project Structure

```
pitchcraft-app/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── providers/          # DataProvider architecture
│   │   ├── factory/        # DataProvider factory
│   │   │   └── DataProviderFactory.ts
│   │   ├── implementations/  # Provider implementations
│   │   │   ├── UserProvider.ts
│   │   │   ├── PitchProvider.ts
│   │   │   ├── CreditsProvider.ts
│   │   │   ├── AIProvider.ts
│   │   │   └── StorageProvider.ts
│   │   ├── hooks/          # React hooks for providers
│   │   │   ├── useDataProvider.ts
│   │   │   └── useProviders.ts
│   │   └── types/          # Provider type definitions
│   │       └── index.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── api.ts          # API calls with env variables
│   │   └── helpers.ts      # Helper functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- A Google Gemini API key (sign up at [Google AI Studio](https://makersuite.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pitchcraft-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
   ```
   
   > **Security**: Never commit your `.env` file to version control. The API key is automatically loaded from environment variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

### Building for Production

```bash
# Build the app for production
npm run build

# Preview the production build locally
npm run preview
```

## 🎯 Usage

1. **Landing Page**: Visit the app to see the landing page with features overview
2. **Login**: Click "Log In / Sign Up" to access the demo (you get 5 free credits)
3. **Generate Pitch**: 
   - Enter your app URL or description
   - Select a pitch style
   - Click "Generate Pitch" (costs 1 credit)
4. **Analyze Pitch**: Get AI feedback on your generated pitch (costs 1 credit)
5. **Marketing Suggestions**: Get creative marketing ideas (costs 1 credit)
6. **Dashboard**: View your pitch history and manage credits

## 🔧 Configuration

### Environment Variables

The app uses environment variables for secure configuration. Create a `.env` file in the root:

```env
# Required: Your Google Gemini AI API key
VITE_GEMINI_API_KEY=your_actual_api_key_here

# Optional: Custom Gemini API endpoint (defaults to Google's endpoint)
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

### DataProvider Configuration

The app uses a DataProvider architecture for flexible data management. Providers can be configured in `DataProviderFactory`:

```typescript
// Example: Switch between different provider implementations
const config = {
  storage: 'localStorage',  // or 'memory', 'api'
  ai: 'gemini',           // AI service provider
  environment: 'development' // or 'production', 'testing'
};
```

### Theme Configuration

The app supports automatic dark/light mode detection. Customize theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

## 🧩 Architecture Overview

### DataProvider Pattern

The app implements a DataProvider architecture for centralized data management:

- **DataProviderFactory**: Creates and configures provider instances
- **Provider Implementations**: Separate providers for User, Pitch, Credits, AI, and Storage
- **React Integration**: Custom hooks (`useDataProvider`, `useProviders`) for component integration
- **Flexible Configuration**: Easily switch between Local/Memory/API storage modes

### Component Architecture

- **App.tsx**: Main container with sticky footer layout
- **Components**: Modular, reusable UI components
- **Hooks**: Custom React hooks for shared logic
- **Providers**: Data abstraction layer with multiple implementations
- **Utils**: API calls with environment variable configuration
- **Types**: Comprehensive TypeScript interfaces

### Key Benefits

- **Separation of Concerns**: Business logic separated from UI components
- **Testability**: Mock providers available for testing
- **Scalability**: Easy to add new data sources or providers
- **Configuration-Driven**: Switch implementations without code changes

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- [ ] Database integration via DataProvider architecture
- [ ] Real-time collaboration features
- [ ] Advanced pitch analytics and A/B testing
- [ ] Multi-language AI support
- [ ] Team workspaces and permissions
- [ ] Export pitches to PDF/PowerPoint/Figma
- [ ] Payment integration for credit purchases
- [ ] Pitch performance tracking and optimization
- [ ] Custom AI model training
- [ ] Pitch template marketplace

### Architectural Roadmap

- [ ] Database Provider implementation (PostgreSQL/MongoDB)
- [ ] Caching layer with Redis Provider
- [ ] Offline-first architecture with sync capabilities
- [ ] GraphQL Provider for API optimization
- [ ] WebSocket Provider for real-time features

## 🆘 Troubleshooting

### Common Issues

**Build errors with TypeScript**: Make sure all dependencies are installed and TypeScript version is compatible.

**API errors**: 
- Verify your Gemini API key is set in the `.env` file
- Check that `VITE_GEMINI_API_KEY` environment variable is accessible
- Ensure API key has sufficient quota

**Styling issues**: Ensure PostCSS and Tailwind CSS are properly configured.

**DataProvider errors**: 
- Check provider configuration in `DataProviderFactory`
- Verify localStorage is available in your browser
- Use Memory providers as fallback for testing

**Footer not sticking**: The layout uses flexbox with `min-h-screen` - ensure parent containers maintain proper flex structure.

## 📞 Support

For support, please open an issue on GitHub or contact [your-email@example.com].

---

Made with ❤️ using React, TypeScript, Gemini AI, and modern architecture patterns

## ✨ Key Features

**AI-Powered Pitch Generation**: Creates high-quality pitches in various styles (Elevator, Investor, Social Media, etc.).

**AI Pitch Analysis**: Get feedback on your generated pitch from a simulated AI Venture Capitalist.

**AI Marketing Angles**: Brainstorm catchy slogans and marketing strategies for your app.

**User Dashboard**: View your credit balance and a history of all generated pitches.

**Light & Dark Modes**: A sleek, theme-able UI for user comfort with system preference detection.

**Fully Mobile-Responsive**: Looks and works great on any device with sticky footer layout.

**DataProvider Architecture**: Scalable data management with swappable implementations for easy testing and development.

## 🛠️ Tech Stack

**Frontend**: React 18 with TypeScript  
**Build Tool**: Vite with environment variable support  
**Styling**: Tailwind CSS with responsive design  
**AI Integration**: Google Gemini API with secure configuration  
**Architecture**: DataProvider pattern with Factory design  
**Storage**: Multi-tier storage with LocalStorage/Memory fallback  

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd pitchcraft-app
npm install

# Set up environment
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# Start development
npm run dev
```

Open http://localhost:5173 to view the application.