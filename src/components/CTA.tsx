
const CTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 opacity-40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to find your vibe?</h2>
            <p className="text-indigo-100 text-lg mb-10">Sign up today and start browsing profiles near your campus for free. No credit card required.</p>
            <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;