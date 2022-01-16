import { useEffect, useState } from "react";

export const useImagesLoaded = (totalImagesToLoad: number) => {
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const handleLoad = () => {
    setImagesLoaded(imagesLoaded + 1)
  }

  return {
    handleLoad,
    imagesDone: totalImagesToLoad <= imagesLoaded
  }
}