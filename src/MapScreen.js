import React from 'react';
import { Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import Gestures from 'react-native-easy-gestures';
import { Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
            source={require('../assets/map.jpg')}
            style={{ maxWidth: Dimensions.get('window').width }}
            resizeMode='contain'
          />
        </Gestures>
      </Layout>
    </>
  );
};
