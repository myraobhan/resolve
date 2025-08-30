import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorks from "@/components/homepage/HowItWorks";
import ForumExplainer from "@/components/homepage/ForumExplainer";
import FAQ from "@/components/homepage/FAQ";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <ForumExplainer />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;