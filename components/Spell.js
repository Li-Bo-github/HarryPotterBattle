// Spell.js
export default class Spell {
    constructor(name, damage) {
      this.name = name;
      this.damage = damage;
    }
  
    // 计算攻击伤害
    castSpell(caster, target) {
      const damage = this.calculateDamage(caster, target);
      console.log(`${caster.name} casts ${this.name} on ${target.name} for ${damage} damage!`);
      target.takeDamage(damage);
    }
  
    // 计算伤害（基于不同的咒语和难度）
    calculateDamage(caster, target) {
      let baseDamage = this.damage + caster.attack;
      return Math.max(baseDamage, 0); // 确保伤害不为负数
    }
  }
  