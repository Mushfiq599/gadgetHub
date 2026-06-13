import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh" }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}