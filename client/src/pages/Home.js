import React from "react";
//import useStyles from './styles'
import Navbar from "../Components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { fetchTrendingUS, getWatchList } from "../actions/object";
import {
  Container,
  Paper,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";
import Carousel from "better-react-carousel";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import News from "../Components/News/News";

const Home = () => {
  //const classes = useStyles()
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [watchList, setWatchList] = useState([])
  const user = JSON.parse(localStorage.getItem('profile'))
  // console.log(user)

  useEffect(() => {
    async function fetchData() {
      const d = await fetchTrendingUS();
      if(user)
      {
        const list = await getWatchList(user.result._id)
        setWatchList(list)
      }     
      if (d) 
      {
        setData(d.finance.result[0]);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);


  const Trending = (props) => {
    return (
      <Paper style={{ padding: "5px", borderRadius: "0px" }} elevation={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h5" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{props.item}</Typography>
            <ShowChartIcon fontSize="large" style={{ color: "#00FF00" }} />
          </div>
          <Button onClick={() => navigate(`/quote/${props.item}`)}>
            <ArrowForwardIcon />
          </Button>
        </div>
      </Paper>
    );
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Container style={{ marginTop: "20px" }}>
          <Typography variant="h5">
            <b>Trending Tickers</b>
          </Typography>
          <br />
          <Divider />
          {data && (
            <Carousel cols={6} rows={1} gap={0} loop>
              {data.quotes.map((item, i) => (
                <Carousel.Item key={i}>
                  <Trending item={item.symbol} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <Divider /><br/><br/>
          <Typography variant="h5"><b>Watch List</b></Typography><br/>
          {/* if user is not signed in */}
          {!user &&
            <div style={{display: 'flex'}}>
              <Typography component={Link} to='/login' style={{textDecoration: 'none', color: "rgb(35, 38, 35)"}}>
                <b>Sign in</b> &nbsp; 
              </Typography>
              <Typography> to use this feature</Typography>
            </div> 
          }
          {/* else */}
          {(watchList && user) && (
            <Carousel cols={6} rows={1} gap={0} loop>
              {watchList.map((item, i) => (
                <Carousel.Item key={i}>
                  <Trending item={item} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}<br/><br/>
          <Typography variant="h5"><b>News</b></Typography><br/>
          <News/>
        </Container>     
      )}
        
    </>
  );
};

export default Home;
