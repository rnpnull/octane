import React, { useState } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Text, Layout, useTheme, TopNavigation, TopNavigationAction, Icon, Radio, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

import { PERK1, PERK2, PERK3, LETHAL, TACTICAL } from './Equipment';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RenderBackAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
};

const BaseSelector = ({ items, state, setter, category, assets }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [ activeState, setActiveState ] = useState([]);

    const _renderHeader = section => {
        return (
            <View style={{ paddingBottom: '4%', paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={assets[section.id].image} resizeMode='contain' style={{ width: 48, height: 48 }}/>
                    <Text style={{ fontWeight: 'bold' }}>{assets[section.id].title}</Text>
                    <Radio></Radio>
            </View>
        );
    };

    const _renderContent = section => {
        var selectButton = <></>;
        if (true) {
            selectButton = <>
                <Text />
                <Text />
                <Button onPress={() => {
                    let tempState = state;
                    tempState[category] = section.id;           
                    setter(tempState); 
                    navigation.goBack();
                }}>SELECT</Button>
            </>;
        }


        return (
            <View style={{ padding: '4%', backgroundColor: theme['background-basic-color-1'] }}>
                <Text>{section.content}</Text>
                {selectButton}
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: theme['background-basic-color-1'] }}>
            <Layout style={{ flex: 1, alignItems: 'center' }}>
                <Accordion
                    sections={items}
                    activeSections={activeState}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={activeSections => { setActiveState(activeSections); }}
                />
            </Layout>
        </ScrollView>
    );
}

const perk1List = [
    {
        first: true,
        id: 'DOUBLE',
        content: 'Double the duration of Tactical Sprint. Increase crouch movement speed by 30%.',
    },
    {
        id: 'KILL',
        content: 'Killstreak kills count towards your next killstreak. Only applies to killstreaks earned this life.',
    },
    {
        id: 'SCAVENGER',
        content: 'Resupply ammo from dead players.',
    },
    {
        id: 'EOD',
        content: 'Take reduced damage from non-killstreak explosives and fire. Hack enemy Claymores, Proximity Mines, and C4.',
    },
    {
        id: 'COLD',
        content: 'Undetectable by AI targeting systems and thermal optic. Does not trigger High Alert warning.',
    },
    {
        id: 'QUICK',
        content: 'Killing players immediately starts health regeneration. Capturing and holding objectives increases your health regeneration rate.',
    }
  ];


export const Perk1Screen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Perk 1'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={perk1List} state={route.params.state} setter={route.params.setter} category='perk1' assets={PERK1}/>
  </>
);

const perk2List = [
    {
        first: true,
        id: 'RESTOCK',
        content: 'Recharge equipment over 25 seconds.',
    },
    {
        id: 'HARDLINE',
        content: 'Your killstreaks cost one less kill.',
    },
    {
        id: 'ALERT',
        content: 'Your vision pulses when enemies outside of your view see you.',
    },
    {
        id: 'GHOST',
        content: 'Undetectable by UAVs, Radar Drones, and Heartbeat Sensors.',
    },
    {
        id: 'POINTMAN',
        content: 'Change your killstreaks into Scorestreaks.',
    },
    {
        id: 'OVERKILL',
        content: 'Carry two primary weapons.',
    }
  ];

export const Perk2Screen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Perk 2'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={perk2List} state={route.params.state} setter={route.params.setter} category='perk2' assets={PERK2}/>
  </>
);

const perk3List = [
    {
        first: true,
        id: 'TUNE',
        content: 'Increase the charge rate of field upgrades by 40%.',
    },
    {
        id: 'AMPED',
        content: 'Faster weapon swap and rocket launcher reload speed.',
    },
    {
        id: 'SHRAPNEL',
        content: 'Spawn with an extra piece of lethal equipment. Explosive damage delays enemy health regeneration.',
    },
    {
        id: 'BATTLE',
        content: 'Reduce strength of enemy flash, stun, EMP, and gas effects. Immune to Snapshot Grenades.',
    },
    {
        id: 'SPOTTER',
        content: 'See enemy equipment, field upgrades, and killstreaks through walls. Hack enemy Claymores, Proximity Mines, C4, and Trophy Systems.',
    },
    {
        id: 'TRACKER',
        content: 'Enemies leave behind a footprint trail. See markers at enemy death locations and hide the death markers of enemies you kill.',
    }
  ];

export const Perk3Screen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Perk 3'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={perk3List} state={route.params.state} setter={route.params.setter} category='perk3' assets={PERK3}/>
  </>
);

const lethalsList = [
    {
        first: true,
        id: 'FRAG',
        content: 'Cookable fragmentation grenade.',
    },
    {
        id: 'SEMTEX',
        content: 'Timed sticky grenade.',
    },
    {
        id: 'MOLOTOV',
        content: 'Improvised incendiary device that explodes on impact.',
    },
    {
        id: 'KNIFE',
        content: 'Retrievable knife that is lethal on impact.',
    },
    {
        id: 'CLAYMORE',
        content: 'Proximity-activated explosive mine.',
    },
    {
        id: 'MINE',
        content: 'Pressure-triggered explosive that deals heavy damage to vehicles.',
    },
    {
        id: 'C4',
        content: 'Large explosive that sticks to surfaces and can be detonated remotely with click (pressing lethal command again).',
    },
    {
        id: 'THERMITE',
        content: 'Burns fiercely for a short while after impact. Sticks to all surface.',
    }
  ];

export const LethalScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Lethal'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={lethalsList} state={route.params.state} setter={route.params.setter} category='lethal' assets={LETHAL}/>
  </>
);

const tacticalsList = [
    {
        first: true,
        id: 'STUN',
        content: 'Slows victim\'s movement and aiming.',
    },
    {
        id: 'SMOKE',
        content: 'Deploys a smoke screen that blocks vision and automated targeting systems.',
    },
    {
        id: 'FLASH',
        content: 'Blinds and deafens targets.',
    },
    {
        id: 'STIM',
        content: 'Military stimulant that cauterizes combat wounds and refreshes Tactical Sprint.',
    },
    {
        id: 'DECOY',
        content: 'Counter-intel grenade that simulates fake gunfire and radar signatures that confuse the enemy.',
    },
    {
        id: 'GAS',
        content: 'Explodes on impact with the ground, releasing a lingering cloud of tear gas that causes slowed movement, blurred vision, and coughing.',
    },
    {
        id: 'SNAPSHOT',
        content: 'Provides a momentary glimpse of enemies within the blast radius.',
    },
    {
        id: 'HEARTBEAT',
        content: 'A tablet that displays rough information about nearby enemies.',
    }
  ];

export const TacticalScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Tactical'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={tacticalsList} state={route.params.state} setter={route.params.setter} category='tactical' assets={TACTICAL}/>
  </>
);