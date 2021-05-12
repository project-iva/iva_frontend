import { IconDefinition } from '@fortawesome/fontawesome-common-types'

interface RoutineStepIcon {
  icon: IconDefinition
  color: string
}

export class RoutineStep {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly icon: RoutineStepIcon,
  ) {}
}

export class Routine {
  constructor(readonly steps: Array<RoutineStep>) {}
}
