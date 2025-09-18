import ConsoMontantBarChart from "./ConsoMontantBarChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
// 40968;
// 41397

function sortData(data, sortBy, sortOrder) {
  if (!sortBy) return data;
  return [...data].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    if (sortBy === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });
}

const PAGE_SIZE = 10;

const columns = [
  { key: "date", label: "Date" },
  { key: "dateDebut", label: "Début" },
  { key: "dateFin", label: "Fin" },
  { key: "indexDebut", label: "Index Début" },
  { key: "indexFin", label: "Index Fin" },
  { key: "nbJours", label: "Jours" },
  { key: "consommation", label: "Conso" },
  { key: "consoMoyenne", label: "Moyenne" },
  { key: "montantFacture", label: "Montant Facture" },
];

const Historique = ({ historique }) => {
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("date");
  const [sortOrder, setSortOrder] = React.useState("desc");

  const sortedData = React.useMemo(
    () => sortData(historique, sortBy, sortOrder),
    [historique, sortBy, sortOrder]
  );
  const paginatedData = React.useMemo(
    () => sortedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sortedData, page]
  );
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 flex flex-col gap-6 items-stretch bg-transparent">
      <div className="w-full">
        {historique.length === 0 ? (
          <div className="text-gray-500">Aucune consultation enregistrée.</div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white dark:text-white">
              Historique des consultations
            </h2>
            <div className="w-full overflow-x-auto">
              <Table className="rounded-lg shadow-lg border border-gray-200 bg-white">
                <TableCaption className="text-base font-semibold text-blue-900 bg-blue-50 rounded-t-lg py-2">
                  Liste de toutes vos factures enregistrées.
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-blue-100 sticky top-0 z-10">
                    <TableHead className="w-[60px] text-blue-900 font-bold">
                      #
                    </TableHead>
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className={
                          "cursor-pointer select-none text-blue-900 font-bold transition-colors duration-150 hover:bg-blue-200 " +
                          (sortBy === col.key ? "bg-blue-200" : "")
                        }
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        {sortBy === col.key
                          ? sortOrder === "asc"
                            ? " ▲"
                            : " ▼"
                          : null}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, idx) => (
                    <TableRow
                      key={idx}
                      className={
                        ((page - 1) * PAGE_SIZE + idx) % 2 === 0
                          ? "bg-gray-50 hover:bg-blue-50 transition-colors"
                          : "bg-white hover:bg-blue-50 transition-colors"
                      }
                    >
                      <TableCell className="font-bold text-blue-900">
                        {(page - 1) * PAGE_SIZE + idx + 1}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {new Date(item.date).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.dateDebut}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.dateFin}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.indexDebut}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.indexFin}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.nbJours}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {item.consommation}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {Number(item.consoMoyenne).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-yellow-900 font-bold">
                        {Number(item.montantFacture).toFixed(2)} fcfa
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="text-right bg-blue-50 rounded-b-lg"
                    >
                      <div className="flex flex-wrap gap-2 justify-end items-center py-2">
                        <button
                          className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-semibold hover:bg-blue-300 transition disabled:opacity-50"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Précédent
                        </button>
                        <span className="mx-2 text-blue-900 font-semibold">
                          Page {page} / {totalPages}
                        </span>
                        <button
                          className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-semibold hover:bg-blue-300 transition disabled:opacity-50"
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={page === totalPages}
                        >
                          Suivant
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </>
        )}
      </div>

      {historique.length > 0 ? (
        <div className="w-full mt-8">
          <ConsoMontantBarChart data={historique} />
        </div>
      ) : (
        <p className="text-center w-full mt-8 text-gray-500">historique vide</p>
      )}
    </div>
  );
};

export default Historique;
