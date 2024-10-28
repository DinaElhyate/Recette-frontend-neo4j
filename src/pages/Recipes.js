import React, { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
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
                        userImage: user.image || "default-image-path.png",
                        ingredients: recipe.ingredients || [],
                        instructions: recipe.instructions || [],
                        cookingTime: recipe.cookingTime,
                        difficulty: recipe.difficulty,
                        category: recipe.category,
                        description: recipe.description,
                        image: recipe.image,
                        createdAt: recipe.createdAt
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

    
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                {filteredRecipes.sort(() => Math.random() - 0.5).map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={{
                            ...recipe,
                            user: {
                                username: recipe.username,
                                image: recipe.userImage,
                                role: recipe.role
                            }
                        }}
                    />
                ))}
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
