import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <HomePage />
      </PageWrapper>
      <Footer />
    </>
  );
}