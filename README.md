# final-tokopedia-play-backend
Final Project of Generasi GIGIH 3.0 by GoTo Impact by Muhammad Rasyad Caesarardhi (GG3FSGP0448)

- Frontend

The live apps are available here on [tokopedia-play-frontend](https://tokopedia-play-ten.vercel.app) or [https://tokopedia-play-ten.vercel.app](https://tokopedia-play-ten.vercel.app). 

Repository for front-end available here on [tokopedia-play-frontend repo](https://github.com/mrasyadc/tokopedia-play-frontend)

- Backend
  
Backend Server are available here on [tokopedia-play-backend](https://final-tokopedia-play-backend-production.up.railway.app/api) or [https://final-tokopedia-play-backend-production.up.railway.app/api](https://final-tokopedia-play-backend-production.up.railway.app/api). 

Repository for back-end system available here on [final-tokopedia-play-backend repo](https://github.com/mrasyadc/final-tokopedia-play-backend)

## How To Run
Make sure you have an active mongodb database URL and save it to `.env` file. You can copy from `.env.example` file

```
DATABASE_URL = examplemongoconnectionurl/play
PORT = 80
```
And then you can initiate the project by using this

```
npm install
```
You can seed the database using function seeder that i made
```
npm run seed
```
Start the app using command below
```
npm run dev
```

## Database Structure
Database are divided into 3 collections (Comment, Product, and Video)

<img width="422" alt="image" src="https://github.com/mrasyadc/final-tokopedia-play-backend/assets/56964497/7893e3db-abae-4074-9efa-8191b072d9f3">

- 1 video have many comments but not included in the document inside the video document but are separated. 1 comment are responsible for 1 comment inside a video. a comment is linked to a video.
- 1 video document can have many products. a document in video collection have array of product object ID linked to the product.

<img width="902" alt="image" src="https://github.com/mrasyadc/tokopedia-play-backend/assets/56964497/42465368-c220-4c5e-aa20-f079e6901a48">

<img width="902" alt="image" src="https://github.com/mrasyadc/tokopedia-play-backend/assets/56964497/98852729-bf4c-4880-aa47-78ab5bf5e4ba">

<img width="902" alt="image" src="https://github.com/mrasyadc/tokopedia-play-backend/assets/56964497/27448864-a882-46fb-a0bd-6d0c265a373f">

## API Structure
API Structure are defined in here
<img width="782" alt="image" src="https://github.com/mrasyadc/tokopedia-play-backend/assets/56964497/41066ef8-891b-42f6-87e7-2b8bbbe8db7a">

## API Spec

**GET /api/**
----
  Returns all videos available in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  [
   {title: "string", url: "string", products: [ObjectId from Product]},
   {title: "string", url: "string", products: [ObjectId from Product]},
   {title: "string", url: "string", products: [ObjectId from Product]}
  ]
}
```
**GET /api/products/:id**
----
  Returns the products listed on a specified video.
* **URL Params**  
  *Required:* `id=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**
  ```
  {
    products: [
                {title: "string", productURL: "string", price: number},
                {title: "string", productURL: "string", price: number},
                {title: "string", productURL: "string", price: number},
    ]
  }
  ``` 
* **Error Response:**  
  * **Code:** 400  
  **Content:** `{ error : "Error messages" }`

**GET /api/comments/:id**
----
  Returns the comments listed on a specified video.
* **URL Params**  
  *Required:* `id=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**
  ```
  {
    comment: [
                {username: "string", comment: "string", videoId: "string Object Id", createdAt: Date},
                {username: "string", comment: "string", videoId: "string Object Id", createdAt: Date},
                {username: "string", comment: "string", videoId: "string Object Id", createdAt: Date}
    ]
  }
  ``` 
* **Error Response:**  
  * **Code:** 400  
  **Content:** `{ error : "Error messages" }`
    
**POST /api/comment**
----
  Creates a new comment and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
    username: string
    comment: string
    videoId: string(Video Obj ID)
  }
```
* **Headers**  
  Content-Type: application/json  
* **Code:** 200  
  **Content:**
  ```
  {
    success: {
                username: "string", comment: "string", videoId: "string Object Id", createdAt: Date
    }
  }
  ``` 
* **Error Response:**  
  * **Code:** 400  
  **Content:** `{ failed : "Insufficient parameters" }`
