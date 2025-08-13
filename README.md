# ChaiHub ☕

**ChaiHub** is a modern React Native mobile application that brings the best of local chai, coffee, and snacks right to your fingertips. Whether you're craving a refreshing cup of masala chai, a perfectly brewed coffee, or delicious snacks from nearby restaurants, ChaiHub makes ordering simple, fast, and enjoyable.

## ✨ Features

- **🍵 Diverse Menu**: Browse through a wide variety of chai, coffee, and snacks
- **🏪 Restaurant Discovery**: Find and explore nearby restaurants and cafes
- **🛒 Smart Cart Management**: Add items to cart with local SQLite storage
- **📱 Intuitive UI**: Beautiful, responsive design with smooth animations
- **🔍 Advanced Search**: Search products across different categories
- **📋 Order Management**: Track your orders and view order history
- **👤 User Profiles**: Personalized user experience with profile management
- **⚙️ Settings & Notifications**: Customize your app experience
- **🌟 Special Offers**: Discover deals and promotions

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Firebase** - Authentication and Firestore database
- **Redux Toolkit** - State management
- **React Navigation** - Navigation framework
- **React Native Paper** - Material Design components
- **SQLite** - Local cart storage
- **Lottie** - Smooth animations
- **React Native Vector Icons** - Beautiful icons

## 🚀 Quick Start

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kartik-A-Patil/ChaiHub.git
   cd ChaiHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (iOS only)
   ```bash
   bundle install
   bundle exec pod install
   ```

4. **Run the application**
   ```bash
   # For Android
   npm run android
   # or
   yarn android

   # For iOS  
   npm run ios
   # or
   yarn ios
   ```

## 📚 Development Guide

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator  
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Theme, Firestore)
├── data/              # Mock data and constants
├── navigation/        # Navigation configuration
├── screens/           # Screen components
├── services/          # External services (SQLite, etc.)
├── store/             # Redux store configuration
├── styles/            # Styling utilities
└── utils/             # Helper functions
```

### Development Notes

- **Fast Refresh**: Save your changes and see them instantly reflected in the app
- **Debugging**: 
  - Android: Press `R` twice or `Ctrl + M` for dev menu
  - iOS: Press `R` in simulator or `Cmd ⌘ + M`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please check out the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) guide.

## 📝 License

MIT

---

Made with ❤️ by [Kartik A Patil](https://github.com/Kartik-A-Patil)
