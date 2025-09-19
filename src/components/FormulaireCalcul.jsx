import React from "react";
import {
  calculPeriodeEtConso,
  montantConsommation,
} from "../../utils/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormulaireSaisie from "./FormulaireSaisie";
import ResultatsCalcul from "./ResultatsCalcul";

export default function FormulaireCalcul() {
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  // Initialiser dateDebut et indexDebut depuis le localStorage si présents
  const getInitialForm = () => {
    let saved = localStorage.getItem("estimationDefaults");
    let def = { dateDebut: "", indexDebut: "" };
    if (saved) {
      try {
        def = { ...def, ...JSON.parse(saved) };
      } catch (e) {
        toast.error("Erreur lors de la lecture des valeurs par défaut :", e);

      }
    }
    return {
      dateDebut: def.dateDebut || "",
      dateFin: "",
      indexDebut: def.indexDebut || "",
      indexFin: "",
    };
  };
  const [form, setForm] = React.useState(getInitialForm);
  const [result, setResult] = React.useState(null);
  const [altResults, setAltResults] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Si on modifie dateDebut ou indexDebut, on sauvegarde dans le localStorage
      if (name === "dateDebut" || name === "indexDebut") {
        localStorage.setItem(
          "estimationDefaults",
          JSON.stringify({
            dateDebut: name === "dateDebut" ? value : updated.dateDebut,
            indexDebut: name === "indexDebut" ? value : updated.indexDebut,
          })
        );
      }
      return updated;
    });
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

    setResult({
      nbJours,
      consommation,
      consoMoyenne,
      ...montant,
      dateDebut,
      dateFin,
    });

    // Générer les résultats alternatifs pour les périodes de 57 à 63 jours
    const alt = [];
    for (let jours = 57; jours <= 63; jours++) {
      // On projette la consommation sur la période : consommation moyenne * jours projetés
      const consoProj = consoMoyenne * jours;
      alt.push({
        jours,
        ...montantConsommation(consoProj, jours),
      });
    }
    setAltResults(alt);
    setSelectedTab("tab1");
    toast.success("Estimation effectuée avec succès !");
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
