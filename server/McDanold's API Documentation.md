# McDanold's API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /cuisines`
- `POST /cuisines`
- `GET /cuisines/:id`
- `DELETE /cuisines/:id`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id`
- `PATCH /cuisines/:id`
- `PUT /cuisines/:id`
- `GET /histories/`
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/google-sign-in`
- `GET /customers/cuisines?filterBy=`
- `GET /customers/cuisines/:id`
- `GET /customers/favorites`
- `POST /customers/favorites/:id`

&nbsp;

## 1. POST /register

Description:

- Create new user with role admin

Request:

- body:

```json
{
  "username": "admin1",
  "email": "admin1@gmail.com",
  "password": "admin1",
  "phoneNumber": "085308530853",
  "address": "Jl. ganesha"
}
```

_Response (201 - Created)_

```json
{
  "id": "1",
  "email": "admin1@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
OR
{
  "message": "email or password is invalid"
}
OR
{
  "message": "this email is already registered"
}
OR
{
  "message": "email must be email format"
}
OR
{
  "message": "The minimum password length is 5 characters"
}
OR
{
  "message": "this email is already registered"
}
```

&nbsp;

## 2. POST /login

Description:

- Log in using user's email and password

Request:

- body:

```json
{
  "email": "admin1@gmail.com",
  "password": "admin1"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns",
  "username": "admin1",
  "email": "admin1@gmail.com",
  "role": "admin"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password is invalid"
}
```

&nbsp;

## 3. POST /google-sign-in

Description:

- Create User and Log in using user's google account

Request:

- Headers:

```json
{
  "google_access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU",
  "user": {
    "username": "admin2",
    "email": "admin2@gmail.com",
    "role": "admin"
  }
}
```

_Response (201 - Created)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU",
  "user": {
    "username": "admin2",
    "email": "admin2@gmail.com",
    "role": "admin"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password is invalid"
}
```

&nbsp;

## 4. GET /cuisines

Description:

- Get all cuisines from database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

_Response (200 - OK)_

```json
[
 {
    "id": 1,
    "name": "Beef Burger Deluxe",
    "description": "Burger dengan beef yang lezat",
    "price": 250000,
    "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/100147.png?",
    "authorId": 2,
    "categoryId": 1,
    "createdAt": "2023-06-10T12:34:33.000Z",
    "updatedAt": "2023-06-10T12:34:36.000Z",
    "User": {
        "id": 2,
        "username": "admin2",
        "email": "admin2@gmail.com",
        "role": "admin",
        "phoneNumber": "085308530853",
        "address": "Jl.ganesha",
        "createdAt": "2023-05-21T12:23:54.048Z",
        "updatedAt": "2023-05-21T12:23:54.048Z"
    },
    "Category": {
        "id": 1,
        "name": "A La Carte & Paket",
        "createdAt": "2023-05-21T12:30:11.000Z",
        "updatedAt": "2023-05-21T12:30:15.000Z"
    }
},
{
    "id": 2,
    "name": "McFlurry® featuring Oreo",
    "description": "Esktrim topping oreo",
    "price": 135000,
    "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133016.png?",
    "authorId": 1,
    "categoryId": 2,
    "createdAt": "2023-05-21T12:35:38.000Z",
    "updatedAt": "2023-05-21T12:35:40.000Z",
    "User": {
        "id": 1,
        "username": "admin1",
        "email": "admin1@gmail.com",
        "role": "admin",
        "phoneNumber": "085308530853",
        "address": "Jl.ganesha",
        "createdAt": "2023-05-21T12:18:08.750Z",
        "updatedAt": "2023-05-21T12:18:08.750Z"
    },
    "Category": {
        "id": 4,
        "name": "Pencuci Mulut",
        "createdAt": "2023-05-21T12:30:45.000Z",
        "updatedAt": "2023-05-21T12:30:47.000Z"
    }
}
  ...,
]
```

&nbsp;

## 5. POST /cuisines/

Description:

- Create new cuisine to database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- user:

```json
{
  "authorId": "2"
}
```

- body:

```json
{
  "name": "Fanta McFloat®",
  "description": "minuman bersoda",
  "price": 140000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133022.png?",
  "categoryId": 2
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "name": "Fanta McFloat®",
  "description": "minuman bersoda",
  "price": 140000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133022.png?",
  "authorId": 2,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:36:39.000Z",
  "updatedAt": "2023-05-21T12:36:32.000Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name cannot be empty"
}
OR
{
  "message": "description cannot be empty"
}
OR
{
  "message": "price cannot be empty"
}
OR
{
  "message": "minimum price is 50000"
}
OR
{
  "message": "image cannot be empty"
}
```

&nbsp;

## 6. GET /cuisines/:id

Description:

- Get cuisine by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "2"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "name": "McFlurry® featuring Oreo",
  "description": "Esktrim topping oreo",
  "price": 135000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133016.png?",
  "authorId": 1,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:35:38.000Z",
  "updatedAt": "2023-05-21T12:35:40.000Z",
  "User": {
    "id": 1,
    "username": "admin1",
    "email": "admin1@gmail.com",
    "role": "admin",
    "phoneNumber": "085308530853",
    "address": "Jl.ganesha",
    "createdAt": "2023-05-21T12:18:08.750Z",
    "updatedAt": "2023-05-21T12:18:08.750Z"
  },
  "Category": {
    "id": 4,
    "name": "Pencuci Mulut",
    "createdAt": "2023-05-21T12:30:45.000Z",
    "updatedAt": "2023-05-21T12:30:47.000Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 7. DELETE /cuisines/:id

Description:

- Delete cuisine by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "5"
}
```

_Response (200 - OK)_

```json
{
  "id": 5,
  "name": "Happy Meal® Chicken Burger",
  "description": "paket burger",
  "price": 440000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/117037.png?",
  "authorId": 1,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:37:35.000Z",
  "updatedAt": "2023-05-21T12:37:39.000Z"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 8. GET /categories

Description:

- Get all categories

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "A La Carte & Paket",
        "createdAt": "2023-05-21T12:37:35.000Z",
        "updatedAt": "2023-05-21T12:37:35.000Z"
    },
    {
        "id": 2,
        "name": "Minuman",
        "createdAt": "2023-05-21T12:37:35.000Z",
        "updatedAt": "2023-05-21T12:37:35.000Z"
    },
    {
        "id": 3,
        "name": "Happy Meal",
        "createdAt": "2023-05-21T12:37:35.000Z",
        "updatedAt": "2023-05-21T12:37:35.000Z"
    }
  ...
]
```

&nbsp;

## 9. POST /categories

Description:

- Create new category to database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- body:

```json
{
  "name": "Pencuci Mulut"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "name": "Pencuci Mulut",
  "createdAt": "2023-05-21T12:37:35.000Z",
  "updatedAt": "2023-05-21T12:37:35.000Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name cannot be empty"
}
```

&nbsp;

## 10. DELETE /categories/:id

Description:

- Delete category by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "1"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "A La Carte & Paket",
  "createdAt": "2023-05-21T12:37:35.000Z",
  "updatedAt": "2023-05-21T12:37:35.000Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 10. PATCH /categories/:id

Description:

- Edit status cuisine by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "1"
}
```

_Response (200 - OK)_

```json
{
  "patchedCuisine": {
    "id": 1,
    "name": "Happy Meal® Chicken Burger",
    "description": "paket burger",
    "price": 440000,
    "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/117037.png?",
    "authorId": 1,
    "categoryId": 3,
    "status": "Inactive",
    "createdAt": "2023-05-22T07:49:02.070Z",
    "updatedAt": "2023-05-28T19:09:02.660Z"
  },
  "history": {
    "id": 12,
    "name": "Happy Meal® Chicken Burger",
    "description": "cuisine status with id 45 has been updated from Active into Inactive",
    "updatedBy": "admin1@gmail.com",
    "updatedAt": "2023-05-28T19:09:02.667Z",
    "createdAt": "2023-05-28T19:09:02.667Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you are not authorized"
}
```

&nbsp;

## 11. PUT /categories/:id

Description:

- Edit cuisine by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "1"
}
```

- body:

```json
{
  "name": "Fanta McFloat®",
  "description": "minuman bersoda",
  "price": 140000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133022.png?",
  "categoryId": 2
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "name": "Fanta McFloat®",
  "description": "minuman bersoda",
  "price": 140000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133022.png?",
  "authorId": 2,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:36:39.000Z",
  "updatedAt": "2023-05-21T12:36:32.000Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name cannot be empty"
}
OR
{
  "message": "description cannot be empty"
}
OR
{
  "message": "price cannot be empty"
}
OR
{
  "message": "minimum price is 50000"
}
OR
{
  "message": "image cannot be empty"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you are not authorized"
}
```

## 8. GET /histories

Description:

- Get all histories

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

_Response (200 - OK)_

```json
{
    "histories": [
        {
            "id": 1,
            "name": "Happy Meal® Chicken Burger",
            "description": "cuisine status with id 45 has been updated from Active into Inactive",
            "updatedBy": "admin1@gmail.com",
            "createdAt": "2023-05-28T19:09:02.667Z",
            "updatedAt": "2023-05-28T19:09:02.667Z"
        },
        {
            "id": 2,
            "name": "Happy Meal® Chicken Burger",
            "description": "cuisine status with id 47 has been updated from Inactive into Active",
            "updatedBy": "admin1@gmail.com",
            "createdAt": "2023-05-28T19:08:43.135Z",
            "updatedAt": "2023-05-28T19:08:43.135Z"
        }
        ...
}
```

&nbsp;

## 9. POST customers/register

Description:

- Create new customer

Request:

- body:

```json
{
  "username": "customers1",
  "email": "customers1@gmail.com",
  "password": "customers1",
  "phoneNumber": "085308530853",
  "address": "Jl. ganesha"
}
```

_Response (201 - Created)_

```json
{
  "id": "1",
  "email": "customers1@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
OR
{
  "message": "email or password is invalid"
}
OR
{
  "message": "this email is already registered"
}
OR
{
  "message": "email must be email format"
}
OR
{
  "message": "The minimum password length is 5 characters"
}
OR
{
  "message": "this email is already registered"
}
```

&nbsp;

## 10. POST customers/login

Description:

- Log in using email and password

Request:

- body:

```json
{
  "email": "customer1@gmail.com",
  "password": "customer1"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns",
  "username": "customer1",
  "email": "customer1@gmail.com",
  "role": "customer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password is invalid"
}
```

&nbsp;

## 11. POST /google-sign-in

Description:

- Create User and Log in using google account

Request:

- Headers:

```json
{
  "google_access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU",
  "user": {
    "username": "customer2",
    "email": "customer2@gmail.com",
    "role": "admin"
  }
}
```

_Response (201 - Created)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0Njk5NzA5fQ.ASRhi64esae22MMOe1UDEoSxKGDpSxmPBLHbytxf1gU",
  "user": {
    "username": "customer2",
    "email": "customer2@gmail.com",
    "role": "admin"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password is invalid"
}
```

&nbsp;

## 12. GET customers/cuisines/?filterBy=

Description:

- Get all cuisines from database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- query:

```json
{
  "filterBy": "burger"
}
```

_Response (200 - OK)_

```json
{
  "cuisine": [
    {
      "id": 2,
      "name": "Happy Meal® Chicken Burger",
      "description": "paket burger",
      "price": 440000,
      "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/117037.png?",
      "authorId": 1,
      "categoryId": 3,
      "status": "Inactive",
      "createdAt": "2023-05-22T07:49:02.070Z",
      "updatedAt": "2023-05-28T19:09:02.660Z",
      "User": {
        "id": 1,
        "username": "tes11@gmail.com",
        "email": "tes11@gmail.com",
        "role": "admin",
        "phoneNumber": "085373675217",
        "address": "Jl. Cisitu Lama IX No. 30A",
        "createdAt": "2023-05-18T17:03:39.774Z",
        "updatedAt": "2023-05-18T17:03:39.774Z"
      },
      "Category": {
        "id": 3,
        "name": "Happy Meal",
        "createdAt": "2023-05-22T07:13:23.202Z",
        "updatedAt": "2023-05-22T07:13:23.202Z"
      }
    },
    {
      "id": 42,
      "name": "Beef Burger Deluxe Limited",
      "description": "Burger dengan beef yang lezat",
      "price": 250000,
      "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/100147.png?",
      "authorId": 2,
      "categoryId": 1,
      "status": "Archived",
      "createdAt": "2023-05-22T07:49:02.070Z",
      "updatedAt": "2023-05-28T18:08:11.863Z",
      "User": {
        "id": 2,
        "username": "admin1",
        "email": "admin1@gmail.com",
        "role": "admin",
        "phoneNumber": "085373675217",
        "address": "Jl. Cisitu Lama IX No. 30A",
        "createdAt": "2023-05-20T08:37:08.687Z",
        "updatedAt": "2023-05-20T08:37:08.687Z"
      },
      "Category": {
        "id": 1,
        "name": "A La Carte & Paket",
        "createdAt": "2023-05-22T07:13:23.202Z",
        "updatedAt": "2023-05-22T07:13:23.202Z"
      }
    }
  ],
  "totalCuisines": 2
}
```

&nbsp;

## 13. GET customers/cuisines/:id

Description:

- Get cuisine by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "2"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "name": "McFlurry® featuring Oreo",
  "description": "Esktrim topping oreo",
  "price": 135000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133016.png?",
  "authorId": 1,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:35:38.000Z",
  "updatedAt": "2023-05-21T12:35:40.000Z",
  "User": {
    "id": 1,
    "username": "admin1",
    "email": "admin1@gmail.com",
    "role": "admin",
    "phoneNumber": "085308530853",
    "address": "Jl.ganesha",
    "createdAt": "2023-05-21T12:18:08.750Z",
    "updatedAt": "2023-05-21T12:18:08.750Z"
  },
  "Category": {
    "id": 4,
    "name": "Pencuci Mulut",
    "createdAt": "2023-05-21T12:30:45.000Z",
    "updatedAt": "2023-05-21T12:30:47.000Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 13. GET customers/favorites/

Description:

- Get favorites

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "CustomerId": 1,
    "CuisineId": 1,
    "createdAt": "2023-05-30T23:49:34.855Z",
    "updatedAt": "2023-05-30T23:49:34.855Z",
    "Customer": {
      "id": 1,
      "username": "customer1",
      "email": "customer1@gmail.com",
      "role": "customer",
      "phoneNumber": "085308530853",
      "address": "Jl.ganesha",
      "createdAt": "2023-05-30T23:49:34.855Z",
      "updatedAt": "2023-05-30T23:49:34.855Z"
    },
    "Cuisine": {
      "id": 1,
      "name": "McFlurry® featuring Oreo",
      "description": "Esktrim topping oreo",
      "price": 135000,
      "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133016.png?",
      "authorId": 1,
      "categoryId": 1,
      "status": "Active",
      "createdAt": "2023-05-22T07:49:02.070Z",
      "updatedAt": "2023-05-26T15:33:55.740Z"
    }
  },
  {
    "id": 3,
    "CustomerId": 1,
    "CuisineId": 2,
    "createdAt": "2023-05-31T02:02:38.170Z",
    "updatedAt": "2023-05-31T02:02:38.170Z",
    "Customer": {
      "id": 1,
      "username": "customer1",
      "email": "customer1@gmail.com",
      "role": "customer",
      "phoneNumber": "085308530853",
      "address": "Jl.ganesha",
      "createdAt": "2023-05-30T23:49:34.855Z",
      "updatedAt": "2023-05-30T23:49:34.855Z"
    },
    "Cuisine": {
      "id": 2,
      "name": "Happy Meal® Chicken Burger",
      "description": "paket burger",
      "price": 440000,
      "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/117037.png?",
      "authorId": 1,
      "categoryId": 3,
      "status": "Inactive",
      "createdAt": "2023-05-22T07:49:02.070Z",
      "updatedAt": "2023-05-28T19:09:02.660Z"
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 13. POST customers/favorites

Description:

- post favorites

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0Njk5NjIyfQ.xJtWivYDAKenjRi8JxaPGdYTPdtj73-fOlSHHPbL4ns"
}
```

- params:

```json
{
  "id": "2"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "name": "McFlurry® featuring Oreo",
  "description": "Esktrim topping oreo",
  "price": 135000,
  "imgUrl": "https://www.mcdelivery.co.id/id/static/1684508353848/assets/62/products/133016.png?",
  "authorId": 1,
  "categoryId": 2,
  "createdAt": "2023-05-21T12:35:38.000Z",
  "updatedAt": "2023-05-21T12:35:40.000Z",
  "User": {
    "id": 1,
    "username": "admin1",
    "email": "admin1@gmail.com",
    "role": "admin",
    "phoneNumber": "085308530853",
    "address": "Jl.ganesha",
    "createdAt": "2023-05-21T12:18:08.750Z",
    "updatedAt": "2023-05-21T12:18:08.750Z"
  },
  "Category": {
    "id": 4,
    "name": "Pencuci Mulut",
    "createdAt": "2023-05-21T12:30:45.000Z",
    "updatedAt": "2023-05-21T12:30:47.000Z"
  }
}
```

&nbsp;

## Global Error

_Response (401 - Unauthenticated)_

```json
{
  "message": "unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "internal server error"
}
```
