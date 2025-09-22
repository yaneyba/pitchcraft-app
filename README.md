# PitchCraft - AI-Powered Pitch Generation

A modern React application that uses AI to generate compelling startup pitches, analyze them, and provide marketing suggestions.

## 🚀 Features

- **AI-Powered Pitch Generation**: Generate tailored pitches using Gemini AI
- **Multiple Pitch Styles**: Elevator pitches, investor decks, social media blurbs, and more
- **Pitch Analysis**: Get feedback from an AI venture capitalist
- **Marketing Suggestions**: Receive creative slogans and marketing angles
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI API**: Google Gemini AI
- **State Management**: React Hooks

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
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── api.ts          # API calls
│   │   └── helpers.ts      # Helper functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
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

3. **Set up API Key**
   - Open `src/utils/api.ts`
   - Replace the empty `apiKey` string with your actual Gemini API key:
   ```typescript
   const apiKey = "YOUR_ACTUAL_API_KEY_HERE";
   ```
   
   > **Note**: For production, use environment variables instead of hardcoding the API key.

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

### API Configuration

Update the API key in `src/utils/api.ts`:

```typescript
const apiKey = process.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";
```

For environment variables, create a `.env` file:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
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

## 🧩 Component Architecture

The app follows a modular component architecture:

- **App.tsx**: Main container with state management
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for shared logic
- **Utils**: API calls and helper functions
- **Types**: TypeScript interfaces and types

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

- [ ] User authentication and persistent storage
- [ ] Payment integration for credit purchases
- [ ] Pitch templates and customization
- [ ] Export pitches to PDF/PowerPoint
- [ ] Team collaboration features
- [ ] Analytics and pitch performance tracking

## 🆘 Troubleshooting

### Common Issues

**Build errors with TypeScript**: Make sure all dependencies are installed and TypeScript version is compatible.

**API errors**: Verify your Gemini API key is valid and has sufficient quota.

**Styling issues**: Ensure PostCSS and Tailwind CSS are properly configured.

## 📞 Support

For support, please open an issue on GitHub or contact [your-email@example.com].

---

Made with ❤️ using React, TypeScript, and Gemini AI

✨ Key Features
AI-Powered Pitch Generation: Creates high-quality pitches in various styles (Elevator, Investor, Social Media, etc.).

AI Pitch Analysis: Get feedback on your generated pitch from a simulated AI Venture Capitalist.

AI Marketing Angles: Brainstorm catchy slogans and marketing strategies for your app.

User Dashboard: View your credit balance and a history of all generated pitches.

Light & Dark Modes: A sleek, theme-able UI for user comfort.

Fully Mobile-Responsive: Looks and works great on any device.

🛠️ Tech Stack
Frontend: React with TypeScript

Styling: Tailwind CSS

AI: Google Gemini API

🏃‍♀️ Running Locally
(Instructions to be added)