import Character from './Character';
import Spell from './Spell';

class Voldemort extends Character {
  constructor(difficulty) {
    const spells = [
      new Spell('Avada Kedavra', 100),
      new Spell('Crucio', 80),
      new Spell('Imperio', 70)
    ];

    // 根据难度调整攻击力
    let attack = difficulty === 'hard' ? 80 : 50;
    super('Lord Voldemort', 2000, attack, 30, spells);
  }
}

export default Voldemort;