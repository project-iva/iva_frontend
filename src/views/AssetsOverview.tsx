import { ResponsiveLine } from '@nivo/line'
import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchAssets } from '../store/assetsSlice'

type AssetsChartDataEntry = {
  x: string
  y: number
}

type AssetsChartData = {
  [key: string]: AssetsChartDataEntry[]
}

export const AssetsOverview: FunctionComponent = () => {
  const assets = useAppSelector((state) => state.assets.assetsTrackerData)
  const assetsStatus = useAppSelector((state) => state.assets.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (assetsStatus === 'idle') {
      dispatch(fetchAssets())
    }
  }, [assetsStatus, dispatch])
  console.log(assets)

  const assetsData: AssetsChartData = {
    total: [],
  }

  assets.forEach((asset) => {
    let total = 0
    asset.asset_tracker_entries.forEach((entry) => {
      const assetName = entry.asset.name
      const assetValue = entry.value
      total += assetValue

      const dataEntry = { x: asset.date, y: assetValue }
      if (assetsData.hasOwnProperty(assetName)) {
        assetsData[assetName].push(dataEntry)
      } else {
        assetsData[assetName] = [dataEntry]
      }
    })

    assetsData['total'].push({ x: asset.date, y: total })
  })

  const chartData = Object.entries(assetsData).map(([assetName, entries]) => {
    return {
      id: assetName,
      data: entries,
    }
  })

  const legend = {
    anchor: 'bottom-right' as const,
    direction: 'column' as const,
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: 'left-to-right' as const,
    itemOpacity: 0.85,
    symbolSize: 20,
  }

  const theme = {
    textColor: 'white',
    fontSize: 14,
  }
  const chartProps = {
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: chartData,
    enablePointLabel: true,
    pointSize: 16,
    pointBorderWidth: 1,
    theme: theme,
    axisBottom: {
      tickSize: 0,
    },
    axisLeft: {
      tickSize: 0,
    },
    legends: [legend],
  }

  return (
    <aside>
      <div style={{ height: '500px' }}>
        <ResponsiveLine {...chartProps} />
      </div>
    </aside>
  )
}
