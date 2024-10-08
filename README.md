# DPoP Authentication System with React and Node.js

This project demonstrates the implementation of **DPoP (Demonstration of Proof-of-Possession)** authentication in a web application using **React** for the frontend and **Node.js** for the backend. The system secures resource access using OAuth 2.0 and DPoP for proof-of-possession verification.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Login Authentication**: Uses a simple username and password-based login with access tokens.
- **DPoP Proof**: Implements DPoP (Demonstration of Proof-of-Possession) for secure resource access.
- **Access Token Validation**: Verifies the validity of access tokens before allowing access to secure endpoints.
- **Key Pair Generation**: Uses an Elliptic Curve key pair for generating and verifying DPoP proofs.
- **CORS Enabled**: Supports cross-origin resource sharing for secure communication between Angular and Node.js apps.

## Technologies

### Frontend

- **React**: For creating the login form and handling requests.
- **Axios**: For asynchronous API calls and interceptor

### Backend

- **Node.js**: Handles API requests and user authentication.
- **Express.js**: For building the backend API.
- **JOSE (Javascript Object Signing and Encryption)**: For handling JWTs and DPoP proof verification.

## Project Structure

    dpop-react-auth/
    │
    ├── react-client/                    # Frontend (React)
    │   ├── src/
    │   │   ├── components/              # React Components (Login, SecureData)
    │   │   ├── hooks/                   # Custom hooks (useAuth, useDpop)
    │   │   ├── services/                # API services
    │   │   ├── utils/                   # common utility code
    │   │   └── ...
    │   └── ...
    │
    ├── dpop-node-server/                # Backend (Node.js)
    │   ├── server.js                    # Main server file
    │   └── ...
    │
    └── README.md                        # Project documentation

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [React](https://react.dev/learn/installation) (v12+)

### Steps

1.  **Clone the repository**:

        git clone https://github.com/amitgandole/jwt-dpop-guardian-react.git

2.  **Install dependencies**:

- Navigate to the Angular client directory and install dependencies:

        cd dpop-react-auth
        npm install

- Then navigate to the Node.js server directory and install dependencies:

         cd ../dpop-node-server
         npm install

## Usage

### 1. **Run the Backend (Node.js)**:

From the \`dpop-node-server\` directory, start the Node.js server:

    npm start

The backend will start on \`http://localhost:3001\`.

### 2. **Run the Frontend (Angular)**:

Open another terminal, navigate to the \`angular-client\` directory, and run the Angular app:

    npm start

The Angular app will start on \`http://localhost:3000\`.

### 3. **Test the Authentication**:

- Open your browser and navigate to \`http://localhost:3000\`.
- Enter the login credentials (username: \`test\`, password: \`password\`).
- Upon successful login, the system will send an access token and generate a DPoP proof for secure data access.

## API Endpoints

### Backend (Node.js)

- **POST** \`/login\`: Authenticates the user and returns an access token.

  **Request**:

      {
        "username": "test",
        "password": "password"
      }

  **Response**:

      {
        "accessToken": "dummy-access-token"
      }

- **GET** \`/secure-data\`: Retrieves secure data. Requires a valid access token and DPoP proof in headers.

  **Headers**:

      {
        "Authorization": "Bearer <access_token>",
        "DPoP": "<dpop_proof>",
        "x-public-key": "<public_key>"
      }

## Key Concepts

### DPoP Proof

- **Demonstration of Proof-of-Possession (DPoP)** is a mechanism to bind a particular HTTP request to the possession of a private key. The client generates a unique DPoP proof for each request, and the server verifies it using the corresponding public key.

### JWT (JSON Web Token)

- JWT is used for securing API endpoints by verifying the user's identity through an access token.

### Key Pair Generation

- In this project, an elliptic curve (ES256) key pair is generated on the client-side. The public key is sent to the server for verification, and the private key is used to sign DPoP proofs.
