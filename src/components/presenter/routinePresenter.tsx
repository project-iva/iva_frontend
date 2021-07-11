import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { RoutineStep } from '../../iva_communicator/presenterCommands'
import { PresenterModal } from './presenterModal'
import Presenter from './presenter'

type RoutinePresenterState = {
  steps: RoutineStep[] | undefined
  current_step: number
  finished: boolean
}

class RoutinePresenter
  extends Component<{}, RoutinePresenterState>
  implements Presenter
{
  constructor(props: {}) {
    super(props)

    this.state = {
      steps: undefined,
      current_step: 0,
      finished: false,
    }
  }

  start(steps: RoutineStep[]) {
    this.setState({
      steps: steps,
      current_step: 0,
      finished: false,
    })
  }

  nextItem() {
    this.setState({
      current_step: this.state.current_step + 1,
    })
  }

  prevItem() {
    this.setState({
      current_step: this.state.current_step - 1,
    })
  }

  finished() {
    this.setState({
      finished: true,
    })
    // automatically hide after 3s
    setTimeout(() => {
      this.setState({
        steps: undefined,
        current_step: 0,
        finished: false,
      })
    }, 3000)
  }

  render() {
    const currentStep =
      this.state.steps != null
        ? this.state.steps[this.state.current_step]
        : null

    const body = (
      <>
        <h6>{currentStep?.description}</h6>
        <FontAwesomeIcon
          size="10x"
          icon={currentStep?.icon || faQuestion}
          color={currentStep?.icon_color}
        />
      </>
    )
    return (
      <>
        <PresenterModal
          show={this.state.steps != null}
          showFinished={this.state.finished}
          title={<h1>{currentStep?.title}</h1>}
          body={body}
        />
      </>
    )
  }
}

export default RoutinePresenter
