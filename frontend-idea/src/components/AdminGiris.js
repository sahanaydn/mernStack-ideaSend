import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function AdminGiris() {
  const history = useHistory();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [basariliGiris, setbasariliGiris] = useState(false);
  const [basarisizGiris, setbasarisizGiris] = useState(false);
  const [yanlisSifre, setyanlisSifre] = useState(false);

  const girisYap = () => {
    axios
      .post("http://localhost:3001/giris", { username, password })
      .then((res) => {
        if (res.status === 200) {
          setbasariliGiris(true);
          setTimeout(function () {
            history.push("/fikirler");
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setyanlisSifre(true);
          history.push("AdminPage");
        } else {
          setbasarisizGiris(true);
          setTimeout(function () {
            history.push("/kayitOl");
          }, 2000);
        }
      });
  };

  return (
    <div className="text-center mt-3">
      <h1>Admin Panel Girişi</h1>
      {basariliGiris && (
        <div class="alert alert-success" role="alert">
          Giriş bilgileri doğru 3 saniye içinde fikirler sayfasına
          yönlendirileceksiniz...
        </div>
      )}
      {basarisizGiris && (
        <div class="alert alert-danger" role="alert">
          Kullanıcı kayıtlı değil lütfen kayıt olmayı deneyin. Kayıt sayfasına
          yönlendiriliyorsunuz...
        </div>
      )}
      {yanlisSifre && (
        <div class="alert alert-danger" role="alert">
          Kullanıcı adı veya parola yanlış. Lütfen kontrol edin ve yeniden
          deneyin...
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
            onChange={(e) => setusername(e.target.value)}
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
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <Link className="btn btn-success w-100" onClick={girisYap}>
          Giriş
        </Link>
        <Link to="kayitOl" className="btn btn-info w-100 mt-3">
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
}
