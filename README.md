# PitchCraft - AI-Powered Pitch Generation

A modern React application that uses AI to generate compelling startup pitches, analyze them, and provide marketing suggestions. Built with a robust DataProvider architecture for scalable data management.

## 🚀 Features

- **AI-Powered Pitch Generation**: Generate tailored pitches using Gemini AI with Google Search Grounding
- **URL Context Extraction**: Automatically extract context from URLs to enhance pitch quality
- **Multiple Pitch Styles**: Elevator pitches, investor decks, social media blurbs, and more
- **Pitch Analysis**: Get feedback from an AI venture capitalist
- **Marketing Suggestions**: Receive creative slogans and marketing angles
- **Pitch Export**: Download your pitch history as JSON for backup
- **User Dashboard**: View pitch history and manage credits
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Layered Architecture**: Clean separation of concerns with presentation, application, domain, infrastructure, and shared layers

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI API**: Google Gemini AI
- **Architecture**: DataProvider pattern with Factory design
- **State Management**: React Hooks + DataProvider abstraction
- **Storage**: LocalStorage with Memory fallback

## 📁 Project Structure

The project follows a **clean layered architecture** for better organization and maintainability:

```
pitchcraft-app/
├── src/
│   ├── presentation/           # Presentation Layer (UI)
│   │   ├── components/        # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── PitchForm.tsx
│   │   │   ├── PitchResult.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   ├── App.tsx            # Main application component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   │
│   ├── application/           # Application Layer
│   │   └── hooks/            # Custom React hooks
│   │       └── useDataProvider.tsx
│   │
│   ├── domain/               # Domain Layer (Business Logic)
│   │   ├── providers/        # Data providers
│   │   │   ├── DataProvider.ts
│   │   │   ├── DataProviderFactory.ts
│   │   │   ├── user.ts
│   │   │   ├── pitch.ts
│   │   │   ├── credits.ts
│   │   │   ├── ai.ts
│   │   │   ├── storage.ts
│   │   │   └── types.ts
│   │   └── types/            # Domain type definitions
│   │       └── index.ts
│   │
│   ├── infrastructure/       # Infrastructure Layer
│   │   └── api/             # External API integrations
│   │       └── gemini.ts    # Gemini AI API client
│   │
│   └── shared/              # Shared utilities
│       └── utils/
│           └── helpers.ts   # Helper functions
│
├── public/                  # Static assets
├── .env                     # Environment variables
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
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

# Required: Gemini API endpoint (using Gemini 2.0 Flash)
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
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

### Layered Architecture

The app follows **clean architecture principles** with clear separation of concerns:

**Presentation Layer** (`src/presentation/`)
- React components and UI logic
- Entry point (`main.tsx`) and main app component
- Handles user interaction and display

**Application Layer** (`src/application/`)
- Custom hooks that bridge UI and domain logic
- `useDataProvider` hook for accessing data providers

**Domain Layer** (`src/domain/`)
- Business logic and data providers
- DataProvider pattern with Factory design
- Type definitions and domain models
- Providers: User, Pitch, Credits, AI, Storage

**Infrastructure Layer** (`src/infrastructure/`)
- External service integrations
- Gemini AI API client with Google Search Grounding
- Environment variable configuration

**Shared Layer** (`src/shared/`)
- Common utilities and helpers
- Theme management and markdown formatting

### Key Benefits

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Layers can be tested independently with mock implementations
- **Scalability**: Easy to add new features to the appropriate layer
- **Maintainability**: Clear structure makes code easier to navigate and modify
- **Flexibility**: Swap implementations without affecting other layers

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

- [ ] Delete individual pitches from history
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