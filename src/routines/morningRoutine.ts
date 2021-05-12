import { RoutineStep, Routine } from './routine'
import {
  faCloudSun,
  faGlassWhiskey,
  faBrain,
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
]

const morningRoutine = new Routine('morning_routine', morningSteps)
export default morningRoutine
