import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import Footer from "@/components/layout/Footer";
import ProfilePage from "@/components/profile/ProfilePage";

export default function Profile() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div style={{ marginBottom: "48px", paddingBottom: "32px", borderBottom: "1px solid var(--border-subtle)" }}>
          <p className="text-label" style={{ color: "var(--text-muted)", marginBottom: "8px" }}>
            Developer Manifest
          </p>
          <h1 className="text-heading" style={{ color: "var(--text-primary)" }}>
            You're here. Welcome Chief.
          </h1>
          <p className="text-body" style={{ color: "var(--text-secondary)", marginTop: "8px", maxWidth: "480px" }}>
            Now, lets see if I impress you.
          </p>
        </div>
        <ProfilePage />
      </PageWrapper>
      <Footer />
    </>
  );
}