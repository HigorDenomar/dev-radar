import React from 'react';
import Routes from './src/routes';
import { StatusBar, YellowBox } from 'react-native';

// Ignorando aviso no App do Expo.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {

  // Modificando a StatusBar e chamando o componente de Rotas.
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  );
}