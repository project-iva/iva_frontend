export enum WebSocketMessageAction {
  START_PRESENTER = 'start_presenter',
  NEXT_ITEM_IN_PRESENTER = 'next_item_in_presenter',
  PREV_ITEM_IN_PRESENTER = 'prev_item_in_presenter',
  PRESENTER_FINISHED = 'presenter_finished',
}

export interface WebSocketMessage {
  action: WebSocketMessageAction
  data: object
}
