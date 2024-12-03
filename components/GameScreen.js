// GameScreen.js
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Harry from './Harry';
import Ron from './Ron';
import Hermione from './Hermione';
import Voldemort from './Voldemort';
import DeathEater from './DeathEater';

const GameScreen = () => {
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [message, setMessage] = useState('');
  const [difficulty, setDifficulty] = useState('normal');

  const selectCharacter = (character) => {
    setPlayer(character);
    setMessage(`You selected ${character.name}.`);
    const enemyCharacter = new Voldemort(difficulty);
    setEnemy(enemyCharacter);
  };

  const startBattle = () => {
    if (player && enemy) {
      player.castSpell(0, enemy); // 玩家施放第一个咒语
      if (!enemy.isAlive()) {
        setMessage(`${enemy.name} is defeated! You win!`);
      } else {
        enemy.castSpell(0, player); // 敌人施放第一个咒语
        if (!player.isAlive()) {
          setMessage(`${player.name} is defeated! You lose!`);
        }
      }
    }
  };

  return (
    <View>
      <Text>{message}</Text>
      <Button title="Select Harry" onPress={() => selectCharacter(new Harry())} />
      <Button title="Select Ron" onPress={() => selectCharacter(new Ron())} />
      <Button title="Select Hermione" onPress={() => selectCharacter(new Hermione())} />
      <Button title="Start Battle" onPress={startBattle} />
    </View>
  );
};

export default GameScreen;