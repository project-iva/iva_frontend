import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import RoutineModal from './components/routineModal'

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
      'ws://127.0.0.1:5678/web',
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
        <RoutineModal ref={this.routineModal} />
      </>
    )
  }
}

export default App
