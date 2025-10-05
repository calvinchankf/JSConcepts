import { useState } from 'react';

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [curIdx, setCurIdx] = useState(0);

  const previousOnClick = () => {
    setCurIdx((curIdx - 1 + images.length) % images.length);
  };

  const nextOnClick = () => {
    setCurIdx((curIdx + 1) % images.length);
  };

  const imgContainer = (<div className="image-carousel">
    <button className='image-carousel__prev' onClick={previousOnClick}>{"<"}</button>
    <img src={images[curIdx].src} alt={images[curIdx].alt} />
    <button className='image-carousel__next' onClick={nextOnClick}>{">"}</button>
    <div className="image-carousel__dots">
      {images.map((_, idx) => (
        <div key={idx} className={idx === curIdx ? "image-carousel__dot--active" : "image-carousel__dot"} onClick={() => setCurIdx(idx)}></div>
      ))}
    </div>
  </div>)

  return (
    <div className='wrapper'>
      {imgContainer}
    </div>
  );
}