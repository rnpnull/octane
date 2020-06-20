import React, { useState, useEffect } from 'react';
import { Input, Layout, Text, Card, useTheme, TopNavigation, TopNavigationAction, Button, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { api, platforms } from 'call-of-duty-api-es6';
import * as SecureStore from 'expo-secure-store';

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const RenderMenuAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  )
};

export default () => {
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
};