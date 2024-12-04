export default class Spell {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }

  // Calculate damage dealt considering caster's attack and target's defense
  calculateEffectiveDamage(caster, target) {
    return Math.max(this.damage + caster.attack - target.defend, 0);
  }

  // Cast spell and deal damage
  castSpell(caster, target) {
    const damage = this.calculateEffectiveDamage(caster, target);
    console.log(`${caster.name} casts ${this.name} on ${target.name} for ${damage} damage!`);
    target.takeDamage(damage);
    return damage;
  }
}