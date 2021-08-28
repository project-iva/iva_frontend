import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import { MindfulSessionsOverview } from './views/MindfulSessionsOverview'
import { SleepAnalysesOverview } from './views/SleepAnalysesOverview'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard } from './views/Dashboard'
import MealChoicePresenter from './components/presenter/mealChoicePresenter'
import { PresenterSessionType } from './iva_communicator/presenterCommands'
import Presenter from './components/presenter/presenter'
import RoutinePresenter from './components/presenter/routinePresenter'
import { BodyMassesOverview } from './views/BodyMassesOverview'
import { AssetsOverview } from './views/AssetsOverview'
import { CaloriesGoalOverview } from './views/CaloriesGoalOverview'
import { SettingsModal } from './components/settingsModal'
import { Button } from 'react-bootstrap'
import { DayPlanOverview } from './views/DayPlanOverview'

type AppProps = {}
type AppState = {
  showSettings: boolean
  isPresenter: boolean
}

type PresenterReference = React.RefObject<Presenter>

class App extends Component<AppProps, AppState> {
  readonly routinePresenter: React.RefObject<RoutinePresenter>
  readonly mealChoicePresenter: React.RefObject<MealChoicePresenter>
  presenters: Map<PresenterSessionType, PresenterReference>

  private communicator: IvaCommunicator | null

  constructor(props: AppProps) {
    super(props)
    this.routinePresenter = React.createRef()
    this.mealChoicePresenter = React.createRef()

    const commandHandler = new CommandHandler(this)
    this.communicator = new IvaCommunicator(
      'ws://iva.docker.localhost:5678/web',
      commandHandler,
    )

    this.state = {
      showSettings: false,
      isPresenter: false,
    }

    this.presenters = new Map<PresenterSessionType, PresenterReference>([
      [PresenterSessionType.ROUTINE, this.routinePresenter],
      [PresenterSessionType.MEAL_CHOICES, this.mealChoicePresenter],
    ])

    this.handleOnHideSettingsModal = this.handleOnHideSettingsModal.bind(this)
    this.handleOnIsPresenterChanged = this.handleOnIsPresenterChanged.bind(this)
    this.handleOnSettingsButtonPressed =
      this.handleOnSettingsButtonPressed.bind(this)
  }

  componentDidMount() {
    if (this.state.isPresenter) {
      this.communicator?.connect()
    }
  }

  private handleOnHideSettingsModal() {
    this.setState({ showSettings: false })
  }

  private handleOnIsPresenterChanged(isPresenter: boolean) {
    this.setState({ isPresenter: isPresenter })
    console.log(isPresenter)
    if (isPresenter) {
      this.communicator?.connect()
    } else {
      this.communicator?.disconnect()
    }
  }

  private handleOnSettingsButtonPressed() {
    this.setState({ showSettings: true })
  }

  render() {
    return (
      <>
        <div className={'container-fluid'}>
          <Button onClick={this.handleOnSettingsButtonPressed}>Settings</Button>
        </div>
        <Router>
          <Switch>
            <Route
              path="/mindful-sessions"
              component={MindfulSessionsOverview}
            />
            <Route path="/sleep-analyses" component={SleepAnalysesOverview} />
            <Route path="/body-masses" component={BodyMassesOverview} />
            <Route path="/assets" component={AssetsOverview} />
            <Route path="/calories-goal" component={CaloriesGoalOverview} />
            <Route path="/day-plan" component={DayPlanOverview} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
        <RoutinePresenter ref={this.routinePresenter} />
        <MealChoicePresenter ref={this.mealChoicePresenter} />
        <SettingsModal
          show={this.state.showSettings}
          onHide={this.handleOnHideSettingsModal}
          isPresenter={this.state.isPresenter}
          onIsPresenterChanged={this.handleOnIsPresenterChanged}
        />
      </>
    )
  }
}

export default App
