import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RecetteForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newRecipe, setNewRecipe] = useState({ titre: "", description: "", image: "" });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);


    const fetchUserData = async (userId) => {
        try {
<<<<<<< HEAD
            const response = await axios.get(`http://localhost:8085/api/users/${userId}`);
=======
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
            setUser(response.data);
            console.log("Données de l'utilisateur :", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        }
    };
    const saveUserProfile = async () => {
<<<<<<< HEAD
        if (user) {
            try {
                const response = await axios.put(`http://localhost:8085/api/users/${user.userId}`, user);
                if (response.data.success) {
                    setUser(response.data.user);
    
                    navigate('/RecetteForm');
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du profil:', error);
            }
=======
        const userId = getUserIdFromSessionStorage(); 
    
        if (!userId || !user?.user) {
            console.error("Données utilisateur manquantes");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:3000/users/${userId}`, {
                username: user.user.username,
                password: user.user.password || "",
                email: user.user.email,
            });
    
            if (response.status === 200) {
                console.log("Profil utilisateur mis à jour avec succès :", response.data);
                setUser({ user: response.data.user }); 
                setIsEditingProfile(false); 
            } else {
                console.error("Échec de la mise à jour du profil :", response.data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
        }
    };
    
    
<<<<<<< HEAD
=======
    
    
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
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
<<<<<<< HEAD
            return user.userId; 
=======
            return user.user.userId; 
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
        }
        return null; 
    };

    useEffect(() => {
        const userId = getUserIdFromSessionStorage();
        if (userId) {
            console.log('ID utilisateur récupéré :', userId); 
            fetchUserRecipes(userId);
            fetchUserData(userId);
        } else {
            console.error("Aucun ID utilisateur trouvé dans le sessionStorage.");
        }
    }, []);

<<<<<<< HEAD
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
=======
    const saveRecipe = async () => {
        if (newRecipe.titre.trim() && newRecipe.description.trim() && newRecipe.image.trim()) {
            const userId = getUserIdFromSessionStorage();
    
            if (!userId) {
                console.error("Aucun ID utilisateur trouvé.");
                return;
            }
    
            try {
                if (editingIndex !== null) {
                    const response = await axios.put(
                        `http://localhost:8085/api/recipes/${userId}/${recipes[editingIndex].recipeId}`,
                        newRecipe
                    );
                    if (response.data.success) {
                        const updatedRecipes = [...recipes];
                        updatedRecipes[editingIndex] = response.data.updatedRecipe; 
                        setRecipes(updatedRecipes);
                    }
                } else {
                    const response = await axios.post(
                        `http://localhost:8085/api/recipes/${userId}`,
                        newRecipe
                    );
                    if (response.data.success) {
                        setRecipes([...recipes, response.data.newRecipe]); 
                    }
                }
    
                setNewRecipe({ titre: "", description: "", image: "" });
                setShowForm(false);
            } catch (error) {
                console.error("Erreur lors de l'enregistrement de la recette :", error);
            }
        }
    };
    
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9

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
            
            const response = await axios.delete(
                `http://localhost:8085/api/recipes/${userId}/${recipeToDelete.recipeId}`
                
            );
            
            if (response.data.success) {
                
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

    const editRecipe = (recipe) => { 
        navigate('/EditRecipe', { state: { recipe: recipe } }); 
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
            justifyContent: 'center',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight:'3px',
            marginBottom:'2px',
        },
        deleteButton: {
            cursor: 'pointer',
            fontSize: '24px',
            color: '#FF0056',
        },
        editButton: {
            cursor: 'pointer',
            fontSize: '20px',
            color: '#FF0056',
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
            width: '150px', 
            height: '150px',
            objectFit: 'cover',
            marginRight: '20px',
        },
        title: {
            marginBottom: '20px',
        },
        profileContainer: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f7fa',
            
            
        },
        profileCard: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        profileImage: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight:'5px',
        },
        infoContainer: {
            display: 'flex',
            flexDirection: 'column', 
            flex: 1,
            marginLeft:'5px',

        },
        profileTitle: {
            margin: '0',
            fontSize: '24px',
        },
        infoRow: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            width: '100%',
        },
        infoLabel: {
            flex: '0 0 50px', 
            marginRight: '8px',
        },
        infoBox: {
            border: '1px solid black',
            borderRadius: '4px',
            padding: '2px 17px',
            textAlign: 'left',
             marginRight:'340px',
            alignItems: 'center',
            justifyContent: 'center', 
            flexGrow: 1,
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', 
        },
        infoValue: {
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
      
        editProfileIcon: {
            position: 'absolute', 
            top: '10px',         
            right: '10px',     
            cursor: 'pointer',
            fontSize: '20px',
            color: '#FF0056',
        },

       
        
    };

    return (
        <div style={styles.container}>
            {user && (
                <div style={styles.profileContainer}>
                <div style={styles.profileCard}>
                    {isEditingProfile ? (
                        <>
                            <img src={user.image} alt="User" style={styles.profileImage} />
                            <div style={styles.infoContainer}>
<<<<<<< HEAD
                                <h2 style={styles.profileTitle}>{user.username}</h2>
=======
                                <h2 style={styles.profileTitle}>{user.user.username}</h2>
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
<<<<<<< HEAD
                                                setUser({ ...user, image: reader.result }); 
                                            };
                                            reader.readAsDataURL(file); 
=======
                                                setNewRecipe({ ...newRecipe, image: reader.result }); // Stocker l'image sous forme Base64
                                            };
                                            reader.readAsDataURL(file);
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                                        }
                                    }}
                                    style={styles.input}
                                />
<<<<<<< HEAD
                                <input
                                    type="text"
                                    placeholder="username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
=======

                               <input
                                    type="text"
                                    placeholder="username"
                                    value={user ? user.user.username : ""}
                                    onChange={(e) => setUser({ ...user, user: { ...user.user, username: e.target.value } })}
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
<<<<<<< HEAD
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
=======
                                    value={user ? user.user.email : ""}
                                    onChange={(e) => setUser({ ...user, user: { ...user.user, email: e.target.value } })}
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Rôle"
<<<<<<< HEAD
                                    value={user.role}
                                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                                    style={styles.input}
                                />
=======
                                    value={user ? user.user.role : ""}
                                    onChange={(e) => setUser({ ...user, user: { ...user.user, role: e.target.value } })}
                                    style={styles.input}
                                />

>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                                <button 
                                    onClick={() => {
                                        saveUserProfile();
                                        setIsEditingProfile(false);
                                    }}
                                    style={styles.button}
                                >
                                    Sauvegarder
                                </button>
                                <button onClick={() => setIsEditingProfile(false)} style={styles.button}>
                                    Annuler
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
<<<<<<< HEAD
                            <img src={user.image} alt="User" style={styles.profileImage} />
                            <div style={styles.infoContainer}>
                                <h2 style={styles.profileTitle}>{user.username}</h2>
                                {/* Ligne pour Email */}
                                <div style={styles.infoRow}>
                                    <span style={styles.infoLabel}>Email:</span>
                                    <div style={styles.infoBox}>
                                        <span style={styles.infoValue}>{user.email}</span>
                                    </div>
                                </div>
            
                                {/* Ligne pour Rôle */}
                                <div style={styles.infoRow}>
                                    <span style={styles.infoLabel}>Rôle:</span>
                                    <div style={styles.infoBox}>
                                        <span style={styles.infoValue}>{user.role}</span>
                                    </div>
                                </div>
                                <MdEdit style={styles.editProfileIcon} onClick={() => setIsEditingProfile(true)} />
                            </div>
                        </>
=======
                    <img src={user.user.image || "defaultImage.jpg"} alt="User" style={styles.profileImage} />
                    <div style={styles.infoContainer}>
                        <h2 style={styles.profileTitle}>{user.user.username}</h2>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Email:</span>
                            <div style={styles.infoBox}>
                                <span style={styles.infoValue}>{user.user.email}</span>
                            </div>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.infoLabel}>Rôle:</span>
                            <div style={styles.infoBox}>
                                <span style={styles.infoValue}>{user.user.role}</span>
                            </div>
                        </div>
                        <MdEdit style={styles.editProfileIcon} onClick={() => setIsEditingProfile(true)} />
                    </div>
                </>
>>>>>>> 6e7d408c34378db2ad31e4c4c9ef2c358adf84d9
                    )}
                </div>
            </div>
            
 
            )}
    
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
    
    <h2 style={styles.title}>Vos Recettes</h2>
    <div>
    {recipes.map((recipe) => (
        <div key={recipe.recipeId} style={styles.recipeItem}>
            {/* Conteneur pour l'image et le texte */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={recipe.image} alt={recipe.titre} style={styles.image} />
                
                {/* Conteneur pour title et description */}
                <div style={{ marginLeft: '15px', textAlign: 'left' }}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                </div>
            </div>
            
            {/* Conteneur pour les boutons */}
            <div style={styles.buttonContainer}>
                <MdEdit style={styles.editButton} onClick={() => editRecipe(recipe)} title="Éditer" />
                <RiDeleteBin6Line style={styles.deleteButton} onClick={() => deleteRecipe(recipe)} title="Supprimer" />
            </div>
        </div>
    ))}
</div>



            {showDeleteConfirmation && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                        <h3>Êtes-vous sûr de vouloir supprimer la recette : <strong>{recipeToDelete.titre}</strong> ?</h3>
                        <div style={styles.buttonContainer}>
                            <button style={{ ...styles.button}} onClick={confirmDelete}>Oui, supprimer</button>
                            <button style={styles.button} onClick={cancelDelete}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}