import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function DashboardSparkline({
  data,
  color = "#ffffff",
}: {
  data: number[];
  color?: string;
}) {
  const series = data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0];
  const options: ApexOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
      animations: { enabled: true, speed: 400 },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    colors: [color],
    tooltip: { enabled: false },
  };

  return (
    <div className="h-12 w-full opacity-90">
      <Chart options={options} series={[{ data: series }]} type="area" height={48} width="100%" />
    </div>
  );
}
