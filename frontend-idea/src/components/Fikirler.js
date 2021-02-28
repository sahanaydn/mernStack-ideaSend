import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function Fikirler() {
  const [fikirler, setfikirler] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/fikirler")
      .then((res) => {
        setfikirler(res.data);
      })
      .catch((err) => console.log(err));
  }, [fikirler]);

  return (
    <div class="wrapper container">
      <div className="row">
        {fikirler.map((data) => {
          return (
            <div class="col-md-3" style={{ "margin-top": "0.5rem" }}>
              <Card className="text-center" border="success">
                <Card.Header>{data.emailAdres}</Card.Header>
                <Card.Body>
                  <Card.Title>{data.tamIsım}</Card.Title>
                  <Card.Text>{data.fikir}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {data.fikirTuru}
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
