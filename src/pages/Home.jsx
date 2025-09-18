import imgHome from "../assets/home.png";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="w-full min-h-[100vh] bg-[var(--prev-bg)] flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden md:justify-start sm:space-y-2">
    {/* Left: Text & Button */}
    <div className="w-full md:w-[48%] h-80 md:h-[32rem] flex flex-col items-center md:items-start justify-center space-y-6 px-4 sm:px-8 md:px-10 py-8 md:py-0 animate-fadein-left ">
      <h2 className="text-4xl sm:text-4xl md:text-4xl lg:text-8xl text-white font-bold animate-slidein-down text-center md:text-left drop-shadow-lg">
        Bienvenue sur WattTrack
      </h2>
      <p className="text-lg sm:text-2xl text-yellow-100 font-medium text-center md:text-left animate-fadein-left">
        Simulez, comparez et maîtrisez votre facture d'électricité en 1 clic !
      </p>
      <Link
        to="/calcul"
        className="group w-1/2 sm:w-auto text-lg sm:text-2xl py-4 sm:py-5 px-4 sm:px-8 rounded-full border-2 border-[var(--prev-yellow)] bg-[var(--prev-yellow)] text-black font-extrabold shadow-2xl flex flex-row items-center justify-center gap-2 sm:gap-3 text-center hover:text-white hover:bg-transparent transition duration-300 hover:scale-105 focus:outline-none animate-bounce"
      >
        <span className="mx-auto w-full sm:w-full text-center">Commencer</span>
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--prev-bg)] group-hover:text-white  transition flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
    {/* Right: Image */}
    <div className="w-full md:w-[52%] h-64 sm:h-90 md:h-[90vh] flex items-center justify-center bg-transparent animate-fadein-right  sm:mt-0">
      <img
        src={imgHome}
        alt="Accueil WattTrack"
        className="w-full h-full object-contain max-h-[350px] md:max-h-[600px] lg:max-h-[700px] drop-shadow-2xl animate-slidein-up"
        loading="lazy"
      />
    </div>
    {/* Animations (Tailwind custom) */}
    <style>{`
      @keyframes fadein-left { from { opacity: 0; transform: translateX(-40px);} to { opacity: 1; transform: none; } }
      @keyframes fadein-right { from { opacity: 0; transform: translateX(40px);} to { opacity: 1; transform: none; } }
      @keyframes slidein-down { from { opacity: 0; transform: translateY(-40px);} to { opacity: 1; transform: none; } }
      @keyframes slidein-up { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      .animate-fadein-left { animation: fadein-left 1s cubic-bezier(.4,0,.2,1) both; }
      .animate-fadein-right { animation: fadein-right 1s cubic-bezier(.4,0,.2,1) both; }
      .animate-slidein-down { animation: slidein-down 1.1s .1s cubic-bezier(.4,0,.2,1) both; }
      .animate-slidein-up { animation: slidein-up 1.1s .1s cubic-bezier(.4,0,.2,1) both; }
    `}</style>
  </div>
);

export default Home;
