import type App from '../App'
import { PresenterSessionType, RoutineStep } from './presenterCommands'
import Presenter from '../components/presenter/presenter'
import { Meal } from '../shared_models/food'
import { RefreshableComponentIdentifier } from './refreshableComponentIdentifier'

class CommandHandler {
  private app: App

  constructor(app: App) {
    this.app = app
  }

  refreshComponent(componentIdentifier: RefreshableComponentIdentifier) {
    this.app.refreshComponent(componentIdentifier)
  }

  startMealChoicePresenter(choices: Meal[]) {
    this.app.mealChoicePresenter.current?.start(choices)
  }

  startRoutinePresenter(steps: RoutineStep[]) {
    this.app.routinePresenter.current?.start(steps)
  }

  goToNextItem(sessionType: PresenterSessionType) {
    this.getPresenter(sessionType)?.nextItem()
  }

  goToPrevItem(sessionType: PresenterSessionType) {
    this.getPresenter(sessionType)?.prevItem()
  }

  presenterFinished(sessionType: PresenterSessionType) {
    this.getPresenter(sessionType)?.finished()
  }

  private getPresenter(sessionType: PresenterSessionType): Presenter | null {
    let presenterRef = this.app.presenters.get(sessionType)
    if (presenterRef) {
      return presenterRef.current
    }
    return null
  }
}

export default CommandHandler
