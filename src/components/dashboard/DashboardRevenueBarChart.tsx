import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type Point = { label: string; revenue: number };

export default function DashboardRevenueBarChart({ data }: { data: Point[] }) {
  const categories = data.map((d) => d.label);
  const values = data.map((d) => d.revenue);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    colors: ["#7c3aed"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: ["#c4b5fd"],
        opacityFrom: 1,
        opacityTo: 0.75,
        stops: [0, 100],
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "48%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    grid: { yaxis: { lines: { show: true } } },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { rotate: -45, style: { fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
        formatter: (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(Math.round(v))),
      },
      title: { text: "Revenue" },
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      },
    },
  };

  const series = [{ name: "Revenue", data: values }];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[600px]">
        <Chart options={options} series={series} type="bar" height={300} />
      </div>
    </div>
  );
}
