// Character.js
import { View, Text } from 'react-native';
import Spell from './Spell';

export default class Character {
  constructor(name, hp, attack, defend, spells = []) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defend = defend;
    this.spells = spells; // 可以选择不同的咒语
  }

  // 受到伤害
  takeDamage(damage) {
    const effectiveDamage = Math.max(damage - this.defend, 0);
    this.hp -= effectiveDamage;
    console.log(`${this.name} takes ${effectiveDamage} damage! Remaining HP: ${this.hp}`);
  }

  // 检查角色是否活着
  isAlive() {
    return this.hp > 0;
  }

  // 选择并施放咒语
  castSpell(spellIndex, target) {
    const spell = this.spells[spellIndex];
    if (spell) {
      spell.castSpell(this, target);
    }
  }
}