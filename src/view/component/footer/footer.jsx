import { Row, Col, Container } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";

import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer ">
        <Container>
          <Row>
            <Col xs={9} md={9} lg={9} sm={9} className="mt-5 mb-5">
              <h3>About Us</h3>
              <h6>
              Barengin is a platform that offers a sharing system for customers in subscripting digital products to gain various benefits.
              </h6>
            </Col>

            <Col xs={3} md={3} lg={3} sm={3} className="footer-2 p-5">
              <h3>Contact US</h3>

              <Row>
                <Col className="m-1">
                  <IconContext.Provider
                    value={{
                      // color: "#0c6632",
                      size: "30px",
                    }}
                  >
                    <BsFacebook />
                  </IconContext.Provider>
                </Col>

                <Col className="m-1">
                  <IconContext.Provider
                    value={{
                      // color: "#0c6632",
                      size: "30px",
                    }}
                  >
                    <AiFillTwitterCircle />
                  </IconContext.Provider>
                </Col>

                <Col className="m-1">
                  <IconContext.Provider
                    value={{
                      // color: "#0c6632",
                      size: "30px",
                    }}
                  >
                    <AiFillInstagram />
                  </IconContext.Provider>
                </Col>

                <Col className="m-1">
                  <IconContext.Provider
                    value={{
                      // color: "#0c6632",
                      size: "30px",
                    }}
                  >
                    <ImMail4 />
                  </IconContext.Provider>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center">
            <p className="text-center">©copyright: 2021 | Barengin</p>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Footer;
