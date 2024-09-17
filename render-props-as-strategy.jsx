// render props as strategy - "partially rewrite the component from the outside"

// define StrategyCarousel component
const StrategyCarousel = ({ slides, renderSlide }) => {
  return <ul className='carousel'>{slides.map(renderSlide)}</ul>;
};

// define our UI strategies - functions passed from the ourside
const imageStrategy = (data) => (
  <div>
    {data.name}
    <img src={data.image} />
  </div>
);

const simpleSlideStrategy = (data) => (
  <div>
    <h2>{data.name}</h2>
  </div>
);

// Usage
const CarouselFeature = () => {
  const slides = [
    { name: 'Slide 1', image: 'image1.jpg' },
    { name: 'Slide 2', image: 'image2.jpg' },
  ];

  const useImageStrategy = true; // this condition can be dynamic, passed through props, etc.
  const selectedStrategy = useImageStrategy
    ? imageStrategy
    : simpleSlideStrategy;

  return <StrategyCarousel slides={slides} renderSlide={selectedStrategy} />;
};

// <StrategyCarousel slides={slides} renderSlide={simpleSlideStrategy} />
