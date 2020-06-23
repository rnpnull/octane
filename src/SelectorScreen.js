import React from 'react';
import { ScrollView } from 'react-native';
import { Layout, useTheme, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopNav = createMaterialTopTabNavigator();

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RenderBackAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )
};

const BaseSelector = ({ items }) => {
    const navigation = useNavigation();

    const theme = useTheme();

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView>
                {
                    items.map(item => {
                        <Card style={{ backgroundColor: theme['background-basic-color-2'], borderWidth: 0, width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <>
                                <Text category='h6'>{item.title}</Text>
                                <Text style={{ color: theme['text-hint-color'], fontSize: 14 }}>{item.content}</Text>
                            </>
                            <Image source={item.image} resizeMode='contain' style={{ width: 128, height: 128, alignSelf: 'center' }}/>
                        </Card>
                    })
                }
                <Text/>
            </ScrollView>
        </Layout>
    );
}

const perk1List = [
    {
        image: require('../../assets/perks/double_time.png'),
        first: true,
        title: 'Double Time',
        content: 'Double the duration of Tactical Sprint. Increase crouch movement speed by 30%.',
    },
    {
        image: require('../../assets/perks/kill_chain.png'),
        title: 'Kill Chain',
        content: 'Killstreak kills count towards your next killstreak. Only applies to killstreaks earned this life.',
    },
    {
        image: require('../../assets/perks/scavenger.png'),
        title: 'Scavenger',
        content: 'Resupply ammo from dead players.',
    },
    {
        image: require('../../assets/perks/eod.png'),
        title: 'E.O.D.',
        content: 'Take reduced damage from non-killstreak explosives and fire. Hack enemy Claymores, Proximity Mines, and C4.',
    },
    {
        image: require('../../assets/perks/cold_blooded.png'),
        title: 'Cold-Blooded',
        content: 'Undetectable by AI targeting systems and thermal optic. Does not trigger High Alert warning.',
    },
    {
        image: require('../../assets/perks/quick_fix.png'),
        title: 'Quick Fix',
        content: 'Killing players immediately starts health regeneration. Capturing and holding objectives increases your health regeneration rate.',
    }
  ];


export const Perk1Screen = () => (
  <>
    <TopNavigation
        alignment='center'
        title='Perk 1'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={perk1List}/>
  </>
);

const perk2List = [
    {
        image: require('../../assets/perks/restock.png'),
        first: true,
        title: 'Restock',
        content: 'Recharge equipment over 25 seconds.',
    },
    {
        image: require('../../assets/perks/hardline.png'),
        title: 'Hardline',
        content: 'Your killstreaks cost one less kill.',
    },
    {
        image: require('../../assets/perks/high_alert.png'),
        title: 'High Alert',
        content: 'Your vision pulses when enemies outside of your view see you.',
    },
    {
        image: require('../../assets/perks/ghost.png'),
        title: 'Ghost',
        content: 'Undetectable by UAVs, Radar Drones, and Heartbeat Sensors.',
    },
    {
        image: require('../../assets/perks/pointman.png'),
        title: 'Pointman',
        content: 'Change your killstreaks into Scorestreaks.',
    },
    {
        image: require('../../assets/perks/overkill.png'),
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
    <BaseSelector items={perk2List}/>
  </>
);

const perk3List = [
    {
        image: require('../../assets/perks/tune_up.png'),
        first: true,
        title: 'Tune Up',
        content: 'Increase the charge rate of field upgrades by 40%.',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Amped',
        content: 'Faster weapon swap and rocket launcher reload speed.',
    },
    {
        image: require('../../assets/perks/shrapnel.png'),
        title: 'Shrapnel',
        content: 'Spawn with an extra piece of lethal equipment. Explosive damage delays enemy health regeneration.',
    },
    {
        image: require('../../assets/perks/battle_hardened.png'),
        title: 'Battle Hardened',
        content: 'Reduce strength of enemy flash, stun, EMP, and gas effects. Immune to Snapshot Grenades.',
    },
    {
        image: require('../../assets/perks/spotter.png'),
        title: 'Spotter',
        content: 'See enemy equipment, field upgrades, and killstreaks through walls. Hack enemy Claymores, Proximity Mines, C4, and Trophy Systems.',
    },
    {
        image: require('../../assets/perks/tracker.png'),
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
    <BaseSelector items={perk3List}/>
  </>
);

const lethalsList = [
    {
        image: require('../../assets/perks/tune_up.png'),
        first: true,
        title: 'Frag Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Semtax',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Molotov Cocktail',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Throwing Knife',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Claymore',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Proximity Mine',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'C4',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Thermite',
        content: '',
    }
  ];

export const LethalScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Lethal'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={lethalsList}/>
  </>
);

const tacticalsList = [
    {
        image: require('../../assets/perks/tune_up.png'),
        first: true,
        title: 'Stun Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Smoke Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Flash Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Stim',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Decoy Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Gas Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Snapshot Grenade',
        content: '',
    },
    {
        image: require('../../assets/perks/amped.png'),
        title: 'Heartbeat Sensor',
        content: '',
    }
  ];

export const TacticalScreen = ({ route }) => (
  <>
    <TopNavigation
        alignment='center'
        title='Tactical'
        accessoryLeft={() => <RenderBackAction />}
    />
    <BaseSelector items={tacticalsList}/>
  </>
);