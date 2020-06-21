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

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RenderMenuAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  )
};

const RenderBackAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
};

const WeaponsTabNavigator = ({ type, setter }) => {
  const navigation = useNavigation();

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
        <TopNav.Screen name='Assault Rifles' component={ARScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='SMGs' component={SMGScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='Shotguns' component={SGScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='LMGs' component={LMGScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='Marksman Rifles' component={MRScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='Sniper Rifles' component={SRScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
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
        <TopNav.Screen name='Handguns' component={HGScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='Launchers' component={LCScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
        <TopNav.Screen name='Melee' component={MLScreen} initialParams={{ showSelector: true, buildSetter: setter, returnFunc: navigation.goBack }}/>
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
        <TopNav.Screen name='Assault Rifles' component={ARScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='SMGs' component={SMGScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Shotguns' component={SGScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='LMGs' component={LMGScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Marksman Rifles' component={MRScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Sniper Rifles' component={SRScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Handguns' component={HGScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Launchers' component={LCScreen} initialParams={{ showSelector: false }}/>
        <TopNav.Screen name='Melee' component={MLScreen} initialParams={{ showSelector: false }}/>
      </TopNav.Navigator>
    );
  }
}

export const PrimaryWeaponsScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Primary Weapon'
        accessoryLeft={() => <RenderBackAction />}
    />
    <NavigationContainer independent={true}>
      <WeaponsTabNavigator type='primary' setter={route.params.setter}/>
    </NavigationContainer>
  </>
);

export const SecondaryWeaponsScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Secondary Weapon'
        accessoryLeft={() => <RenderBackAction />}
    />
    <NavigationContainer independent={true}>
      <WeaponsTabNavigator type='secondary' setter={route.params.setter}/>
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
