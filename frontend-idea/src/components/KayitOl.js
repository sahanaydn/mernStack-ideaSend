import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function KayitOl(props) {
  const history = useHistory();
  const [basariliKayit, setbasariliKayit] = useState(false);
  const [basarisizKayit, setbasarisizKayit] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [referans, setreferans] = useState("");
  const [temp, settemp] = useState("");

  const formuBosalt = () => {
    setpassword("");
    setusername("");
  };

  //const refKontrol = () => {};

  const adminGonder = () => {
    axios
      .post("http://localhost:3001/kayitOl", {
        username,
        password,
        referans,
      })
      .then((res) => {
        if (res) {
          setbasariliKayit(true);
          formuBosalt();
          settemp(res.data);
          setTimeout(function () {
            history.push("/AdminPage");
          }, 10000);
        }
      })
      .catch((err) => {
        console.log(err);
        setTimeout(function () {
          history.push("/KayitOl");
        }, 3000);

        setbasarisizKayit(true);
      });
  };

  return (
    <div className="text-center mt-3">
      <h1>Admin Kayıt Sayfası</h1>
      {basariliKayit && (
        <div>
          <div class="alert alert-success" role="alert">
            Kaydınız basari ile gerçekleşti. Lütfen aşağıdaki kodu not edin. 5
            saniye içinde not etmezseniz bir daha koda ulaşamazsınız {temp}
          </div>

          <h1 class="display-4"> {temp}</h1>
        </div>
      )}
      {basarisizKayit && (
        <div class="alert alert-danger" role="alert">
          <p>
            {" "}
            Bir hata meydana geldi 2 saniye sonra tekrar kayıt olmayı
            deneyebilirsiniz...
          </p>
          <hr />
          <h1 class="display-4">{temp}</h1>
        </div>
      )}

      <div className="mx-auto w-25 mt-5">
        <div className="form-group">
          <label for="exampleFormControlInput1">Kullanıcı Adı</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Şifre</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Şifre"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <div class="d-flex justify-content-center">
            {" "}
            <span class="badge badge-primary">
              Yetkili bir kişi size referans olursa sisteme admin olarak kayıt
              olabilirsin.
            </span>
          </div>
          <p class="h6">Referans kodları tek kullanımlıktır.</p>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Referans Kodu </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
            value={referans}
            onChange={(e) => {
              setreferans(e.target.value);
            }}
          />
        </div>

        <Link className="btn btn-info w-100 mt-3" onClick={adminGonder}>
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
}
