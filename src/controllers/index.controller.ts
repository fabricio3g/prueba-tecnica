import { Router, Request, Response } from "express";

const route: Router = Router()



export const index: Router = route.get('/', async (req: Request, res: Response)=>{
    res.send(`
    <!DOCTYPE html>  
    <html>
     <Body> 
      <div> Api data </div>
        <ul>
            <li>
              <a href="/api-docs">Swagger docs</a>
            </li>
            <li>
              <a href="/getAll">Show all</a>
            </li>
        </ul>  
      </div>
      </Body>
    </html>
    `)
})