import React, { FunctionComponent } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { CaloriesChartData } from './caloriesGoalView'

type ConsumedCaloriesNutritionViewProps = {
  protein: number
  fat: number
  carbs: number
}

export const ConsumedCaloriesNutritionView: FunctionComponent<ConsumedCaloriesNutritionViewProps> =
  (props: ConsumedCaloriesNutritionViewProps) => {
    const caloriesData = [
      {
        id: 'protein',
        label: 'Protein',
        value: props.protein,
        color: 'rgb(253, 90, 96)',
      },
      {
        id: 'fat',
        label: 'Fat',
        value: props.fat,
        color: 'rgb(175, 210, 103)',
      },
      {
        id: 'carbs',
        label: 'Carbs',
        value: props.carbs,
        color: 'rgb(70, 116, 174)',
      },
    ] as CaloriesChartData[]

    console.log(caloriesData)

    const legend = {
      anchor: 'bottom' as const,
      direction: 'column' as const,
      justify: false,
      translateY: 100,
      itemsSpacing: 8,
      itemWidth: 100,
      itemHeight: 20,
      symbolSize: 15,
    }

    const theme = {
      textColor: 'white',
      fontSize: 25,
    }

    const chartProps = {
      data: caloriesData,
      margin: { bottom: 100 },
      enableArcLinkLabels: false,
      innerRadius: 0.5,
      padAngle: 0.7,
      cornerRadius: 3,
      activeOuterRadiusOffset: 8,
      theme: theme,
      isInteractive: false,
      legends: [legend],
      colors: { datum: 'data.color' },
    }

    return (
      <div style={{ height: '300px' }}>
        <ResponsivePie {...chartProps} />
      </div>
    )
  }
