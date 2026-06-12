import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import ServicesPage from "@/components/services/ServicesPage";

export default function Services() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <ServicesPage />
      </PageWrapper>
      <Footer />
    </>
  );
}