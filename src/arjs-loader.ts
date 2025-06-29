export const loadARJS = () => {
    const aframe = document.createElement("script");
    aframe.src = "https://aframe.io/releases/1.3.0/aframe.min.js";
    aframe.async = true;
    document.head.appendChild(aframe);
  
    const arjs = document.createElement("script");
    arjs.src = "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.min.js";
    arjs.async = true;
    document.head.appendChild(arjs);
  };
  