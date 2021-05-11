export enum WebSocketMessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum WebSocketMessageAction {
  TEST = 'test',
  ECHO = 'echo',
  START_ROUTINE = 'start_routine',
  NEXT_STEP_IN_ROUTINE = 'next_step_in_routine',
  FINISH_ROUTINE = 'finish_routine',
}

export interface WebSocketMessage {
  id: string
  type: WebSocketMessageType
  action: WebSocketMessageAction
  data: object
}
