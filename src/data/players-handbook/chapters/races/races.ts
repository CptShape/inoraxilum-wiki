import { Chapter } from '../../../../types';

import { raceDragonborn } from './dragonborn';
import { raceDwarf } from './dwarf';
import { raceElf } from './elf';
import { raceExmachina } from './exmachina';
import { raceGoliath } from './goliath';
import { raceHalfling } from './halfling';
import { raceHuman } from './human';
import { raceOgre } from './ogre';
import { raceOrc } from './orc';
import { raceUndead } from './undead';

export const racesChapter: Chapter = {
  id: 'races',
  title: 'Races',
  subtitle: 'The Peoples of the Realm',
  icon: '👥',
  content: 'src/data/players-handbook/chapters/races/races.md',
  subChapters: [raceElf, raceDwarf, raceHuman, raceDragonborn, raceOgre, raceOrc, raceUndead, raceExmachina, raceGoliath, raceHalfling],
};

export { raceElf, raceDwarf, raceHuman, raceDragonborn, raceOgre, raceOrc, raceUndead, raceExmachina, raceGoliath, raceHalfling };
