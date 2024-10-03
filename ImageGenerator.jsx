import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("ttps://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
          
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setImage_url(data.data[0].url);
      } else {
        setImage_url(default_image);
      }

    } catch (error) {
      setImage_url(default_image);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header"> Ai image <span> generator</span></div>
      
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="Generated" />
        </div>
      </div>

      <div className="loading">
        <div className={loading ? "loading-bar-full" : "loading-bar"}>
          {loading && <div className="loading-text">Loading...</div>}
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
      </div>

      <div className="generate-btn" onClick={generateImage}>
        Generate
      </div>
    </div>
  );
};

export default ImageGenerator;
