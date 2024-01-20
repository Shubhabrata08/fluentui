import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { IChartDataPoint, IChartProps, StackedBarChart } from '@fluentui/react-charting';
import * as d3Color from 'd3-color';
import { ThemeProvider } from '@fluentui/react';
import { ThemeContext_unstable } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/react-components';
import { myVariant } from './theme';
import { createV8Theme } from '@fluentui/react-migration-v8-v9';
storiesOf('react-charting/StackedBarChart', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    const parentV9Theme = React.useContext(ThemeContext_unstable) as Theme;
    const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;
    const backgroundColor = d3Color.hsl(v9Theme.colorNeutralBackground1);
    const foregroundColor = d3Color.hsl(v9Theme.colorNeutralForeground1);
    const myV8Theme = createV8Theme(myVariant, v9Theme, backgroundColor.l < foregroundColor.l);
    return (
      <ThemeProvider theme={myV8Theme}>
        <StoryWright steps={steps}>{story()}</StoryWright>
      </ThemeProvider>
    );
  })
  .addStory(
    'Basic',
    () => {
      const points: IChartDataPoint[] = [
        {
          legend: 'first',
          data: 3000000,
          color: '#0078d4',
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '40%',
        },
        {
          legend: 'second',
          data: 1,
          color: '#107c10',
        },
      ];

      const data0: IChartProps = {
        chartTitle: 'Stacked Bar chart example',
        chartData: points,
      };

      const data1: IChartProps = {
        chartTitle: 'Stacked Bar chart example with ignore fix style',
        chartData: points,
      };

      return (
        <div style={{ width: 900 }}>
          <StackedBarChart
            culture={window.navigator.language}
            data={data0}
            href={'https://developer.microsoft.com/en-us/'}
            ignoreFixStyle={false}
          />
          <br />
          <StackedBarChart
            culture={window.navigator.language}
            data={data1}
            href={'https://developer.microsoft.com/en-us/'}
            ignoreFixStyle={true}
            hideTooltip={true}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Multiple',
    () => {
      const points: IChartDataPoint[] = [
        {
          legend: 'This is the first legend of the chart',
          data: 40,
          color: '#5c005c',
        },
        {
          legend: 'This is the second legend of the chart',
          data: 23,
          color: '#e81123',
        },
        {
          legend: 'This is the third legend of the chart',
          data: 35,
          color: '#00bcf2',
        },
        {
          legend: 'This is the fourth legend of the chart',
          data: 87,
          color: '#bad80a',
        },
      ];
      const chartTitle = 'Stacked bar chart 2nd example';

      const data: IChartProps = {
        chartTitle: chartTitle,
        chartData: points,
      };

      return (
        <div style={{ padding: 10 }}>
          <StackedBarChart data={data} enabledLegendsWrapLines={true} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Benchmark',
    () => {
      const points: IChartDataPoint[] = [
        { legend: 'first', data: 10, color: '#a4262c' },
        {
          legend: 'second',
          data: 90,
          color: '#c8c6c4',
          placeHolder: true,
        },
      ];

      const data: IChartProps = {
        chartData: points,
      };

      return (
        <div style={{ padding: 10 }}>
          <StackedBarChart data={data} ignoreFixStyle={true} />
          <br />
          <StackedBarChart data={data} ignoreFixStyle={true} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
