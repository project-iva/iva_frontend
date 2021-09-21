import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import { MindfulSessionsOverview } from './pages/MindfulSessionsOverview'
import { SleepAnalysesOverview } from './pages/SleepAnalysesOverview'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import MealChoicePresenter from './components/presenter/mealChoicePresenter'
import { PresenterSessionType } from './iva_communicator/presenterCommands'
import Presenter from './components/presenter/presenter'
import RoutinePresenter from './components/presenter/routinePresenter'
import { BodyMassesOverview } from './pages/BodyMassesOverview'
import { AssetsOverview } from './pages/AssetsOverview'
import { SettingsModal } from './components/settingsModal'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RefreshableComponentIdentifier } from './iva_communicator/refreshableComponentIdentifier'

type AppProps = {}
type AppState = {
  showSettings: boolean
  isPresenter: boolean
  caloriesRefresher: number
  bodyMassStatsRefresher: number
  dayPlanRefresher: number
  dayGoalsRefresher: number
  sleepStatsRefresher: number
  mindfulSessionsStatsRefresher: number
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
      caloriesRefresher: 0,
      bodyMassStatsRefresher: 0,
      dayPlanRefresher: 0,
      dayGoalsRefresher: 0,
      sleepStatsRefresher: 0,
      mindfulSessionsStatsRefresher: 0,
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

  refreshComponent(componentIdentifier: RefreshableComponentIdentifier) {
    switch (componentIdentifier) {
      case RefreshableComponentIdentifier.CALORIES_VIEW:
        this.setState({ caloriesRefresher: this.state.caloriesRefresher + 1 })
        break
      case RefreshableComponentIdentifier.BODY_MASS_VIEW:
        this.setState({
          bodyMassStatsRefresher: this.state.bodyMassStatsRefresher + 1,
        })
        break
      case RefreshableComponentIdentifier.DAY_PLAN_VIEW:
        this.setState({ dayPlanRefresher: this.state.dayPlanRefresher + 1 })
        break
      case RefreshableComponentIdentifier.DAY_GOALS_VIEW:
        this.setState({ dayGoalsRefresher: this.state.dayGoalsRefresher + 1 })
        break
      case RefreshableComponentIdentifier.SLEEP_STATS_VIEW:
        this.setState({
          sleepStatsRefresher: this.state.sleepStatsRefresher + 1,
        })
        break
      case RefreshableComponentIdentifier.MINDFUL_SESSIONS_STATS_VIEW:
        this.setState({
          mindfulSessionsStatsRefresher:
            this.state.mindfulSessionsStatsRefresher + 1,
        })
        break
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
        <div className={'container-fluid text-right mb-2'}>
          <FontAwesomeIcon
            className={'mt-2'}
            size="lg"
            icon={faCog}
            onClick={this.handleOnSettingsButtonPressed}
          />
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
            <Route path="/">
              <Dashboard
                caloriesRefresher={this.state.caloriesRefresher}
                bodyMassStatsRefresher={this.state.bodyMassStatsRefresher}
                dayPlanRefresher={this.state.dayPlanRefresher}
                dayGoalsRefresher={this.state.dayGoalsRefresher}
                sleepStatsRefresher={this.state.sleepStatsRefresher}
                mindfulSessionsStatsRefresher={
                  this.state.mindfulSessionsStatsRefresher
                }
              />
            </Route>
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
