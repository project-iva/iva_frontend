export enum WebSocketMessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum WebSocketMessageAction {
  TEST = 'test',
  ECHO = 'echo',
  MORNING_ROUTINE_UPDATE = 'morning_routine_update',
  MORNING_ROUTINE_FINISHED = 'morning_routine_finished',
}

export interface WebSocketMessage {
  id: string
  type: WebSocketMessageType
  action: WebSocketMessageAction
  data: object
}
