import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import RoutineModal from './components/routineModal'
import { MindfulSessionsOverview } from './views/MindfulSessionsOverview'
import { SleepAnalysesOverview } from './views/SleepAnalysesOverview'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Dashboard } from './views/Dashboard'

type AppProps = {}
type AppState = {}

class App extends Component<AppProps, AppState> {
  private readonly routineModal: React.RefObject<RoutineModal>

  constructor(props: AppProps) {
    super(props)
    this.routineModal = React.createRef()
  }

  componentDidMount() {
    const commandHandler = new CommandHandler(this)
    const communicator = new IvaCommunicator(
      'ws://iva.docker.localhost:5678/web',
      commandHandler,
    )
  }

  startRoutine(routineName: string) {
    this.routineModal.current?.startRoutine(routineName)
  }

  goToNextRoutineStep() {
    this.routineModal.current?.nextStep()
  }

  finishRoutine() {
    this.routineModal.current?.finishRoutine()
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
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
        <RoutineModal ref={this.routineModal} />
      </>
    )
  }
}

export default App
