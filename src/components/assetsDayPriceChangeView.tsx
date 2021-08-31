import React, { FunctionComponent, useEffect } from 'react'
import { fetchAssetsDayPriceChange } from '../store/assetsDayPriceChangeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { ComputedDatum, PieCustomLayerProps, ResponsivePie } from '@nivo/pie'

type AssetsChartData = {
  id: string
  label: string
  value: number
}

export const AssetsDayPriceChangeView: FunctionComponent = () => {
  const dayPriceChanges = useAppSelector(
    (state) => state.assetsDayPriceChange.data,
  )
  const dayPriceChangesStatus = useAppSelector(
    (state) => state.assetsDayPriceChange.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (dayPriceChangesStatus === 'idle') {
      dispatch(fetchAssetsDayPriceChange())
    }
  }, [dayPriceChangesStatus, dispatch])

  console.log(dayPriceChanges)
  const assetsTotalValue = dayPriceChanges.reduce(
    (sum, dayPriceChange) => sum + dayPriceChange.last_entry.value,
    0,
  )
  const assetsChartData = dayPriceChanges.map((dayPriceChange) => {
    return {
      id: dayPriceChange.asset.ticker,
      label: dayPriceChange.asset.name,
      value: dayPriceChange.last_entry.value,
    }
  }) as AssetsChartData[]

  dayPriceChanges.forEach((dayPriceChange) => {
    let priceDifference =
      dayPriceChange.last_entry.market_price -
      dayPriceChange.prev_day_last_entry.market_price
    let percentageChange =
      (priceDifference / dayPriceChange.prev_day_last_entry.market_price) * 100
    console.log({ dayPriceChange, priceDifference, percentageChange })
  })

  const centeredMetric = ({
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
        {assetsTotalValue.toFixed(2)} &#128;
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
      centeredMetric,
    ],
    isInteractive: false,
    colors: { scheme: 'dark2' as const },
  }

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid text-center'}>
          <h2>Assets</h2>
          <div className={'row'}>
            <div className={'col'}>
              <div style={{ height: '350px' }}>
                <ResponsivePie {...chartProps} />
              </div>
            </div>
            <div className={'col'}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
