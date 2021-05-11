import type App from '../App';
import type { MorningRoutineState } from './morningRoutineState';

class CommandHandler {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  morningRoutineStateUpdated(state: MorningRoutineState) {
    console.log(state);
    this.app.morningRoutineStateUpdated(state);
  }

  morningRoutineFinished() {
    this.app.morningRoutineFinished();
  }

  testAction(data: any) {
    console.log('performing test action');
    console.log(data);
  }
}

export default CommandHandler;
