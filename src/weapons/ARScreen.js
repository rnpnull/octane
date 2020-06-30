import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Button, Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

import { PRIMARY } from '../Equipment';

export default ({ route }) => {
    const theme = useTheme();

    const SECTIONS = [
      {
        first: true,
        id: 'KILO',
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
        id: 'FAL',
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
        id: 'M4A1',
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
        id: 'FR',
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
        id: 'ODEN',
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
        id: 'M13',
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
        id: 'SCAR',
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
        id: 'AK47',
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
        id: 'RAM',
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
        id: 'GRAU',
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
        id: 'AMAX',
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
            <Text category='h6'>{PRIMARY[section.id].title}</Text>
          </View>
          <Image source={PRIMARY[section.id].image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
        </View>
      );
    };
  
    const _renderContent = section => {
      var selectButton = <></>;
      if (route.params.showSelector) {
        selectButton = <>
          <Text />
          <Text />
          <Button onPress={() => {
            let tempState = route.params.buildState;
            if (route.params.overkill) {
              tempState.overkill = section.id;
            } else {
              tempState.primary = section.id;
            }       
            route.params.buildSetter(tempState); 
            route.params.returnFunc();
          }}>SELECT</Button>
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
            activeSections={activeARState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveARState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};