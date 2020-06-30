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
        id: 'PKM',
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
        id: 'SA87',
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
        id: 'M91',
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
        id: 'MG34',
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
        id: 'HOLGER',
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
        id: 'BRUEN',
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
            activeSections={activeLMGState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveLMGState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};