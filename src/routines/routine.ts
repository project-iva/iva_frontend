export interface RoutineStep {
  title: string
  description: string
  icon: string
}

export interface Routine {
  name: string
  steps: Array<RoutineStep>
}
