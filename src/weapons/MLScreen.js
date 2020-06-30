import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Button, Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

import { SECONDARY } from '../Equipment';

export default ({ route }) => {
  const theme = useTheme();
  const SECTIONS = [
    {
      first: true,
      id: 'KNIFE',
      subtitle: 'Melee Alpha',
      content: 'A CQC tactical knife.  Standard military issue, employed for fast, quiet, and deadly wetwork.',
      accuracy: '0',
      damage: '90',
      range: '5',
      firerate: '0',
      mobility: '80',
      control: '30'
    },
    {
      id: 'RIOT',
      subtitle: 'Melee Beta',
      content: 'Ballistic-proof and explosive-resistant shield with increased melee damage.',
      accuracy: '0',
      damage: '90',
      range: '5',
      firerate: '0',
      mobility: '80',
      control: '0'
    },
    {
      id: 'KALI',
      subtitle: 'Melee Charlie',
      content: 'Dual wielding batons allow operators to approach their targets with great agility.  Sturdy, lightweight design enables rapid attacks for zoning your enemies.',
      accuracy: '0',
      damage: '84',
      range: '7.5',
      firerate: '0',
      mobility: '82',
      control: '35'
    }
  ];

  const [ activeMLState, setActiveMLState ] = useState([]);

  const _renderHeader = section => {
    return (
      <View style={{ paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{section.subtitle}</Text>
          <Text category='h6'>{SECONDARY[section.id].title}</Text>
        </View>
        <Image source={SECONDARY[section.id].image} resizeMode='contain' style={{ flex: 0.4, height: 100 }}/>
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
          tempState.secondary = section.id;           
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
          activeSections={activeMLState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveMLState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
};