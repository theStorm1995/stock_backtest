import React from "react";
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react'
import "@testing-library/jest-dom"
import {fetchYHFAPI} from '../../actions/object'

it("Fetch Valid data", async () => {
    const data = await fetchYHFAPI('AAPL')
    expect(data).toBeDefined()
})

it("Fetch Undefined stock data", async () => {
    const data = await fetchYHFAPI('Aasdsadasdas')
    expect(data.optionChain.result[0]).toBeUndefined()
})