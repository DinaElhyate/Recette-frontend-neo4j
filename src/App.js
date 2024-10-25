import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // Importez Navigate
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import RecetteDetail from "./components/RecetteDetail";
import RecetteForm from "./components/RecetteForm";
import createRecipe from "./components/CreateRecipe";
import EditRecipePage from"./components/edit-recipe";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} /> {/* Redirection vers /auth */}
          <Route path="/auth" element={<Auth />} /> {/* Auth route */}
          <Route path="/home" element={<Home />} /> {/* Ajoutez la route vers Home */}
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/RecetteDetail" element={<RecetteDetail />} />
          <Route path="/RecetteForm" element={<RecetteForm />} />
          <Route path="/create-recipe" element={<createRecipe  />} />
          <Route path="/edit-recipe" element={<EditRecipePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
