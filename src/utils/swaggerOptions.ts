export = {
    swaggerDefinition:{
        info:{
            title: 'Pruba tecnica',
            version: '1.0.0.0'
        },
        servers: ['https://localhost:3000'],
        paths:{
            "/getAll":{
                get:{
                    responses: {
                        200: {
                          description: "return all the currencies"
                        }
                      }
                }
            },
            "/getAll/":{
                get:{
                    responses: {
                        200: {
                          description: "pagination route"
                        }
                    },
                    parameters: [
                        {  
                            name:"page",
                            in: "query",
                            description: "the number of the page",
                            required:true,
                            type:"number"
                         },
                         {  
                            name: "limit",
                            in:"query",
                            description:"Amount of elements that you want",
                            required:true,
                            type:"number"
                         },
                        ]
                }
            },
            "/postCurrency":{
                post:{
                    responses: {
                        200: {
                          description: "post today currency"
                        }
                      }
                }
            }
        }
    },
    apis: ["index.ts"],
}

    