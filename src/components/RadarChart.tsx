import { ResponsiveRadar } from '@nivo/radar';

interface RadarChartProps {
  data: Array<{
    dimension: string;
    score: number;
  }>;
}

export const RadarChart = ({ data }: RadarChartProps) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveRadar
        data={data}
        keys={['score']}
        indexBy="dimension"
        maxValue={100}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={['hsl(200, 98%, 39%)']}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
      />
    </div>
  );
};