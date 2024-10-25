import React, { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]); // State to hold recipes
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        // Function to fetch recipes from the API
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost:8085/api/users/user-details");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Extract recipes with user details
                const allRecipes = data.flatMap(user =>
                    user.recipes.map(recipe => ({
                        ...recipe,
                        username: user.username,
                        role: user.role,
                        userImage: user.image || "http://example.com/default-user-image.jpg" // Valeur par défaut si l'image est null
                    }))
                );

                // Filtrer les recettes qui existent
                const filteredRecipes = allRecipes.filter(recipe => recipe.title); // Filtrer les recettes sans titre
                setRecipes(filteredRecipes); // Set the fetched recipes
            } catch (error) {
                setError(error); // Set any errors
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchRecipes(); // Call the fetch function
    }, []); // Empty dependency array to run only once on mount

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <PreviousSearches />
            <div className="recipes-container">
                {recipes.sort(() => Math.random() - 0.5).map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}