import React from 'react';
import { Share, SafeAreaView } from 'react-native';
import { Text, Card, useTheme, Layout } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as WebBrowser from 'expo-web-browser';
import * as StoreReview from 'expo-store-review';

import AppNavigator from "./AppNavigator";

const DrawerNav = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
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

export default () => {
  return (
    <NavigationContainer independent={true}>
      <AppDrawer/>
    </NavigationContainer>
  );
};
