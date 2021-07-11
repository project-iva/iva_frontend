import React, { Component } from 'react'
import { Meal } from '../../iva_communicator/presenterCommands'
import { PresenterModal } from './presenterModal'
import Presenter from './presenter'

type MealChoicePresenterState = {
  choices: Meal[] | undefined
  current_item: number
  finished: boolean
}

class MealChoicePresenter
  extends Component<{}, MealChoicePresenterState>
  implements Presenter
{
  constructor(props: {}) {
    super(props)

    this.state = {
      choices: undefined,
      current_item: 0,
      finished: false,
    }
  }

  start(choices: Meal[]) {
    this.setState({
      choices: choices,
      current_item: 0,
      finished: false,
    })
  }

  nextItem() {
    this.setState({
      current_item: this.state.current_item + 1,
    })
  }

  prevItem() {
    this.setState({
      current_item: this.state.current_item - 1,
    })
  }

  finished() {
    this.setState({
      finished: true,
    })
    // automatically hide after 3s
    setTimeout(() => {
      this.setState({
        choices: undefined,
        current_item: 0,
        finished: false,
      })
    }, 3000)
  }

  render() {
    const currentMeal =
      this.state.choices != null
        ? this.state.choices[this.state.current_item]
        : null
    return (
      <>
        <PresenterModal
          show={this.state.choices != null}
          showFinished={this.state.finished}
          title={<h1>{currentMeal?.name}</h1>}
          body={<h6>{currentMeal?.kcal}</h6>}
        />
      </>
    )
  }
}

export default MealChoicePresenter
