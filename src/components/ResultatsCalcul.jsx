import React from "react";

export default function ResultatsCalcul({
  selectedTab,
  setSelectedTab,
  result,
  altResults,
  setResult,
}) {
  return (
    <div className="w-full md:w-[40%] max-w-xl">
      {/* Tab Buttons */}
      <div className="bg-[var(--prev-blue)] p-2 rounded-t-lg">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {[
            { key: "tab1", label: "Resultats" },
            { key: "infos", label: "Informations" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-white font-semibold border-b-4 border-blue-700 hover:bg-blue-700 focus:outline-none tab-button ${
                selectedTab === tab.key
                  ? " bg-[var(--prev-bg)] text-[var(--prev-blue)] border-[var(--prev-blue)]"
                  : ""
              }`}
              onClick={() => setSelectedTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div
        className={`p-3 sm:p-4 tab-content bg-white shadow-md rounded-lg ${
          selectedTab !== "tab1" ? "hidden" : ""
        }`}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Resultats
            </h3>
            {result ? (
              <p className="mt-1 max-w-2xl text-md text-gray-500">
                Du {result.dateDebut} au {result.dateFin}
              </p>
            ) : (
              <p className="mt-1 max-w-2xl text-md text-gray-500">
                Veuillez remplir le formulaire pour voir les Resultats
              </p>
            )}
          </div>
          <div className="border-t border-gray-200 px-2 sm:px-4 py-5 sm:p-0">
            {result && (
              <>
                <dl className="divide-y divide-gray-100">
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-blue-800 tracking-wide">
                      Nombre de jours
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-yellow-700 sm:mt-0 sm:col-span-2 text-center">
                      {result.nbJours}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-blue-800 tracking-wide">
                      Consommation totale
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-blue-700 sm:mt-0 sm:col-span-2 text-center">
                      {result.consommation}{" "}
                      <span className="text-base font-semibold">kWh</span>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-blue-800 tracking-wide">
                      Moyenne journalière
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-blue-500 sm:mt-0 sm:col-span-2 text-center">
                      {result.consoMoyenne.toFixed(2)}{" "}
                      <span className="text-base font-semibold">kWh/jour</span>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-blue-800 tracking-wide">
                      Montant consommation
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-yellow-800 sm:mt-0 sm:col-span-2 text-center">
                      {result.montantConso.toFixed(2)}{" "}
                      <span className="text-base font-semibold">fcfa</span>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-gray-700">
                      TCO
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-gray-800 sm:mt-0 sm:col-span-2 text-center">
                      {result.TCO.toFixed(2)}{" "}
                      <span className="text-base font-semibold">fcfa</span>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-gray-700">
                      Redevance
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-gray-800 sm:mt-0 sm:col-span-2 text-center">
                      {result.redevance.toFixed(2)}{" "}
                      <span className="text-base font-semibold">fcfa</span>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-2 sm:py-3 items-center">
                    <dt className="text-[1.05rem] sm:text-lg font-medium text-gray-700">
                      TVA
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-gray-800 sm:mt-0 sm:col-span-2 text-center">
                      {result.TVA.toFixed(2)}{" "}
                      <span className="text-base font-semibold">fcfa</span>
                    </dd>
                  </div>
                  {/* Montant Facture mis en avant */}
                  <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4 py-4 sm:py-6 items-center bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 rounded-xl mt-4 shadow-lg border-2 border-yellow-300">
                    <dt className="text-xl sm:text-2xl font-extrabold text-yellow-900 uppercase tracking-widest text-center sm:col-span-3 mb-2">
                      Montant Facture
                    </dt>
                    <dd className="mt-1 text-4xl sm:text-5xl font-black text-yellow-900 sm:mt-0 sm:col-span-3 text-center drop-shadow-2xl ">
                      {result.montantFacture.toFixed(2)}{" "}
                      <span className="text-2xl font-bold">fcfa</span>
                    </dd>
                  </div>
                </dl>
                {/* Résultats alternatifs pour d'autres périodes */}
                {altResults.length > 0 && (
                  <div className="mt-6">
                    <div className="font-semibold text-gray-700 mb-2">
                      Comparer pour d'autres périodes de facturation :
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {altResults.map((alt) => (
                        <button
                          key={alt.jours}
                          className={`px-3 py-1 rounded text-md font-bold border transition
                            ${
                              result.nbJours === alt.jours
                                ? "bg-[var(--prev-blue)] text-white border-[var(--prev-blue)]"
                                : "bg-[var(--prev-yellow)] text-black border-[var(--prev-yellow)] hover:bg-yellow-300"
                            }
                          `}
                          onClick={() =>
                            setResult({
                              ...result,
                              nbJours: alt.jours,
                              ...alt,
                            })
                          }
                          type="button"
                        >
                          {alt.jours} jours
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cliquez sur une période pour voir le détail du calcul avec
                      ce nombre de jours.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`p-3 sm:p-4 tab-content bg-white shadow-md rounded-lg ${
          selectedTab !== "infos" ? "hidden" : ""
        }`}
      >
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Informations
            </h3>
            <p className="mt-1 max-w-2xl text-md text-gray-500">
              Dernier visite le date
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-md font-medium text-gray-500">
                  Puissance souscrite
                </dt>
                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                  DDP (utilisation domestique petite puissance) moins de 6kw
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-md font-medium text-gray-500">Tva</dt>
                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                  18%
                </dd>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-md font-medium text-gray-500">redevance</dt>
                <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                  (nbj * 901) /63
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
