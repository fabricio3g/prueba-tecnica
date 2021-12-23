import { Router, Request, Response } from "express";
import axios from "axios";
import currencyModel from "../models/currency.exchange.model";
import moment from "moment";
const route: Router = Router()

export const postCurrency: Router = route.post('/?', async (req: Request, res: Response)=>{

    console.log(req.body.src, req.body.target)

    await axios('http://api.exchangeratesapi.io/v1/latest?access_key=df8cb74c8b64a0e947cb431f99cc0cb0')
    .then( (c)=> {
        
    
        /* this should be changed but this api only allow me to get access only to EUR
        *  And get the params to update depending of the type conversion, for example ARS/USD or URY/ARS
        *  on exhangesratesapi UYU stand for uruguay 
        */
       const today = moment().format("YYYY-MM-DD")
       const fixedDay = moment(today).add(1, "days").format("YYYY-MM-DD").toString()
       if(c.data.date === fixedDay){
        res.json({
            err: "Today exchanges was added"
        })
       }
       else{
        const uyuValue = c.data.rates["UYU"]
        const currency = new currencyModel({
            timestamp: c.data.timestamp,
            base: c.data.base,
            date: c.data.date,
            "UYU": uyuValue 
        })
        currency.save()
        res.send(currency)
       }
      
    }).catch(err => console.log(err))

})


