import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
// Initialize AOS animation library
AOS.init({
  duration: 800,
  once: false,
  mirror: true,
});
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'your_publishable_key';
createRoot(document.getElementById("root")!).render(
<ClerkProvider publishableKey={clerkPubKey}>
<BrowserRouter>
<App />
</BrowserRouter>
</ClerkProvider>

);
