import * as api from '../API'

// import your action function here

export const fetchYHFAPI = async (symbol) => {
    try {
        const { data } = await api.fetchYHFAPI(symbol)
        if(data.optionChain.result.length === 0)
            return []
        const newData =
        {
            marketPrice: data.optionChain.result[0].quote.regularMarketPrice,
            percentChange: data.optionChain.result[0].quote.regularMarketChangePercent,
            prevChange: data.optionChain.result[0].quote.regularMarketChange,
            shortName: data.optionChain.result[0].quote.shortName,
            symbol: data.optionChain.result[0].quote.symbol,
            open: data.optionChain.result[0].quote.regularMarketOpen,
            close: data.optionChain.result[0].quote.regularMarketPreviousClose,
            ask: data.optionChain.result[0].quote.ask,
            bid: data.optionChain.result[0].quote.bid,
            volume: data.optionChain.result[0].quote.regularMarketVolume,
            pe: data.optionChain.result[0].quote.trailingPE,
            eps: data.optionChain.result[0].quote.epsTrailingTwelveMonths
        }
        return newData
    } catch (error) {
        console.log(error)
    }
}

export const fetchRecomendationData = async (symbol) => {
    try {
        const {data} = await api.fetchRecomendationData(symbol)
        if(data.finance.result.instrumentInfo)
        {
            if(data.finance.result.instrumentInfo.recommendation)
                return data.finance.result.instrumentInfo.recommendation.rating
        }
        return "None"
    } catch (error) {
        console.log(error)
    }
}

export const fetchTrendingUS = async () => {
    try {
        const {data} = await api.fetchTrendingUS()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchChart = async (symbol, range, interval) => {
    try {
        const { data } = await api.fetchChart(symbol, range, interval)
        const newData = {
            close: data.chart.result[0].indicators.quote[0].close,
            timestamp: data.chart.result[0].timestamp
        }
        return newData
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (formData, navigate) => {
    const {data} = await api.signIn(formData)
    try {
        if(data.message)
        {
            return data.message
        }
        else
        {
            localStorage.setItem('profile', JSON.stringify({...data}))       
            navigate('/')
            return data
        }
    } catch (error) {
            console.log(error)
    }
}

export const signUp = async (formData, navigate) => {
    const {data} = await api.signUp(formData)
    try {
        if(data.message)
        {
            return data.message
        }
        else
        {
            localStorage.setItem('profile', JSON.stringify({...data}))            
            navigate('/')
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const addToWatchList = async (data) => {
    try {
        await api.addToWatchList(data)
    } catch (error) {
        console.log(error)
    }
}

export const getWatchList = async (id) => {
    const { data } = await api.getWatchList(id)
    try {
        return data
    } catch (error) {
        console.log(error)
    }
}