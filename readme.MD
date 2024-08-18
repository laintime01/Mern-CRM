# MERN CRM System

A comprehensive Customer Relationship Management (CRM) system built with the MERN stack (MongoDB, Express, React, Node.js).

## Repository

[https://github.com/laintime01/Mern-CRM](https://github.com/laintime01/Mern-CRM)

## Features

- User Authentication
- Dashboard Overview
- Client Management
- Service Request Management
- Task Management
- Integration Capabilities

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- React Router
- Tailwind CSS
- Axios

## Project Structure

```
.
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
├── .gitignore
└── README.md
```

## Quick Start

1. Clone the repository
   ```
   git clone https://github.com/laintime01/Mern-CRM.git
   cd Mern-CRM
   ```

2. Install dependencies for backend and frontend
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory
   - Add necessary environment variables (e.g., MongoDB URI, JWT secret)

4. Run the development servers
   - For backend:
     ```
     cd backend
     npm start
     ```
   - For frontend:
     ```
     cd frontend
     npm start
     ```

5. Visit `http://localhost:3000` in your browser to access the frontend

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)