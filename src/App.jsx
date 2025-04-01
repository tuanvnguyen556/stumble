import { useState, React, Fragment } from 'react';

import './App.css';

function App() {
  let [values, setValues] = useState({})
  let [showImage, setShowImage] = useState(false);
  let [banAttrs, setBanAttrs] = useState([]);
  let look = true;
  function callAPI(){
 
    let apiConnect = fetch(`https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${import.meta.env.VITE_API_KEY}`);
    apiConnect.then((data) => data.json()).then((data) => 
    {
      console.log(data);

      if (!banAttrs.includes(data[0]["breeds"][0]["bred_for"]) && !banAttrs.includes(data[0]["breeds"][0]["temperament"]) && !banAttrs.includes(data[0]["breeds"][0]["life_span"])){
        setValues(data[0]); 
        look = false;
      } else{
        look = true;
        if (look){
          callAPI();
        }
      }
    }).catch((error) => console.log(error));
    
    
    setShowImage(true);
  }

  function addAttribute(attr){
    let missing = true;
    for (let i = 0; i < banAttrs.length; i++){
      if (attr == banAttrs[i]){
        missing = false;
      }

    }
    if (missing){
      setBanAttrs([...banAttrs, attr]);
    }
    
  }

  function removeAttribute(attr){
    let arrayWithoutAttribute = banAttrs.filter((item) => item != attr);
    setBanAttrs(arrayWithoutAttribute);
  }
  let content;
  
    if (values && values["breeds"] && values["breeds"].length > 0 && showImage){
      let breeds = values["breeds"][0]
      content = (<Fragment>
        <img className="image-dog" src={values["url"]} width={values["width"]} height={values["height"]} /> 
        <div className="attributes-container">
          <button onClick={() => addAttribute(breeds["bred_for"])} className="attribute-button">{breeds["bred_for"]}</button>
          <button onClick={() => addAttribute(breeds["temperament"])} className="attribute-button">{breeds["temperament"]}</button>
          <button onClick={() => addAttribute(breeds["life_span"])} className="attribute-button">{breeds["life_span"]}</button>
        </div>
        </Fragment>);
    } 
    let attributes;
    if (banAttrs){
      attributes = Array.isArray(banAttrs) ? banAttrs.map((attr, key) => <button onClick={() => removeAttribute(attr)} id={key} className="attr-item">{attr}</button>) : <span></span>
    }
  
  return (
      <div className="main-container">
        <div className="containers">
          <div className="image-container">
            {content}
          </div>
          <div className="ban-attributes-container">
            <h2>Banned Attributes</h2>
            {attributes}
          </div>
        </div>
        
        <button className="button-api-call" onClick={callAPI}>Next Dog</button>
      </div>
  );
 
};

export default App;
