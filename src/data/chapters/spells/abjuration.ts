import { Chapter } from '../../../types';

export const abjuration: Chapter = {
  id: 'abjuration',
  title: 'Abjuration Spells',
  content: `# Abjuration Spells

Abjuration spells are protective in nature, creating barriers and wards against harm.

---

## Shield
**Level:** 1st  
**Casting Time:** 1 reaction (when hit by an attack)  
**Range:** Self  
**Components:** V, S  
**Duration:** 1 round

An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack.

---

## Counterspell
**Level:** 3rd  
**Casting Time:** 1 reaction (when you see a creature within 60 feet casting a spell)  
**Range:** 60 feet  
**Components:** S  
**Duration:** Instantaneous

You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.

**At Higher Levels:** When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.

---

## Mage Armor
**Level:** 1st  
**Casting Time:** 1 action  
**Range:** Touch  
**Components:** V, S, M (a piece of cured leather)  
**Duration:** 8 hours

You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier.`
};
