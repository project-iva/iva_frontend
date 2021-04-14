import { v4 as uuidv4 } from 'uuid';
import type CommandHandler from './commandHandler';
import { WebSocketMessage, WebSocketMessageAction, WebSocketMessageType } from './webSocketMessage';

interface ExpectedResponse {
  action: WebSocketMessageAction
  resolve: (message: WebSocketMessage) => void
  reject: (error: string) => void
}

class IvaCommunicator {
  private expectedResponses = new Map<string, ExpectedResponse>();
  private commandHandler: CommandHandler;
  private ws: WebSocket;

  constructor(url: string, commandHandler: CommandHandler) {
    this.commandHandler = commandHandler;
    this.ws = new WebSocket(url);
    this.ws.onopen = (event) => {
      console.log(event)
      //this.sendTest();
      console.log('on open');
      this.sendEcho().then((data) => {
        console.log('promise data');
        console.log(data);
      });
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WebSocketMessage;
      this.handleMessage(message);
    };
  }

  private handleMessage(message: WebSocketMessage) {
    console.log('event');
    console.log(message);

    const id = message.id;
    if (this.expectedResponses.has(id)) {
      const expectedResponse = this.expectedResponses.get(id)!;
      this.expectedResponses.delete(id);
      // make sure the response parameters are as expected
      if (expectedResponse.action === message.action && message.type === WebSocketMessageType.RESPONSE) {
        expectedResponse.resolve(message);
      } else {
        expectedResponse.reject('Response malformed');
      }
      return;
    }

    // Handle actions which are not expected responses
    if (message.action === WebSocketMessageAction.TEST) {
      this.commandHandler.testAction(message.data);
    }
  }

  private sendTest() {
    const test_data = {
      id: uuidv4(),
      type: WebSocketMessageType.REQUEST,
      action: WebSocketMessageAction.TEST,
    } as WebSocketMessage;

    const j = JSON.stringify(test_data);
    this.ws.send(j);
  }

  private sendEcho() {
    const test_data = {
      id: uuidv4(),
      type: WebSocketMessageType.REQUEST,
      action: WebSocketMessageAction.ECHO,
      data: {
        'field1': 'field1_data',
        'field2': 'field2_data',
      },
    } as WebSocketMessage;

    return new Promise((resolve, reject) => {
      const expectedResponse = {
        action: test_data.action,
        resolve: resolve,
        reject: reject,
      } as ExpectedResponse;
      this.expectedResponses.set(test_data.id, expectedResponse);

      const j = JSON.stringify(test_data);
      this.ws.send(j);
    });
  }
}

export default IvaCommunicator;
