import User from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if(!existingUser)
        {
            return res.json({message: "User doesn't exist"})
        }
        const comparePassword = await bcrypt.compare(password, existingUser.password)
        if(!comparePassword)
        {
            return res.json({message: "Invalid password"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
        return res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

export const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
 
    try {
        const existingUser = await User.findOne({ email:email })
        if(existingUser) 
        {
            return res.json({ message:'User already exists'})
        }  
        const name = firstName + ' ' + lastName
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name:name, email, password:hashPassword})
        const token = jwt.sign({email: newUser.email, id: newUser._id}, 'test', {expiresIn: "1h"})
        await newUser.save()
        return res.status(200).json({result: newUser, token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Something went wrong.'})
    }
   
}

export const addToWatchList = async (req, res) => {
    const id = req.body.id
    const ticker = req.body.ticker

    if(!req.userId)     
        return res.json({message: 'Not Auth'})

    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No user with that ID')

    const user = await User.findById(id)
    const idx = user.watchlist.findIndex((symbol) => symbol === ticker)
    if(idx === -1)
        user.watchlist.push(ticker)
    else
        user.watchlist = user.watchlist.filter((symbol) => symbol !== ticker)

    const updated = await User.findByIdAndUpdate(id, user, {new: true})
    res.json(updated)
    
}

export const getWatchList = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user.watchlist)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
    
}