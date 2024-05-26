
# Online Voting System

This is an online voting system developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The system provides a secure, efficient, and user-friendly platform for conducting elections.

## Features

- User registration and login
- Candidate registration(Admin Only)
- Voting functionality
- View election results
- User profile management
- Change password feature


## Technologies Used

- **Frontend**:
  - React: JavaScript library for building user interfaces
  - HTML, CSS: Markup and styling
  - Bootstrap: Frontend framework for responsive design
- **Backend**:
  - Node.js: JavaScript runtime environment
  - Express.js: Web application framework for Node.js
  - MongoDB: NoSQL database for storing user and candidate information

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/vijay628/online-voting-system.git

```
2. Navigate to the project directory:
```bash
  cd online-voting-system
```

3. Install dependencies for both frontend and backend:

```bash
cd online-voting-system-client && npm install
cd ..
cd online-voting-system-server && npm install
```

4. Set up environment variables:

- Create a .env file in the server directory.
- Define the following variables:
  - MONGODB_URI: URI of your MongoDB database
  - JWT_SECRET: Secret key for JWT authentication

5. Run the backend server:
```bash
cd online-voting-system-server && node server.js
```

6. Run the frontend development server:
```bash
cd online-voting-system-client && npm start
```
7. Access the application in your browser at http://localhost:3000.

## Usage

- Register as a new user or login with existing credentials.
- Navigate to the voting section to cast your vote.
- View election results to see the outcome.
- Update your profile information or change your password as needed.


## Contributing

Contributions are welcome!

Please follow these steps:

    1. Fork the repository
    2. Create a new branch (git checkout -b feature)
    3. Make your changes
    4. Commit your changes (git commit -am 'Add new feature')
    5. Push to the branch (git push origin feature)
    6. Create a new Pull Request

## License

This project is licensed under the [MIT License](./LICENSE).
