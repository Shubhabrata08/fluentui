import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IExampleState {
  dynamicData: IDataPoint[];
  colors: string[];
  statusKey: number;
  statusMessage: string;
}

/** This style is commonly used to visually hide text that is still available for the screen reader to announce. */
const screenReaderOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

export class VerticalBarChartDynamicExample extends React.Component<IVerticalBarChartProps, IExampleState> {
  private _colors = [
    [DefaultPalette.blueLight, DefaultPalette.blue, DefaultPalette.blueDark],
    [DefaultPalette.orangeLighter, DefaultPalette.orangeLight, DefaultPalette.orange],
    [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark],
    [DefaultPalette.magentaLight, DefaultPalette.magenta, DefaultPalette.magentaDark],
  ];
  private _colorIndex = 0;

  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      dynamicData: [
        { x: 0, y: 10 },
        { x: 12, y: 36 },
        { x: 21, y: 20 },
        { x: 29, y: 46 },
        { x: 40, y: 13 },
        { x: 50, y: 43 },
        { x: 57, y: 30 },
        { x: 64, y: 45 },
        { x: 78, y: 50 },
        { x: 90, y: 43 },
        { x: 100, y: 19 },
      ],
      colors: this._colors[0],
      statusKey: 0,
      statusMessage: '',
    };

    this._changeData = this._changeData.bind(this);
    this._changeColors = this._changeColors.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div style={{ width: '650px', height: '400px' }}>
        <VerticalBarChart
          chartTitle="Vertical bar chart dynamic example "
          data={this.state.dynamicData}
          colors={this.state.colors}
          hideLegend={true}
          hideTooltip={false}
          yMaxValue={50}
          yAxisTickCount={5}
          height={400}
          width={650}
          enableReflow={true}
        />

        <DefaultButton text="Change data" onClick={this._changeData} />
        <DefaultButton text="Change colors" onClick={this._changeColors} />
        <div aria-live="polite" aria-atomic="true">
          {/* Change the key so that React treats it as an update even if the message is same */}
          <p key={this.state.statusKey} style={screenReaderOnlyStyle}>
            {this.state.statusMessage}
          </p>
        </div>
      </div>
    );
  }

  private _changeData(): void {
    this.setState(prevState => ({
      dynamicData: [
        { x: 0, y: this._randomY() },
        { x: 12, y: this._randomY() },
        { x: 21, y: this._randomY() },
        { x: 29, y: this._randomY() },
        { x: 40, y: this._randomY() },
        { x: 48, y: this._randomY() },
        { x: 57, y: this._randomY() },
        { x: 64, y: this._randomY() },
        { x: 78, y: this._randomY() },
        { x: 90, y: this._randomY() },
        { x: 100, y: this._randomY() },
      ],
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Vertical bar chart data changed',
    }));
  }

  private _changeColors(): void {
    this._colorIndex = (this._colorIndex + 1) % this._colors.length;
    this.setState(prevState => ({
      colors: this._colors[this._colorIndex],
      statusKey: prevState.statusKey + 1,
      statusMessage: 'Vertical bar chart colors changed',
    }));
  }

  private _randomY(): number {
    return Math.random() * 45 + 5;
  }
}
