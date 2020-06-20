import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, useTheme, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import ProgressBar from 'react-native-progress/Bar';

export default () => {
    const theme = useTheme();
    const SECTIONS = [
      {
        image: require('../../assets/smg/aug.png'),
        first: true,
        title: 'AUG',
        subtitle: 'Submachine Gun Alpha',
        content: 'A modular, fully automatic weapon configured for mobility and close range combat.',
        accuracy: '65',
        damage: '54',
        range: '58',
        firerate: '75',
        mobility: '63',
        control: '70'
      },
      {
        image: require('../../assets/smg/p90.png'),
        title: 'P90',
        subtitle: 'Submachine Gun Bravo',
        content: 'An automatic bullpup submachine gun. The unique top mounted magazine hold carries ample high velocity 5.7 x 28mm ammunition.',
        accuracy: '52',
        damage: '52',
        range: '52',
        firerate: '77',
        mobility: '70',
        control: '72'
      },
      {
        image: require('../../assets/smg/mp5.png'),
        title: 'MP5',
        subtitle: 'Submachine Gun Charlie',
        content: 'A fully automatic 9mm submachine gun.  A perfect balance of stability, mobility, and lethality.',
        accuracy: '63',
        damage: '52',
        range: '55',
        firerate: '73',
        mobility: '73',
        control: '75'
      },
      {
  
        image: require('../../assets/smg/uzi.png'),
        title: 'Uzi',
        subtitle: 'Submachine Gun Delta',
        content: 'A fully automatic open bolt submachine gun.  Simple, steady, effective.',
        accuracy: '56',
        damage: '50',
        range: '49',
        firerate: '70',
        mobility: '74',
        control: '72'
      },
      {
        image: require('../../assets/smg/pp19.png'),
        title: 'PP19 Bizon',
        subtitle: 'Submachine Gun Echo',
        content: 'Well-balanced automatic submachine gun with a high capacity helical magazine.',
        accuracy: '61',
        damage: '56',
        range: '53',
        firerate: '71',
        mobility: '68',
        control: '73'
      },
      {
        image: require('../../assets/smg/mp7.png'),
        title: 'MP7',
        subtitle: 'Submachine Gun Foxtrot',
        content: 'Compact by design, this fully automatic weapon has a high rate of fire and low recoil.',
        accuracy: '60',
        damage: '48',
        range: '47',
        firerate: '79',
        mobility: '75',
        control: '74'
      },
      {
        image: require('../../assets/smg/striker.png'),
        title: 'Striker 45',
        subtitle: 'Submachine Gun Golf',
        content: 'A hard hitting submachine gun chambered in .45 Auto that will shred at longer distances than other weapons in its class.  Moderate rate of fire keeps the gun in control while fully automatic.',
        accuracy: '66',
        damage: '61',
        range: '61',
        firerate: '70',
        mobility: '72',
        control: '70'
      },
      {
        image: require('../../assets/smg/fennec.png'),
        title: 'Fennec',
        subtitle: 'Submachine Gun Hotel',
        content: 'An aggressive full auto sub machine gun with buttery smooth recoil and a blazing fast rate of fire that is exceptional for strategic room clearing and holding down the front line.',
        accuracy: '69',
        damage: '49',
        range: '50',
        firerate: '82',
        mobility: '70',
        control: '71'
      }
    ];
  
    const [ activeSMGState, setActiveSMGState ] = useState([]);
  
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
            activeSections={activeSMGState}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={activeSections => { setActiveSMGState(activeSections); }}
          />
        </ScrollView>
      </Layout>
    );
};