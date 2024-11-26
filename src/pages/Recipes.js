import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
<<<<<<< HEAD
    const navigate = useNavigate(); // Ajout du hook useNavigate
=======
    const navigate = useNavigate(); 
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
<<<<<<< HEAD
                const response = await fetch("http://localhost:3000/api/recipes"); // Mise à jour de l'URL de l'API
=======
                const response = await fetch("http://localhost:3000/api/recipes"); 
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Data fetched from API:", data);

<<<<<<< HEAD
                // Formatage des données récupérées depuis l'API
=======
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                const filteredRecipes = data.filter(recipe => recipe.title);
                setRecipes(filteredRecipes);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRecipeClick = (recipeId) => {
<<<<<<< HEAD
        if (recipeId) {
            navigate(`/RecetteDetail/${recipeId}`);
        } else {
            console.error("Recipe ID is undefined");
        }
    };

=======
        navigate(`/RecetteDetail/${recipeId}`); 
    };

    
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;
    }

    return (
        <div>
            <PreviousSearches setSearchQuery={setSearchQuery} />
            <div className="recipes-container">
<<<<<<< HEAD
                {filteredRecipes.sort(() => Math.random() - 0.5).map((recipe, index) => (
                    <div key={index} onClick={() => handleRecipeClick(recipe.recipeId)}>
                        <RecipeCard
                            recipe={{
                                ...recipe,
                                user: {
                                    userId: recipe.userId, // Ajout de l'ID utilisateur, s'il est présent
                                    image: recipe.userImage || "default-image-path.png" // Ajouter une image par défaut si elle est absente
                                }
                            }}
                        />
                    </div>
                ))}
=======
            {filteredRecipes.sort(() => Math.random() - 0.5).map((recipe, index) => (
    <div key={index} onClick={() => handleRecipeClick(recipe.id)}>
        <RecipeCard
            recipe={{
                ...recipe,
                user: {
                    userId: recipe.userId, 
                    image: recipe.userImage || "default-image-path.png" 
                }
            }}
        />
    </div>
))}

>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
            </div>
            <style jsx>{`
                .recipes-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    padding: 2rem;
                }

                @media (max-width: 1024px) {
                    .recipes-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .recipes-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
