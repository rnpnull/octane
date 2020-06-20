import React from 'react';
import { useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ARScreen from './weapons/ARScreen';
import SMGScreen from './weapons/SMGScreen';
import SGScreen from './weapons/SGScreen';
import LMGScreen from './weapons/LMGScreen';
import MRScreen from './weapons/MRScreen';
import SRScreen from './weapons/SRScreen';
import HGScreen from './weapons/HGScreen';
import LCScreen from './weapons/LCScreen';
import MLScreen from './weapons/MLScreen';

const TopNav = createMaterialTopTabNavigator();

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const RenderMenuAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  )
};

const WeaponsTabNavigator = ({ type }) => {
  const theme = useTheme();
  if (type == 'primary') {
    return (
      <TopNav.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: theme['text-primary-color'],
          inactiveTintColor: theme['text-hint-color'],
          indicatorStyle: {  backgroundColor: theme['text-primary-color'], height: 4 },
          tabStyle: { width: 'auto' },
          labelStyle: { fontWeight: 'bold', maxWidth: 500 },
          style: { backgroundColor: theme['background-basic-color-1'] },
        }}
        style={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        <TopNav.Screen name='Assault Rifles' component={ARScreen} initialParams={{ selector: true }}/>
        <TopNav.Screen name='SMGs' component={SMGScreen} initialParams={{ selector: true }}/>
        <TopNav.Screen name='Shotguns' component={SGScreen} initialParams={{ selector: true }}/>
        <TopNav.Screen name='LMGs' component={LMGScreen} initialParams={{ selector: true }}/>
        <TopNav.Screen name='Marksman Rifles' component={MRScreen} initialParams={{ selector: true }}/>
        <TopNav.Screen name='Sniper Rifles' component={SRScreen} initialParams={{ selector: true }}/>
      </TopNav.Navigator>
    );
  } else if (type == 'secondary') {
    return (
      <TopNav.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: theme['text-primary-color'],
          inactiveTintColor: theme['text-hint-color'],
          indicatorStyle: {  backgroundColor: theme['text-primary-color'], height: 4 },
          tabStyle: { width: 'auto' },
          labelStyle: { fontWeight: 'bold', maxWidth: 500 },
          style: { backgroundColor: theme['background-basic-color-1'] },
        }}
        style={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        <TopNav.Screen name='Handguns' component={HGScreen}/>
        <TopNav.Screen name='Launchers' component={LCScreen}/>
        <TopNav.Screen name='Melee' component={MLScreen}/>
      </TopNav.Navigator>
    );
  } else {
    return (
      <TopNav.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: theme['text-primary-color'],
          inactiveTintColor: theme['text-hint-color'],
          indicatorStyle: {  backgroundColor: theme['text-primary-color'], height: 4 },
          tabStyle: { width: 'auto' },
          labelStyle: { fontWeight: 'bold', maxWidth: 500 },
          style: { backgroundColor: theme['background-basic-color-1'] },
        }}
        style={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        <TopNav.Screen name='Assault Rifles' component={ARScreen}/>
        <TopNav.Screen name='SMGs' component={SMGScreen}/>
        <TopNav.Screen name='Shotguns' component={SGScreen}/>
        <TopNav.Screen name='LMGs' component={LMGScreen}/>
        <TopNav.Screen name='Marksman Rifles' component={MRScreen}/>
        <TopNav.Screen name='Sniper Rifles' component={SRScreen}/>
        <TopNav.Screen name='Handguns' component={HGScreen}/>
        <TopNav.Screen name='Launchers' component={LCScreen}/>
        <TopNav.Screen name='Melee' component={MLScreen}/>
      </TopNav.Navigator>
    );
  }
}

export const PrimaryWeaponsScreen = () => (
  <>
    <TopNavigation
      alignment='center'
      title='Weapons'
      accessoryLeft={() => <RenderMenuAction />}
    />
    <NavigationContainer independent={true}>
      <WeaponsTabNavigator type='primary'/>
    </NavigationContainer>
  </>
);

export const SecondaryWeaponsScreen = () => (
  <>
    <TopNavigation
      alignment='center'
      title='Weapons'
      accessoryLeft={() => <RenderMenuAction />}
    />
    <NavigationContainer independent={true}>
      <WeaponsTabNavigator type='secondary'/>
    </NavigationContainer>
  </>
);

export default () => {
  return (
    <>
        <TopNavigation
            alignment='center'
            title='Weapons'
            accessoryLeft={() => <RenderMenuAction />}
        />
        <NavigationContainer independent={true}>
            <WeaponsTabNavigator />
        </NavigationContainer>
    </>
  );
};
