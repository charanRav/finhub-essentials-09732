import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.tsx";
import "./index.css";

// Add AdSense script - Replace with your actual publisher ID before going live
const addAdSenseScript = () => {
  const publisherId = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your AdSense publisher ID
  
  if (publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
};

addAdSenseScript();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
