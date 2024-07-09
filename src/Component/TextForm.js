import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleUpClick=() => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  }
  
  const handleLowClick=() => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  }

  const handleClearText=() => {
    let newText = '';
    setText(newText);
    props.showAlert("Cleared Text!", "success");
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  }

  const readTxt = (event) => {
    let file = event.target.files[0];
    if(file !== undefined){
      let reader = new FileReader();
      reader.onload = function(event){
          setText(event.target.result);
      };
      reader.readAsText(file);
    }
}

const speak = () => {
  let msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
  const toogle = document.getElementById('toggle')
  if (toogle.textContent == "Speak") {
      toogle.innerHTML = "Stop"
  }
  else {
      toogle.innerHTML = "Speak"
      if (toogle.innerHTML = "Speak"){
          window.speechSynthesis.cancel()
      }
  }
}
  

  return (
    <>
      <div className="container" style={{color : props.mode === "light" ? '#042743' : 'white'}}>
        <div className="mb-3">
          <h1>Enter the text to analyze below</h1>
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            value={text}
            rows="8"
            style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'grey'}} 
          ></textarea>
        </div>
        <button
          type="button"
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to UpperCase
        </button>


        <button
          type="button"
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLowClick}
        >
          Convert to LowerCase
        </button>

        <button
          type="button"
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearText}
        >
         Clear Text
        </button>

        <button
          type="button"
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopyText}
        >
         Copy Text
        </button>

        <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2" id="toggle">Speak</button>


        <input type="file" className="btn btn-secondary my-3" accept="text/plain" onChange = {readTxt}/>

      </div>

      <div className="container my-3" style={{color : props.mode === "light" ? '#042743' : 'white'}}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((element) => {return element.length !== 0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((element) => {return element.length !== 0}).length} Minutes read</p>
        <h2>Preview:</h2>
        <p>{text.length>0? text:"Nothing to Preview"}</p>
      </div>
    </>
  );
}
