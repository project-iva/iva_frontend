import { RoutineStep, Routine } from './routine'
import {
  faCloudSun,
  faBrain,
  faJournalWhills,
  faBook,
} from '@fortawesome/free-solid-svg-icons'

const eveningSteps = [
  new RoutineStep('Curtains', 'Close the curtains', {
    icon: faCloudSun,
    color: 'DarkOrange',
  }),
  new RoutineStep('Reading', 'Read a book for a few minutes', {
    icon: faBook,
    color: 'Sienna',
  }),
  new RoutineStep('Journal', 'Write/sketch for a few minutes', {
    icon: faJournalWhills,
    color: 'Maroon',
  }),
  new RoutineStep('Mindfulness', 'Meditation', {
    icon: faBrain,
    color: 'SlateGrey',
  }),
]

const eveningRoutine = new Routine(eveningSteps)
export default eveningRoutine
