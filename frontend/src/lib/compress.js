// Function to resize and compress the image
export const compressImage = async (base64Image) => {
    const img = new Image();
    img.src = base64Image;
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Create a canvas to resize and compress the image
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        // Define the max width and height
        const maxWidth = 800;
        const maxHeight = 600;
  
        // Calculate the scaling ratio
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * ratio;
        const height = img.height * ratio;
  
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
  
        // Draw the image to the canvas with the new dimensions
        context.drawImage(img, 0, 0, width, height);
  
        // Return the resized image as a base64-encoded PNG or JPEG (compressed)
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // 70% quality for compression
      };
  
      img.onerror = (err) => reject(err);
    });
  };
  