import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IvaCommunicator from './iva_communicator/ivaCommunicator';
import CommandHandler from './iva_communicator/commandHandler';

class App extends Component<{}, {}> {

  componentDidMount() {
    const commandHandler = new CommandHandler();
    const communicator = new IvaCommunicator('ws://127.0.0.1:5678/', commandHandler);
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Page has been open for <code>{0}</code> seconds.
          </p>
          <p>
            <a
              className='App-link'
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn React
            </a>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
