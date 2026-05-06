# Nocturnal — Teaser Screen

Expo (React Native) + JavaScript.

## Setup

1. Install dependencies
   npm install

2. Add fonts
   Download Host Grotesk from https://fonts.google.com/specimen/Host+Grotesk
   Place in assets/fonts/:
   - HostGrotesk-Regular.ttf
   - HostGrotesk-Medium.ttf
   - HostGrotesk-ExtraBold.ttf

3. Run
   npx expo start

## Notes
- Web: text blur renders via CSS filter
- iOS/Android: text blur is not natively supported in RN for Text components.
  The blurred effect is achieved via opacity. For full blur on native,
  wrap the Text in a third-party lib like @react-native-community/blur.
