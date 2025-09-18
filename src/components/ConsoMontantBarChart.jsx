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
  // Helper to format a period label from dateDebut and dateFin
  const formatPeriode = (entry) => {
    if (!entry?.dateDebut || !entry?.dateFin) return "";
    const d1 = new Date(entry.dateDebut);
    const d2 = new Date(entry.dateFin);
    const f1 = d1.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const f2 = d2.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    return `${f1} - ${f2}`;
  };

  // Preprocess data to round montantFacture
  const roundedData = Array.isArray(data)
    ? data.map((d) => ({ ...d, montantFacture: Math.round(d.montantFacture) }))
    : [];

  return (
    <div className="w-full mx-auto h-80 bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold mb-4 text-gray-700">
        Consommation & Montant de la facture
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={roundedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(_, idx) => formatPeriode(roundedData[idx])}
            interval={0}
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
            formatter={(value, name) => {
              if (name === "consommation") return `${value} kWh`;
              if (name === "Montant (fcfa)" || name === "montantFacture")
                return `${value} fcfa`;
              return value;
            }}
            labelFormatter={(_, idx) => formatPeriode(roundedData[idx])}
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
  // (removed duplicate export and extra closing brace)
};

export default ConsoMontantBarChart;
