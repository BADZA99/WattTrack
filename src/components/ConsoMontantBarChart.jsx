"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

  // Sélecteur de période
  const [periode, setPeriode] = React.useState("2mois"); // "2mois", "annee", "tout"

  // Filtrage selon la période sélectionnée
  const filteredData = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    const now = new Date();
    if (periode === "2mois") {
      // 60 derniers jours
      const cutoff = new Date(now);
      cutoff.setDate(now.getDate() - 59); // inclut aujourd'hui
      return data.filter((d) => {
        const d2 = d.dateFin
          ? new Date(d.dateFin)
          : d.date
          ? new Date(d.date)
          : null;
        return d2 && d2 >= cutoff;
      });
    }
    if (periode === "annee") {
      // 12 derniers mois
      const cutoff = new Date(now);
      cutoff.setFullYear(now.getFullYear() - 1);
      return data.filter((d) => {
        const d2 = d.dateFin
          ? new Date(d.dateFin)
          : d.date
          ? new Date(d.date)
          : null;
        return d2 && d2 >= cutoff;
      });
    }
    // tout l'historique
    return data;
  }, [data, periode]);

  // Preprocess data to round montantFacture
  const roundedData = React.useMemo(
    () =>
      Array.isArray(filteredData)
        ? filteredData.map((d) => ({
            ...d,
            montantFacture: Math.round(d.montantFacture),
          }))
        : [],
    [filteredData]
  );

  const [activeChart, setActiveChart] = React.useState("consommation");

  // Calcul total pour chaque type
  const total = React.useMemo(
    () => ({
      consommation: roundedData.reduce(
        (acc, curr) => acc + (curr.consommation || 0),
        0
      ),
      montantFacture: roundedData.reduce(
        (acc, curr) => acc + (curr.montantFacture || 0),
        0
      ),
    }),
    [roundedData]
  );

  return (
    <div className="w-full mx-auto h-80 bg-white rounded-xl shadow p-4 flex flex-col">
      {/* Sélecteur de période */}
      <div className="flex items-center gap-2 mb-2">
        {[
          { key: "2mois", label: "2 derniers mois" },
          { key: "annee", label: "Année dernière" },
          { key: "tout", label: "Tout" },
        ].map((p) => (
          <button
            key={p.key}
            className={
              "px-3 py-1 rounded border text-xs font-semibold transition " +
              (periode === p.key
                ? "bg-blue-100 border-blue-400 text-blue-900"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100")
            }
            onClick={() => setPeriode(p.key)}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch border-b mb-2">
        <div className="flex-1 flex flex-col justify-center gap-1 pb-2 sm:pb-0">
          <span className="text-lg font-bold text-gray-700">
            Bar Chart - Interactif
          </span>
          <span className="text-gray-500 text-sm">
            Consommation ou montant par période
          </span>
        </div>
        <div className="flex">
          {["consommation", "montantFacture"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className={
                "data-[active=true]:bg-blue-100 flex flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-4 transition " +
                (activeChart === key ? "bg-blue-100 font-bold" : "bg-white")
              }
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-gray-500">
                {chartConfig[key].label}
              </span>
              <span className="text-lg leading-none font-bold text-blue-900 sm:text-2xl">
                {total[key].toLocaleString()}{" "}
                {key === "consommation" ? "kWh" : "fcfa"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[220px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={roundedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(_, idx) => formatPeriode(roundedData[idx])}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: activeChart === "consommation" ? "kWh" : "FCFA",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey={activeChart}
                    labelFormatter={(_, idx) => formatPeriode(roundedData[idx])}
                  />
                }
              />
              <Bar
                dataKey={activeChart}
                fill={chartConfig[activeChart].color}
                radius={4}
                name={chartConfig[activeChart].label}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ConsoMontantBarChart;
