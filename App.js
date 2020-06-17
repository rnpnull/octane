import React, { useState, useEffect } from 'react';
import { Share, StyleSheet, SafeAreaView, Dimensions, Image, Animated, View, ScrollView } from 'react-native';
import { Input, BottomNavigation, BottomNavigationTab, ApplicationProvider, Layout, Text, IconRegistry, Icon, TopNavigation, TopNavigationAction, TabBar, Tab, useTheme, Drawer, DrawerItem, Card, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as WebBrowser from 'expo-web-browser';
import * as StoreReview from 'expo-store-review';
import Carousel from 'react-native-snap-carousel';
import * as SecureStore from 'expo-secure-store';
import { api, platforms } from 'call-of-duty-api-es6';
import Gestures from 'react-native-easy-gestures';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';
// import MapScreen from "./src/MapScreen";

const TopNav = createMaterialTopTabNavigator();
const DrawerNav = createDrawerNavigator();
const StackNav = createStackNavigator();
const TabNav = createBottomTabNavigator();

console.disableYellowBox = true;

const GiftIcon = (props) => (
  <Icon {...props} name='gift-outline' width='32' height='32'/>
);

const BarChartIcon = (props) => (
  <Icon {...props} name='bar-chart-outline' width='32' height='32'/>
);

const MapIcon = (props) => (
  <Icon {...props} name='map-outline' width='32' height='32'/>
);

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline' width='32' height='32'/>
);

const ShuffleIcon = (props) => (
  <Icon {...props} name='shuffle-outline' width='32' height='32'/>
);

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
  const [ loadoutState, setLoadoutState ] = useState({subtitle: 'Primary Weapon', title: 'Select', image: require('./assets/ar/fal.png')});
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

const LoadoutsScreen = () => (
  <NavigationContainer independent={true}>
    <LoadoutStack/>
  </NavigationContainer>
);

const ARScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/ar/kilo141.png'),
      first: true,
      title: 'Kilo 141',
      subtitle: 'Assault Rifle Alpha',
      content: 'Fully automatic assault rifle with an ergonomic design that improves handling, and a steady fire rate helps stay on target.',
      accuracy: '70',
      damage: '73',
      range: '64',
      firerate: '66',
      mobility: '61',
      control: '73',
    },
    {
      image: require('./assets/ar/fal.png'),
      title: 'FAL',
      subtitle: 'Assault Rifle Bravo',
      content: 'A semi-automatic assault rifle with a high rate of fire for faster follow up shots.  ',
      accuracy: '74',
      damage: '77',
      range: '70',
      firerate: '65',
      mobility: '60',
      control: '68'
    },
    {
      image: require('./assets/ar/m4a1.png'),
      title: 'M4A1',
      subtitle: 'Assault Rifle Charlie',
      content: 'A fully automatic, all-purpose assault rifle.  Control your shots and this weapon can be very effective at range.',
      accuracy: '71',
      damage: '72',
      range: '63',
      firerate: '68',
      mobility: '63',
      control: '72'
    },
    {
      image: require('./assets/ar/fr556.png'),
      title: 'FR 5.56',
      subtitle: 'Assault Rifle Delta',
      content: 'A 3 round burst bullpup assault rifle.  A well placed burst can be extremely deadly at intermittent ranges.',
      accuracy: '73',
      damage: '75',
      range: '62',
      firerate: '72',
      mobility: '58',
      control: '72'
    },
    {
      image: require('./assets/ar/oden.png'),
      title: 'Oden',
      subtitle: 'Assault Rifle Echo',
      content: 'A fully automatic bullpup assault rifle maintains a slow cycle rate to help control hard hitting 12.7 x 55mm ammunition.',
      accuracy: '65',
      damage: '79',
      range: '68',
      firerate: '58',
      mobility: '56',
      control: '60'
    },
    {
      image: require('./assets/ar/m13.png'),
      title: 'M13',
      subtitle: 'Assault Rifle Foxtrot',
      content: 'Automatic assault rifle featuring a short stroke piston system that keeps the fire rate high and the recoil low.',
      accuracy: '72',
      damage: '71',
      range: '64',
      firerate: '70',
      mobility: '62',
      control: '75'
    },
    {
      image: require('./assets/ar/scar.png'),
      title: 'FN Scar 17',
      subtitle: 'Assault Rifle Golf',
      content: 'Large caliber, fully automatic assault rifle that provides high damage over long ranges.',
      accuracy: '69',
      damage: '76',
      range: '68',
      firerate: '63',
      mobility: '57',
      control: '65'
    },
    {
      image: require('./assets/ar/ak47.png'),
      title: 'AK-47',
      subtitle: 'Assault Rifle Hotel',
      content: 'Very reliable automatic assault rifle chambered in 7.62mm Soviet.  Large caliber ammunition requires skill to control recoil.',
      accuracy: '68',
      damage: '76',
      range: '67',
      firerate: '61',
      mobility: '59',
      control: '68'
    },
    {
      image: require('./assets/ar/ram.png'),
      title: 'RAM-7',
      subtitle: 'Assault Rifle India',
      content: 'A fully automatic bullpup assault rifle with a compact design that lends itself to close-quarter engagements.',
      accuracy: '70',
      damage: '72.5',
      range: '60',
      firerate: '69',
      mobility: '66',
      control: '74'
    },
    {
      image: require('./assets/ar/grau.png'),
      title: 'Grau 5.56',
      subtitle: 'Assault Rifle Juliet',
      content: 'This modular 5.56 weapon platform is lightweight and maneuverable, with exceptional range.  Precision engineering and world class aftermarket barrels give this weapon extreme potential.',
      accuracy: '70',
      damage: '72',
      range: '66',
      firerate: '65',
      mobility: '65',
      control: '71'
    },
    {
      image: require('./assets/ar/amax.png'),
      title: 'CR-56 AMAX',
      subtitle: 'Assault Rifle Kilo',
      content: 'This lightweight 7.62 x 39mm full auto assault rifle is compact and powerful.  Built exclusively for military use, the standard issue rifle is deadly at mid range combat and easily configured for a variety of assault tactics.',
      accuracy: '67',
      damage: '75',
      range: '65',
      firerate: '64',
      mobility: '61.5',
      control: '70'
    },
  ];

  const [ activeARState, setActiveARState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeARState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveARState(activeSections); console.log(activeARState[0]); }}
        />
      </ScrollView>
    </Layout>
  );
}

const SMGScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/smg/aug.png'),
      first: true,
      title: 'AUG',
      subtitle: 'Submachine Gun Alpha',
      content: 'A modular, fully automatic weapon configured for mobility and close range combat.',
      accuracy: '65',
      damage: '54',
      range: '58',
      firerate: '75',
      mobility: '63',
      control: '70'
    },
    {
      image: require('./assets/smg/p90.png'),
      title: 'P90',
      subtitle: 'Submachine Gun Bravo',
      content: 'An automatic bullpup submachine gun. The unique top mounted magazine hold carries ample high velocity 5.7 x 28mm ammunition.',
      accuracy: '52',
      damage: '52',
      range: '52',
      firerate: '77',
      mobility: '70',
      control: '72'
    },
    {
      image: require('./assets/smg/mp5.png'),
      title: 'MP5',
      subtitle: 'Submachine Gun Charlie',
      content: 'A fully automatic 9mm submachine gun.  A perfect balance of stability, mobility, and lethality.',
      accuracy: '63',
      damage: '52',
      range: '55',
      firerate: '73',
      mobility: '73',
      control: '75'
    },
    {

      image: require('./assets/smg/uzi.png'),
      title: 'Uzi',
      subtitle: 'Submachine Gun Delta',
      content: 'A fully automatic open bolt submachine gun.  Simple, steady, effective.',
      accuracy: '56',
      damage: '50',
      range: '49',
      firerate: '70',
      mobility: '74',
      control: '72'
    },
    {
      image: require('./assets/smg/pp19.png'),
      title: 'PP19 Bizon',
      subtitle: 'Submachine Gun Echo',
      content: 'Well-balanced automatic submachine gun with a high capacity helical magazine.',
      accuracy: '61',
      damage: '56',
      range: '53',
      firerate: '71',
      mobility: '68',
      control: '73'
    },
    {
      image: require('./assets/smg/mp7.png'),
      title: 'MP7',
      subtitle: 'Submachine Gun Foxtrot',
      content: 'Compact by design, this fully automatic weapon has a high rate of fire and low recoil.',
      accuracy: '60',
      damage: '48',
      range: '47',
      firerate: '79',
      mobility: '75',
      control: '74'
    },
    {
      image: require('./assets/smg/striker.png'),
      title: 'Striker 45',
      subtitle: 'Submachine Gun Golf',
      content: 'A hard hitting submachine gun chambered in .45 Auto that will shred at longer distances than other weapons in its class.  Moderate rate of fire keeps the gun in control while fully automatic.',
      accuracy: '66',
      damage: '61',
      range: '61',
      firerate: '70',
      mobility: '72',
      control: '70'
    },
    {
      image: require('./assets/smg/fennec.png'),
      title: 'Fennec',
      subtitle: 'Submachine Gun Hotel',
      content: 'An aggressive full auto sub machine gun with buttery smooth recoil and a blazing fast rate of fire that is exceptional for strategic room clearing and holding down the front line.',
      accuracy: '69',
      damage: '49',
      range: '50',
      firerate: '82',
      mobility: '70',
      control: '71'
    }
  ];

  const [ activeSMGState, setActiveSMGState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSMGState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveSMGState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const SGScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/sg/model680.png'),
      first: true,
      title: 'Model 680',
      subtitle: 'Shotgun Alpha',
      content: 'A reliable, well-rounded 12 gauge pump-action shotgun.',
      accuracy: '60',
      damage: '82',
      range: '45',
      firerate: '45',
      mobility: '69',
      control: '65'
    },
    {
      image: require('./assets/sg/r9.png'),
      title: 'R9-0 Shotgun',
      subtitle: 'Shotgun Bravo',
      content: 'Double barrels provide two rapid shots before each re-chamber.  ',
      accuracy: '55',
      damage: '79',
      range: '42',
      firerate: '53',
      mobility: '71',
      control: '75'
    },
    {
      image: require('./assets/sg/725.png'),
      title: '725',
      subtitle: 'Shotgun Charlie',
      content: 'Break action shotgun with 2 round capacity.  A long back-bored barrel and cylindrical choke keeps spread tight and lethal over extended ranges.',
      accuracy: '70',
      damage: '85',
      range: '56',
      firerate: '50',
      mobility: '62',
      control: '60'
    },
    {
      image: require('./assets/sg/origin12.png'),
      title: 'Origin 12 Shotgun',
      subtitle: 'Shotgun Delta',
      content: 'A semi-automatic shotgun with a large ammo capacity allows for continuous firing.  Effective at close range.',
      accuracy: '50',
      damage: '76',
      range: '38',
      firerate: '57',
      mobility: '76',
      control: '70'
    },
    {
      image: require('./assets/sg/vlk.png'),
      title: 'VLK Rogue',
      subtitle: 'Shotgun Echo',
      content: 'An agile 12-gauge mag fed shotgun from VLK with extensive options to modify range, stability, and maneuverability.',
      accuracy: '57',
      damage: '78',
      range: '42',
      firerate: '51',
      mobility: '78',
      control: '68'
    },
  ];

  const [ activeSGState, setActiveSGState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSGState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveSGState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const LMGScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/lmg/pkm.png'),
      first: true,
      title: 'PKM',
      subtitle: 'Light Machine Gun Alpha',
      content: 'A fully automatic light machine gun firing 7.62mm ammunition for high damage at a moderate fire rate.',
      accuracy: '75',
      damage: '77',
      range: '76',
      firerate: '68',
      mobility: '50',
      control: '65'
    },
    {
      image: require('./assets/lmg/sa87.png'),
      title: 'SA87',
      subtitle: 'Light Machine Gun Bravo',
      content: 'A fully automatic bullpup light machine gun.  Lower rate of fire and 5.56mm ammunition keep this rifle stable and effective at long ranges.',
      accuracy: '73',
      damage: '74',
      range: '77',
      firerate: '64',
      mobility: '53',
      control: '70'
    },
    {
      image: require('./assets/lmg/m91.png'),
      title: 'M91',
      subtitle: 'Light Machine Gun Charlie',
      content: 'Robust light machine gun sacrifices mobility for stability.  High caliber sustained fire will neutralize targets at long ranges.',
      accuracy: '74',
      damage: '76',
      range: '77',
      firerate: '66',
      mobility: '51',
      control: '65'
    },
    {
      image: require('./assets/lmg/mg34.png'),
      title: 'MG34',
      subtitle: 'Light Machine Gun Delta',
      content: 'Fully automatic weapon with a high rate of fire and punishing 7.92 Mauser ammunition.  Salvaged WW2 machine guns are still reliable and deadly on the battlefield.',
      accuracy: '72',
      damage: '76.5',
      range: '78',
      firerate: '70',
      mobility: '48',
      control: '72'
    },
    {
      image: require('./assets/lmg/holger.png'),
      title: 'Holger-26',
      subtitle: 'Light Machine Gun Echo',
      content: 'A versatile fully automatic 5.56mm light machine gun.  Modular design can be configured for a broad range of engagements.',
      accuracy: '73',
      damage: '73',
      range: '76',
      firerate: '70',
      mobility: '52',
      control: '72'
    },
    {
      image: require('./assets/lmg/bruen.png'),
      title: 'Bruen Mk9',
      subtitle: 'Light Machine Gun Foxtrot',
      content: 'This air-cooled open bolt 5.56 light machine gun features a competitive rate of fire and excellent stability that will dominate the mid to long range battlefield.',
      accuracy: '78',
      damage: '73',
      range: '74',
      firerate: '67',
      mobility: '52',
      control: '69'
    },
  ];

  const [ activeLMGState, setActiveLMGState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeLMGState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveLMGState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const MRScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/mr/ebr14.png'),
      first: true,
      title: 'EBR-14',
      subtitle: 'Marksman Rifle Alpha',
      content: 'A semi-automatic long range marksman rifle balances rate of fire with lethality.',
      accuracy: '77',
      damage: '76',
      range: '73',
      firerate: '57',
      mobility: '58',
      control: '72'
    },
    {
      image: require('./assets/mr/mk2.png'),
      title: 'MK2 Carbine',
      subtitle: 'Marksman Rifle Bravo',
      content: 'Highly accurate lever action rifle.  Will neutralize an enemy with one well placed round to the head or chest.',
      accuracy: '78',
      damage: '80',
      range: '68',
      firerate: '63',
      mobility: '66',
      control: '60'
    },
    {
      image: require('./assets/mr/kar.png'),
      title: 'Kar98k',
      subtitle: 'Marksman Rifle Charlie',
      content: 'Bolt action rifle chambered in 7.92 Mauser.  A WW2 relic that is still extremely lethal in the hands of a rebel marksman.',
      accuracy: '76',
      damage: '82',
      range: '75',
      firerate: '49',
      mobility: '53',
      control: '68'
    },
    {
      image: require('./assets/mr/crossbow.png'),
      title: 'Crossbow',
      subtitle: 'Marksman Rifle Delta',
      content: 'Silent and agile, this high-performance crossbow fires 20.0" bolts with exceptional lethality.  Exclusive customization, distinct functionality, and unique ammunition types put this weapon in a class of its own.  Standard 20.0" bolts are recoverable, and are undetectable by trophy systems.',
      accuracy: '70',
      damage: '85',
      range: '60',
      firerate: '30',
      mobility: '70',
      control: '64'
    },
    {
      image: require('./assets/mr/sks.png'),
      title: 'SKS',
      subtitle: 'Marksman Rifle Echo',
      content: 'Lightweight, semi-auto Carbine chambered in 7.62x39mm.  This hard hitting and agile Soviet rifle focuses on utility over accuracy.  It flaunts a faster fire rate than other weapons in its class, but a carefully placed round will eliminate the need for follow up shots entirely.  This classic DMR has seen a lot of battles, and its unique gunsmith configurations reflect a diverse service history.',
      accuracy: '75',
      damage: '76',
      range: '71',
      firerate: '62',
      mobility: '59',
      control: '73'
    },
  ];

  const [ activeMRState, setActiveMRState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeMRState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveMRState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const SRScreen = ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/sr/dragunov.png'),
      first: true,
      title: 'Dragunov',
      subtitle: 'Sniper Rifle Alpha',
      content: 'A soviet workhorse chambered in 7.62mm x 54mmR.  This gas-operated, semi-automatic sniper rifle allows for rapid follow-up shots.',
      accuracy: '81',
      damage: '78',
      range: '75',
      firerate: '47',
      mobility: '47',
      control: '65'
    },
    {
      image: require('./assets/sr/hdr.png'),
      title: 'HDR',
      subtitle: 'Sniper Rifle Bravo',
      content: 'An anti-material bolt action sniper rifle chambered in 12.7x108mm ammunition.  745 gr bullets have a lower muzzle velocity, but are devastating at very long ranges.',
      accuracy: '83',
      damage: '80',
      range: '83',
      firerate: '43',
      mobility: '43',
      control: '65'
    },
    {
      image: require('./assets/sr/ax50.png'),
      title: 'AX-50',
      subtitle: 'Sniper Rifle Charlie',
      content: 'Hard hitting, bolt action sniper rifle with .50 cal BMG ammunition.  Its tungsten sabot tipped bullets are fast and powerful, but require precise shots over long distances.',
      accuracy: '82',
      damage: '85',
      range: '79',
      firerate: '44',
      mobility: '44',
      control: '70'
    },
  ];

  const [ activeSRState, setActiveSRState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSRState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveSRState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const HGScreen = () => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/hg/x16.png'),
      first: true,
      title: 'X16',
      subtitle: 'Handgun Alpha',
      content: 'A semi-automatic pistol chambered in .45 ACP ammunition. A reliable fallback when you find yourself in close quarters.',
      accuracy: '55',
      damage: '57',
      range: '42',
      firerate: '58',
      mobility: '81',
      control: '70'
    },
    {
      image: require('./assets/hg/1911.png'),
      title: '1911',
      subtitle: 'Handgun Bravo',
      content: 'A well-rounded, semi-automatic sidearm with a moderate rate of fire.  Slightly more range than your average .45 ACP pistol.',
      accuracy: '55',
      damage: '59',
      range: '44',
      firerate: '55',
      mobility: '80',
      control: '69'
    },
    {
      image: require('./assets/hg/357.png'),
      title: '.357',
      subtitle: 'Handgun Charlie',
      content: 'Double action revolver firing .357 Magnum ammunition for powerful damage over extended ranges.',
      accuracy: '60',
      damage: '63',
      range: '56',
      firerate: '44',
      mobility: '76',
      control: '65'
    },
    {
      image: require('./assets/hg/m19.png'),
      title: 'M19',
      subtitle: 'Handgun Delta',
      content: 'Semi-automatic 9mm pistol, excellent stability with a rapid cycle rate.',
      accuracy: '57',
      damage: '55',
      range: '40',
      firerate: '60',
      mobility: '82',
      control: '72'
    },
    {
      image: require('./assets/hg/50gs.png'),
      title: '.50 GS',
      subtitle: 'Handgun Echo',
      content: 'The most powerful semi-automatic handgun available, deals heavy damage up to intermediate ranges.  ',
      accuracy: '54',
      damage: '65',
      range: '52',
      firerate: '53',
      mobility: '77',
      control: '60'
    },
    {
      image: require('./assets/hg/renetti.png'),
      title: 'Renetti',
      subtitle: 'Handgun Foxtrot',
      content: 'Well rounded semi-auto 9mm pistol.  This unassuming sidearm excels in close range combat, and features gunsmithing capabilities unique to the pistol class that permit a variety of engagement strategies.',
      accuracy: '60',
      damage: '55',
      range: '41',
      firerate: '62',
      mobility: '80',
      control: '70'
    }
  ];

  const [ activeHGState, setActiveHGState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeHGState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveHGState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const LCScreen = () => {
  const theme = useTheme();
  const SECTIONS = [
    {
      image: require('./assets/lc/pila.png'),
      first: true,
      title: 'PILA',
      subtitle: 'Launcher Alpha',
      content: 'Portable infrared surface-to-air missile launcher with a free-fire option.  Self-propelled missiles have a higher speed, and moderate explosive yield.',
      accuracy: '68',
      damage: '82',
      range: '90',
      firerate: '25',
      mobility: '47',
      control: '30'
    },
    {
      image: require('./assets/lc/strela_p.png'),
      title: 'Strela-P',
      subtitle: 'Launcher Bravo',
      content: '84mm recoilless launcher lobs an explosive projectile at a very high velocity.  The unguided armor piercing round has a low explosive yield, but is devastating against vehicles on contact.',
      accuracy: '70',
      damage: '88',
      range: '87',
      firerate: '30',
      mobility: '47',
      control: '35'
    },
    {
      image: require('./assets/lc/jokr.png'),
      title: 'JOKR',
      subtitle: 'Launcher Charlie',
      content: 'Fire and forget lock-on portable missile launcher with a large explosive yield.  Infrared guided missiles take a top-attack trajectory, ensuring destruction of heavily armored vehicles.',
      accuracy: '90',
      damage: '80',
      range: '95',
      firerate: '25',
      mobility: '42',
      control: '40'
    },
    {
      image: require('./assets/lc/rpg7.png'),
      title: 'RPG-7',
      subtitle: 'Launcher Delta',
      content: 'Unguided, self-propelled rocket launcher fires a slower projectile with a high-explosive yield.',
      accuracy: '56',
      damage: '86',
      range: '85',
      firerate: '30',
      mobility: '49',
      control: '40'
    }
  ];

  const [ activeLCState, setActiveLCState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeLCState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveLCState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

const MLScreen = () => {
  const theme = useTheme();
  const SECTIONS = [
    {
      first: true,
      image: require('./assets/ml/combat_knife.png'),
      title: 'Combat Knife',
      subtitle: 'Melee Alpha',
      content: 'A CQC tactical knife.  Standard military issue, employed for fast, quiet, and deadly wetwork.',
      accuracy: '0',
      damage: '90',
      range: '5',
      firerate: '0',
      mobility: '80',
      control: '30'
    },
    {
      image: require('./assets/ml/riot_shield.png'),
      title: 'Riot Shield',
      subtitle: 'Melee Beta',
      content: 'Ballistic-proof and explosive-resistant shield with increased melee damage.',
      accuracy: '0',
      damage: '90',
      range: '5',
      firerate: '0',
      mobility: '80',
      control: '0'
    },
    {
      image: require('./assets/ml/kali_stick.png'),
      title: 'Kali Sticks',
      subtitle: 'Melee Charlie',
      content: 'Dual wielding batons allow operators to approach their targets with great agility.  Sturdy, lightweight design enables rapid attacks for zoning your enemies.',
      accuracy: '0',
      damage: '84',
      range: '7.5',
      firerate: '0',
      mobility: '82',
      control: '35'
    }
  ];

  const [ activeMLState, setActiveMLState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{section.title}</Text>
        </View>
        <Image source={section.image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
        <Text>{section.content}</Text>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.accuracy}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.accuracy / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Damage</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.damage}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.damage / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Range</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.range}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.range / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Fire Rate</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.firerate}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.firerate / 100} width={null} borderRadius={0} />
          </View>
        </View>
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Mobility</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.mobility}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.mobility / 100} width={null} borderRadius={0} />
          </View>
          <View style={{ flex: 0.45 }}>
            <View style={{ paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>Control</Text>
              <Text style={{ fontWeight: 'bold' }}>{section.control}</Text>
            </View>
            <ProgressBar animated={false} color={theme['text-primary-color']} progress={section.control / 100} width={null} borderRadius={0} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeMLState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveMLState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
}

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

const PrimaryWeaponsScreen = () => (
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

const SecondaryWeaponsScreen = () => (
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

const WeaponsScreen = () => (
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

const MapScreen = () => {
  return (
    <>
      <TopNavigation
        alignment='center'
        title='Map'
        accessoryLeft={() => <RenderMenuAction />}
      />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: 'black' }}>
        <Gestures
          scalable={{
            min: 1,
            max: 2,
          }}
          rotatable={false}
        >
          <Image
            source={require('./assets/map.jpg')}
            style={{ maxWidth: Dimensions.get('window').width }}
            resizeMode='contain'
          />
        </Gestures>
      </Layout>
    </>
  );
}

const LookupScreen = () => {
  const theme = useTheme();
  const API = new api();

  const [ loginState, setLoginState ] = useState(false);
  const [ userState, setUserState ] = useState('');
  const [ passState, setPassState ] = useState('');
  const [ tagState, setTagState ] = useState('');

  const authUser = async (user, pass) => {
    console.log('Starting login attempt...');
    let status = false;
    await API.login(user, pass).then(async () => {
      console.log('Successfully logged in.');
      await API.getLoggedInUserInfo().then((data)  => {
        const unoAcc = data.identities.find( identity => identity.provider == 'uno' );
        setTagState(unoAcc.username);
        status = true;
        console.log('Got usertag.');
      }).catch((err) => {
        console.log('Couldn\'t get user info.');
      }).then(() => {
        console.log('Returning: ' + status);
      });
    }).catch((err) => {
      console.log('Error authenticating: ' + err);
    });
    return status;
  }

  useEffect(() => {
    const autoAuth = async () => {
      if (!loginState) {
        try {
          const user = await SecureStore.getItemAsync('user');
          const pass = await SecureStore.getItemAsync('pass');
          if (user && pass) {
            if (await authUser(user, pass)) {
              setUserState('');
              setPassState('');
              setLoginState(true);
            }
          }
        } catch (err) {
          console.log('Error running default login: ' + err);
        }
      }
    }
    autoAuth();
  }, []);

  const logIn = async () => {
    try {
      if (await authUser(userState, passState)) {
        await SecureStore.setItemAsync('user', userState);
        await SecureStore.setItemAsync('pass', passState);
        setUserState('');
        setPassState('');
        setLoginState(true);
      }
    } catch (err) {
      console.log('Error logging in: ' + err);
    }
  }

  const logOut = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      await SecureStore.deleteItemAsync('pass');
      setTagState('');
      setLoginState(false);
    } catch (err) {
      console.log('Error logging out: ' + err);
    }
  }

  var loginCard = <></>;
  if (loginState) {
    loginCard = <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center', width: '80%' }}>
      <Layout style={{ backgroundColor: theme['background-basic-color-2'], width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h5' style={{textAlign:'center'}}>Hello, {tagState}!</Text>
        <Text />
        <Button onPress={() => { logOut(); }}>SIGN OUT</Button>
      </Layout>
    </Card>;
  } else {
    loginCard = <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center', width: '80%' }}>
      <Layout style={{ backgroundColor: theme['background-basic-color-2'], width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{textAlign:'center'}}>Sign in to your Activision account below to lookup players!</Text>
        <Text />
        <Input
          style={{ backgroundColor: theme['background-basic-color-4'], borderColor: theme['border-basic-color-4'] }}
          value={userState}
          label='Email'
          secureTextEntry={false}
          onChangeText={nextValue => setUserState(nextValue)}
        />
        <Text/>
        <Input
          style={{ backgroundColor: theme['background-basic-color-4'], borderColor: theme['border-basic-color-4'] }}
          value={passState}
          label='Password'
          secureTextEntry={true}
          onChangeText={nextValue => setPassState(nextValue)}
        />
        <Text/>
        <Button onPress={() => { logIn(); }}>SIGN IN</Button>
      </Layout>
    </Card>;
  }

  return (
    <>
      <TopNavigation
        alignment='center'
        title='Lookup'
        accessoryLeft={() => <RenderMenuAction />}
      />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loginCard}
      </Layout>
    </>
  );
}

const RouletteScreen = () => {
  const theme = useTheme();

  const drops = [
    "Military Base",
    "Quarry",
    "Dam",
    "TV Station",
    "Airport",
    "Stadium",
    "Lumber",
    "Storage Town",
    "Superstore",
    "Hospital",
    "Farmland",
    "Downtown",
    "Boneyard",
    "Train Station",
    "Promenade East",
    "Promenade West",
    "Hills",
    "Park",
    "Port",
    "Prison"
  ];

  const titles = [
    "Choke On It",
    "The Amish",
    "Judge, Jury and Executioner",
    "Prison Snake",
    "Field Tested",
    "EMP",
    "Lucky Duck",
    "Choose Wisely",
    "Respect the Dead",
    "Grounded",
    "Vehicular Manslaughter",
    "Stay Low",
    "Pick Your Shots",
    "Cop Mode",
    "Bird Watcher",
    "Slim Pickings",
    "Gephyrophobia",
    "Heads Up",
    "Viking Funeral",
    "No Cowards",
    "Afraid of Heights",
    "Spread Out",
    "Carpooling Sucks",
    "xxXMontageXxx",
    "Roadrage",
    "Guardian Angel",
    "Paraglider",
    "Blitz",
    "COD Master",
    "Silence is Golden",
    "Farmer",
    "Low Profile",
    "Vape Nation",
    "Grenadier",
    "This Is My Rifle",
    "Switch It Up",
    "Lounge Chair",
    "Suppressed Only",
    "Grave Robber",
    "Master of One",
    "Stay Quiet",
    "Hot Potato",
    "Entamaphobia",
    "Hey, That's Mine!",
    "Trigger-happy",
    "Silent but Deadly",
    "Death from Above",
    "Fly Swatter"
  ];

  const rules = [
    "No using gas masks.",
    "No using field upgrades.",
    "No buying back teammates.",
    "If sent to the gulag, you must lay down and crawl for the duration of your fight.",
    "No loadout drops, all guns must be found on the map.",
    "No killstreaks (ex: no UAV, cluster strikes, etc).",
    "No special rules.",
    "You can only loot one building (can loot bodies).",
    "No looting bodies.",
    "You can only loot the bottom floor of any building.",
    "If you are in a vehicle, you must attempt to run over any player you see.",
    "You can only move around when crouched, prone, or in a vehicle.",
    "You cannot carry more than one mag for each weapon at a time. Drop all extra ammo!",
    "You cannot shoot at someone until they start shooting at you.",
    "You must go to every loadout drop you see falling.",
    "You can only loot loadout drops, get a vehicle and find that drop.",
    "You are deathly afraid of bridges, you must swim or go around when you encounter a bridge",
    "You must fire at least 3 warning shots close to the enemy before hitting them.",
    "If you have a molotov, you must throw it on an enemy's body after downing them in order to send them to Valhalla.",
    "If you are standing and you are shot at, you cannot lay down or crouch until the enemy is dead or they leave.",
    "You can't go above the first story of any building.",
    "If in a group, all party members must pick separate locations to drop and then meet up.",
    "If in a group, everyone must drive their own vehicle.",
    "If you have a scoped weapon, you must do a 360 before you can shoot.",
    "Only vehicle kills, no guns or grenades.",
    "Follow the first player/squad you find and protect them from other without letting them know that you are there. You may not harm them!",
    "Jump in the middle of the plane path and pull your chute straight away. Glide to the furthest point away from the path.",
    "Jump as soon as possible and dive straight down, then hunt other players as fast as possible with your pistol.",
    "No-scoping only.",
    "No speaking to teammates, you can only communicate through in-game movements.",
    "Jump from the plane with the AFKs.",
    "While moving on foot, you can only crawl. (Once stationary, any stance is allowed.)",
    "You must throw a smoke grenade every time you see an enemy.",
    "Your only weapons are grenades and melee.",
    "The first gun you find is the only weapon you can use for the game.",
    "Every time you kill someone, you must swap the weapon used to kill them with one of their weapons.",
    "You can only get kills while shooting from a vehicle.",
    "Whichever suppressed weapon you find first is now the only weapon you can use.",
    "You can only keep items from your kills once the first circle closes.",
    "Only use one gun.",
    "You're only allowed to use supressed weapons.",
    "Every grenade you see, you must pick up and immediately throw.",
    "You cannot open doors.",
    "You (and your squad) have to find a vehicle and guard it with your lives. If an enemy takes it, you have to commit suicide.",
    "You can only use the full automatic on weapons that have it. Once you start firing, you can't stop until your mag is empty.",
    "Throwing knives only, no guns.",
    "Take the first helicopter you see and hunt people down with it.",
    "Your sole goal in life is to take down every helicopter you see."
  ];

  var carousel = React.createRef();

  const [ challenge, setChallenge ] = useState("Press DEPLOY for a drop location and challenge!");
  const [ title, setTitle ] = useState("");

  var titleText = <></>;
  if (title != "") {
    titleText = <>
      <Layout style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['background-basic-color-2'] }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
      </Layout>
      <Layout style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['background-basic-color-2'] }}>
        <Text style={{ textAlign: 'center' }}>{challenge}</Text>
      </Layout>
    </>;
  } else {
    titleText = <Text style={{ textAlign: 'center' }}>{challenge}</Text>;
  }

  const _renderItem = ({item,index}) => (
    <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center'}}>{item}</Text>
    </Card>
  );

  const randomize = () => {
    carousel.snapToItem(Math.floor(Math.random() * drops.length));
    let randIndex = Math.floor(Math.random() * rules.length);
    setChallenge(rules[randIndex]);
    setTitle(titles[randIndex]);
  }

  return (
    <>
      <TopNavigation
        alignment='center'
        title='Roulette'
        accessoryLeft={() => <RenderMenuAction />}
      />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Layout style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center', width: '80%', height: 140 }}>
            {titleText}
          </Card>
          <Layout style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
            <Carousel
              layout={"default"}
              data={drops}
              ref={(c) => { carousel = c; }}
              sliderHeight={180}
              itemHeight={60}
              renderItem={_renderItem}
              loop
              scrollEnabled={false}
              vertical
            />
          </Layout>
          <Button onPress={() => { randomize(); }}>DEPLOY</Button>
        </Layout>
      </Layout>
    </>
  );
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Loadouts' icon={GiftIcon}/>
    <BottomNavigationTab title='Weapons' icon={BarChartIcon}/>
    <BottomNavigationTab title='Map' icon={MapIcon}/>
    <BottomNavigationTab title='Lookup' icon={SearchIcon}/>
    <BottomNavigationTab title='Roulette' icon={ShuffleIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <TabNav.Navigator tabBar={props => <BottomTabBar {...props} />} lazy={false}>
    <TabNav.Screen name='Loadouts' component={LoadoutsScreen}/>
    <TabNav.Screen name='Weapons' component={WeaponsScreen}/>
    <TabNav.Screen name='Map' component={MapScreen}/>
    <TabNav.Screen name='Lookup' component={LookupScreen}/>
    <TabNav.Screen name='Roulette' component={RouletteScreen}/>
  </TabNav.Navigator>
);

const AppNavigator = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
      <NavigationContainer independent={true}>
        <TabNavigator/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const DrawerContent = ({ navigation, state }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'], padding: 10 }}>
      <Layout style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection:'row', flexWrap:'wrap', maxHeight: 'auto', padding: '4%' }}>
        <Card style={{ width: '48%', aspectRatio:'1', backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'] }} onPress={() => { navigation.push('Battle Pass'); }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Battle Pass</Text>
        </Card>
        <Card style={{ width: '48%', aspectRatio:'1', backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'] }} onPress={() => { WebBrowser.openBrowserAsync('https://blog.activision.com/call-of-duty/2019-10/Call-of-Duty-Modern-Warfare-Landing-Site'); }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign:'center' }}>News</Text>
        </Card>
        <Card style={{ width: '48%', aspectRatio:'1', backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'] }} onPress={() => { StoreReview.requestReview(); }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign:'center' }}>Rate</Text>
        </Card>
        <Card style={{ width: '48%', aspectRatio:'1', backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'] }} onPress={() => { Share.share({ message: 'Download Octane: Warzone Companion now to build loadouts and map out your gameplay tactics! <URL>' }); }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign:'center' }}>Share</Text>
        </Card>
      </Layout>
    </SafeAreaView>
  );
}

const AppDrawer = () => (
  <DrawerNav.Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <DrawerNav.Screen name="Main" component={AppNavigator}/>
  </DrawerNav.Navigator>
);

const DrawerNavigator = () => (
  <NavigationContainer independent={true}>
    <AppDrawer/>
  </NavigationContainer>
);

const BattlePassScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
      <TopNavigation
        alignment='center'
        title='Battle Pass'
        accessoryLeft={() => <RenderBackAction/>}
      />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1' style={{textAlign:'center'}}>LOOT GALORE</Text>
      </Layout>
    </SafeAreaView>
  );
}

const AppStack = () => (
  <StackNav.Navigator screenOptions={{ headerShown: false }}>
    <StackNav.Screen name="Main" component={DrawerNavigator} />
    <StackNav.Screen name="Battle Pass" component={BattlePassScreen} />
  </StackNav.Navigator>
);

const StackNavigator = () => (
  <NavigationContainer>
    <AppStack/>
  </NavigationContainer>
);

export default function App() {
  const theme = useTheme();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <StackNavigator/>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({

});
