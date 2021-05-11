export class RoutineStep {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly icon: string,
  ) {}
}

export class Routine {
  constructor(readonly name: string, readonly steps: Array<RoutineStep>) {}
}
