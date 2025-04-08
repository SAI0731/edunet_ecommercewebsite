import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Admin from "./Pages/Admin";

export const backend_url = "http://localhost:4000";
export const currency = "₹";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Admin />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
