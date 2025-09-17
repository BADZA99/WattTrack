const About = () => (
  <>
    <div className="w-full min-h-screen bg-[var(--prev-bg)] text-white flex items-center justify-center px-3 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl text-center px-2 sm:px-6 md:px-10">
        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[var(--prev-yellow)] leading-tight">
          À propos de l’application WattTrack ⚡
        </h1>

        {/* Texte principal */}
        <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
          WattTrack vous aide à{" "}
          <span className="font-semibold">
            anticiper le montant de votre prochaine facture d’électricité
          </span>
          . En entrant simplement vos {" "}
          <span className="text-[var(--prev-yellow)]">indices de compteur </span>
          et les {" "}
          <span className="text-[var(--prev-yellow)]">dates de relevé</span>,
          l’outil calcule votre{" "}
          <span className="font-semibold">consommation journalière</span>
          et réalise une{" "}
          <span className="font-semibold">projection de facture</span>
          en fonction des tranches tarifaires.
        </p>

        {/* Pourquoi c'est utile */}
        <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
          Grâce à ces prévisions, vous pouvez suivre votre consommation, éviter
          les mauvaises surprises et{" "}
          <span className="text-[var(--prev-yellow)]">
            mieux gérer votre budget énergétique
          </span>
          . Vous pouvez également visualiser vos habitudes de consommation grâce
          à des <span className="font-semibold">graphiques interactifs</span>.
        </p>

        {/* Petit slogan */}
        <p className="italic text-gray-300 text-sm sm:text-base md:text-lg">
          “Maîtrisez votre énergie, maîtrisez votre facture.”
        </p>
      </div>
    </div>
  </>
);

export default About;
