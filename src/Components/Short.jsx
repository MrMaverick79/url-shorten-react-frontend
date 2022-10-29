import { useState } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL 


const Short = () => {

    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState();

    function handleSubmit(e){
        console.log(originalUrl);
        shortenUrl(originalUrl);
       
    }

    function handleChange(e){

        setOriginalUrl(e.target.value)

    }

    async function shortenUrl(urlToShorten){

        try{
            const res = await axios.post(BASE_URL+'/api/short', {
                originalUrl: urlToShorten
            });

            setShortUrl(res.data)

        } catch (err ){

            console.log('Unable to shorten this url', err);

        }


    }


    return(

        <div className="wrapper" >
            <h2>Shorten url here</h2>
            <input type="text" onChange={handleChange}></input>
            <button onClick={handleSubmit}>Generate</button>
        </div>
    )

};


export default Short;

