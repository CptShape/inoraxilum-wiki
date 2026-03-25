import { Chapter } from '../../../../types';
import { sunElves } from './sun-elves';
import { moonElves } from './moon-elves';

export const highElves: Chapter = {
  id: 'high-elves',
  title: 'High Elves',
  content: `# High Elves

## The Noble Children of the Sun and Moon

High Elves are the most refined and magical of all elven kind. They hail from the great floating cities of Luminara and consider themselves the purest expression of elven heritage.

---

### High Elf Traits

**Ability Score Increase:** +1 Intelligence  
**Cantrip:** Learn one Wizard cantrip of your choice  
**Elf Weapon Training:** Proficiency with longswords, shortswords, longbows, and shortbows  
**High Elf Magic:** Extra spell known at 3rd level  
**Languages:** Two extra languages of your choice

---

## High Elf Subtypes

High Elves are further divided into two noble houses:
`,
  subChapters: [sunElves, moonElves],
};
