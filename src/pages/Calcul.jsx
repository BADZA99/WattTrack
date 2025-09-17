import Historique from "../components/historique";
import FormulaireCalcul from "../FormulaireCalcul";


const Calcul = () => (
  <div className="w-full h-auto bg-[var(--prev-bg)] text-white">
    <FormulaireCalcul />

    <div className=" ">
      <Historique />
     
    </div>
  </div>
);

export default Calcul;
