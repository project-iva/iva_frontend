import './App.scss';
import React, { Component } from 'react';
import IvaCommunicator from './iva_communicator/ivaCommunicator';
import CommandHandler from './iva_communicator/commandHandler';
import {  Modal, Button } from 'react-bootstrap';

type AppProps = {};

type AppState = {
  show: boolean;
};

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      show: true,
    } as AppState;

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const commandHandler = new CommandHandler(this);
    const communicator = new IvaCommunicator('ws://127.0.0.1:5678/', commandHandler);
  }

  showMorningModal() {

  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;
