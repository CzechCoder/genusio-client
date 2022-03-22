import { useState } from "react";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

const PwRecover = () => {
  const [email, setRwEmail] = useState("");

  const sendRwEmail = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error("Email nenalezen!");
        } else {
          toast.success("Instrukce poslány na email!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.info("Chyceno!");
      });
  };

  return (
    <div className="pw-reset-card">
      <div className="pw-reset-wrapper">
        <h4>Obnova hesla</h4>
        <p>
          Prosím vložte svoji emailovou adresu. Obdržíte email s dalšími
          instrukcemi.
        </p>
        <form onSubmit={sendRwEmail}>
          <div className="form-group">
            <TextField
              size="small"
              variant="outlined"
              className="form-control"
              label="Email"
              value={email}
              onChange={(e) => setRwEmail(e.target.value)}
            />
          </div>
          <div className="text-center mt-4">
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={sendRwEmail}
              style={{ width: "100%", height: "50px" }}
            >
              Odeslat
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PwRecover;
