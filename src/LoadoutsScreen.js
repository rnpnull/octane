import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Card, Text, Layout, useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

import { PrimaryWeaponsScreen, SecondaryWeaponsScreen } from './WeaponsScreen';
import { Perk1Screen, Perk2Screen, Perk3Screen, LethalScreen, TacticalScreen } from './SelectorScreen';
import { PRIMARY, SECONDARY, PERK1, PERK2, PERK3, LETHAL, TACTICAL } from './Equipment';

const TopNav = createMaterialTopTabNavigator();
const StackNav = createStackNavigator();

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const AddIcon = (props) => (
  <Icon {...props} name='plus-circle-outline'/>
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

const RenderAddAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={AddIcon} onPress={() => navigation.push('Builder', { buildId: uuid.v1() })} />
  )
};
const PopularScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1' style={{textAlign:'center'}}>FIND POPULAR LOADOUTS</Text>
  </Layout>
);

const BuilderScreen = ({ navigation }) => {
  const theme = useTheme();
  const [ loadoutState, setLoadoutState ] = useState([]);
  const [ initState, setInitState ] = useState(false);

  const initList = async () => {
    let keys = await AsyncStorage.getAllKeys()
    let savedLoadouts = [];
    for (const key of keys) {
      let temp = JSON.parse(await AsyncStorage.getItem(key));
      temp['id'] = key;
      savedLoadouts.push(temp);
    }
    setLoadoutState(savedLoadouts);
  }
  
  if (!initState) {
    initList();
    setInitState(true);
  }

  useEffect(() => {
    console.log(JSON.stringify(loadoutState));
  });
  
  return (
    <ScrollView style={{ backgroundColor: theme['background-basic-color-1'] }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { loadoutState.length > 0 ?
        loadoutState.map(loadout =>
        <>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Builder', { buildId: loadout.id }); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{loadout.id}</Text>
            <Text category='h6'>{PRIMARY[loadout.primary].title}</Text>
            <Image source={PRIMARY[loadout.primary].image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
        </>) : <Text category='h1' style={{textAlign:'center'}}>BUILD A LOADOUT</Text>}
        <Text/>
      </Layout>
    </ScrollView>
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
      accessoryRight={() => <RenderAddAction />}
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

const AssemblyScreen = ({ navigation, route }) => {
  const [ loadoutState, setLoadoutState ] = useState({ primary: 'AMAX', overkill: 'FENNEC', secondary: 'RENETTI', perk1: 'DOUBLE', perk2: 'OVERKILL', perk3: 'AMPED', lethal: 'FRAG', tactical: 'STIM' });
  const [ initState, setInitState ] = useState(false);
  const theme = useTheme();

  const updateState = ( data ) => {
    setLoadoutState(JSON.parse(JSON.stringify(data)));
  }

  const initLoadout = async () => {
    const savedLoadout = await AsyncStorage.getItem(route.params.buildId);
    if (savedLoadout) {
      setLoadoutState(JSON.parse(savedLoadout));
    } else {
      AsyncStorage.setItem(route.params.buildId, JSON.stringify(loadoutState));
    }
  }
  
  if (!initState) {
    initLoadout();
    setInitState(true);
  }

  useEffect(() => {
    if (initState) {
      AsyncStorage.setItem(route.params.buildId, JSON.stringify(loadoutState));
    }
  });

  return (
    <>
      <TopNavigation
        alignment='center'
        title='XxQuickscope360xX'
        accessoryLeft={() => <RenderBackAction/>}
      />
      <ScrollView style={{ backgroundColor: theme['background-basic-color-1'] }}>
        <Layout style={{ flex: 1, alignItems: 'center' }}>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Primary', { state: loadoutState, setter: updateState, overkill: false } ); }}>
            <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>Primary Weapon</Text>
            <Text category='h6'>{PRIMARY[loadoutState.primary].title}</Text>
            <Image source={PRIMARY[loadoutState.primary].image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
          </Card>
          { loadoutState.perk2 == 'OVERKILL' ?
          <>
            <Text/>
            <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Primary', { state: loadoutState, setter: updateState, overkill: true } ); }}>
              <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>Overkill Weapon</Text>
              <Text category='h6'>{PRIMARY[loadoutState.overkill].title}</Text>
              <Image source={PRIMARY[loadoutState.overkill].image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
            </Card>
          </>
          :
          <>
            <Text/>
            <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Secondary', { state: loadoutState, setter: updateState } ); }}>
              <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>Secondary Weapon</Text>
              <Text category='h6'>{SECONDARY[loadoutState.secondary].title}</Text>
              <Image source={SECONDARY[loadoutState.secondary].image} resizeMode='contain' style={{ width: 256, height: 128, alignSelf: 'center' }}/>
            </Card>
          </>
          }
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Perk1', { state: loadoutState, setter: updateState } ); }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
              <Image source={PERK1[loadoutState.perk1].image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
              <View style={{ flex: .8 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'right' }}>Perk 1</Text>
                <Text category='h6' style={{ textAlign: 'right' }}>{PERK1[loadoutState.perk1].title}</Text>
              </View>
            </View>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Perk2', { state: loadoutState, setter: updateState } ); }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
              <Image source={PERK2[loadoutState.perk2].image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
              <View style={{ flex: .8 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'right' }}>Perk 2</Text>
                <Text category='h6' style={{ textAlign: 'right' }}>{PERK2[loadoutState.perk2].title}</Text>
              </View>
            </View>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Perk3', { state: loadoutState, setter: updateState } ); }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
              <Image source={PERK3[loadoutState.perk3].image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
              <View style={{ flex: .8 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 14, textAlign: 'right' }}>Perk 3</Text>
                <Text category='h6' style={{ textAlign: 'right' }}>{PERK3[loadoutState.perk3].title}</Text>
              </View>
            </View>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Lethal', { state: loadoutState, setter: updateState } ); }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
              <View style={{ flex: .8 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>Lethal</Text>
                <Text category='h6'>{LETHAL[loadoutState.lethal].title}</Text>
              </View>
              <Image source={LETHAL[loadoutState.lethal].image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
            </View>
          </Card>
          <Text/>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%' }} onPress={() => { navigation.push('Tactical', { state: loadoutState, setter: updateState } ); }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
              <View style={{ flex: .8 }}>
                <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>Tactical</Text>
                <Text category='h6'>{TACTICAL[loadoutState.tactical].title}</Text>
              </View>
              <Image source={TACTICAL[loadoutState.tactical].image} resizeMode='contain' style={{ width: 64, height: 64, alignSelf: 'center' }}/>
            </View>
          </Card>
          <Text/>
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
