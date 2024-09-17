// adapter function - w celu mapowania specyficznych danych do komponentu wspójnego
const getBannerProps = (slideData) => ({
  title: slideData.name,
  subtitle: slideData.strapline,
  backgroundUrl: slideData.image,
});

// komponent wspólny
const Banner = ({ title, subtitle, backgroundUrl }) => {
  return (
    <div className='slide' style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <hgroup>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </hgroup>
    </div>
  );
};

// karuzela, interfejs jej itemów jest niekompatybilny z interefjsem komponentu Banner
const Carousel = ({ slides }) => {
  return (
    <ul className='carousel'>
      {slides.map((slideData) => (
        <li className='slide'>
          {/* wywołanie adaptera - zmapowanie propsów */}
          <Banner {...getBannerProps(slideData)} />
        </li>
      ))}
    </ul>
  );
};

// jeśli ten przypadek byłby powtarzany w wielu mmiejscach, możemy przygotować adapter component
const BannerSlide = (slideProps) => <Banner {...getBannerProps(slideProps)} />;
