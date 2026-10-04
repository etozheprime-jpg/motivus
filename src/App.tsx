import Header from "./components/Header";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import Process from "./components/Process";
import NonRunning from "./components/NonRunning";
import Coverage from "./components/Coverage";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import SeoText from "./components/SeoText";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import MobileBar from "./components/MobileBar";
import FormModal from "./components/FormModal";
import { FormModalProvider } from "./lib/formModal";
import { useReveal } from "./lib/useReveal";

export default function App() {
  useReveal();

  return (
    <FormModalProvider>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Process />
        <NonRunning />
        <Coverage />
        <Reviews />
        <Faq />
        <SeoText />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <FormModal />
    </FormModalProvider>
  );
}
