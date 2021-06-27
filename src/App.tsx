import './styles/style.scss'
import React, { Component } from 'react'
import IvaCommunicator from './iva_communicator/ivaCommunicator'
import CommandHandler from './iva_communicator/commandHandler'
import RoutineModal from './components/routineModal'
import { connect, ConnectedProps } from 'react-redux'
import type { AppDispatch, RootState } from './store/store'
import { fetchMindfulSessions } from './store/mindfulSessionsSlice'
import { fetchSleepAnalyses } from './store/sleepAnalysesSlice'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state: RootState) => {
  return {
    mindfulSessions: state.mindfulSessions,
    sleepAnalyses: state.sleepAnalyses,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    { fetchMindfulSessions, fetchSleepAnalyses },
    dispatch,
  )
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface AppProps extends PropsFromRedux {}

type AppState = {}

export class App extends Component<AppProps, AppState> {
  private readonly routineModal: React.RefObject<RoutineModal>

  constructor(props: AppProps) {
    super(props)
    this.routineModal = React.createRef()
  }

  componentDidMount() {
    console.log({
      mindfulSessions: this.props.mindfulSessions,
      sleepAnalyses: this.props.sleepAnalyses,
    })

    this.props.fetchMindfulSessions()
    this.props.fetchSleepAnalyses()

    setTimeout(() => {
      console.log({
        mindfulSessions: this.props.mindfulSessions,
        sleepAnalyses: this.props.sleepAnalyses,
      })
    }, 1000)

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
        <div className={'container h-100'}>
          <div
            className={'row h-100 justify-content-center align-items-center'}
          >
            <h1 className={'iva-title'}>IVA</h1>
          </div>
        </div>
        <RoutineModal ref={this.routineModal} />
      </>
    )
  }
}

export default connector(App)
