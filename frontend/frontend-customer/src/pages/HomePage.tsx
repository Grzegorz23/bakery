import {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";


const cakeImages = [
    {
        src: 'public/483376690_18035384414544681_7195389723993254940_n.jpg',
        alt: 'Tort czekoladowy',
    },
    {
        src: 'public/484326245_18035921528544681_4503068105554571485_n.jpg',
        alt: 'Tort owocowy',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort dsa',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort das',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort weselny',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort dsa',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort dsa',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort das',
    },
    {
        src: 'public/485629821_18036293072544681_5459175528675150568_n.jpg',
        alt: 'Tort dsa',
    }
];

const ImageWithFade = ({ src, alt }: { src: string; alt: string }) => {
    const [loaded, setLoaded] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const previewPortal = showPreview
        ? ReactDOM.createPortal(
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    padding: '10px',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    }}
                />
            </div>,
            document.body
        )
        : null;

    return (
        <>
            <div
                ref={ref}
                style={{
                    width: '250px',
                    height: '200px',
                    position: 'relative',
                    transform: visible ? 'translateY(0)' : 'translateY(50px)',
                    opacity: visible ? 1 : 0,
                    transition: 'all 0.6s ease-out',
                    zIndex: 0,
                }}
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
            >
                {!loaded && (
                    <div
                        style={{
                            backgroundColor: '#eee',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderRadius: '8px',
                            zIndex: 0,
                        }}
                    />
                )}

                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: '250px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                        zIndex: 0,
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                />
            </div>

            {previewPortal}
        </>
    );
};

const HomePage = () => {
    return (
        <div style={{textAlign: 'center', background: '#ffcce6', minHeight: '100vh', padding: '2rem'}}>
            <h1 style={{color: 'magenta', fontSize: '3rem'}} data-testid="welcome-label">Witamy w cukierni!</h1>
            <p style={{fontSize: '1.2rem', color: 'deeppink'}}>Zobacz nasze wyjątkowe torty 🍰</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginTop: '2rem'}}>
                {cakeImages.map((cake, index) => (
                    <div key={index}>
                        <ImageWithFade src={cake.src} alt={cake.alt}/>
                        <p style={{marginTop: '10px', color: 'magenta'}}>{cake.alt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
