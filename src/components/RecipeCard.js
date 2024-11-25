import React from "react";

export default function RecipeCard({ recipe }) {
    if (!recipe) {
        return <div>Loading...</div>; 
    }

    const { image, title, description, user } = recipe;

    const userImage = user?.image || 'default-user-image.jpg';
    const userName = user?.username || 'Unknown'; 

    return (
        <div className="recipe-card">
            <div className="image-container">
                <img
                    src={image || 'default-recipe-image.jpg'}
                    alt={title}
                    className="recipe-image"
                />
            </div>
            <div className="recipe-details">
                <h3 className="recipe-title">{title}</h3>
                <p className="recipe-description">{description}</p>
            </div>
            <div className="user-info">
                <img
                    src={userImage} 
                    alt={userName}
                    className="user-image"
                />
                <span className="username">{userName}</span>
            </div>
            <style jsx>{`
                .recipe-card {
                    position: relative;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s ease;
                }

                .recipe-card:hover {
                    transform: scale(1.05);
                }

                .image-container {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }

                .recipe-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .recipe-details {
                    padding: 1rem;
                    flex-grow: 1;
                    margin-bottom: 1rem;
                }

                .recipe-title {
                    font-size: 1.25rem;
                    margin: 0 0 0.5rem;
                    font-weight: bold;
                    word-wrap: break-word;
                }

                .user-info {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.8);
                    padding: 4px 8px;
                    border-radius: 8px;
                }

                .user-image {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .username {
                    font-size: 0.875rem;
                    color: #333;
                }

                @media (max-width: 600px) {
                    .recipe-card {
                        font-size: 0.9rem;
                    }

                    .image-container {
                        height: 150px;
                    }
                }
            `}</style>
        </div>
    );
}
