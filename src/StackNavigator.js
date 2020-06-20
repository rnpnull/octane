import React from 'react';
import { TopNavigationAction, Icon } from '@ui-kitten/components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from "./DrawerNavigator";
import BattlePassScreen from "./BattlePassScreen";

const StackNav = createStackNavigator();

const AppStack = () => (
  <StackNav.Navigator screenOptions={{ headerShown: false }}>
    <StackNav.Screen name="Main" component={DrawerNavigator} />
    <StackNav.Screen name="Battle Pass" component={BattlePassScreen} />
  </StackNav.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
};
