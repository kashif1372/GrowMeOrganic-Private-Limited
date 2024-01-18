import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import { toast } from "react-hot-toast";
interface User {
  name: string;
  email: string;
  phoneno: number | null;
}

export function Login() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phoneno: null,
  });
  const Navigate = useNavigate();
  const HandleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    toast.success(`welcome ${user?.name}`);
    Navigate("/home");
  };
  const inputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);
  return (
    <Box>
      <form onSubmit={HandleSubmit}>
        <Box className="main">
          <h1 className="formHeading">GrowMeOrganic Private Limited</h1>
          <Box className="inputBox">
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              className="textForm"
              onChange={inputChange}
              required
            />
          </Box>
          <Box className="inputBox">
            <TextField
              name="phoneNo"
              label="Phone Number"
              type="tel"
              variant="outlined"
              className="textForm"
              required
              onChange={inputChange}
            />
          </Box>
          <Box className="inputBox">
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              required
              className="textForm"
              onChange={inputChange}
            />
          </Box>
          <Box className="formBtn">
            <Button
              className="btn"
              type="submit"
              size="medium"
              variant="contained"
            >
              Welcome
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

