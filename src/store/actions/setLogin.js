import axios from "axios";
import allStore from "./index.js";
import swal from "sweetalert";

export let token = "";

export const postLogin = (payload) => {
  localStorage.clear();

  return (dispacth) => {
    dispacth(allStore.setLoading(true));
    console.log("2.masuk Action");
    console.log(payload);
    axios
      .post("https://barengin.site/login", payload)
      .then((response) => {
        console.log("3, Masuk Then", response.data.Data);
        swal(response.data.Message);
        console.log("INI TOKEN", response.data.Data.Token);
        token = response.data.Data.Token;
        console.log("INI TOKEN NYA DAH MASUK : ", token);

        // menyimpan token ke local storage
        if (response.data.Data !== null) {
          localStorage.setItem("token", response.data.Data.Token);
          localStorage.setItem("user", response.data.Data.ID);
          localStorage.setItem("role", response.data.Data.Role);
          localStorage.setItem("ID", response.data.Data.ID);
        }
      })
      .catch((err) => {
        if (err) {
                  swal(err.response.data.Message);
                  allStore.setError(err.response.data.Message);
                } else {
                  swal.stopLoading();
                  swal.close();
                }
      })
      .finally(
        (_) => dispacth(allStore.setLoading(false)),
        dispacth(allStore.setError({}))
      );
  };
};

export const setLogin = (payload) => {
  return {
    type: "SET_LOGIN",
    payload,
  };
};
