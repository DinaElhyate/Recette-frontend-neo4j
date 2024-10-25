
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createRecipe = async ({ userId, recipe }) => {
   
    const response = await fetch(`/api/recipes/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const CreateRecipe = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation(createRecipe, {
        onSuccess: () => {
            // Invalider la requête pour les recettes pour mettre à jour la liste
            queryClient.invalidateQueries(['userRecipes', userId]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ userId, recipe: { title, description } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la recette"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de la recette"
                required
            />
            <button type="submit">Créer Recette</button>
        </form>
    );
};

export default CreateRecipe;
