import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

// currencySymbol: e.g. $, ₦, €, etc., used in the y-axis.

const AreaChart = ({ historicalData, currencySymbol }) => {
  // Initializes chart data with just the header row.

// Chart expects 2 columns: Date and Price.
  const [data, setData] = useState([["Date", "Prices"]]);



  /**
   * 
   * Runs when historicalData changes.

Converts timestamps to JS Date objects and creates chart-friendly data format.

Adds headers to the top of the array.
   * 
   * 
   */
  useEffect(() => {
    if (historicalData?.prices) {
      const formattedData = historicalData.prices.map(item => [
        new Date(item[0]),
        item[1]
      ]);
      setData([['Date', 'Price'], ...formattedData]);
    }
  }, [historicalData]);
  console.log(currencySymbol);




  /**
   * Defines styling and formatting for the chart:

Transparent background, colored lines, smoothed curve.

Axis labels in white.

Tooltips are styled and formatted.

currencySymbol is dynamically used in vertical axis formatting.
   * 
   */


     const options = {
        backgroundColor: 'transparent',
        legend: 'none',
        curveType: 'function',
        hAxis: {
            textStyle: { color: '#FFFFFF' },
            gridlines: { color: '#444444' },
            format: 'MMM dd',
        },
       vAxis: {
  textStyle: { color: '#FFFFFF' },
  gridlines: { color: '#444444' },
  format: `${currencySymbol}#,##0.00`
},
        chartArea: {
            backgroundColor: {
                fill: 'transparent',
                opacity: 0
            },
            width: '90%',
            height: '80%'
        },
        colors: ['#10B981'],
        lineWidth: 3,
        // Trendlines may be specific to certain chart types and might need adjustment
        trendlines: {
            0: {
                type: 'linear',
                color: '#00FFFF',
                lineWidth: 1,
                opacity: 0.4,
                showR2: false
            }
        },
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
            color: '#00FFFF',
            opacity: 0.2
        },
        tooltip: {
            textStyle: { color: '#000000' },
            showColorCode: true,
            isHtml: true
        }
    };



    /**The chart is wrapped in a styled Tailwind div.

Chart renders a Google AreaChart using:

data: your formatted price/time data.

options: all the styling/settings above.

loader: a fallback while the chart is still loading.

 */
  return (
    <div className='w-full bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20'>
      <Chart chartType='AreaChart'
  data={data} options={options} loader={<div className='text-emerald-400'>Loading Market Data...</div>}
  rootProps={{ 'data-testid': '1' }}
/>
    </div>
  )
}

export default AreaChart