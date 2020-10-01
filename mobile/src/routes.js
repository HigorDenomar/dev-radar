import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer (

  // Criando as rotas de Main e Profile.
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar',

      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github',

      }
    },
  }, {

    // Setando configurações globais para as rotas.
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#7d40e7',

      }
    }
  })
);

export default Routes;