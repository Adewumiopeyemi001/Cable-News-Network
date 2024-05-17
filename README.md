# Cable-News-Network

> Opeyemi Mathew Adewumi
_____
-----

## Project Description
This is the backend API for the CNN news website, designed to provide a modern news experience for millennials. The API allows Chief Editors to manage news content, including creating, editing, and deleting news articles. It also enables users to read and search for news articles. Features are :

1.Log in as a Chief- Editor (Email and Password)
2.Create an account if I have none. (First name, Last Name, Profile 
Picture, Email and Password)
3.Add an endpoint for forgot and reset Password
4.Post new News (Title, Picture or Video (Optional) and Body of News)
5. Edit existing news on the CNN website
6. Delete news
7. Read all available news
8. Search for news by Title
___________
- - - - - -

1. **VSCode**: Integrated Development Environment (IDE) for coding.
2. **MongoDB**: NoSQL database for storing application data.
3. **Node.js**: JavaScript runtime for server-side programming.
4. **Express.js**: Web application framework for Node.js.
5. **Postman**: Tool for API testing and documentation.
---------

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **MongoDB**: Document-oriented NoSQL database.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Cloudinary**: Cloud-based service for managing images and videos.
- **JWT (jsonwebtoken)**: Mechanism for secure information exchange.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module to load environment variables from a `.env` file.
- **multer**: Middleware for handling multipart/form-data (file uploads).
- **nodemailer**: Module for sending emails.
----------------
## Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.2.0",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "lodash": "^4.17.21",
  "mongoose": "^8.3.4",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.13",
  "path": "^0.12.7",
  "uuid": "^9.0.1"
}
This can be seen in the package.json folder
___________
- - - - - -
## Setup
1. Clone the repository
2. Run npm install to install dependencies
3. Create a .env file with environment variables (e.g. database connection string)
4. Start the server with node server.js

