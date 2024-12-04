import Character from './Character';
import Spell from './Spell';

class Harry extends Character {
  constructor() {
    const spells = [
      new Spell('Expelliarmus', 30),
      new Spell('Stupefy', 50),
      new Spell('Expecto Patronum', 70)
    ];
    super('Harry Potter', 1000, 40, 10, spells);
  }
}

export default Harry;