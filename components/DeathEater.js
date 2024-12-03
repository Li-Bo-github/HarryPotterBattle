import Character from './Character';
import Spell from './Spell';

class DeathEater extends Character {
  constructor(difficulty) {
    const spells = [
      new Spell('Crucio', 40),
      new Spell('Avada Kedavra', 60)
    ];

    // 根据难度调整攻击力
    let attack = difficulty === 'hard' ? 50 : 40;
    super('Death Eater', 100, attack, 20, spells);
  }
}

export default DeathEater;