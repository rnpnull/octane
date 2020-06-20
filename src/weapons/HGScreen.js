import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

export default () => {
    const theme = useTheme();
  const SECTIONS = [
    {
      image: require('../../assets/hg/x16.png'),
      first: true,
      title: 'X16',
      subtitle: 'Handgun Alpha',
      content: 'A semi-automatic pistol chambered in .45 ACP ammunition. A reliable fallback when you find yourself in close quarters.',
      accuracy: '55',
      damage: '57',
      range: '42',
      firerate: '58',
      mobility: '81',
      control: '70'
    },
    {
      image: require('../../assets/hg/1911.png'),
      title: '1911',
      subtitle: 'Handgun Bravo',
      content: 'A well-rounded, semi-automatic sidearm with a moderate rate of fire.  Slightly more range than your average .45 ACP pistol.',
      accuracy: '55',
      damage: '59',
      range: '44',
      firerate: '55',
      mobility: '80',
      control: '69'
    },
    {
      image: require('../../assets/hg/357.png'),
      title: '.357',
      subtitle: 'Handgun Charlie',
      content: 'Double action revolver firing .357 Magnum ammunition for powerful damage over extended ranges.',
      accuracy: '60',
      damage: '63',
      range: '56',
      firerate: '44',
      mobility: '76',
      control: '65'
    },
    {
      image: require('../../assets/hg/m19.png'),
      title: 'M19',
      subtitle: 'Handgun Delta',
      content: 'Semi-automatic 9mm pistol, excellent stability with a rapid cycle rate.',
      accuracy: '57',
      damage: '55',
      range: '40',
      firerate: '60',
      mobility: '82',
      control: '72'
    },
    {
      image: require('../../assets/hg/50gs.png'),
      title: '.50 GS',
      subtitle: 'Handgun Echo',
      content: 'The most powerful semi-automatic handgun available, deals heavy damage up to intermediate ranges.  ',
      accuracy: '54',
      damage: '65',
      range: '52',
      firerate: '53',
      mobility: '77',
      control: '60'
    },
    {
      image: require('../../assets/hg/renetti.png'),
      title: 'Renetti',
      subtitle: 'Handgun Foxtrot',
      content: 'Well rounded semi-auto 9mm pistol.  This unassuming sidearm excels in close range combat, and features gunsmithing capabilities unique to the pistol class that permit a variety of engagement strategies.',
      accuracy: '60',
      damage: '55',
      range: '41',
      firerate: '62',
      mobility: '80',
      control: '70'
    }
  ];

  const [ activeHGState, setActiveHGState ] = useState([]);

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
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeHGState}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={activeSections => { setActiveHGState(activeSections); }}
        />
      </ScrollView>
    </Layout>
  );
};