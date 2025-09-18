import React from "react";
import ConsoMontantBarChart from "./ConsoMontantBarChart";
// 40968;
// 41397
const Historique = ({ historique }) => {
  return (
    <div className="p-2 sm:p-4 md:p-6 w-full max-w-5xl mx-auto flex flex-col gap-6 items-stretch bg-transparent">
      <div className="w-full">
        {historique.length === 0 ? (
          <div className="text-gray-500">Aucune consultation enregistrée.</div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white dark:text-white">
              Historique des consultations
            </h2>
            <div className="flex flex-col w-full">
              <div className="overflow-x-auto">
                <div className="py-2 inline-block min-w-full px-1 sm:px-4">
                  <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Début
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Fin
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Index Début
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Index Fin
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Jours
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Conso
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800"
                          >
                            Moyenne
                          </th>
                          <th
                            scope="col"
                            className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-yellow-900"
                          >
                            Montant Facture
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historique.map((item, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                          >
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                              {idx + 1}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {new Date(item.date).toLocaleString()}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.dateDebut}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.dateFin}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.indexDebut}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.indexFin}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.nbJours}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.consommation}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900 font-medium">
                              {item.consoMoyenne?.toFixed(2)}
                            </td>
                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-yellow-900 font-bold">
                              {item.montantFacture?.toFixed(2)} fcfa
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
