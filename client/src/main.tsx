import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Initialize AOS animation library
AOS.init({
  duration: 800,
  once: false,
  mirror: true,
});

createRoot(document.getElementById("root")!).render(<App />);
