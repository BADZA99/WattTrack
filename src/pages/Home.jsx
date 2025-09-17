import imgHome from "../assets/home.png";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="w-full h-[90vh] bg-[var(--prev-bg)] flex items-center justify-between ">
    <div className="w-[44%] h-[50%]  bg-transparent flex-col items-center justify-between  space-y-16 px-10 py-3 ">
      <h1 className="text-8xl text-white font-bold">Bienvenue sur VoltTrack</h1>

      <Link
        to="/calcul"
        className="text-xl hover:text-white   py-4 px-4 rounded-full border border-[var(--prev-yellow)] bg-[var(--prev-yellow)] text-black transition duration-300  hover:bg-transparent  font-bold"
      >
        Commencer le calcul
      </Link>
    </div>
    <div className="w-[55%] h-full bg-transparent  flex   ">
      <img src={imgHome} alt="" className="w-full object-fit" />
    </div>
  </div>
);

export default Home;
