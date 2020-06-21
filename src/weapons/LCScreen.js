import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Button, Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

export default ({ route }) => {
    const theme = useTheme();
    const SECTIONS = [
      {
        image: require('../../assets/lc/pila.png'),
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
        image: require('../../assets/lc/strela_p.png'),
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
        image: require('../../assets/lc/jokr.png'),
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
        image: require('../../assets/lc/rpg7.png'),
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
      var selectButton = <></>;
      if (route.params.showSelector) {
        selectButton = <>
          <Text />
          <Text />
          <Button onPress={() => {route.params.buildSetter({subtitle: section.subtitle, title: section.title, image: section.image}); route.params.returnFunc(); }}>SELECT</Button>
        </>;
      }

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
          {selectButton}
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
};