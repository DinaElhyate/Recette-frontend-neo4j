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
import RecipeList from "./components/RecipeList";
import CreateRecipe from "./components/CreateRecipe";
import EditRecipe from"./components/EditRecipe";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirection vers /auth */}
          <Route path="/auth" element={<Auth />} /> {/* Auth route */}
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/RecipeList" element={<RecipeList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/RecetteDetail/:recipeId" element={<RecetteDetail />} />
          <Route path="/RecetteForm" element={<RecetteForm />} />
          <Route path="/CreateRecipe" element={<CreateRecipe />} />
          <Route path="/EditRecipe" element={<EditRecipe />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
