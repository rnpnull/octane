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
        id: 'DRAGUNOV',
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
        id: 'HDR',
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
        id: 'AX50',
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
            activeSections={activeSRState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveSRState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};