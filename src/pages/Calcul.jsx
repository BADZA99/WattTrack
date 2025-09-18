import React from "react";
// import Historique from "../components/historique";
import FormulaireCalcul from "../components/FormulaireCalcul";

const Calcul = () => {
  // const [historique, setHistorique] = React.useState([]);

  // Fonction pour charger l'historique depuis le localStorage
  // const loadHistorique = React.useCallback(() => {
  //   const data = localStorage.getItem("consultationData");
  //   if (data) {
  //     const parsed = JSON.parse(data);
  //     let hist = parsed.historique || [];
  //     hist = hist.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  //     setHistorique(hist.slice(0, 3));
  //   } else {
  //     setHistorique([]);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   loadHistorique();
  // }, [loadHistorique]);

  // Cette fonction sera passée au formulaire pour recharger l'historique après soumission
  // const handleNewConsultation = () => {
  //   loadHistorique();
  // };

  // onNewConsultation :
  // Cette prop est une fonction callback passée au composant FormulaireCalcul.
  // Elle permet à l'enfant (FormulaireCalcul) de prévenir le parent (ici Calcul.jsx)
  // qu'une nouvelle consultation a été soumise et enregistrée dans le localStorage.
  // Quand onNewConsultation() est appelée dans FormulaireCalcul,
  // on recharge l'historique dans le parent, ce qui met à jour l'affichage de l'historique instantanément.
  // C'est un pattern classique React pour synchroniser parent et enfant après une action côté enfant.

  return (
    <div className="w-full min-h-[100vh] bg-[var(--prev-bg)] text-white">
      <FormulaireCalcul  />
      {/* <FormulaireCalcul onNewConsultation={handleNewConsultation} /> */}
      {/* <div className=" ">
        <Historique historique={historique} />
      </div> */}
    </div>
  );
};

export default Calcul;
