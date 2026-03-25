import { Chapter } from '../../../types';

export const undead: Chapter = {
  id: 'undead',
  title: 'Undead Creatures',
  content: `# Undead Creatures

Undead are once-living creatures brought to a horrifying state of undeath through necromantic magic or curses.

---

## Skeleton
**Armor Class:** 13 (armor scraps)  
**Hit Points:** 13 (2d8 + 4)  
**Speed:** 30 ft.

**STR** 10 (+0) | **DEX** 14 (+2) | **CON** 15 (+2) | **INT** 6 (-2) | **WIS** 8 (-1) | **CHA** 5 (-3)

**Vulnerabilities:** Bludgeoning  
**Immunities:** Poison, exhaustion  
**Senses:** Darkvision 60 ft., passive Perception 9  
**Languages:** Understands all languages it knew in life but can't speak  
**Challenge:** 1/4 (50 XP)

### Actions
**Shortsword.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.

**Shortbow.** *Ranged Weapon Attack:* +4 to hit, range 80/320 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.

---

## Zombie
**Armor Class:** 8  
**Hit Points:** 22 (3d8 + 9)  
**Speed:** 20 ft.

**STR** 13 (+1) | **DEX** 6 (-2) | **CON** 16 (+3) | **INT** 3 (-4) | **WIS** 6 (-2) | **CHA** 5 (-3)

**Saving Throws:** Wis +0  
**Immunities:** Poison  
**Senses:** Darkvision 60 ft., passive Perception 8  
**Languages:** Understands languages it knew in life but can't speak  
**Challenge:** 1/4 (50 XP)

### Traits
**Undead Fortitude.** If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.

### Actions
**Slam.** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) bludgeoning damage.

---

## Vampire Spawn
**Armor Class:** 15 (natural armor)  
**Hit Points:** 82 (11d8 + 33)  
**Speed:** 30 ft.

**STR** 16 (+3) | **DEX** 16 (+3) | **CON** 16 (+3) | **INT** 11 (+0) | **WIS** 10 (+0) | **CHA** 12 (+1)

**Saving Throws:** Dex +6, Wis +3  
**Skills:** Perception +3, Stealth +6  
**Resistances:** Necrotic; bludgeoning, piercing, and slashing from nonmagical attacks  
**Senses:** Darkvision 60 ft., passive Perception 13  
**Languages:** The languages it knew in life  
**Challenge:** 5 (1,800 XP)

### Traits
**Regeneration.** The vampire regains 10 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or running water.

**Spider Climb.** The vampire can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.

**Vampire Weaknesses.** The vampire has the following flaws:
- *Stake to the Heart.* Reduced to 0 hit points if a piercing weapon made of wood is driven into its heart while it is incapacitated.
- *Sunlight Hypersensitivity.* Takes 20 radiant damage when it starts its turn in sunlight.

### Actions
**Multiattack.** The vampire makes two attacks, only one of which can be a bite attack.

**Claws.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 8 (2d4 + 3) slashing damage.

**Bite.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. *Hit:* 6 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken.`
};
