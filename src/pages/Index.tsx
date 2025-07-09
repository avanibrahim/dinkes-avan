import Navbar from "@/components/Navbar";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Diagnosis from "./Diagnosis";
import Berita from "./ScanQR";
import Monitoring from "./Monitoring";
import Stunting from "./diagnosis/Tbc";
import Dbd from "./diagnosis/Dbd";
import Hiv from "./diagnosis/Hiv";
import "../index.css";



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
