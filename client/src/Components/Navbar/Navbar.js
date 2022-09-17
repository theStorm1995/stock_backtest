import React from "react";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import { Button, Typography, AppBar } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, Link, useLocation } from "react-router-dom";
import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [ticker, setTicker] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation()

  const handleSubmit = async () => {
    if (!ticker) setMsg("Enter a ticker !");
    else navigate(`/quote/${ticker}`);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login')
  };

  useEffect(() => {
    if(user)
    {
      const token = user.token
      if(token)
      {
        const decoded = decode(token)
        if(decoded.exp * 1000 < new Date().getTime())
        {
          logout()
        }
      }
    }
  }, [location])
  return (
    <>
      {/* Navbar */}
      <AppBar
        style={{
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        position="static"
        color="inherit"
      >
        <Typography
          style={{
            marginLeft: "5px",
            fontFamily: "Franklin Gothic Medium",
            color: "rgb(35, 38, 35)",
            textDecoration: "none",
            fontSize: "30px",
          }}
          component={Link}
          to="/"
        >
          <b>My Portfolio</b>
        </Typography>
        {msg && <Typography color="secondary">{msg}</Typography>}
        <div style={{ display: "flex", marginRight: "20px" }}>
          <FormControl fullWidth>
            <OutlinedInput
              size="small"
              onChange={(e) => {
                setTicker(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder="Search a Ticker"
              value={ticker}
            />
          </FormControl>
          <Button
            style={{ marginLeft: "10px" }}
            variant="outlined"
            onClick={() => {
              handleSubmit(ticker);
            }}
          >
            Submit
          </Button>
        </div>
        {!user ? (
          <Button
            variant="outlined"
            style={{ marginRight: "8px" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </Button>
        ) : (
          <div style={{ display: "flex" }}>
            <Typography style={{ marginTop: "6px" }}>
              <b>{user.result.name}</b>&nbsp;&nbsp;
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </AppBar>
    </>
  );
};

export default Navbar;
