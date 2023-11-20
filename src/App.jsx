import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
// import Funnel from "./components/Funnel";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Home />} />
        <Route path="/website" element={<Home />} />
        <Route path="/businesscards" element={<Home />} />
        <Route path="/logos" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/GHL-Add-on's" element={<Home />} />
        <Route path="/marketing" element={<Home />} />
        <Route path="/surveys" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
