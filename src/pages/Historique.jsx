import React, { useRef } from "react";
import HistoriqueTable from "../components/historique";
import { calculPeriodeEtConso } from "../../utils/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Historique() {
  const [form, setForm] = React.useState({
    date: "",
    dateDebut: "",
    dateFin: "",
    indexDebut: "",
    indexFin: "",
    nbJours: "",
    consommation: "",
    consoMoyenne: "",
    montantFacture: "",
  });
  const [historique, setHistorique] = React.useState([]);
  const fileInputRef = useRef(null);
  // Exporte l'historique au format JSON
  const handleExport = () => {
    const data = localStorage.getItem("consultationData");
    if (!data) {
      toast.error("Aucune donnée à exporter.");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historique_electricite.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Importe un fichier JSON et restaure l'historique
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!imported.historique || !Array.isArray(imported.historique)) {
          toast.error("Fichier invalide ou corrompu.");
          return;
        }
        localStorage.setItem("consultationData", JSON.stringify(imported));
        setHistorique(imported.historique);
        toast.success("Historique importé avec succès !");
      } catch {
        toast.error("Erreur lors de l'importation du fichier.");
      }
    };
    reader.readAsText(file);
    // Réinitialise la valeur pour permettre de réimporter le même fichier si besoin
    e.target.value = "";
  };

  React.useEffect(() => {
    const data = localStorage.getItem("consultationData");
    if (data) {
      const parsed = JSON.parse(data);
      let hist = parsed.historique || [];
      setHistorique(hist);
    } else {
      setHistorique([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    // Calcul automatique nbJours et consoMoyenne si dates et index sont valides
    if (
      (name === "dateDebut" ||
        name === "dateFin" ||
        name === "indexDebut" ||
        name === "indexFin") &&
      updated.dateDebut &&
      updated.dateFin &&
      updated.indexDebut !== "" &&
      updated.indexFin !== ""
    ) {
      const { nbJours, consommation, consoMoyenne } = calculPeriodeEtConso(
        updated.dateDebut,
        updated.dateFin,
        updated.indexDebut,
        updated.indexFin
      );
      updated.nbJours = nbJours;
      updated.consommation = consommation;
      updated.consoMoyenne = consoMoyenne.toFixed(2);
    }

    setForm(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contrôles de validation
    if (
      !form.dateDebut ||
      !form.dateFin ||
      form.indexDebut === "" ||
      form.indexFin === "" ||
      form.montantFacture === ""
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (new Date(form.dateFin) < new Date(form.dateDebut)) {
      toast.error("La date de fin doit être postérieure à la date de début.");
      return;
    }
    if (Number(form.indexDebut) < 0 || Number(form.indexFin) < 0) {
      toast.error("Les index doivent être des nombres positifs.");
      return;
    }
    if (Number(form.indexDebut) > Number(form.indexFin)) {
      toast.error(
        "L'index de fin doit être supérieur ou égal à l'index de début."
      );
      return;
    }
    const now = new Date().toISOString();
    const entry = {
      ...form,
      date: now,
      indexDebut: Number(form.indexDebut),
      indexFin: Number(form.indexFin),
      nbJours: Number(form.nbJours),
      consommation: Number(form.consommation),
      consoMoyenne: Number(form.consoMoyenne),
      montantFacture: Number(form.montantFacture),
    };
    let data = localStorage.getItem("consultationData");
    let parsed = data
      ? JSON.parse(data)
      : { derniereConsultation: null, historique: [] };
    parsed.derniereConsultation = now;
    parsed.historique.unshift(entry);
    localStorage.setItem("consultationData", JSON.stringify(parsed));
    setHistorique([entry, ...historique]);
    setForm({
      date: "",
      dateDebut: "",
      dateFin: "",
      indexDebut: "",
      indexFin: "",
      nbJours: "",
      consommation: "",
      consoMoyenne: "",
      montantFacture: "",
    });
  };

  return (
    <div className="w-full min-h-[100vh] bg-[var(--prev-bg)] text-white flex flex-col items-center pt-8">
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-800"
        >
          Exporter l'historique
        </button>
        <button
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="bg-yellow-600 text-white px-4 py-2 rounded font-bold hover:bg-yellow-800"
        >
          Importer l'historique
        </button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
        />
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-center text-[var(--prev-blue)] mb-4">
          Ajouter une facture
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Date Début
              </label>
              <input
                type="date"
                name="dateDebut"
                value={form.dateDebut}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Date Fin
              </label>
              <input
                type="date"
                name="dateFin"
                value={form.dateFin}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Index Début
              </label>
              <input
                type="number"
                name="indexDebut"
                value={form.indexDebut}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Index Fin
              </label>
              <input
                type="number"
                name="indexFin"
                value={form.indexFin}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Nombre de jours
              </label>
              <input
                type="number"
                name="nbJours"
                value={form.nbJours}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Consommation (kWh)
              </label>
              <input
                type="number"
                name="consommation"
                value={form.consommation}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Moyenne journalière (kWh/jour)
              </label>
              <input
                type="number"
                name="consoMoyenne"
                value={form.consoMoyenne}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">
                Montant Facture (fcfa)
              </label>
              <input
                type="number"
                name="montantFacture"
                value={form.montantFacture}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[var(--prev-blue)] text-white px-6 py-2 rounded font-bold hover:bg-blue-800"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <HistoriqueTable historique={historique} />
    </div>
  );
}
