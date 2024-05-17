# Cable-News-Network

> Opeyemi Mathew Adewumi

-----

## Project Description
This is the backend API for the CNN news website, designed to provide a modern news experience for millennials. The API allows Chief Editors to manage news content, including creating, editing, and deleting news articles. It also enables users to read and search for news articles.

### Features
1. Log in as a Chief Editor (Email and Password)
2. Create an account (First Name, Last Name, Profile Picture, Email, and Password)
3. Add an endpoint for forgot and reset Password
4. Post new News (Title, Picture or Video (Optional), and Body of News)
5. Edit existing news on the CNN website
6. Delete news
7. Read all available news
8. Search for news by Title

-----

## Tools and Technologies
1. **VSCode**: Integrated Development Environment (IDE) for coding.
2. **MongoDB**: NoSQL database for storing application data.
3. **Node.js**: JavaScript runtime for server-side programming.
4. **Express.js**: Web application framework for Node.js.
5. **Postman**: Tool for API testing and documentation.
6. **Mongoose**: ODM library for MongoDB and Node.js.
7. **Cloudinary**: Cloud-based service for managing images and videos.
8. **JWT (jsonwebtoken)**: Mechanism for secure information exchange.
9. **bcrypt**: Library for hashing passwords.
10. **dotenv**: Module to load environment variables from a `.env` file.
11. **multer**: Middleware for handling multipart/form-data (file uploads).
12. **nodemailer**: Module for sending emails.

-----

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
