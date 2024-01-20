import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { IChartProps, IChartDataPoint, DonutChart } from '@fluentui/react-charting';
import { ThemeContext_unstable } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/react-components';
import { createV8Theme } from '@fluentui/react-migration-v8-v9';
import { myVariant } from './theme';
import * as d3Color from 'd3-color';
import { ThemeProvider } from '@fluentui/react';
storiesOf('react-charting/DonutChart', module)
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
        { legend: 'first', data: 20000, color: '#DADADA', xAxisCalloutData: '2020/04/30' },
        { legend: 'second', data: 39000, color: '#0078D4', xAxisCalloutData: '2020/04/20' },
      ];

      const data: IChartProps = {
        chartTitle: 'Donut chart basic example',
        chartData: points,
      };
      return (
        <div style={{ padding: 10 }}>
          <DonutChart
            culture={window.navigator.language}
            data={data}
            innerRadius={55}
            href={'https://developer.microsoft.com/en-us/'}
            legendsOverflowText={'overflow Items'}
            hideLegend={false}
            height={220}
            width={176}
            valueInsideDonut={39000}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Dynamic',
    () => {
      const data: IChartProps = {
        chartTitle: 'Donut chart dynamic example',
        chartData: [
          {
            legend: 'first',
            data: Math.floor(120),
            color: '#00bcf2',
          },
          {
            legend: 'second',
            data: Math.floor(130),
            color: '#b4a0ff',
          },
          {
            legend: 'third',
            data: Math.floor(10),
            color: '#fff100',
          },
          {
            legend: 'fourth',
            data: Math.floor(270),
            color: '#605e5c',
          },
        ],
      };

      return (
        <div style={{ padding: 10 }}>
          <DonutChart
            data={data}
            innerRadius={35}
            legendProps={{
              allowFocusOnLegends: true,
            }}
            hideLabels={false}
            showLabelsInPercent={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
