import React from "react";
import { calculPeriodeEtConso, montantConsommation } from "../utils/operations";
import Historique from "./components/historique";


export default function FormulaireCalcul() {
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  const [form, setForm] = React.useState({
    dateDebut: "",
    dateFin: "",
    indexDebut: "",
    indexFin: "",
  });
  const [result, setResult] = React.useState(null);
  const [altResults, setAltResults] = React.useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dateDebut, dateFin, indexDebut, indexFin } = form;
    if (!dateDebut || !dateFin || !indexDebut || !indexFin) return;
    const { nbJours, consommation, consoMoyenne } = calculPeriodeEtConso(
      dateDebut,
      dateFin,
      indexDebut,
      indexFin
    );
    const montant = montantConsommation(consommation, nbJours);
    const now = new Date().toISOString();


    // Création de l'objet à enregistrer
    const entry = {
      date: now,
      dateDebut,
      dateFin,
      indexDebut: Number(indexDebut),
      indexFin: Number(indexFin),
      nbJours,
      consommation,
      consoMoyenne,
      montantFacture: montant.montantFacture,
    };

    // Enregistrement dans le localStorage
    let data = localStorage.getItem("consultationData");
    let parsed = data
      ? JSON.parse(data)
      : { derniereConsultation: null, historique: [] };
    parsed.derniereConsultation = now;
    parsed.historique.unshift(entry);
    localStorage.setItem("consultationData", JSON.stringify(parsed));

    setResult({
      nbJours,
      consommation,
      consoMoyenne,
      ...montant,
      dateDebut,
      dateFin,
    });

    // Générer les résultats alternatifs pour les périodes de 50 à 65 jours
    const alt = [];
    for (let jours = 50; jours <= 65; jours++) {
      if (jours === nbJours) continue;
      alt.push({
        jours,
        ...montantConsommation(consommation, jours),
      });
    }
    setAltResults(alt);
    setSelectedTab("tab1");
  };

  return (
    <div className=" mx-auto flex justify-between items-start bg-transparent w-[85%] h-auto pt-6   ">
      <div className="w-[45%]  bg-white shadow-lg rounded-lg ">
        <div className="text-2xl py-4 px-4 bg-[var(--prev-yellow)] text-white text-center font-bold uppercas rounded-md">
          Formulaire de calcul
        </div>
        <form onSubmit={handleSubmit} className="py-4 px-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date-debut"
            >
              Date Début
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date-debut"
              name="dateDebut"
              type="date"
              placeholder="Select a date"
              required
              value={form.dateDebut}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="index-debut"
            >
              Index compteur début
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="index-debut"
              name="indexDebut"
              type="number"
              placeholder="Entrer l'index de début"
              required
              value={form.indexDebut}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date-fin"
            >
              Date Fin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date-fin"
              name="dateFin"
              type="date"
              placeholder="Select a date"
              required
              value={form.dateFin}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="index-fin"
            >
              Index compteur fin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="index-fin"
              name="indexFin"
              type="number"
              placeholder="Entrer l'index de fin"
              required
              value={form.indexFin}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculer consommation 
            </button>
          </div>
        </form>
      </div>
      {/* tab infos */}
      <div className="w-[35%] max-w-xl ">
        {/* Tab Buttons */}
        <div className="bg-[var(--prev-blue)] p-2 rounded-t-lg">
          <div className="flex justify-center space-x-4">
            {[
              { key: "tab1", label: "Historique" },
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
          className={`p-4 tab-content bg-white shadow-md rounded-lg ${
            selectedTab !== "tab1" ? "hidden" : ""
          }`}
        >
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Historique
              </h3>
              {result ? (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Du {result.dateDebut} au {result.dateFin}
                </p>
              ) : (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Veuillez remplir le formulaire pour voir l'historique
                </p>
              )}
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              {result && (
                <>
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Nombre de jours
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.nbJours}
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Consommation totale
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.consommation} kWh
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Moyenne journalière
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.consoMoyenne.toFixed(2)} kWh/jour
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Montant consommation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.montantConso.toFixed(2)} fcfa
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">TCO</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.TCO.toFixed(2)} fcfa
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Redevance
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.redevance.toFixed(2)} fcfa
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">TVA</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {result.TVA.toFixed(2)} fcfa
                      </dd>
                    </div>
                    <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Montant total
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-bold">
                        {result.montantFacture.toFixed(2)} fcfa
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
                            className={`px-3 py-1 rounded text-sm font-bold border transition
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
                        Cliquez sur une période pour voir le détail du calcul
                        avec ce nombre de jours.
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`p-4 tab-content bg-white shadow-md rounded-lg ${
            selectedTab !== "infos" ? "hidden" : ""
          }`}
        >
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informations
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Dernier visite le date
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Puissance souscrite
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    DDP (utilisation domestique petite puissance) moins de 6kw
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Tva</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    18%
                  </dd>
                </div>

                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    redevance
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (nbj * 901) /63
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
