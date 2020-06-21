import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Button, Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

export default ({ route }) => {
    const theme = useTheme();
    const SECTIONS = [
      {
        image: require('../../assets/sg/model680.png'),
        first: true,
        title: 'Model 680',
        subtitle: 'Shotgun Alpha',
        content: 'A reliable, well-rounded 12 gauge pump-action shotgun.',
        accuracy: '60',
        damage: '82',
        range: '45',
        firerate: '45',
        mobility: '69',
        control: '65'
      },
      {
        image: require('../../assets/sg/r9.png'),
        title: 'R9-0 Shotgun',
        subtitle: 'Shotgun Bravo',
        content: 'Double barrels provide two rapid shots before each re-chamber.  ',
        accuracy: '55',
        damage: '79',
        range: '42',
        firerate: '53',
        mobility: '71',
        control: '75'
      },
      {
        image: require('../../assets/sg/725.png'),
        title: '725',
        subtitle: 'Shotgun Charlie',
        content: 'Break action shotgun with 2 round capacity.  A long back-bored barrel and cylindrical choke keeps spread tight and lethal over extended ranges.',
        accuracy: '70',
        damage: '85',
        range: '56',
        firerate: '50',
        mobility: '62',
        control: '60'
      },
      {
        image: require('../../assets/sg/origin12.png'),
        title: 'Origin 12 Shotgun',
        subtitle: 'Shotgun Delta',
        content: 'A semi-automatic shotgun with a large ammo capacity allows for continuous firing.  Effective at close range.',
        accuracy: '50',
        damage: '76',
        range: '38',
        firerate: '57',
        mobility: '76',
        control: '70'
      },
      {
        image: require('../../assets/sg/vlk.png'),
        title: 'VLK Rogue',
        subtitle: 'Shotgun Echo',
        content: 'An agile 12-gauge mag fed shotgun from VLK with extensive options to modify range, stability, and maneuverability.',
        accuracy: '57',
        damage: '78',
        range: '42',
        firerate: '51',
        mobility: '78',
        control: '68'
      },
    ];
  
    const [ activeSGState, setActiveSGState ] = useState([]);

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
            activeSections={activeSGState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveSGState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};