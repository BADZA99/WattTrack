

const About = () => (
  <>
    <div className="w-full h-[90vh] bg-[var(--prev-bg)] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        {/* Titre */}
        <h1 className="text-4xl font-bold mb-6 text-[var(--prev-yellow)]">
          À propos de l’application WattTrack ⚡
        </h1>

        {/* Texte principal */}
        <p className="text-xl mb-6 leading-relaxed">
          WattTrack vous aide à{" "}
          <span className="font-semibold">
            anticiper le montant de votre prochaine facture d’électricité
          </span>
          . En entrant simplement vos{" "}
          <span className="text-[var(--prev-yellow)]">indices de compteur</span>
          et les{" "}
          <span className="text-[var(--prev-yellow)]">dates de relevé</span>,
          l’outil calcule votre{" "}
          <span className="font-semibold">consommation journalière</span>
          et réalise une{" "}
          <span className="font-semibold">projection de facture</span>
          en fonction des tranches tarifaires.
        </p>

        {/* Pourquoi c'est utile */}
        <p className="text-xl mb-6 leading-relaxed">
          Grâce à ces prévisions, vous pouvez suivre votre consommation, éviter
          les mauvaises surprises et{" "}
          <span className="text-[var(--prev-yellow)]">
            mieux gérer votre budget énergétique
          </span>
          . Vous pouvez également visualiser vos habitudes de consommation grâce
          à des <span className="font-semibold">graphiques interactifs</span>.
        </p>

        {/* Petit slogan */}
        <p className="italic text-gray-300">
          “Maîtrisez votre énergie, maîtrisez votre facture.”
        </p>
      </div>
    </div>
  </>
);

export default About;
