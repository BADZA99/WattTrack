import * as React from "react";
import * as XLSX from "xlsx";
// Utilitaire pour exporter en CSV
function exportToCSV(data, filename) {
  const header = ["Période", "Consommation (kWh)", "Montant (fcfa)"];
  const rows = data.map((row) => [
    row.label,
    row.consommation,
    row.montantFacture,
  ]);
  const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utilitaire pour exporter en Excel
function exportToExcel(data, filename) {
  const ws = XLSX.utils.json_to_sheet(
    data.map((row) => ({
      Période: row.label,
      "Consommation (kWh)": row.consommation,
      "Montant (fcfa)": row.montantFacture,
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Données");
  XLSX.writeFile(wb, filename);
}
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  consommation: {
    label: "Consommation (kWh)",
    color: "#60a5fa",
  },
  montantFacture: {
    label: "Montant (fcfa)",
    color: "#facc15",
  },
};

const getAvailableYears = (data) => {
  const years = new Set();
  data.forEach((d) => {
    const date = d.dateFin || d.date || d.dateDebut;
    if (date) {
      years.add(new Date(date).getFullYear());
    }
  });
  return Array.from(years).sort((a, b) => b - a);
};

// Regroupe les données par mois OU par bimestre (2 mois)
const getAggregates = (data, year, mode = "mois") => {
  if (mode === "bimestre") {
    // 6 bimestres
    const bimestres = Array.from({ length: 6 }, (_, i) => ({
      idx: i,
      consommation: 0,
      montantFacture: 0,
      count: 0,
      label: `${new Date(year, i * 2, 1).toLocaleString("fr-FR", {
        month: "short",
      })} - ${new Date(year, i * 2 + 1, 1).toLocaleString("fr-FR", {
        month: "short",
        year: "numeric",
      })}`,
    }));
    data.forEach((d) => {
      const date = d.dateFin || d.date || d.dateDebut;
      if (date) {
        const dt = new Date(date);
        if (dt.getFullYear() === year) {
          const m = dt.getMonth();
          const bi = Math.floor(m / 2);
          bimestres[bi].consommation += Number(d.consommation) || 0;
          bimestres[bi].montantFacture += Math.round(
            Number(d.montantFacture) || 0
          );
          bimestres[bi].count += 1;
        }
      }
    });
    return bimestres;
  } else {
    // Par mois
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      consommation: 0,
      montantFacture: 0,
      count: 0,
      dateObj: new Date(year, i, 1),
    }));
    data.forEach((d) => {
      const date = d.dateFin || d.date || d.dateDebut;
      if (date) {
        const dt = new Date(date);
        if (dt.getFullYear() === year) {
          const m = dt.getMonth();
          months[m].consommation += Number(d.consommation) || 0;
          months[m].montantFacture += Math.round(Number(d.montantFacture) || 0);
          months[m].count += 1;
        }
      }
    });
    return months.map((m) => ({
      ...m,
      label: m.dateObj.toLocaleString("fr-FR", {
        month: "short",
        year: "numeric",
      }),
    }));
  }
};

const ConsoMontantLineChart = ({ data }) => {
  const years = React.useMemo(() => getAvailableYears(data), [data]);
  const [selectedYear, setSelectedYear] = React.useState(
    () => years[0] || new Date().getFullYear()
  );
  // mode: "bimestre", "mois", "2dernierBim", "6premiersBim", "6derniersBim"
  const [mode, setMode] = React.useState("bimestre");

  // Données filtrées selon le mode
  const aggregates = React.useMemo(() => {
    const bims = getAggregates(data, selectedYear, "bimestre");
    if (mode === "2dernierBim") {
      return bims.slice(-1); // Dernier bimestre (2 derniers mois)
    }
    if (mode === "6premiersBim") {
      return bims.slice(0, 3); // 3 premiers bimestres (6 premiers mois)
    }
    if (mode === "6derniersBim") {
      return bims.slice(3, 6); // 3 derniers bimestres (6 derniers mois)
    }
    if (mode === "bimestre") {
      return bims;
    }
    // fallback: mois
    return getAggregates(data, selectedYear, "mois");
  }, [data, selectedYear, mode]);

  return (
    <Card className="w-full mx-auto h-auto bg-white rounded-xl shadow p-4 flex flex-col">
      {/* Boutons d'export */}
      <div className="flex gap-2 mb-2 justify-end">
        <button
          className="px-3 py-1 rounded border text-xs font-semibold bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          onClick={() =>
            exportToCSV(aggregates, `evolution_${selectedYear}_${mode}.csv`)
          }
        >
          Exporter CSV
        </button>
        <button
          className="px-3 py-1 rounded border text-xs font-semibold bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          onClick={() =>
            exportToExcel(aggregates, `evolution_${selectedYear}_${mode}.xlsx`)
          }
        >
          Exporter Excel
        </button>
      </div>
      <CardHeader>
        <CardTitle>
          Consommation & Montant par {mode === "bimestre" ? "bimestre" : "mois"}
        </CardTitle>
        <CardDescription>
          Choisissez une année et l'affichage (bimestre/mois)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Sélecteur d'année et de mode */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Année :</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-700">Affichage :</span>
            <button
              className={
                "px-3 py-1 rounded border text-xs font-semibold transition " +
                (mode === "bimestre"
                  ? "bg-blue-100 border-blue-400 text-blue-900"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
              }
              onClick={() => setMode("bimestre")}
              type="button"
            >
              Toute l'année (bimestre)
            </button>
            <button
              className={
                "px-3 py-1 rounded border text-xs font-semibold transition " +
                (mode === "2dernierBim"
                  ? "bg-blue-100 border-blue-400 text-blue-900"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
              }
              onClick={() => setMode("2dernierBim")}
              type="button"
            >
              2 derniers mois
            </button>
            <button
              className={
                "px-3 py-1 rounded border text-xs font-semibold transition " +
                (mode === "6premiersBim"
                  ? "bg-blue-100 border-blue-400 text-blue-900"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
              }
              onClick={() => setMode("6premiersBim")}
              type="button"
            >
              6 premiers mois
            </button>
            <button
              className={
                "px-3 py-1 rounded border text-xs font-semibold transition " +
                (mode === "6derniersBim"
                  ? "bg-blue-100 border-blue-400 text-blue-900"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
              }
              onClick={() => setMode("6derniersBim")}
              type="button"
            >
              6 derniers mois
            </button>
            <button
              className={
                "px-3 py-1 rounded border text-xs font-semibold transition " +
                (mode === "mois"
                  ? "bg-blue-100 border-blue-400 text-blue-900"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
              }
              onClick={() => setMode("mois")}
              type="button"
            >
              Par mois (optionnel)
            </button>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[220px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={aggregates}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={0}
                tickFormatter={(label) => label}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: "Valeur",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                }}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload || !payload.length) return null;
                  const conso = payload.find(
                    (p) => p.dataKey === "consommation"
                  );
                  const montant = payload.find(
                    (p) => p.dataKey === "montantFacture"
                  );
                  return (
                    <div className="bg-white rounded shadow p-2 text-xs min-w-[140px]">
                      <div className="font-semibold mb-1">{label}</div>
                      <div className="flex flex-col gap-1">
                        {conso && (
                          <div className="flex items-center justify-between">
                            <span>{chartConfig.consommation.label}:</span>
                            <span className="font-bold text-blue-700">
                              {conso.value}
                            </span>
                          </div>
                        )}
                        {montant && (
                          <div className="flex items-center justify-between">
                            <span>{chartConfig.montantFacture.label}:</span>
                            <span className="font-bold text-yellow-600">
                              {montant.value}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }}
              />
              <Line
                dataKey="consommation"
                type="monotone"
                stroke={chartConfig.consommation.color}
                strokeWidth={2}
                dot={false}
                name={chartConfig.consommation.label}
              />
              <Line
                dataKey="montantFacture"
                type="monotone"
                stroke={chartConfig.montantFacture.color}
                strokeWidth={2}
                dot={false}
                name={chartConfig.montantFacture.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Visualisation annuelle <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Affiche la consommation et le montant pour chaque{" "}
              {mode === "bimestre" ? "bimestre" : "mois"} de l'année
              sélectionnée
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConsoMontantLineChart;
