# finalProject

API DOC

PRODUCTS ENDPOINTS

GET
    
    /api/products/

    /api/products/by/id
        { 
            "id" : number
        }

POST
    
    /api/products/add
        {
            "nombre": "string",
            "descripcion" : "string",
            "codigo": "string",
            "foto": "string",
            "precio": number,
            "stock": number
        }

PUT 
    
    /api/products/update
        {
            "nombre": "string",
            "descripcion" : "string",
            "codigo": "string",
            "foto": "string",
            "precio": number,
            "stock": number,
            "id": number
        }

DELETE
    
    api/products/delete
        {
            id: number
        }


CART ENPOINTS 


GET
    
    /api/cart

POST
    
    /api/cart/create

    /api/cart/add
        {
            "cartId": number,
            "productId": number
        }

DELETE

       /api/cart/deleteProduct
            {
                "cartId": number,
                "productId": number
            }

       /api/cart/delete
            {
                "id": number
            }


AUTH ENPOINTS

POST
    
    /api/auth/signin
        {
            "username": string,
            "password": "string"
        }

    /api/auth/signUp
        {
            "username": string,
            "password": string,
            "address": string,
            "age": string,
            "picture": string,
            "name": string
            "phone": string
        }


NodeMailer ENDPOINTS

POST

    /api/mail/purchaseEmail
        {
            "username": string,
            "name": string,
            "body": "string"
        }

    /api/mail/newRegister
        {
            "username": string,
            "body": "string"
        }