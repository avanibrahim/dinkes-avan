
import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import Berita from "./ScanQR";
import Monitoring from "./Monitoring";

const Index = () => {
  const location = useLocation();
  if (location.pathname === "/")
    return (
      <>
        <Navbar />
        <Home />
      </>
    );
  if (location.pathname === "/diagnosis")
    return (
      <>
        <Navbar />
        <Diagnosis />
       
      </>
    );
  if (location.pathname === "/scanqr")
    return (
      <>
        <Navbar />
        <Berita />
       
      </>
    );
  if (location.pathname === "/monitoring")
    return (
      <>
        <Navbar />
        <Monitoring />
       
      </>
    );
  // fallback
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Index;
