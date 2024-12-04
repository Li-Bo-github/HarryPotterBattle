import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Harry from './Harry';
import Ron from './Ron';
import Hermione from './Hermione';
import Voldemort from './Voldemort';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const GameScreen = () => {
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [logs, setLogs] = useState([]);
  const [difficulty, setDifficulty] = useState('normal');
  const [playerTurn, setPlayerTurn] = useState(true);
  const [round, setRound] = useState(1); // Track the current round
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [logs]);

  const selectCharacter = (character) => {
    setPlayer(character);
    setLogs([`You selected ${character.name}. The battle begins!`]);
    setEnemy(new Voldemort(difficulty));
  };

  const handlePlayerSpell = (spellIndex) => {
    if (playerTurn && player && enemy) {
      const spell = player.spells[spellIndex];
      if (spell) {
        const damage = spell.castSpell(player, enemy);

        setLogs((prevLogs) => [
          ...prevLogs,
          `${player.name} casts ${spell.name} on ${enemy.name} for ${damage} damage!`
        ]);

        if (!enemy.isAlive()) {
          setLogs((prevLogs) => [
            ...prevLogs,
            `${enemy.name} is defeated! You win!`
          ]);
          return;
        }

        setPlayerTurn(false);
        setTimeout(() => {
          handleEnemyTurn();

          setLogs((prevLogs) => [
            ...prevLogs,
            `--- Round ${round + 1} ---`
          ]);
          setRound((prevRound) => prevRound + 1);
        }, 50);
      }
    }
  };


  const handleEnemyTurn = () => {
    if (!player || !enemy) return;

    const randomSpellIndex = Math.floor(Math.random() * enemy.spells.length);
    const spell = enemy.spells[randomSpellIndex];
    if (spell) {
      const damage = spell.castSpell(enemy, player);
      setLogs((prevLogs) => [
        ...prevLogs,
        `${enemy.name} casts ${spell.name} on ${player.name} for ${damage} damage!`
      ]);

      if (!player.isAlive()) {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${player.name} is defeated! You lose!`
        ]);
        return;
      }
    }

    setPlayerTurn(true);
  };

  const handleRestart = () => {
    setPlayer(null);
    setEnemy(null);
    setLogs([]);
    setPlayerTurn(true);
  };

  const selectDifficulty = (level) => {
    setDifficulty(level);
    setLogs([`Difficulty set to ${level}. Choose your character.`]);
    setPlayer(null); // Reset the player when difficulty is changed
  };


  return (
    <View style={styles.container}>
      {/* Top Container: Info */}
      <View style={styles.infoContainer}>
        {!player && (
          <Text style={styles.header}>Harry Potter: Protect Chancellor</Text>
        )}
        {player && (
          <View style={styles.characterCard}>
            <Text style={styles.title}>Player</Text>
            <Text>Name: {player.name}</Text>
            <Text>HP: {player.hp}</Text>
            <Text>Attack: {player.attack}</Text>
            <Text>Defend: {player.defend}</Text>
          </View>
        )}
        {enemy && (
          <View style={styles.characterCard}>
            <Text style={styles.title}>Boss</Text>
            <Text>Name: {enemy.name}</Text>
            <Text>HP: {enemy.hp}</Text>
            <Text>Attack: {enemy.attack}</Text>
            <Text>Defend: {enemy.defend}</Text>
          </View>
        )}
      </View>

      {/* Middle Container: Character Selection & Spell Buttons */}
      <View style={styles.middleContainer}>
        {!player && (
          <View style={styles.selectionContainer}>
            {/* Difficulty Selection */}
            <Text style={styles.header}>Select Difficulty:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => selectDifficulty('normal')}
              >
                <Text style={styles.buttonText}>Normal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => selectDifficulty('hard')}
              >
                <Text style={styles.buttonText}>Hard</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.header}>Select your character:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => selectCharacter(new Harry())}>
                <Text style={styles.buttonText}>Harry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => selectCharacter(new Ron())}>
                <Text style={styles.buttonText}>Ron</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => selectCharacter(new Hermione())}>
                <Text style={styles.buttonText}>Hermione</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {player && playerTurn && (
          <View style={styles.buttonGroup}>
            <Text style={styles.header}>Select your spell:</Text>
            <View style={styles.buttonGroup}>
              {player.spells.map((spell, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => handlePlayerSpell(index)}
                >
                  <Text style={styles.buttonText}>
                    {spell.name} {`(${spell.damage} DMG)`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Restart Button */}
        {player && !player.isAlive() && (
          <View style={styles.restartContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Container: Logs */}
      <ScrollView
      ref={scrollViewRef}
      style={styles.logContainer}
      showsVerticalScrollIndicator={true}>
      <Text style={styles.header}>Battle History:</Text>
      {logs.map((log, index) => (
        <Text key={index} style={log.includes('Round') ? styles.roundText : styles.logText}>
          {log.includes('Round') ? (
            log
          ) : (
            log.split(' ').map((word, i) => {
              if ([player?.name, enemy?.name, 'casts'].includes(word)) {
                return (
                  <Text key={i} style={styles.boldText}>
                    {word}{' '}
                  </Text>
                );
              }
              if (word.includes('damage')) {
                return (
                  <Text key={i} style={styles.boldText}>
                    {word}{' '}
                  </Text>
                );
              }
              return word + ' ';
            })
          )}
        </Text>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    position: 'relative',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space out the player and enemy sections
    paddingBottom: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'flex-start', // Align items to the top
  },
  characterCard: {
    width: '48%', // Set both cards to 48% of the container width
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  middleContainer: {
    justifyContent: 'center', // Vertically center content
    alignItems: 'center',
    marginBottom: 5, // Prevent overlap with the log container
  },
  selectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  restartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logContainer: {
    maxHeight: height * 0.55, // Make sure log container doesn't take up too much space
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 'auto', // Ensures the log container sticks to the bottom
  },
  roundText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  logText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default GameScreen;