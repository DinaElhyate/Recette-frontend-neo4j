import CustomImage from "./CustomImage"
import { useNavigate } from 'react-router-dom';

export default function HeroSection(){
    const navigate = useNavigate();
    const images = [
        "/img/gallery/img_1.jpg",
        "/img/gallery/img_2.jpg",
        "/img/gallery/img_3.jpg"
    ]
    const handleExploreClick = () => {
        navigate('/recipes'); 
    };
    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">À propos de nous</h1>
                <p className="info">FoodiesHub est une plateforme dédiée aux amateurs de cuisine. Ici, vous pouvez découvrir des recettes savoureuses du monde entier, et partager vos propres créations culinaires avec la communauté. Notre service est entièrement gratuit, alors commencez à explorer et à publier vos recettes dès maintenant !</p>
                <button className="btn" onClick={handleExploreClick}>explorer maintenant</button>
            </div>
            <div className="col gallery">
            {images.map((src, index) => (
                <div className="image-container" key={index}>
                    <CustomImage imgSrc={src} className="custom-image" />
                </div>
            ))}
        </div>

        </div>
    )
}