import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import Berita from "./ScanQR";
import Monitoring from "./Contact";
import Stunting from "./diagnosis/Tbc";
import Dbd from "./diagnosis/Dbd";
import Hiv from "./diagnosis/Hiv";
import "../index.css";



const Index = () => {
  const location = useLocation();

  if (location.pathname === "/")
    return (
      <>
        <Home />
      </>
    );

  if (location.pathname === "/diagnosis")
    return (
      <>
        <Diagnosis />
      </>
    );

  if (location.pathname === "/scanqr")
    return (
      <>
        <Berita />
      </>
    );

  if (location.pathname === "/monitoring")
    return (
      <>
        <Monitoring />
      </>
    );

  if (location.pathname === "/stunting")
    return (
      <>
        <Navbar />
        <Stunting />
      </>
    );

  if (location.pathname === "/dbd")
    return (
      <>
        <Navbar />
        <Dbd />
      </>
    );

  if (location.pathname === "/hiv")
    return (
      <>
        <Navbar />
        <Hiv />
      </>
    );

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default Index;
