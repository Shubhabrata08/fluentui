import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { PieChart } from '@fluentui/react-charting';
import * as d3Color from 'd3-color';
import { ThemeProvider } from '@fluentui/react';
import { ThemeContext_unstable } from '@fluentui/react-shared-contexts';
import { Theme, webLightTheme } from '@fluentui/react-components';
import { myVariant } from './theme';
import { createV8Theme } from '@fluentui/react-migration-v8-v9';
storiesOf('react-charting/PieChart', module)
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
        <StoryWright steps={steps}>{story(context)}</StoryWright>
      </ThemeProvider>
    );
  })
  .addStory(
    'Basic',
    (context: any) => {
      const points = [
        { y: 50, x: 'A' },
        { y: 25, x: 'B' },
        { y: 25, x: 'C' },
      ];
      const colors = ['#e81123', '#0078d4', '#107c10'];
      return (
        <PieChart
          culture={window.navigator.language}
          data={points}
          chartTitle="Pie Chart basic example"
          colors={colors}
        />
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
