import React from "react";
import ConsoMontantBarChart from "./ConsoMontantBarChart";
// 40968;
// 41397
const Historique = () => {
  const [historique, setHistorique] = React.useState([]);

  React.useEffect(() => {
    const data = localStorage.getItem("consultationData");
    if (data) {
      const parsed = JSON.parse(data);
      let hist = parsed.historique || [];
      // Trier par date décroissante (plus récent d'abord)
      hist = hist.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      // Garder seulement les 3 plus récents
      setHistorique(hist.slice(0, 3));
    }
  }, []);

  return (
    <div className="p-6 mx-auto flex flex-col justify-between items-start bg-transparent w-[85%]  ">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Historique des consultations
        </h2>
        {historique.length === 0 ? (
          <div className="text-gray-500">Aucune consultation enregistrée.</div>
        ) : (
          <div className="flex flex-col">
            <div className=" sm:mx-0.5 lg:mx-0.5">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Début
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Fin
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Index Début
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Index Fin
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Jours
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Conso
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Moyenne
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                            idx % 2 === 0
                              ? "bg-gray-100 border-b"
                              : "bg-white border-b"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {idx + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {new Date(item.date).toLocaleString()}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.dateDebut}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.dateFin}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.indexDebut}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.indexFin}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.nbJours}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.consommation}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.consoMoyenne?.toFixed(2)}
                          </td>
                          <td className="text-sm text-yellow-900 font-bold px-6 py-4 whitespace-nowrap">
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
        )}
      </div>

      <ConsoMontantBarChart data={historique} />
    </div>
  );
};

export default Historique;
