import { useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Spinner, Row } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import "./allUser.css";

const AllUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setLoading(true);
      axios
        .get("https://barengin.site/jwt/users", config)
        .then(({ data }) => {
          console.log(data.Data);
          setUser(data.Data);
        })
        .catch((err) => {
          console.log(err.data.Message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const detailUser = (id) => {
    console.log(id);
    // navigate(`/`);
  };

  const delUser = (id) => {
    // /jwt/users/{id}
    console.log(id);
    // navigate(`/`);
  };

  if (loading) {
    return (
      <div className="LoadingContainer">
        <div className="loadingCenter d-flex justify-content-center align-items-center">
          <h3>
            {" "}
            <Spinner animation="grow" variant="success" />
            Loading ...{" "}
          </h3>
        </div>
      </div>
    );
  } else if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div className="BaseContainer">
          <div className="title text-center">
            <h3 style={{ color: "#0c6632" }}>All User</h3>
          </div>
          <div className="allUser">
            {/* Title Table */}
            <Row className="title-table pb-3 text-center">
              <div className="col-md-1 ">
                <h4>ID</h4>
              </div>

              <div className="col-md-3">
                <h4>Name</h4>
              </div>

              <div className="col-md-3">
                <h4>Email</h4>
              </div>

              <div className="col-md-3">
                <h4>Phone</h4>
              </div>

              <div className="col-md-1">{/* <h4>Detail</h4> */}</div>

              <div className="col-md-1">{/* <h4>Delete</h4> */}</div>
            </Row>

            {/* Content Table */}
            {user.map((el, idx) => (
              <Row key={idx} className="content-table ">
                <div className="col-md-1 col-xs-1 text-center">
                  <p>{el.ID}</p>
                </div>

                <div className="col-md-3 col-xs-3">
                  <p>{el.Name}</p>
                </div>

                <div className="col-md-3 col-xs-3">
                  <p>{el.Email}</p>
                </div>

                <div className="col-md-3 col-xs-3">
                  <p>{el.Phone}</p>
                </div>

                <div className="col-md-1 col-xs-1 text-center">
                  <CgFileDocument
                    style={{ color: "#0c6632", cursor: "pointer" }}
                    onClick={() => detailUser(el.ID)}
                  />
                </div>

                <div className="col-md-1 col-xs-1 text-center">
                  <MdDelete
                    style={{ color: "#0c6632", cursor: "pointer" }}
                    onClick={() => delUser(el.ID)}
                  />
                </div>
              </Row>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default AllUser;
