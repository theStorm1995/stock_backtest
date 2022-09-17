import * as api from '../API/news'

export const getNews = async () => {
    try {
       const { data } = await api.getNews() 
       return data
    } catch (error) {
        console.log(error)
    }
    
}