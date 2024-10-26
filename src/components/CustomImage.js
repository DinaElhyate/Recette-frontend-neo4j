export default function CustomImage({ imgSrc, style }) {
    return (
        <img 
            src={imgSrc} 
            alt="Recipe" 
            style={style} 
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/img/th.jpeg`; 
            }} 
        />
    );
}
