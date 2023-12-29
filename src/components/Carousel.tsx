import React, { useState, useCallback, useEffect } from "react";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import Icons from "./UtilsComponents/Icons";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Container } from "./style";

type Props = {
  images: [{
    id: number,
    productId: number,
    imageUrl: string
  }],
  main_img: string
}

const Carousel = (props: Props) => {

  const handleClick = (id: number) => {
    setCurrentNum(id)
  }

  const urls = [props.main_img, ...props.images.map(e => e.imageUrl)];
  const [currentNum, setCurrentNum] = useState(0);

  return (
    <div>
      <div className="w-[350px] h-[320px] m-auto mx-auto">
        <img className="h-full w-full object-scale-down " src={urls[currentNum]} alt={urls[currentNum]} />
      </div>
      <Container>

        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={props.images.length+1}
          visibleSlides={4}
          infinite
        >
          <Slider>
            {urls.map((e, id) => (
              <Slide key={id} index={id} onClick={() => handleClick(id)}>
                <img className="h-full" src={e} alt={e} />
              </Slide>
            ))}
          </Slider>

          <ButtonBack>
            <Icons.SvgLeft />
          </ButtonBack>
          <ButtonNext>
            <Icons.SvgRight />
          </ButtonNext>
        </CarouselProvider>
      </Container>
    </div>

  );
};

export default Carousel;