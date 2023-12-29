import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100px; 
  margin-top: 50px;
  
  > span {
    margin: 24px 0;
  }

  .carousel__back-button {
    position: absolute;
    top: calc(50% - 20.5px);
    left: 0;
    height: 25px;
  }

  .carousel__next-button {
    position: absolute;
    top: calc(50% - 20.5px);
    right: 0;
    height: 25px;
  }

  .carousel__inner-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
`;
export const UploadContainer = styled.div``;

export const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;

  .carousel {
    max-width: 500px;
    height: 100px;
  }

  .carousel .thumbs {
    display: flex;
    align-items: center;
    justify-content: center;
    .thumb + .thumb {
      margin-left: 12px;
    }
  }

  .carousel .thumb img {
    width: 100% !important;
    height: 50% !important;
    .fullscreen {
      position: relative:
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .carousel .slide {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 500px;
      max-height: 100px;  /* change this to whatever you want */
      width: auto;
    }
  } 

  
`;
