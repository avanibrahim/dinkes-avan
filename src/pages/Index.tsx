
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Tentang from "./Diagnosis";
import Berita from "./ScanQR";
import Monitoring from "./Monitoring";

const Index = () => {
  const location = useLocation();
  if (location.pathname === "/")
    return (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    );
  if (location.pathname === "/diagnosis")
    return (
      <>
        <Navbar />
        <Tentang />
        <Footer />
      </>
    );
  if (location.pathname === "/scanqr")
    return (
      <>
        <Navbar />
        <Berita />
        <Footer />
      </>
    );
  if (location.pathname === "/monitoring")
    return (
      <>
        <Navbar />
        <Monitoring />
        <Footer />
      </>
    );
  // fallback
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default Index;
