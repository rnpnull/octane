import React, { useState } from 'react';
import { Layout, Text, Card, useTheme, TopNavigation, TopNavigationAction, Button, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const RenderMenuAction = () => {
  const navigation = useNavigation();

  return (
    <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
  )
};

export default () => {
  const theme = useTheme();

  const drops = [
    "Military Base",
    "Quarry",
    "Dam",
    "TV Station",
    "Airport",
    "Stadium",
    "Lumber",
    "Storage Town",
    "Superstore",
    "Hospital",
    "Farmland",
    "Downtown",
    "Boneyard",
    "Train Station",
    "Promenade East",
    "Promenade West",
    "Hills",
    "Park",
    "Port",
    "Prison"
  ];

  const titles = [
    "Choke On It",
    "The Amish",
    "Judge, Jury and Executioner",
    "Prison Snake",
    "Field Tested",
    "EMP",
    "Lucky Duck",
    "Choose Wisely",
    "Respect the Dead",
    "Grounded",
    "Vehicular Manslaughter",
    "Stay Low",
    "Pick Your Shots",
    "Cop Mode",
    "Bird Watcher",
    "Slim Pickings",
    "Gephyrophobia",
    "Heads Up",
    "Viking Funeral",
    "No Cowards",
    "Afraid of Heights",
    "Spread Out",
    "Carpooling Sucks",
    "xxXMontageXxx",
    "Roadrage",
    "Guardian Angel",
    "Paraglider",
    "Blitz",
    "COD Master",
    "Silence is Golden",
    "Farmer",
    "Low Profile",
    "Vape Nation",
    "Grenadier",
    "This Is My Rifle",
    "Switch It Up",
    "Lounge Chair",
    "Suppressed Only",
    "Grave Robber",
    "Master of One",
    "Stay Quiet",
    "Hot Potato",
    "Entamaphobia",
    "Hey, That's Mine!",
    "Trigger-happy",
    "Silent but Deadly",
    "Death from Above",
    "Fly Swatter"
  ];

  const rules = [
    "No using gas masks.",
    "No using field upgrades.",
    "No buying back teammates.",
    "If sent to the gulag, you must lay down and crawl for the duration of your fight.",
    "No loadout drops, all guns must be found on the map.",
    "No killstreaks (ex: no UAV, cluster strikes, etc).",
    "No special rules.",
    "You can only loot one building (can loot bodies).",
    "No looting bodies.",
    "You can only loot the bottom floor of any building.",
    "If you are in a vehicle, you must attempt to run over any player you see.",
    "You can only move around when crouched, prone, or in a vehicle.",
    "You cannot carry more than one mag for each weapon at a time. Drop all extra ammo!",
    "You cannot shoot at someone until they start shooting at you.",
    "You must go to every loadout drop you see falling.",
    "You can only loot loadout drops, get a vehicle and find that drop.",
    "You are deathly afraid of bridges, you must swim or go around when you encounter a bridge",
    "You must fire at least 3 warning shots close to the enemy before hitting them.",
    "If you have a molotov, you must throw it on an enemy's body after downing them in order to send them to Valhalla.",
    "If you are standing and you are shot at, you cannot lay down or crouch until the enemy is dead or they leave.",
    "You can't go above the first story of any building.",
    "If in a group, all party members must pick separate locations to drop and then meet up.",
    "If in a group, everyone must drive their own vehicle.",
    "If you have a scoped weapon, you must do a 360 before you can shoot.",
    "Only vehicle kills, no guns or grenades.",
    "Follow the first player/squad you find and protect them from other without letting them know that you are there. You may not harm them!",
    "Jump in the middle of the plane path and pull your chute straight away. Glide to the furthest point away from the path.",
    "Jump as soon as possible and dive straight down, then hunt other players as fast as possible with your pistol.",
    "No-scoping only.",
    "No speaking to teammates, you can only communicate through in-game movements.",
    "Jump from the plane with the AFKs.",
    "While moving on foot, you can only crawl. (Once stationary, any stance is allowed.)",
    "You must throw a smoke grenade every time you see an enemy.",
    "Your only weapons are grenades and melee.",
    "The first gun you find is the only weapon you can use for the game.",
    "Every time you kill someone, you must swap the weapon used to kill them with one of their weapons.",
    "You can only get kills while shooting from a vehicle.",
    "Whichever suppressed weapon you find first is now the only weapon you can use.",
    "You can only keep items from your kills once the first circle closes.",
    "Only use one gun.",
    "You're only allowed to use supressed weapons.",
    "Every grenade you see, you must pick up and immediately throw.",
    "You cannot open doors.",
    "You (and your squad) have to find a vehicle and guard it with your lives. If an enemy takes it, you have to commit suicide.",
    "You can only use the full automatic on weapons that have it. Once you start firing, you can't stop until your mag is empty.",
    "Throwing knives only, no guns.",
    "Take the first helicopter you see and hunt people down with it.",
    "Your sole goal in life is to take down every helicopter you see."
  ];

  var carousel = React.createRef();

  const [ challenge, setChallenge ] = useState("Press DEPLOY for a drop location and challenge!");
  const [ title, setTitle ] = useState("");

  var titleText = <></>;
  if (title != "") {
    titleText = <>
      <Layout style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['background-basic-color-2'] }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
      </Layout>
      <Layout style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center', backgroundColor: theme['background-basic-color-2'] }}>
        <Text style={{ textAlign: 'center' }}>{challenge}</Text>
      </Layout>
    </>;
  } else {
    titleText = <Text style={{ textAlign: 'center' }}>{challenge}</Text>;
  }

  const _renderItem = ({item,index}) => (
    <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center'}}>{item}</Text>
    </Card>
  );

  const randomize = () => {
    carousel.snapToItem(Math.floor(Math.random() * drops.length));
    let randIndex = Math.floor(Math.random() * rules.length);
    setChallenge(rules[randIndex]);
    setTitle(titles[randIndex]);
  }

  return (
    <>
      <TopNavigation
        alignment='center'
        title='Roulette'
        accessoryLeft={() => <RenderMenuAction />}
      />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Layout style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
          <Card style={{ backgroundColor: theme['background-basic-color-2'], borderColor: theme['border-basic-color-2'], justifyContent: 'center', alignItems: 'center', width: '80%', height: 140 }}>
            {titleText}
          </Card>
          <Layout style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
            <Carousel
              layout={"default"}
              data={drops}
              ref={(c) => { carousel = c; }}
              sliderHeight={180}
              itemHeight={60}
              renderItem={_renderItem}
              loop
              scrollEnabled={false}
              vertical
            />
          </Layout>
          <Button onPress={() => { randomize(); }}>DEPLOY</Button>
        </Layout>
      </Layout>
    </>
  );
};