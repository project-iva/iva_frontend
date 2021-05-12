import { RoutineStep, Routine } from './routine'
import {
  faCloudSun,
  faGlassWhiskey,
  faBrain,
  faJournalWhills,
  faList,
} from '@fortawesome/free-solid-svg-icons'

const morningSteps = [
  new RoutineStep('Curtains', 'Open the curtains', {
    icon: faCloudSun,
    color: 'DarkOrange',
  }),
  new RoutineStep('Water', 'Drink a glass of water', {
    icon: faGlassWhiskey,
    color: 'LightSkyBlue',
  }),
  new RoutineStep('Mindfulness', 'Meditation', {
    icon: faBrain,
    color: 'SlateGrey',
  }),
  new RoutineStep('TODOs', 'Prepare a list of TODOs for the day', {
    icon: faList,
    color: 'DarkGray',
  }),
  new RoutineStep('Journal', 'Write/sketch for a few minutes', {
    icon: faJournalWhills,
    color: 'Maroon',
  }),
]

const morningRoutine = new Routine(morningSteps)
export default morningRoutine
