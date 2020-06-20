import React, { useState } from 'react';
import { Image } from 'react-native';
import { Card, Text, Layout, Button, useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { PrimaryWeaponsScreen, SecondaryWeaponsScreen } from './WeaponsScreen';

const TopNav = createMaterialTopTabNavigator();
const StackNav = createStackNavigator();

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

const PopularScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1' style={{textAlign:'center'}}>FIND POPULAR LOADOUTS</Text>
  </Layout>
);

const BuilderScreen = ({ navigation }) => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1' style={{textAlign:'center'}}>BUILD A LOADOUT</Text>
      <Text/>
      <Button onPress={() => { navigation.push('Builder'); }}>DO IT NOW</Button>
      <Text/>
      <Button onPress={() => { navigation.push('Primary'); }}>DEBUG PRIMARY</Button>
      <Text/>
      <Button onPress={() => { navigation.push('Secondary'); }}>DEBUG SECONDARY</Button>
    </Layout>
  );
}

const LoadoutTabNavigator = () => {
  const theme = useTheme();

  return (
  <>
    <TopNavigation
      alignment='center'
      title='Loadouts'
      accessoryLeft={() => <RenderMenuAction />}
    />
    <TopNav.Navigator
      tabBarOptions={{
        activeTintColor: theme['text-primary-color'],
        inactiveTintColor: theme['text-hint-color'],
        indicatorStyle: {  backgroundColor: theme['text-primary-color'], height: 4 },
        labelStyle: { fontWeight: 'bold' },
        style: { backgroundColor: theme['background-basic-color-1'] },
      }}
      style={{ backgroundColor: theme['background-basic-color-1'] }}
    >
      <TopNav.Screen name='Popular' component={PopularScreen}/>
      <TopNav.Screen name='Builder' component={BuilderScreen}/>
    </TopNav.Navigator>
  </>
  );
}

const AssemblyScreen = ({ navigation }) => {
  const [ loadoutState, setLoadoutState ] = useState({subtitle: 'Primary Weapon', title: 'Select', image: require('../assets/ar/fal.png')});
  const theme = useTheme();

  return (
    <>
      <TopNavigation
        alignment='center'
        title='Loadout Builder'
        accessoryLeft={() => <RenderBackAction/>}
      />
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{loadoutState.subtitle}</Text>
          <Text category='h6'>{loadoutState.title}</Text>
          <Image source={loadoutState.image} resizeMode='contain' style={{ width: 256, height: 128 }}/>
        </Card>
        <Text/>
        <Text category='h1' style={{textAlign:'center'}}>WHERE'S YOUR DATA?</Text>
        <Text/>
        <Button onPress={() => { navigation.push('Attachment', { setter: setLoadoutState } ); }}>GET THE EXTENDO</Button>
      </Layout>
    </>
  );
}

const AttachmentScreen = ({ navigation }) => (
  <>
    <TopNavigation
      alignment='center'
      title='Select Attachment'
      accessoryLeft={() => <RenderBackAction/>}
    />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1' style={{textAlign:'center'}}>50 IN THE CLIP OR 80 IN THE DRUM</Text>
    </Layout>
  </>
);

const LoadoutStack = () => (
  <StackNav.Navigator screenOptions={{ headerShown: false }}>
    <StackNav.Screen name='Main' component={LoadoutTabNavigator} />
    <StackNav.Screen name='Primary' component={PrimaryWeaponsScreen} />
    <StackNav.Screen name='Secondary' component={SecondaryWeaponsScreen} />
    <StackNav.Screen name='Builder' component={AssemblyScreen} />
    <StackNav.Screen name='Attachment' component={AttachmentScreen} />
  </StackNav.Navigator>
);

export default () => {
  return (
    <NavigationContainer independent={true}>
       <LoadoutStack/>
    </NavigationContainer>
  );
};
