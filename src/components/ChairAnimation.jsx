import React, { useRef, useEffect, useState } from 'react';
import './ChairAnimation.css';

const ChairAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const totalFrames = 80;

  // Generate file paths
  const currentFrame = (index) => {
      const paddedIndex = index.toString().padStart(3, '0');
      return `/Images/Anim/chair animation/Whisk_ydo5ado2ydohjty10yn0kjytqgokrtlwqwz00sy_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const imgArray = [];

    // Preload images
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const container = containerRef.current;
    
    // Set canvas dimensions to match the first image
    if (images[0]) {
        canvas.width = images[0].width;
        canvas.height = images[0].height;
    }

    let targetFrame = 0;
    let currentFrame = 0;
    let animationFrameId;

    const render = () => {
        // Smoothly interpolate currentFrame towards targetFrame
        // The 0.05 factor determines the speed/smoothness (lower = slower/smoother)
        currentFrame += (targetFrame - currentFrame) * 0.05;
        
        const frameIndex = Math.round(currentFrame);
        
        if (images[frameIndex]) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[frameIndex], 0, 0);
        }
        
        animationFrameId = requestAnimationFrame(render);
    };

    // Start the animation loop
    render();

    const handleScroll = () => {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress based on container position
        const start = rect.top;
        const totalDist = rect.height - viewportHeight;
        
        let progress = -start / totalDist;
        progress = Math.min(Math.max(progress, 0), 1);
        
        // Update target frame based on scroll position
        targetFrame = progress * (totalFrames - 1);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images]);

  return (
    <div className="chair-animation-container" ref={containerRef}>
      <div className="chair-sticky-wrapper">
        <div className="animation-content">
             <canvas ref={canvasRef} />
             {!isLoaded && <div className="loading-text">Loading 3D View...</div>}
             <div className="animation-text-overlay">
                <h2>Comfort in Motion</h2>
                <p>Scroll to animate</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChairAnimation;
