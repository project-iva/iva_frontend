export enum WebSocketMessageType {
  REQUEST = 'request',
  RESPONSE = 'response'
}

export enum WebSocketMessageAction {
  TEST = 'test',
  ECHO = 'echo'
}

export interface WebSocketMessage {
  id: string
  type: WebSocketMessageType
  action: WebSocketMessageAction
  data: object
}
