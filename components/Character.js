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
    this.hp -= damage;
    console.log(`${this.name} takes ${damage} damage! Remaining HP: ${this.hp}`);
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