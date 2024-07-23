# BookStore

The **BookStore** application is a web-based project built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. It provides a platform for managing books with full CRUD (Create, Read, Update, Delete) functionality, along with searching and pagination features.

## Features

- **CRUD Operations**: Create, read, update, and delete book entries.
- **Search Functionality**: Easily search for books by title or author.
- **Pagination**: Navigate through book listings with pagination controls.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started

To run this project on your local machine, follow these steps:

### Prerequisites

- **Node.js** and **npm**: Make sure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Ensure MongoDB is installed and running on your local machine. Instructions can be found at [mongodb.com](https://www.mongodb.com/try/download/community).

### 1. Clone the Repository
       git clone https://github.com/yourusername/BookStore.git
       
### 2. Navigate to the project directory:
       cd BookStore
       
### 3. Install Dependencies
       npm install

### 4. Create MongoDB database & collection(books) & replace <username> and <password> with your credential
       mongodb+srv://<username>:<password>@<yourDatabaseName>/<collectionName>
Note: Copy connection string from mongodb ui.

### 5. Run the Application
       npm start [ or you can use nodemon(npm i nodemon) then... ]
       nodemon app.js
       
### 6. Open your web browser and navigate to:
       http://localhost:3000
