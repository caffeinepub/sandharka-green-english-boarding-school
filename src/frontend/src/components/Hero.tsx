export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/FB_IMG_1772019352532-2.jpg')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/75 via-forest-900/60 to-forest-900/85" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
        {/* Estd Badge */}
        <div className="inline-flex items-center gap-2 bg-gold-400/20 border border-gold-400/40 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />
          <span className="text-gold-300 font-sans text-sm font-medium tracking-widest uppercase">
            Estd. 2063 B.S.
          </span>
          <span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />
        </div>

        {/* School Name */}
        <h1
          className="font-serif font-bold text-white text-shadow-lg leading-tight mb-4 animate-fade-in-up"
          style={{
            animationDelay: "0.1s",
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
          }}
        >
          Sandharka Green
          <br />
          <span className="text-gold-300">English Boarding School</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-sans text-white/85 text-shadow max-w-2xl mx-auto mb-4 leading-relaxed animate-fade-in-up"
          style={{
            animationDelay: "0.2s",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          }}
        >
          Nurturing Excellence, Building Character
        </p>

        <p
          className="font-sans text-white/70 max-w-xl mx-auto mb-10 text-sm sm:text-base animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Sandharka-2, Arghakhanchi, Nepal — Where young minds flourish amidst
          the green hills of Nepal
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            type="button"
            onClick={() => handleScroll("#about")}
            className="px-8 py-3.5 bg-gold-400 hover:bg-gold-300 text-forest-900 font-sans font-semibold rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Discover Our School
          </button>
          <button
            type="button"
            onClick={() => handleScroll("#contact")}
            className="px-8 py-3.5 bg-transparent border-2 border-white/60 hover:border-gold-300 text-white hover:text-gold-300 font-sans font-semibold rounded-sm transition-all duration-200 text-sm sm:text-base"
          >
            Contact Us
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
