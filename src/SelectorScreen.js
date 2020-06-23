import React, { useState } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Text, Layout, useTheme, TopNavigation, TopNavigationAction, Icon, Radio, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RenderBackAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
};

const BaseSelector = ({ items, setter, category }) => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [ activeState, setActiveState ] = useState([]);

    const _renderHeader = section => {
        return (
            <View style={{ paddingBottom: '4%', paddingLeft: '4%', paddingRight: '4%', backgroundColor: theme['background-basic-color-2'], borderTopWidth: (section.first ? 0 : 4), borderColor: theme['background-basic-color-1'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={section.image} resizeMode='contain' style={{ width: 48, height: 48 }}/>
                    <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
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
                <Button onPress={() => {setter({subtitle: category, title: section.title, image: section.image}); navigation.goBack(); }}>SELECT</Button>
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
        image: require('../assets/perks/double_time.png'),
        first: true,
        title: 'Double Time',
        content: 'Double the duration of Tactical Sprint. Increase crouch movement speed by 30%.',
    },
    {
        image: require('../assets/perks/kill_chain.png'),
        title: 'Kill Chain',
        content: 'Killstreak kills count towards your next killstreak. Only applies to killstreaks earned this life.',
    },
    {
        image: require('../assets/perks/scavenger.png'),
        title: 'Scavenger',
        content: 'Resupply ammo from dead players.',
    },
    {
        image: require('../assets/perks/eod.png'),
        title: 'E.O.D.',
        content: 'Take reduced damage from non-killstreak explosives and fire. Hack enemy Claymores, Proximity Mines, and C4.',
    },
    {
        image: require('../assets/perks/cold_blooded.png'),
        title: 'Cold-Blooded',
        content: 'Undetectable by AI targeting systems and thermal optic. Does not trigger High Alert warning.',
    },
    {
        image: require('../assets/perks/quick_fix.png'),
        title: 'Quick Fix',
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
    <BaseSelector items={perk1List} setter={route.params.setter} category='Perk 1'/>
  </>
);

const perk2List = [
    {
        image: require('../assets/perks/restock.png'),
        first: true,
        title: 'Restock',
        content: 'Recharge equipment over 25 seconds.',
    },
    {
        image: require('../assets/perks/hardline.png'),
        title: 'Hardline',
        content: 'Your killstreaks cost one less kill.',
    },
    {
        image: require('../assets/perks/high_alert.png'),
        title: 'High Alert',
        content: 'Your vision pulses when enemies outside of your view see you.',
    },
    {
        image: require('../assets/perks/ghost.png'),
        title: 'Ghost',
        content: 'Undetectable by UAVs, Radar Drones, and Heartbeat Sensors.',
    },
    {
        image: require('../assets/perks/pointsman.png'),
        title: 'Pointman',
        content: 'Change your killstreaks into Scorestreaks.',
    },
    {
        image: require('../assets/perks/overkill.png'),
        title: 'Overkill',
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
    <BaseSelector items={perk2List} setter={route.params.setter} category='Perk 2'/>
  </>
);

const perk3List = [
    {
        image: require('../assets/perks/tune_up.png'),
        first: true,
        title: 'Tune Up',
        content: 'Increase the charge rate of field upgrades by 40%.',
    },
    {
        image: require('../assets/perks/amped.png'),
        title: 'Amped',
        content: 'Faster weapon swap and rocket launcher reload speed.',
    },
    {
        image: require('../assets/perks/shrapnel.png'),
        title: 'Shrapnel',
        content: 'Spawn with an extra piece of lethal equipment. Explosive damage delays enemy health regeneration.',
    },
    {
        image: require('../assets/perks/battle.png'),
        title: 'Battle Hardened',
        content: 'Reduce strength of enemy flash, stun, EMP, and gas effects. Immune to Snapshot Grenades.',
    },
    {
        image: require('../assets/perks/spotter.png'),
        title: 'Spotter',
        content: 'See enemy equipment, field upgrades, and killstreaks through walls. Hack enemy Claymores, Proximity Mines, C4, and Trophy Systems.',
    },
    {
        image: require('../assets/perks/tracker.png'),
        title: 'Tracker',
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
    <BaseSelector items={perk3List} setter={route.params.setter} category='Perk 3'/>
  </>
);

const lethalsList = [
    {
        image: require('../assets/lethals/frag.png'),
        first: true,
        title: 'Frag Grenade',
        content: 'Cookable fragmentation grenade.',
    },
    {
        image: require('../assets/lethals/semtex.png'),
        title: 'Semtax',
        content: 'Timed sticky grenade.',
    },
    {
        image: require('../assets/lethals/molotov.png'),
        title: 'Molotov Cocktail',
        content: 'Improvised incendiary device that explodes on impact.',
    },
    {
        image: require('../assets/lethals/knife.png'),
        title: 'Throwing Knife',
        content: 'Retrievable knife that is lethal on impact.',
    },
    {
        image: require('../assets/lethals/claymore.png'),
        title: 'Claymore',
        content: 'Proximity-activated explosive mine.',
    },
    {
        image: require('../assets/lethals/mine.png'),
        title: 'Proximity Mine',
        content: 'Pressure-triggered explosive that deals heavy damage to vehicles.',
    },
    {
        image: require('../assets/lethals/c4.png'),
        title: 'C4',
        content: 'Large explosive that sticks to surfaces and can be detonated remotely with click (pressing lethal command again).',
    },
    {
        image: require('../assets/lethals/thermite.png'),
        title: 'Thermite',
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
    <BaseSelector items={lethalsList} setter={route.params.setter} category='Lethal'/>
  </>
);

const tacticalsList = [
    {
        image: require('../assets/tacticals/stun.png'),
        first: true,
        title: 'Stun Grenade',
        content: 'Slows victim\'s movement and aiming.',
    },
    {
        image: require('../assets/tacticals/smoke.png'),
        title: 'Smoke Grenade',
        content: 'Deploys a smoke screen that blocks vision and automated targeting systems.',
    },
    {
        image: require('../assets/tacticals/flash.png'),
        title: 'Flash Grenade',
        content: 'Blinds and deafens targets.',
    },
    {
        image: require('../assets/tacticals/stim.png'),
        title: 'Stim',
        content: 'Military stimulant that cauterizes combat wounds and refreshes Tactical Sprint.',
    },
    {
        image: require('../assets/tacticals/decoy.png'),
        title: 'Decoy Grenade',
        content: 'Counter-intel grenade that simulates fake gunfire and radar signatures that confuse the enemy.',
    },
    {
        image: require('../assets/tacticals/gas.png'),
        title: 'Gas Grenade',
        content: 'Explodes on impact with the ground, releasing a lingering cloud of tear gas that causes slowed movement, blurred vision, and coughing.',
    },
    {
        image: require('../assets/tacticals/snapshot.png'),
        title: 'Snapshot Grenade',
        content: 'Provides a momentary glimpse of enemies within the blast radius.',
    },
    {
        image: require('../assets/tacticals/heartbeat.png'),
        title: 'Heartbeat Sensor',
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
    <BaseSelector items={tacticalsList} setter={route.params.setter} category='Tactical'/>
  </>
);