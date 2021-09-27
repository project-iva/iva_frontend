import React, { FunctionComponent } from 'react'
import { AssetDayPriceChange } from '../../store/assetsDayPriceChangeSlice'

type AssetsPriceDayChangeViewProps = {
  data: AssetDayPriceChange[]
}

export const AssetsPriceDayChangeView: FunctionComponent<AssetsPriceDayChangeViewProps> =
  (props: AssetsPriceDayChangeViewProps) => {
    const assetsTotalValue = props.data.reduce(
      (sum, dayPriceChange) => sum + dayPriceChange.last_entry.value,
      0,
    )

    const tableRows = props.data.map((dayPriceChange) => {
      let priceDifference =
        dayPriceChange.last_entry.market_price -
        dayPriceChange.prev_day_last_entry.market_price
      let percentageChange =
        (priceDifference / dayPriceChange.prev_day_last_entry.market_price) *
        100

      let priceChangeText = (
        <span className={priceDifference >= 0 ? 'gain-text' : 'loss-text'}>
          {priceDifference.toFixed(2)}€ / {percentageChange.toFixed(2)}
          &#37;
        </span>
      )

      let assetPercentage =
        (dayPriceChange.last_entry.value / assetsTotalValue) * 100

      return (
        <tr key={dayPriceChange.asset.ticker}>
          <td className={'align-middle'}>
            {dayPriceChange.asset.name} ({dayPriceChange.asset.ticker})
          </td>
          <td className={'align-middle'}>
            {dayPriceChange.last_entry.value.toFixed(2)}€ (
            {assetPercentage.toFixed(2)}&#37;)
          </td>
          <td className={'align-middle'}>
            {dayPriceChange.last_entry.market_price.toFixed(2)}€ (
            {priceChangeText})
          </td>
        </tr>
      )
    })

    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Value</th>
            <th scope="col">Market price</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    )
  }
