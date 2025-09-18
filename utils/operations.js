/**
 * Calcule la période en jours et la consommation entre deux relevés.
 * @param {string|Date} dateDebut - Date de début (format ISO ou objet Date)
 * @param {string|Date} dateFin - Date de fin (format ISO ou objet Date)
 * @param {number} indexDebut - Index compteur de début
 * @param {number} indexFin - Index compteur de fin
 * @returns {{ nbJours: number, consommation: number, consoMoyenne: number }}
 */
export function calculPeriodeEtConso(dateDebut, dateFin, indexDebut, indexFin) {
  const d1 = new Date(dateDebut);
  const d2 = new Date(dateFin);
  // Calcul du nombre de jours réels (inclusif)
  const diffTime = d2 - d1;
  const nbJours = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
  const consommation = Number(indexFin) - Number(indexDebut);
  // console.log(consommation);
  const consoMoyenne = nbJours > 0 ? consommation / nbJours : 0;
  return { nbJours, consommation, consoMoyenne };
}

/**
 * Calcule le montant de la consommation selon les tranches et jours de facturation.
 * @param {number} consoProj - Consommation projetée (kWh)
 * @param {number} joursFacturation - Nombre de jours de facturation
 * @returns {object} - Détail du calcul : { montantConso, TCO, redevance, TVA, montantTotal, m1, m2, m3, t1, t2, t3 }
 */
export function montantConsommation(consoProj, joursFacturation) {
  const t1Max = 150 * (joursFacturation / 60);
  const t2Max = 100 * (joursFacturation / 60);

  let t1 = Math.min(consoProj, t1Max);
  let t2 = Math.min(Math.max(consoProj - t1Max, 0), t2Max);
  let t3 = Math.max(consoProj - t1Max - t2Max, 0);

  // Tarifs en centimes
  let m1 = t1 * 91.17;
  let m2 = t2 * 136.49;
  let m3 = t3 * 159.36;

  let montantConso = m1 + m2 + m3;
  let TCO = 0.025 * montantConso;
  // Règle de trois pour la redevance : 63 jours => 901
  let redevance = (joursFacturation * 901) / 63;
  let baseTVA = m3 * 1.025 + redevance;
  let TVA = 0.18 * baseTVA;
  let montantFacture = montantConso + TCO + redevance + TVA;

  return {
    montantConso,
    TCO,
    redevance,
    TVA,
    montantFacture,
    // m1,
    // m2,
    // m3,
    // t1,
    // t2,
    // t3,
  };
}


