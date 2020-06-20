import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, TopNavigation, TopNavigationAction, Icon, useTheme, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RenderBackAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
};

export default ({ navigation }) => {
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
};
