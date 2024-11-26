import React from 'react';
import { User, Clock, Star, Heart } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  
  const defaultImage = '/placeholder-recipe.jpg';

  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Recipe Image */}
      <div className="relative h-48 w-full">
        <img 
          src={recipe.image || defaultImage} 
          alt={recipe.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
       
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/70 p-2 rounded-full hover:bg-white/90 transition">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
          <div className="bg-white/70 px-3 py-1 rounded-full flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">4.5</span>
          </div>
        </div>
      </div>

     
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {recipe.title}
          </h2>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>

        
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="text-sm">
              {recipe.userId || 'Anonymous Chef'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">30 mins</span>
          </div>
        </div>

        
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-green-600">
              {recipe.ingredients ? `${recipe.ingredients.length} Ingredients` : '0 Ingredients'}
            </span>
          </div>
          
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;