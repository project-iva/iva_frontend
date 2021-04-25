import './App.scss';
import React, { Component } from 'react';
import IvaCommunicator from './iva_communicator/ivaCommunicator';
import CommandHandler from './iva_communicator/commandHandler';
import { Modal } from 'react-bootstrap';
import { MorningRoutineState } from './iva_communicator/morningRoutineState';

type AppProps = {};

type AppState = {
  morningRoutineState: MorningRoutineState | null;
};

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      morningRoutineState: null,
    };
  }

  componentDidMount() {
    const commandHandler = new CommandHandler(this);
    const communicator = new IvaCommunicator('ws://127.0.0.1:5678/', commandHandler);
  }

  morningRoutineStateUpdated(state: MorningRoutineState) {
    this.setState({
      morningRoutineState: state,
    });
  }

  morningRoutineFinished() {
    this.setState({
      morningRoutineState: null,
    });
  }

  render() {
    return (
      <>
        <Modal show={this.state.morningRoutineState != null} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.morningRoutineState?.step.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.morningRoutineState?.step.description}</Modal.Body>
        </Modal>
      </>
    );
  }
}

export default App;
