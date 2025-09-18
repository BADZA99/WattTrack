import React from "react";

export default function FormulaireSaisie({ form, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="py-4 px-4">
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
}
