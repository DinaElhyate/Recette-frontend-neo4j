import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Clock, Utensils, BookOpen } from 'lucide-react';

const RecetteDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        
        const recipeResponse = await axios.get(`/api/recipes/${recipeId}`);
        setRecipe(recipeResponse.data);

      
        const commentsResponse = await axios.get(`/api/comments/${recipeId}`);
        setComments(commentsResponse.data.comments);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        content: newComment,
        userId: 'current-user-id', 
        recipeId: recipeId
      });
      
      setComments([...comments, response.data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        header: {
            
            marginBottom: '20px',
        },
        image: { width: '100%', height: '400px', objectFit: 'cover', marginTop: '20px', },
       
        title: { fontSize: '2rem', fontWeight: 'bold', color: 'red',marginBottom:'10px', },
        info: {
            lineHeight: '1.6',
        },
        sectionTitle: {
            marginTop: '20px',
            marginBottom: '10px',
        },
        durationContainer: {
            marginTop: '20px',

            border: 'dashed red',
            padding: '10px',
            gridrow:'1',
            
        },
        durationRow: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '5px', 
            
        },
        durationText: {
            margin: '0', 
            fontSize: '16px',
            lineHeight: '1.5', 
        },
        durationValue: {
            margin: '0',
            fontSize: '16px', 
            lineHeight: '1.5',
            fontWeight: 'bold', 
        },
        list: {
            marginLeft: '20px',
        }, stepTitle: {
            fontWeight: 'bold',
            marginTop: '10px',
        },
        stepDescription: {
            marginLeft: '20px',
        },
        
        commentInput: {
            marginBottom: '10px',
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
       
        commentItem: {
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
        },
        submitButton: {
            appearance: 'none',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            boxSizing: 'border-box',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px', 
            transition: 'background-color 0.3s ease',
        },  
        recipesContainer: {
            display: 'flex',               
            flexWrap: 'wrap',             
            justifyContent: 'space-between', 
            gap: '20px',                  
            margin: '20px 0',            
        },
    
        recipeCard: {
            flex: '1 1 calc(30% - 20px)', 
            maxWidth: '300px',            
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px',         
            overflow: 'hidden',           
            transition: 'transform 0.3s',  
        },
        
        recipeCardHover: {
            transform: 'scale(1.05)',     
        },
        
    };
    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recipe Image */}
        <div>
          <img 
            src={recipe.image || '/placeholder-recipe.jpg'} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Recipe Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <User className="mr-2" />
              <span>By {recipe.userId || 'Anonymous'}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>30 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Utensils className="mr-2" /> Ingredients
        </h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" /> Instructions
        </h2>
        <ol className="list-decimal pl-5">
          {recipe.instructions && recipe.instructions.map((instruction, index) => (
            <li key={index} className="mb-2">{instruction.step}</li>
          ))}
        </ol>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        
        {/* Comment Input */}
        <div className="mb-4 flex">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-l-lg"
          />
          <button 
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>

        {/* Comments List */}
        {comments.map((comment) => (
          <div key={comment.commentId} className="border-b py-2">
            <p>{comment.content}</p>
            <small className="text-gray-500">
              {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Just now'}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetteDetail;