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
        id: 'EBR',
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
        id: 'MK2',
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
        id: 'KAR',
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
        id: 'XBOW',
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
        id: 'SKS',
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
            tempState.primary = section.id;           
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
            activeSections={activeMRState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveMRState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};