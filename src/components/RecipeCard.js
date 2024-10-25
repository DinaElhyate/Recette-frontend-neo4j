import CustomImage from "./CustomImage";
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate('/RecetteDetail', { state: { recipe } }); // Passer la recette à la page de détails
    };

    // Créer le chemin de l'image à partir du nom de l'image
   // Créer le chemin de l'image à partir du nom de l'image
const recipeImagePath = `${process.env.PUBLIC_URL}/img/${recipe.image}`; // Assurez-vous que l'image est dans le dossier public/img
const userImagePath = `${process.env.PUBLIC_URL}/img/${recipe.userImage || 'default-user-image.jpg'}`; // Image utilisateur par défaut

    return (
        <div className="recipe-card" onClick={goToDetailPage}>
            <div className="recipe-image-container" style={{ overflow: 'hidden', borderRadius: '10px' }}>
                <CustomImage
                    imgSrc={recipeImagePath}
                    pt="65%"
                    style={{
                        maxWidth: '100%',   // Ne pas dépasser 100% de la largeur du conteneur
                        maxHeight: '200px', // Limiter la hauteur à 200px ou selon vos besoins
                        objectFit: 'cover',  // Couvrir le cadre sans déformer l'image
                    }}
                />
            </div>
            <div className="recipe-card-info" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    className="author-img"
                    src={userImagePath}
                    alt={recipe.username}
                    style={{
                        width: '60px',         // Taille de l'image
                        height: '60px',        // Corriger la hauteur pour correspondre à la largeur
                        borderRadius: '50%',    // Arrondi pour un cadre circulaire
                        objectFit: 'cover',     // Ajuste l'image pour qu'elle remplisse le cadre
                        border: '2px solid #ccc', // Optionnel : ajouter une bordure
                        marginRight: '10px'     // Espace entre l'image et le texte
                    }}
                /> {/* Image de l'utilisateur */}
                <div>
                    <p className="recipe-username" style={{ margin: '0', fontWeight: 'bold' }}>{recipe.username}</p> {/* Nom de l'utilisateur */}
                    <p className="recipe-role" style={{ margin: '0', fontStyle: 'italic' }}>{recipe.role}</p> {/* Rôle de l'utilisateur */}
                </div>
            </div>
            <div style={{ marginTop: '10px' }}> {/* Espace entre les informations de l'utilisateur et le titre */}
                <p className="recipe-title" style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>{recipe.title}</p> {/* Titre de la recette */}
                <p className="recipe-desc" style={{ margin: '0', color: '#666' }}>{recipe.description}</p> {/* Description de la recette */}
            </div>
        </div>
    );
}