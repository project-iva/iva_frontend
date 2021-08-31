import React, { FunctionComponent, useEffect } from 'react'
import { fetchAssetsDayPriceChange } from '../../store/assetsDayPriceChangeSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AssetsDistributionView } from './assetsDistributionView'
import { AssetsPriceDayChangeView } from './assetsPriceDayChangeView'

export const AssetsView: FunctionComponent = () => {
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

  dayPriceChanges.forEach((dayPriceChange) => {
    let priceDifference =
      dayPriceChange.last_entry.market_price -
      dayPriceChange.prev_day_last_entry.market_price
    let percentageChange =
      (priceDifference / dayPriceChange.prev_day_last_entry.market_price) * 100
    console.log({ dayPriceChange, priceDifference, percentageChange })
  })

  return (
    <div className={'card card-item'}>
      <div className="card-body">
        <div className={'container-fluid text-center'}>
          <h2>Assets</h2>
          <div className={'row align-items-center'}>
            <div className={'col-6'}>
              <AssetsDistributionView data={dayPriceChanges} />
            </div>
            <div className={'col-6'}>
              <AssetsPriceDayChangeView data={dayPriceChanges} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}