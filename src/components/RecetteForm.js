import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RecetteForm() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newRecipe, setNewRecipe] = useState({ titre: "", description: "", image: "" });
    const [editingIndex, setEditingIndex] = useState(null);

    const fetchUserRecipes = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8085/api/users/${userId}`);
            console.log('Structure complète des recettes:', JSON.stringify(response.data.recipes, null, 2));
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes :', error);
        }
    };

    const getUserIdFromSessionStorage = () => {
        const userData = sessionStorage.getItem('authenticatedUser');
        if (userData) {
            const user = JSON.parse(userData); 
            return user.userId; 
        }
        return null; 
    };

    useEffect(() => {
        const userId = getUserIdFromSessionStorage();
        if (userId) {
            console.log('ID utilisateur récupéré :', userId); 
            fetchUserRecipes(userId);
        } else {
            console.error("Aucun ID utilisateur trouvé dans le sessionStorage.");
        }
    }, []);

    const saveRecipe = () => {
        if (newRecipe.titre.trim() && newRecipe.description.trim() && newRecipe.image.trim()) {
            if (editingIndex !== null) {
                const updatedRecipes = [...recipes];
                updatedRecipes[editingIndex] = newRecipe;
                setRecipes(updatedRecipes);
                setEditingIndex(null);
            } else {
                setRecipes([...recipes, newRecipe]);
            }

            setNewRecipe({ titre: "", description: "", image: "" });
            setShowForm(false);
        }
    };

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    
    const deleteRecipe = async (recipe) => {
        console.log('Recipe to delete:', recipe);
        if (!recipe) {
            console.error('Recette non définie');
            return;
        }
        setRecipeToDelete(recipe);
        setShowDeleteConfirmation(true);
    };
    
    const confirmDelete = async () => {
        const userId = getUserIdFromSessionStorage();
        
        if (!userId || !recipeToDelete) {
            console.error('Données manquantes:', { userId, recipeToDelete });
            return;
        }
    
        try {
            console.log('Tentative de suppression de la recette:', recipeToDelete);
            
            // Utilisons l'ID utilisateur et recipeId dans l'URL
            const response = await axios.delete(
                `http://localhost:8085/api/recipes/${userId}/${recipeToDelete.recipeId}`
                
            );
            
            if (response.data.success) {
                // Mettre à jour la liste des recettes localement
                const updatedRecipes = recipes.filter(r => r.recipeId !== recipeToDelete.recipeId);
                setRecipes(updatedRecipes);
            }
            
            setShowDeleteConfirmation(false);
            setRecipeToDelete(null);
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setShowDeleteConfirmation(false);
            setRecipeToDelete(null);

        }
        navigate('/home'); 
    };
    
    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setRecipeToDelete(null);

    };

    const editRecipe = (recipe) => { // Changez le paramètre de index à recipe
        navigate('/EditRecipe', { state: { recipe: recipe } }); // Passez directement l'objet recipe
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        navigate('/CreateRecipe'); 
    };

    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            marginBottom: '300px',
        },
        buttonRightContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px',
        },
        recipeItem: {
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonContainer: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        deleteButton: {
            backgroundColor: 'var(--primary-color)',
        },
        editButton: {
            backgroundColor: 'var(--primary-color)',
        },
        input: {
            display: 'block',
            marginBottom: '10px',
            padding: '10px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        image: {
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            marginRight: '10px',
        },
        title: {
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonRightContainer}>
                <button style={styles.button} onClick={toggleForm}>
                    {showForm ? "Annuler" : "Ajouter une recette"}
                </button>
            </div>

            {showForm && (
                <div>
                    <h2>{editingIndex !== null ? "Éditer la recette" : "Ajouter une nouvelle recette"}</h2>
                    <input
                        type="text"
                        placeholder="Titre de la recette"
                        value={newRecipe.titre}
                        onChange={(e) => setNewRecipe({ ...newRecipe, titre: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Description de la recette"
                        value={newRecipe.description}
                        onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="URL de l'image"
                        value={newRecipe.image}
                        onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                        style={styles.input}
                    />
                    <button style={styles.button} onClick={saveRecipe}>
                        {editingIndex !== null ? "Mettre à jour la recette" : "Ajouter la recette"}
                    </button>
                </div>
            )}
            {showDeleteConfirmation && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                        <h3>Êtes-vous sûr de vouloir supprimer cette recette ?</h3>
                        <div style={styles.buttonContainer}>
                            <button style={{ ...styles.button, backgroundColor: 'red' }} onClick={confirmDelete}>Oui, supprimer</button>
                            <button style={styles.button} onClick={cancelDelete}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            <h2 style={styles.title}>Vos Recettes</h2>
            <ul>
            {recipes.map((recipe) => (
    <li key={recipe.recipeId || Math.random()} style={styles.recipeItem}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={recipe.image} alt={recipe.titre} style={styles.image} />
            <div>
                <h3>{recipe.titre}</h3>
                <p>{recipe.description}</p>
            </div>
        </div>
        <div style={styles.buttonContainer}>
            <button
                style={{ ...styles.button, ...styles.deleteButton }}
                onClick={() => deleteRecipe(recipe)}
            >
                Supprimer
            </button>
            <button
                style={{ ...styles.button, ...styles.editButton }}
                onClick={() => editRecipe(recipe)}
            >
                Éditer
            </button>
        </div>
    </li>
))}
            </ul>
        </div>
    );
}
