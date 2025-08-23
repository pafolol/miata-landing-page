export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-6 text-center text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p>
          Developed by <span className="text-white font-semibold">PafoDev</span>
        </p>
        <p className="mt-1">
          "Low Poly Mazda MX-5 Miata NA (UPDATE)" by{' '}
          <a
            href="https://skfb.ly/ptYor"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            SPDWKS
          </a>{' '}
          is licensed under{' '}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Creative Commons Attribution 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
