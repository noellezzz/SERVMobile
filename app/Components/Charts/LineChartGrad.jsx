import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { CurveType, LineChart } from 'react-native-gifted-charts'
import { LinearGradient, Stop } from 'react-native-svg'

const LineChartGrad = ({ data }) => {
  const { width, height } = useWindowDimensions()

  return (
    <LineChart
      initialSpacing={0}
      data={data}
      spacing={width * 0.107}
      hideDataPoints
      thickness={3}
      curveType={CurveType.QUADRATIC}
      hideRules
      hideYAxisText
      yAxisColor="rgba(255,255,255, 0.8)"
      showVerticalLines
      verticalLinesColor="rgba(255,255,255, 0.4)"
      xAxisColor="rgba(255,255,255, 0.8)"
      color="rgba(255,255,255, 0.8)"
      height={height * 0.15}
      curved
      lineGradient
      lineGradientId="ggrd"
      lineGradientComponent={() => {
        return (
          <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={'red'} />
            <Stop offset="1" stopColor={'white'} />
          </LinearGradient>
        )
      }}
    />
  )
}

export default LineChartGrad
