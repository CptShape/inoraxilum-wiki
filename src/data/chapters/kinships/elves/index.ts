import { Chapter } from '../../../../types';
import { highElves } from './high-elves';
import { woodElves } from './wood-elves';
import { darkElves } from './dark-elves';

export const elvesChapter: Chapter = {
  id: 'elves',
  title: 'Elves',
  subtitle: 'The Immortal Children of Light',
  content: `# Elves of Eldoria

## Overview

Elves are the ancient, immortal race that once ruled the lands of Eldoria. They are divided into several sub-races, each with their own unique cultures, traditions, and abilities.

---

### Common Elven Traits

**Ability Score Increase:** +2 Dexterity  
**Age:** Elves can live to be over 750 years old  
**Alignment:** Chaotic Good  
**Size:** Medium (5-6+ feet tall)  
**Speed:** 30 feet  
**Darkvision:** 60 feet  
**Fey Ancestry:** Advantage on saving throws against being charmed  
**Trance:** Elves don't sleep - they meditate for 4 hours daily  
**Languages:** Common, Elvish, and one extra language

---

## Elven Sub-Races
`,
  subChapters: [highElves, woodElves, darkElves],
};
