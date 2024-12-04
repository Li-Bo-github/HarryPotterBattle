import Character from './Character';
import Spell from './Spell';

class Hermione extends Character {
  constructor() {
    const spells = [
      new Spell('Petrificus Totalus', 25),
      new Spell('Leviosa', 40),
      new Spell('Incendio', 60)
    ];
    super('Hermione Granger', 850, 45, 20, spells);
  }
}

export default Hermione;