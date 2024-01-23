/* eslint-disable import/no-extraneous-dependencies */
import { createDarkTheme, BrandVariants } from '@fluentui/react-components';
import { Theme, webLightTheme } from '@fluentui/react-components';
import { ThemeContext_unstable as V9ThemeContext } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import * as d3Color from 'd3-color';
import { createV8Theme } from '@fluentui/react-migration-v8-v9';
export const myVariant: BrandVariants = {
  10: '#000000',
  20: '#220E03',
  30: '#3A1407',
  40: '#551809',
  50: '#701A0B',
  60: '#8D1B0A',
  70: '#AB1A09',
  80: '#CA1506',
  90: '#EA0A02',
  100: '#FF2D13',
  110: '#FF603E',
  120: '#FF8261',
  130: '#FF9F83',
  140: '#FFB8A4',
  150: '#FFD1C3',
  160: '#FFE8E2',
};
// eslint-disable-next-line @fluentui/max-len
export const getMyV8Theme = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const parentV9Theme = React.useContext(V9ThemeContext) as Theme;
  const v9Theme: Theme = parentV9Theme ? parentV9Theme : webLightTheme;
  const backgroundColor = d3Color.hsl(v9Theme.colorNeutralBackground1);
  const foregroundColor = d3Color.hsl(v9Theme.colorNeutralForeground1);
  const myV8Theme = createV8Theme(myVariant, v9Theme, backgroundColor.l < foregroundColor.l);
  return myV8Theme;
};
export const myCustomTheme = createDarkTheme(myVariant);
