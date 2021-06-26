import { App } from '../App'
import StartRoutineCommandData from './startRoutineCommandData'

class CommandHandler {
  private app: App

  constructor(app: App) {
    this.app = app
  }

  startRoutine(data: StartRoutineCommandData) {
    console.log(data)
    this.app.startRoutine(data.routine_name)
  }

  goToNextRoutineStep() {
    this.app.goToNextRoutineStep()
  }

  finishRoutine() {
    this.app.finishRoutine()
  }

  testAction(data: any) {
    console.log('performing test action')
    console.log(data)
  }
}

export default CommandHandler
