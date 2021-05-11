import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Routine, RoutineStep } from '../routines/routine'
import morningRoutine from '../routines/morningRoutine'
import finishedStep from '../routines/finishedStep'

type RoutineModalProps = {}

type RoutineModalState = {
  routine: Routine | undefined
  step: number
}

class RoutineModal extends Component<RoutineModalProps, RoutineModalState> {
  private routines: Map<string, Routine>
  private finishedStep: RoutineStep

  constructor(props: RoutineModalProps) {
    super(props)

    this.routines = new Map<string, Routine>([
      ['morning_routine', morningRoutine],
    ])

    this.finishedStep = finishedStep

    this.state = {
      routine: undefined,
      step: 0,
    }
  }

  startRoutine(routineName: string) {
    const routine = this.routines.get(routineName)
    this.setState({
      routine: routine,
    })
  }

  getCurrentStep() {
    const routine = this.state.routine
    if (routine != null && this.state.step >= routine.steps.length) {
      return this.finishedStep
    }

    return this.state.routine?.steps[this.state.step]
  }

  nextStep() {
    this.setState({
      step: this.state.step + 1,
    })
  }

  finishRoutine() {
    this.nextStep()
    // automatically hide after 3s
    setTimeout(() => {
      this.setState({
        routine: undefined,
        step: 0,
      })
    }, 3000)
  }

  render() {
    const currentStep = this.getCurrentStep()
    return (
      <>
        <Modal show={currentStep != null} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{currentStep?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{currentStep?.description}</Modal.Body>
        </Modal>
      </>
    )
  }
}

export default RoutineModal
