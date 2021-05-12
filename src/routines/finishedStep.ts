import { RoutineStep } from './routine'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const finishedStep = new RoutineStep('Finished', 'Routine finished', {
  icon: faCheckCircle,
  color: 'green',
})
export default finishedStep
