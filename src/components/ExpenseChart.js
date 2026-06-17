import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
  } from "recharts";
  
  function ExpenseChart({ expenses }) {
    const data = expenses.map((expense) => ({
      name: expense.title,
      value: Number(expense.amount),
    }));
  
    const COLORS = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
    ];
  
    return (
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
  
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }
  
  export default ExpenseChart;