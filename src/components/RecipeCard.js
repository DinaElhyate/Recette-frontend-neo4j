import CustomImage from "./CustomImage";
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate('/RecetteDetail', { state: { recipe } }); 
    };

    const recipeImagePath = `${process.env.PUBLIC_URL}/img/${recipe.image}`; 
    const userImagePath = `${process.env.PUBLIC_URL}/img/${recipe.userImage || 'default-user-image.jpg'}`; 

    console.log('Image URL:', recipeImagePath);

    return (
        <div className="recipe-card" onClick={goToDetailPage}>
            <div className="recipe-image-container" style={{ overflow: 'hidden', borderRadius: '10px' }}>
                <CustomImage
                    imgSrc={recipeImagePath}
                    pt="65%"
                    style={{
                        maxWidth: '100%',  
                        maxHeight: '200px', 
                        objectFit: 'cover', 
                    }}
                />
            </div>
            <div className="recipe-card-info" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    className="author-img"
                    src={userImagePath}
                    alt={recipe.username}
                    style={{
                        width: '60px',        
                        height: '60px',        
                        borderRadius: '50%',   
                        objectFit: 'cover',    
                        border: '2px solid #ccc', 
                        marginRight: '10px'    
                    }}
                /> 
                <div>
                    <p className="recipe-username" style={{ margin: '0', fontWeight: 'bold' }}>{recipe.username}</p> 
                    <p className="recipe-role" style={{ margin: '0', fontStyle: 'italic' }}>{recipe.role}</p>
                </div>
            </div>
            <div style={{ marginTop: '10px' }}> 
                <p className="recipe-title" style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>{recipe.title}</p> 
                <p className="recipe-desc" style={{ margin: '0', color: '#666' }}>{recipe.description}</p> 
            </div>
        </div>
    );
}
