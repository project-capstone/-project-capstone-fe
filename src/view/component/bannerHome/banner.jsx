import {
  Button,
  InputGroup,
  Form,
  Image,
  Row,
  Col,
  Container,
  Carousel,
} from "react-bootstrap";

import banner1 from "../../../image/banner-1.png";
import banner2 from "../../../image/banner-2.png";
import banner3 from "../../../image/banner-3.png";

import "./banner.css";

const Banner = () => {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="carousel-item d-block w-100 fluid"
          //   style={{ borderWidth: 1, borderRadius: 10, borderColor: "#182943" }}
          src={banner1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-item d-block w-100 fluid"
          //   style={{ borderWidth: 1 }}
          src={banner2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-item d-block w-100 fluid"
          //   style={{ borderWidth: 1 }}
          src={banner3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};
export default Banner;
