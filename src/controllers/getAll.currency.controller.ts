import { Router, Request, Response } from "express";
import currencyModel from "../models/currency.exchange.model";

const route: Router = Router()


export const getAllCurrency: Router = route.get('/?', async (req: Request, res: Response)=>{
    const page = req.query.page
    const limit = req.query.limit
    if(page && limit){
        const pagination = await currencyModel.find().
                                 limit(+limit)
                                 .skip(((+page)) * (+limit))
        res.json(pagination)
    }else {
        const allData = await currencyModel.find({})
        res.json(allData)
    }
        
})

