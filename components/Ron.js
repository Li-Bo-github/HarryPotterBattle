import Character from './Character';
import Spell from './Spell';

class Ron extends Character {
  constructor() {
    const spells = [
      new Spell('Stupefy', 40),
      new Spell('Reducto', 60),
      new Spell('Riddikulus', 50)
    ];
    super('Ron Weasley', 900, 35, 15, spells);
  }
}

export default Ron;