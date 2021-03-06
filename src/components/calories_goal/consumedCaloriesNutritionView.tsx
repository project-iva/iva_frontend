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
        label: `Protein (${parseFloat(props.protein.toFixed(1))}g)`,
        value: props.protein,
        color: 'rgb(253, 90, 96)',
      },
      {
        id: 'fat',
        label: `Fat (${parseFloat(props.fat.toFixed(1))}g)`,
        value: props.fat,
        color: 'rgb(175, 210, 103)',
      },
      {
        id: 'carbs',
        label: `Carbs (${parseFloat(props.carbs.toFixed(1))}g)`,
        value: props.carbs,
        color: 'rgb(70, 116, 174)',
      },
    ] as CaloriesChartData[]

    const legend = {
      anchor: 'bottom-left' as const,
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
      margin: { bottom: 110 },
      enableArcLinkLabels: false,
      enableArcLabels: false,
      innerRadius: 0.5,
      padAngle: 2,
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
