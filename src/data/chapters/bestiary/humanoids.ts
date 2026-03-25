import { Chapter } from '../../../types';

export const humanoids: Chapter = {
  id: 'humanoids',
  title: 'Humanoid Foes',
  content: `# Humanoid Foes

Not all threats come from monsters. Bandits, cultists, and enemy soldiers pose significant dangers to adventurers.

---

## Bandit Captain
**Armor Class:** 15 (studded leather)  
**Hit Points:** 65 (10d8 + 20)  
**Speed:** 30 ft.

**STR** 15 (+2) | **DEX** 16 (+3) | **CON** 14 (+2) | **INT** 14 (+2) | **WIS** 11 (+0) | **CHA** 14 (+2)

**Saving Throws:** Str +4, Dex +5, Wis +2  
**Skills:** Athletics +4, Deception +4  
**Senses:** Passive Perception 10  
**Languages:** Common, Thieves' Cant  
**Challenge:** 2 (450 XP)

### Actions
**Multiattack.** The captain makes three melee attacks: two with its scimitar and one with its dagger.

**Scimitar.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage.

**Dagger.** *Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage.

### Reactions
**Parry.** The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon.

---

## Cult Fanatic
**Armor Class:** 13 (leather armor)  
**Hit Points:** 33 (6d8 + 6)  
**Speed:** 30 ft.

**STR** 11 (+0) | **DEX** 14 (+2) | **CON** 12 (+1) | **INT** 10 (+0) | **WIS** 13 (+1) | **CHA** 14 (+2)

**Skills:** Deception +4, Persuasion +4, Religion +2  
**Senses:** Passive Perception 11  
**Languages:** Common  
**Challenge:** 2 (450 XP)

### Traits
**Dark Devotion.** The fanatic has advantage on saving throws against being charmed or frightened.

**Spellcasting.** The fanatic is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 11, +3 to hit with spell attacks). The fanatic has the following cleric spells prepared:
- Cantrips: *light*, *sacred flame*, *thaumaturgy*
- 1st level (4 slots): *command*, *inflict wounds*, *shield of faith*
- 2nd level (3 slots): *hold person*, *spiritual weapon*

### Actions
**Multiattack.** The fanatic makes two melee attacks.

**Dagger.** *Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage.

---

## Orc Warrior
**Armor Class:** 13 (hide armor)  
**Hit Points:** 15 (2d8 + 6)  
**Speed:** 30 ft.

**STR** 16 (+3) | **DEX** 12 (+1) | **CON** 16 (+3) | **INT** 7 (-2) | **WIS** 11 (+0) | **CHA** 10 (+0)

**Skills:** Intimidation +2  
**Senses:** Darkvision 60 ft., passive Perception 10  
**Languages:** Common, Orc  
**Challenge:** 1/2 (100 XP)

### Traits
**Aggressive.** As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.

### Actions
**Greataxe.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 9 (1d12 + 3) slashing damage.

**Javelin.** *Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage.`
};
