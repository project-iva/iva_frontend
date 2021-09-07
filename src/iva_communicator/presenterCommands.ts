import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types'

export enum PresenterSessionType {
  ROUTINE = 'ROUTINE',
  MEAL_CHOICES = 'MEAL_CHOICES',
}

export interface RoutineStep {
  title: string
  description: string
  icon: [IconPrefix, IconName]
  icon_color: string
}

export interface PresenterItem {
  data: object
}

export interface StartPresenterCommandData {
  session_type: PresenterSessionType
  items: PresenterItem[]
}

export interface PresenterNavigationActionData {
  session_type: PresenterSessionType
}
