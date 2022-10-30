import { useState } from "react";
import axios from "axios";
import "../App.css"
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000"

const Short = () => {
    //Main component to shorten a url
    
    //State
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState();

    //Methods
    function handleSubmit(){
        console.log(originalUrl);
        shortenUrl(originalUrl);
       
    }

    function handleChange(e){
        setOriginalUrl(e.target.value)
    }

    function copyLink(){

        const link = document.querySelector(".shortLink").innerHTML;
        console.log("Link", link);

        // Copy the text inside the text field
        navigator.clipboard.writeText(link);
        
        //Display hover text
        let tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied: " + link;

    }// copyLink()

    function outFunc() { //change hover text
        let tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
    }

    
    function clearAll(){
        setShortUrl("");
        setOriginalUrl("");
        document.querySelector(".urlInput").value = ""
    }

 

    //Submit a post request to the back end
    async function shortenUrl(urlToShorten){

        try{
            const res = await axios.post(BASE_URL+'/api/short', {
                originalUrl: urlToShorten
            });

            // console.log('A response has been received from the server', res.data);
            //Set shortened url data to state
            setShortUrl(res.data)
            
        } catch ( err ){
            console.log('Unable to shorten this url', err);
        }

    } //shortenUrl()


    return(

        <div className="wrapper" >
            <h1>shrt.URL</h1>
            <div className="mainFocus">
                <input type="text" onChange={handleChange} placeholder="Add a url you want to shorten here." className="urlInput"></input>
                <button onClick={handleSubmit} onMouseOut={outFunc}>Shorten</button>
                {
                    shortUrl ?
                    <button onClick={clearAll}>New</button>: null

                }
                {
                shortUrl ? 
                
                <div className="results">
                    <a href={shortUrl.shortUrl} className="shortLink">{shortUrl.shortUrl}</a>
                    <div className="tooltip">
                        <button onClick={copyLink} onMouseOut={outFunc}>
                            <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
                        Copy text
                        </button> 
                    </div> 
                </div>
                :
                null

                }

            </div>
        </div>
    )

};


export default Short;

