import type CommandHandler from './commandHandler'
import { WebSocketMessage, WebSocketMessageAction } from './webSocketMessage'
import {
  StartPresenterCommandData,
  Meal,
  PresenterSessionType,
  PresenterNavigationActionData,
  RoutineStep,
} from './presenterCommands'

interface ExpectedResponse {
  action: WebSocketMessageAction
  resolve: (message: WebSocketMessage) => void
  reject: (error: string) => void
}

class IvaCommunicator {
  private commandHandler: CommandHandler
  private ws: WebSocket | undefined
  private readonly websocketUrl: string

  constructor(url: string, commandHandler: CommandHandler) {
    this.commandHandler = commandHandler
    this.websocketUrl = url
    this.connectToWebsocket()
  }

  private connectToWebsocket() {
    this.ws = new WebSocket(this.websocketUrl)
    this.ws.onopen = (event) => {
      console.log(event)
    }

    this.ws.onerror = (error) => {
      console.log(error)
    }

    this.ws.onclose = (event) => {
      console.log(event)
      setTimeout(() => {
        this.connectToWebsocket()
      }, 1000)
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WebSocketMessage
      this.handleMessage(message)
    }
  }

  private handleMessage(message: WebSocketMessage) {
    console.log('event')
    console.log(message)

    // Handle actions which are not expected responses
    switch (message.action) {
      case WebSocketMessageAction.START_PRESENTER: {
        this.handleStartPresenterCommand(
          message.data as StartPresenterCommandData,
        )
        break
      }

      case WebSocketMessageAction.NEXT_ITEM_IN_PRESENTER: {
        let sessionType = (message.data as PresenterNavigationActionData)
          .session_type
        this.commandHandler.goToNextItem(sessionType)
        break
      }

      case WebSocketMessageAction.PREV_ITEM_IN_PRESENTER: {
        let sessionType = (message.data as PresenterNavigationActionData)
          .session_type
        this.commandHandler.goToPrevItem(sessionType)
        break
      }

      case WebSocketMessageAction.PRESENTER_FINISHED: {
        let sessionType = (message.data as PresenterNavigationActionData)
          .session_type
        this.commandHandler.presenterFinished(sessionType)
        break
      }
    }
  }

  private handleStartPresenterCommand(data: StartPresenterCommandData) {
    console.log(data)
    switch (data.session_type) {
      case PresenterSessionType.MEAL_CHOICES:
        let mealChoices = data.items.map((step) => step.data as Meal)
        console.log(mealChoices)
        this.commandHandler.startMealChoicePresenter(mealChoices)
        break
      case PresenterSessionType.ROUTINE:
        let routineSteps = data.items.map((step) => step.data as RoutineStep)
        console.log(routineSteps)
        this.commandHandler.startRoutinePresenter(routineSteps)
        break
    }
  }
}

export default IvaCommunicator
