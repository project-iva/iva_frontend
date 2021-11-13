import React, { FunctionComponent } from 'react'
import { AssetDayPriceChange } from '../../store/assetsDayPriceChangeSlice'
import { ComputedDatum, PieCustomLayerProps, ResponsivePie } from '@nivo/pie'

type AssetsChartData = {
  id: string
  label: string
  value: number
}

type AssetsDistributionViewProps = {
  data: AssetDayPriceChange[]
}

export const AssetsDistributionView: FunctionComponent<AssetsDistributionViewProps> =
  (props: AssetsDistributionViewProps) => {
    const assetsTotalValue = props.data.reduce(
      (sum, dayPriceChange) => sum + (dayPriceChange.last_entry?.value ?? 0),
      0,
    )

    const assetsPrevTotalValue = props.data.reduce(
      (sum, dayPriceChange) =>
        sum + (dayPriceChange.prev_day_last_entry?.value ?? 0),
      0,
    )

    const assetsTotalValueDifference = assetsTotalValue - assetsPrevTotalValue
    let assetsTotalValuePercentageChange =
      (assetsTotalValueDifference / assetsPrevTotalValue) * 100

    const assetsChartData = props.data.map((dayPriceChange) => {
      return {
        id: dayPriceChange.asset.ticker,
        label: dayPriceChange.asset.name,
        value: dayPriceChange.last_entry?.value ?? 0,
      }
    }) as AssetsChartData[]

    const assetsTotalValueMetric = ({
      centerX,
      centerY,
    }: PieCustomLayerProps<AssetsChartData>) => {
      return (
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '30px',
            fontWeight: 600,
            fill: 'white',
          }}
        >
          {assetsTotalValue.toFixed(2)}€
        </text>
      )
    }

    const assetsTotalValueChangeMetric = ({
      centerX,
      centerY,
    }: PieCustomLayerProps<AssetsChartData>) => {
      return (
        <text
          x={centerX}
          y={centerY + 30}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '15px',
            fontWeight: 500,
          }}
          className={
            assetsTotalValueDifference >= 0 ? 'gain-text' : 'loss-text'
          }
        >
          {assetsTotalValueDifference.toFixed(2)}&euro; /{' '}
          {assetsTotalValuePercentageChange.toFixed(2)}&#37;
        </text>
      )
    }

    const theme = {
      textColor: 'white',
      fontSize: 22,
    }

    const chartProps = {
      data: assetsChartData,
      innerRadius: 0.55,
      padAngle: 1,
      cornerRadius: 4,
      theme: theme,
      arcLabel: (data: ComputedDatum<AssetsChartData>) => `${data.data.id}`,
      layers: [
        'arcs' as const,
        'legends' as const,
        'arcLabels' as const,
        assetsTotalValueMetric,
        assetsTotalValueChangeMetric,
      ],
      isInteractive: false,
      colors: { scheme: 'dark2' as const },
    }

    return (
      <div style={{ height: '350px' }}>
        <ResponsivePie {...chartProps} />
      </div>
    )
  }
