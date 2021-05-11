import { RoutineStep, Routine } from './routine'

const morningSteps = [
  new RoutineStep('Curtains', 'Open the curtains', 'fas fa-sun'),
  new RoutineStep('Curtains2', 'Open the curtains2', 'fas fa-sun'),
  new RoutineStep('Curtains3', 'Open the curtains3', 'fas fa-sun'),
]

const morningRoutine = new Routine('morning_routine', morningSteps)
export default morningRoutine
