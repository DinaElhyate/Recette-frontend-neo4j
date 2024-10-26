import React, { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
    
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost:8085/api/users/user-details");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const allRecipes = data.flatMap(user =>
                    user.recipes.map(recipe => ({
                        ...recipe,
                        username: user.username,
                        role: user.role,
                        userImage: user.image || "http://example.com/default-user-image.jpg" 
                    }))
                );

                
                const filteredRecipes = allRecipes.filter(recipe => recipe.title); 
                setRecipes(filteredRecipes);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); 
            }
        };

        fetchRecipes(); 
    }, []); 

   
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