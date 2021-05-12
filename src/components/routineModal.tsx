import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Routine, RoutineStep } from '../routines/routine'
import morningRoutine from '../routines/morningRoutine'
import finishedStep from '../routines/finishedStep'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

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

  componentDidMount() {
    this.startRoutine('morning_routine')
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
        <Modal
          show={currentStep != null}
          animation={false}
          centered
          className={'routineModal'}
        >
          <Modal.Header className={'header'}>
            <Modal.Title>
              <h1>{currentStep?.title}</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={'body'}>
            <h6>{currentStep?.description}</h6>
            <FontAwesomeIcon
              size="10x"
              icon={currentStep?.icon.icon || faQuestion}
              color={currentStep?.icon.color}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default RoutineModal
