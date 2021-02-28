import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function FikirGonder() {
  const history = useHistory();

  const [tamIsım, settamIsım] = useState("");
  const [emailAdres, setemailAdres] = useState("");
  const [fikirTuru, setfikirTuru] = useState("");
  const [fikir, setfikir] = useState("");
  const [tamamlandiDogru, settamamlandiDogru] = useState(false);
  const [tamamlandiYanlis, settamamlandiYanlis] = useState(false);

  const formuBosalt = () => {
    settamIsım("");
    setemailAdres("");
    setfikir("");
  };

  const formuGonder = () => {
    axios
      .post("http://localhost:3001/fikirkaydet", {
        tamIsım,
        emailAdres,
        fikirTuru,
        fikir,
      })
      .then((res) => {
        if (res) {
          formuBosalt();
          settamamlandiDogru(true);
        }
      })
      .catch((err) => {
        formuBosalt();
        settamamlandiYanlis(true);
        history.push("/");
      });
  };

  return (
    <div className="text-center mt-3">
      <h1>Fikir ilet uygulaması</h1>

      <div className="mx-auto w-25 mt-5">
        {tamamlandiDogru && (
          <div class="alert alert-success" role="alert">
            Fikir gönderme işlemi başarıyla tamamlandı
          </div>
        )}
        {tamamlandiYanlis && (
          <div class="alert alert-danger" role="alert">
            Bir hata meydana geldi
          </div>
        )}
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Ad Soyad</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ad Soyad"
            value={tamIsım}
            onChange={(e) => {
              settamIsım(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Mail Adresi</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="isim@ornek.com"
            value={emailAdres}
            onChange={(e) => {
              setemailAdres(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Fikir Türü</label>
          <select
            className="form-control  "
            id="exampleFormControlSelect1"
            onChange={(e) => setfikirTuru(e.target.value)}
          >
            <option>Öneri</option>
            <option>Hata Bildirimi</option>
            <option>Şikayet</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Fikir</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={fikir}
            onChange={(e) => {
              setfikir(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="btn btn-success" onClick={formuGonder}>
          {" "}
          Gönder
        </button>
      </div>
      <Link className="btn btn-dark mt-3" to="/AdminPage">
        Admin Panel Girişi
      </Link>
    </div>
  );
}
