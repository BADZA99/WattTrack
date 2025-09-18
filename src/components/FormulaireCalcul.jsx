import React from "react";
import {
  calculPeriodeEtConso,
  montantConsommation,
} from "../../utils/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaireSaisie from "./FormulaireSaisie";
import ResultatsCalcul from "./ResultatsCalcul";

export default function FormulaireCalcul({ onNewConsultation }) {
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
    if (!dateDebut || !dateFin || !indexDebut || !indexFin) {
      toast.error("Veuillez remplir tous les champs du formulaire.");
      return;
    }
    if (new Date(dateFin).getTime() === new Date(dateDebut).getTime()) {
      toast.error("Les deux dates doivent être différentes.");
      return;
    }
    if (new Date(dateFin) < new Date(dateDebut)) {
      toast.error("La date de fin doit être postérieure à la date de début.");
      return;
    }
    // si les index sont negatifs
    if (Number(indexDebut) < 0 || Number(indexFin) < 0) {
      toast.error("Les index doivent être des nombres positifs.");
      return;
    }
    if (Number(indexDebut) > Number(indexFin)) {
      toast.error(
        "L'index de fin doit être supérieur ou égal à l'index de début."
      );
      return;
    }

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
    // Si la prop onNewConsultation est fournie, on l'appelle pour prévenir le parent
    // qu'une nouvelle consultation vient d'être enregistrée. Cela permet au parent
    // de recharger l'historique et d'afficher instantanément la mise à jour.
    if (onNewConsultation) onNewConsultation();

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
      // if (jours === nbJours) continue;
      alt.push({
        jours,
        ...montantConsommation(consommation, jours),
      });
    }
    setAltResults(alt);
    setSelectedTab("tab1");
    toast.success("Calcul effectué avec succès !");
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row justify-between items-start bg-transparent w-full max-w-5xl h-auto pt-4 gap-6">
      <div className="w-full md:w-[48%] bg-white shadow-lg rounded-lg mb-6 md:mb-0">
        <div className="text-2xl py-4 px-4 bg-[var(--prev-yellow)] text-white text-center font-bold uppercas rounded-md">
          Formulaire de calcul
        </div>
        <FormulaireSaisie
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
      <ResultatsCalcul
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        result={result}
        altResults={altResults}
        setResult={setResult}
      />
    </div>
  );
}
