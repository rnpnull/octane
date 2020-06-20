import React from 'react';
import { SafeAreaView } from 'react-native';
import { BottomNavigation, BottomNavigationTab, useTheme, Icon } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadoutsScreen from './LoadoutsScreen';
import WeaponsScreen from './WeaponsScreen';
import MapScreen from './MapScreen';
import LookupScreen from './LookupScreen';
import RouletteScreen from './RouletteScreen';

const TabNav = createBottomTabNavigator();

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

export default ({ navigation }) => {
    const theme = useTheme();

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
        <NavigationContainer independent={true}>
          <TabNavigator/>
        </NavigationContainer>
      </SafeAreaView>
    );
};