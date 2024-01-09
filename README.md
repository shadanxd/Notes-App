# Notes-App
Backend Web App for creating storing and sharing notes app

# Tech Stack and Packages
- **Framework:** ExpressJS
- **DB:** Postgres DB
- **ORM:** Sequelize

# Features
- Easy signup to create user account
- Authentification and Authorisation enabled using JWT tokens and hashing
- Create new note, fetch all created notes, update and delete it as you want
- Note sharing 
- Enabled fast and accurate full text search with keywords on the notes created using postgres ts_vector and ts_query which tokenizes content of the word after lexical processing and then uses inverted index and ranking mechanism on it.
- API rate limiter to throttle heavy load
- Sequelize ORM to sync database, create table and easy insert search functionality without going inside postgres CLI

# Installation 

## Setup Database

- Install Postgres
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
- Start and enable Postgres
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```
- Create Postgres User
```bash
sudo -u postgres createuser --interactive
```
- Create Postgres Database
```bash
sudo -u postgres createdb <your_username>
```
- Access PostgreSQL Shell
```bash
sudo -u postgres psql
```
- Setup a password for the User
```bash
\password <your_username>
```
- Exit Postgres shell
```bash
\q
```
## Setup Server

### Config Files
- Step 1: Create config folder inside app
```bash
mkdir app/config
cd config
```
- Step 2: Add config files
```bash
touch app-config.js
touch db-config.js
```
- Step 3: app-config.js sample
```javascript
module.exports ={
    port: 4000,
    SECRET_KEY: 'RTwEYNjU71sdRJbG6M6LOuF0CirfisUe',
    SESSION_KEY: 'o7Gnbw9otu',
    SALTING: 10,
    TOKEN_EXPIRY : '1h',
    MAX_REQUEST: 15,
    TIME_RANGE_IN_MS: 600000
};
```
- Step 4 db-config.js sample
```javascript
module.exports ={
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123456",
    DB: "notesdb", 
    PORT: 5432
};
```
### Install packages 
```bash
npm init
npm install
```
### Run server
```bash
node index.js
```
#  API Documentation

This documentation provides details on the endpoints available in the Notes Backend API.

## SignUp

### Endpoint

- **Method:** POST
- **URL:** `http://localhost:4000/auth/signup`

### Request

- **Body:**
  - **Mode:** Raw
  - **Content-Type:** application/json
  - **Raw Data:**
    ```json
    {
        "username": "shadan1",
        "password": "123456",
        "name": "shadan"
    }
    ```

### Response

No specific response details are provided.

## Login

### Endpoint

- **Method:** POST
- **URL:** `http://localhost:4000/auth/login`

### Request

- **Body:**
  - **Mode:** Raw
  - **Content-Type:** application/json
  - **Raw Data:**
    ```json
    {
        "username": "shadan",
        "password": "123456"
    }
    ```

### Response

No specific response details are provided.

## Create Note

### Endpoint

- **Method:** POST
- **URL:** `http://localhost:4000/notes/create`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MDQ3MjgyNjcsImV4cCI6MTcwNDczMTg2N30.juQhWCjCYKYi9fNMhl9Mpw65YmH1QMQr3IUFEas3EdU"

- **Body:**
  - **Mode:** Raw
  - **Content-Type:** application/json
  - **Raw Data:**
    ```json
    {
        "title": "new13",
        "content": "In the heart of a meadow, wildflowers swayed in the breeze, a vibrant sea of colors. Bees hummed in orchestrated chaos, collecting natures nectar. The warmth of the sun kissed the landscape, and the rustle of grass whispered tales of seasons changing, a timeless ode to the cycles of life."
    }
    ```

### Response

No specific response details are provided.

## Fetch All Notes

### Endpoint

- **Method:** GET
- **URL:** `http://localhost:4000/notes`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MDQ3MzM3MjQsImV4cCI6MTcwNDczNzMyNH0.wytEx93PvaKPONLfL7TcyubRi-6RMepI1DKuTxQt3YU"

### Response

No specific response details are provided.

## Fetch Notes by ID

### Endpoint

- **Method:** GET
- **URL:** `http://localhost:4000/notes/:id`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MDQ3MTcxMTEsImV4cCI6MTcwNDcyMDcxMX0.UADugPt513txdjHg_dZBxtMaZKNBQ6rrxYIG8p-l9XE"

- **Variable:**
  - `id`: 12

### Response

No specific response details are provided.

## Fetch Notes by ID Copy

### Endpoint

- **Method:** GET
- **URL:** `http://localhost:4000/notes/:id/share`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MDQ3MzcyOTQsImV4cCI6MTcwNDc0MDg5NH0.shxt7bLczUTNcHVsPyaLAqlNYl1eibUvF1uvUZSh_Eo"

- **Variable:**
  - `id`: 6

### Response

No specific response details are provided.

## Keyword Search

### Endpoint

- **Method:** GET
- **URL:** `http://localhost:4000/search?keyword=symphony`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MDQ3MzM3MjQsImV4cCI6MTcwNDczNzMyNH0.wytEx93PvaKPONLfL7TcyubRi-6RMepI1DKuTxQt3YU"

### Response

No specific response details are provided.

## Delete Notes by ID

### Endpoint

- **Method:** DELETE
- **URL:** `http://localhost:4000/notes/delete/:id`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MDQ3MjI5NDcsImV4cCI6MTcwNDcyNjU0N30.FWI51_IuSoVmGmjT-s55ssnkKBPM8mp8LkZSX28rVhk"

- **Variable:**
  - `id`: 1

### Response

No specific response details are provided.

## Update Note by ID

### Endpoint

- **Method:** PUT
- **URL:** `http://localhost:4000/notes/update/:id`

### Request

- **Authentication:**
  - Type: apikey
  - Key: authorization
  - Value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MDQ3MjQzMjQsImV4cCI6MTcwNDcyNzkyNH0.Ipf9dKertT9lTMVgh_01ZJuXWNRY7WU5dvJs4kVnYfA"

- **Body:**
  - **Mode:** Raw
  - **Content-Type:** application/json
  - **Raw Data:**
    ```json
    {
        "content": "update check Wayne Rooney boss ENgland"
    }
    ```

- **Variable:**
  - `id`: 1

### Response

No specific response details are provided.
