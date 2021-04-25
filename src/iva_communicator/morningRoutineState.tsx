export interface MorningRoutineState {
  step_number: number
  steps_count: number
  step: MorningRoutineStep
}

export interface MorningRoutineStep {
  title: string
  description: string
}
