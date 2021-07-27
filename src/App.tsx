import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import { MindfulSessionsOverview } from './views/MindfulSessionsOverview'
import { SleepAnalysesOverview } from './views/SleepAnalysesOverview'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Dashboard } from './views/Dashboard'
import MealChoicePresenter from './components/presenter/mealChoicePresenter'
import { PresenterSessionType } from './iva_communicator/presenterCommands'
import Presenter from './components/presenter/presenter'
import RoutinePresenter from './components/presenter/routinePresenter'
import { BodyMassesOverview } from './views/BodyMassesOverview'
import { AssetsOverview } from './views/AssetsOverview'

type AppProps = {}
type AppState = {}
type PresenterReference = React.RefObject<Presenter>

class App extends Component<AppProps, AppState> {
  readonly routinePresenter: React.RefObject<RoutinePresenter>
  readonly mealChoicePresenter: React.RefObject<MealChoicePresenter>
  presenters: Map<PresenterSessionType, PresenterReference>

  constructor(props: AppProps) {
    super(props)
    this.routinePresenter = React.createRef()
    this.mealChoicePresenter = React.createRef()

    this.presenters = new Map<PresenterSessionType, PresenterReference>([
      [PresenterSessionType.ROUTINE, this.routinePresenter],
      [PresenterSessionType.MEAL_CHOICES, this.mealChoicePresenter],
    ])
  }

  componentDidMount() {
    const commandHandler = new CommandHandler(this)
    const communicator = new IvaCommunicator(
      'ws://iva.docker.localhost:5678/web',
      commandHandler,
    )
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route
              path="/mindful-sessions"
              component={MindfulSessionsOverview}
            />
            <Route path="/sleep-analyses" component={SleepAnalysesOverview} />
            <Route path="/body-masses" component={BodyMassesOverview} />
            <Route path="/assets" component={AssetsOverview} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
        <RoutinePresenter ref={this.routinePresenter} />
        <MealChoicePresenter ref={this.mealChoicePresenter} />
      </>
    )
  }
}

export default App
