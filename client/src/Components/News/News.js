import React, { useEffect, useState } from 'react'
import { getNews } from '../../actions/news'
import Carousel from "better-react-carousel";
import { Button, CircularProgress, Paper, Typography } from '@material-ui/core';


const News = () => {
    const [newsData, setNewsData] = useState()

    useEffect(() => {
        async function fetchNews()
        {
            const news = await getNews()
            setNewsData(news.stories)
        }
        fetchNews()
    }, [])

    if(!newsData) return null

  return (
    <div>
        <Carousel cols={2} rows={2} gap={1} loop>
            {newsData.map((item, i) => {
                return(
                    <Carousel.Item key={i}>
                        <Paper style={{padding: '5px'}}>
                            <div style={{display: 'flex'}}>
                                <img src={item.thumbnailImage} alt='' style={{height: '200px', marginRight: '10px'}}></img>
                                <a 
                                style={{
                                    maxWidth: '300px',
                                    fontSize: '20px', 
                                    textDecoration: 'none', 
                                    color: 'Black',
                                    textOverflow: 'ellipsis', 
                                    overflow: 'hidden'}} href={item.longURL}>
                                    {item.title}
                                </a>
                            </div>
                        </Paper>
                    </Carousel.Item>    
                )
            })}
        </Carousel>

    </div>
  )
}

export default News