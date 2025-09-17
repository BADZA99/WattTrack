import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ConsoMontantBarChart = ({ data }) => {
  return (
    <div className="w-1/2 mx-auto h-80 bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold mb-4 text-gray-700">
        Consommation & Montant de la facture
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => {
              if (!date) return "";
              const d = new Date(date);
              return d.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12 }}
            label={{
              value: "kWh",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            label={{
              value: "FCFA",
              angle: 90,
              position: "insideRight",
              fontSize: 12,
            }}
          />
          <Tooltip
            formatter={(value, name) =>
              name === "consommation" ? `${value} kWh` : `${value} fcfa`
            }
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="consommation"
            fill="#60a5fa"
            name="Consommation (kWh)"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="montantFacture"
            fill="#facc15"
            name="Montant (fcfa)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConsoMontantBarChart;
