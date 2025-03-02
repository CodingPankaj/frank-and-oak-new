import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export const OrderSummaryPieChart = () => {
  const data = [
    { name: "Delivered", value: 1754 },
    { name: "Pending", value: 1251 },
    { name: "Cancelled", value: 152 },
    { name: "Returned", value: 91 },
  ];

  return (
    <div className="flex items-center justify-center border-b border-border-color py-2">
      <PieChart width={400} height={280}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          <Cell fill="#725cff" />
          <Cell fill="#22C55E" />
          <Cell fill="#EF4444" />
          <Cell fill="#06B6D4" />
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            width: "100%",
          }}
        />
      </PieChart>
    </div>
  );
};
