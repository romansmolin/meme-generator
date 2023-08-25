import React from "react";
import "./Meme.css"


const Meme = () => {

    // Initial meme template

    const memeTemplate = {
        topText: "Top Text",
        bottomText: "Bottom Text",
        randomImage: "https://i.imgflip.com/1bik.jpg",
    }

    // State for the current meme
    const [memeObject, setMemeObject] = React.useState(memeTemplate);
    // State to store all meme images
    const [allMemeImages, setAllMemeImages] = React.useState({});

    // Fetch meme images from API on component mount
    React.useEffect(() => {
        const url = "https://api.imgflip.com/get_memes";
        fetch(url)
        .then(response => response.json())
        .then(data => setAllMemeImages(data))
        .catch(error => console.error('Error while fetching:', error))
    }, [])
    
    // Function to get a random meme URL
    const getRandomMeme = () => {
        const memesArr = allMemeImages.data.memes;
        const randomIndex = Math.floor(Math.random() * memesArr.length)
        const memeUrl = memesArr[randomIndex].url;
        return memeUrl;
    }

    // onClick handler that updates image url
    const updateMemeImage = () => {
        setMemeObject(prevMemeObject => {
            return {
                ...prevMemeObject,
                randomImage: getRandomMeme(),
            }
        })
    }

    // Handle input changes
    const onChangeHandler = (e) => {
        setMemeObject(prevObjData => ({
            ...prevObjData,
            // [e.target.name] computed value, refers to the "name" attribute in input
            [e.target.name]: e.target.value,
        }))
    }

    // Render Meme Component
    return(
        <main className="main">
            <div className="container">
                <div className="form">
                    <input 
                        type="text"
                        className="form__input"
                        placeholder="Top Text"
                        value={memeObject.topText}
                        name="topText"
                        onChange={onChangeHandler}
                     />

                    <input 
                        type="text"
                        className="form__input"
                        placeholder="Bottom Text"
                        value={memeObject.bottomText}
                        name="bottomText"
                        onChange={onChangeHandler}
                    />
                    <button 
                        className="form__button"
                        onClick={() => updateMemeImage()}
                        >
                            Get a new meme image</button>
                </div>
                <div className="image__container">
                    <p className="top image__top-text image__text">{memeObject.topText}</p>
                    <p className="bottom image__text">{memeObject.bottomText}</p>
                    <img src={memeObject.randomImage} alt="img" />
                </div>
            </div>
        </main>
    );
}

export default Meme;