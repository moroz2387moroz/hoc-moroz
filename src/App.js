import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";

const withSlider = (BaseComponent, getData) => {
  return (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
      setSlide(getData());
    }, []);

    function changeSlide(i) {
      setSlide((slide) => slide + i);
    }

    return (
      <BaseComponent
        {...props}
        slide={slide}
        autoplay={autoplay}
        changeSlide={changeSlide}
        setAutoplay={setAutoplay}
      />
    );
  };
};

const getDataFromFirstFetch = () => {
  return 10;
};
const getDataFromSecondFetch = () => {
  return 20;
};

const SliderFirst = (props) => {
  return (
    <Container className="mb-5">
      <div className="slider w-50 m-auto">
        <img
          className="slider-image d-block"
          src="https://avatars.mds.yandex.net/get-ott/2419418/2a0000019851923433c9b2730e6586d2eb54/600x900"
          alt="slide"
        />
        <div className="text-center mt-5">Active slide {props.slide}</div>
        <div className="buttons mt-3 text-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}
          >
            -1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}
          >
            +1
          </button>
        </div>
      </div>
    </Container>
  );
};

const SliderSecond = (props) => {
  return (
    <Container>
      <div className="slider w-50 m-auto">
        <img
          className="slider-image d-block"
          src="https://avatars.mds.yandex.net/i?id=94e3443938df10b9592cb64f3354f575_l-3106771-images-thumbs&n=13"
          alt="slide"
        />
        <div className="text-center mt-5">
          Active slide {props.slide} <br />
          {props.autoplay ? "auto" : null}{" "}
        </div>
        <div className="buttons mt-3 text-center">
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(-1)}
          >
            -1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.changeSlide(1)}
          >
            +1
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.setAutoplay((autoplay) => !autoplay)}
          >
            toggle autoplay
          </button>
        </div>
      </div>
    </Container>
  );
};

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

const WithLogger = (WrappedComponent) => {
  const ComponentWithLogger = (props) => {
    useEffect(() => {
      console.log("first render");
    }, []);
    return <WrappedComponent {...props} />;
  };

  return ComponentWithLogger;
};

const Hello = () => {
  return <h1>Hello</h1>;
};

const HelloWithLogger = WithLogger(Hello);

function App() {
  return (
    <>
      <HelloWithLogger />
      <SliderWithFirstFetch />
      <SliderWithSecondFetch />
    </>
  );
}

export default App;
