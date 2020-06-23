import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Card, Text, Layout, Button, useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { PrimaryWeaponsScreen, SecondaryWeaponsScreen } from './WeaponsScreen';
import { Perk1Screen, Perk2Screen, Perk3Screen, LethalScreen, TacticalScreen } from './SelectorScreen';

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
  const [ primaryState, setPrimaryState ] = useState({subtitle: 'Primary Weapon', title: 'Select', image: require('../assets/ar/fal.png')});
  const [ secondaryState, setSecondaryState ] = useState({subtitle: 'Secondary Weapon', title: 'Select', image: require('../assets/hg/1911.png')});
  const [ perk1State, setPerk1State ] = useState({subtitle: 'Perk 1', title: 'Select', image: require('../assets/perks/double_time.png')});
  const [ perk2State, setPerk2State ] = useState({subtitle: 'Perk 2', title: 'Select', image: require('../assets/perks/overkill.png')});
  const [ perk3State, setPerk3State ] = useState({subtitle: 'Perk 3', title: 'Select', image: require('../assets/perks/amped.png')});
  const [ lethalState, setLethalState ] = useState({subtitle: 'Lethal', title: 'Select', image: require('../assets/lethals/frag.png')});
  const [ tacticalState, setTacticalState ] = useState({subtitle: 'Tactical', title: 'Select', image: require('../assets/tacticals/stim.png')});
  const theme = useTheme();

  return (
    <>
      <TopNavigation
        alignment='center'
        title='Loadout Builder'
        accessoryLeft={() => <RenderBackAction/>}
      />
      <ScrollView style={{ backgroundColor: theme['background-basic-color-1'] }}>
        <Layout style={{ flex: 1, alignItems: 'center' }}>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Primary', { setter: setPrimaryState } ); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{primaryState.subtitle}</Text>
            <Text category='h6'>{primaryState.title}</Text>
            <Image source={primaryState.image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Secondary', { setter: setSecondaryState } ); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{secondaryState.subtitle}</Text>
            <Text category='h6'>{secondaryState.title}</Text>
            <Image source={secondaryState.image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
            <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '30%', alignContent: 'center' }} onPress={() => { navigation.push('Perk1', { setter: setPerk1State } ); }}>
              <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'center' }}>{perk1State.subtitle}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{perk1State.title}</Text>
              <Image source={perk1State.image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
            </Card>
            <Text/>
            <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '30%' }} onPress={() => { navigation.push('Perk2', { setter: setPerk2State } ); }}>
              <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'center'  }}>{perk2State.subtitle}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{perk2State.title}</Text>
              <Image source={perk2State.image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
            </Card>
            <Text/>
            <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '30%' }} onPress={() => { navigation.push('Perk3', { setter: setPerk3State } ); }}>
              <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'center'  }}>{perk3State.subtitle}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{perk3State.title}</Text>
              <Image source={perk3State.image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
            </Card>
          </View>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Lethal', { setter: setLethalState } ); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{lethalState.subtitle}</Text>
            <Text category='h6'>{lethalState.title}</Text>
            <Image source={lethalState.image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Tactical', { setter: setTacticalState } ); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{tacticalState.subtitle}</Text>
            <Text category='h6'>{tacticalState.title}</Text>
            <Image source={tacticalState.image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Perk1'); }}>
            <Text category='h6' style={{ textAlign: 'center' }}>Test Perk Selector</Text>
            <Image source={require('../assets/perks/eod.png')} resizeMode='contain' style={{ width: 128, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Lethal'); }}>
            <Text category='h6' style={{ textAlign: 'center' }}>Test Lethal Selector</Text>
            <Image source={require('../assets/lethals/frag.png')} resizeMode='contain' style={{ width: 128, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Tactical'); }}>
            <Text category='h6' style={{ textAlign: 'center' }}>Test Tactical Selector</Text>
            <Image source={require('../assets/tacticals/stim.png')} resizeMode='contain' style={{ width: 128, height: 128, alignSelf: 'center' }}/>
          </Card>
          <Text/>
          <Text category='h1' style={{textAlign:'center'}}>WHERE'S YOUR DATA?</Text>
          <Text/>
          <Button onPress={() => { navigation.push('Attachment', { setter: setPrimaryState } ); }}>GET THE EXTENDO</Button>
        </Layout>
      </ScrollView>
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
    <StackNav.Screen name='Perk1' component={Perk1Screen} />
    <StackNav.Screen name='Perk2' component={Perk2Screen} />
    <StackNav.Screen name='Perk3' component={Perk3Screen} />
    <StackNav.Screen name='Lethal' component={LethalScreen} />
    <StackNav.Screen name='Tactical' component={TacticalScreen} />
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
