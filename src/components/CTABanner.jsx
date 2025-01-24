import { ArrowRight, Sparkles } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-950 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/api/placeholder/20/20')] opacity-10"></div>
        <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-100">
              <Sparkles className="mr-2 h-4 w-4" />
              Limited Time Offer
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Transform Your Ideas <br className="hidden md:block" />
              Into Reality Today
            </h2>
            <p className="text-lg text-blue-100">
              Join hundreds of satisfied clients who have already taken the
              first step.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center rounded-xl bg-blue-50 px-6 py-3 text-base font-semibold text-blue-700 shadow-lg transition duration-300 hover:bg-white"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl border-2 border-blue-400/20 bg-blue-400/10 px-6 py-3 text-base font-semibold text-blue-50 backdrop-blur-sm transition duration-300 hover:bg-blue-400/20"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
