Degree Planner
A web application for planning academic degree schedules with a responsive, professional interface and persistent data storage.
Features

User Authentication: Register and login with JWT-based sessions.
Course Management: Add, view, and delete courses.
Semester Planner: Drag-and-drop courses into semesters across a four-year plan.
Persistent Storage: Save plans to MongoDB, with localStorage for temporary state.
Responsive UI: Modern, academic-themed design with Tailwind CSS, optimized for mobile and desktop.
Documentation: LaTeX-based project structure document, compiled to PDF via GitHub Actions.

Project Structure

client/: React front-end with Vite and Tailwind CSS.
src/: Contains App.jsx, main.jsx, index.css, and subdirectories (components/, pages/, utils/).


server/: Node.js/Express back-end with MongoDB.
middleware/, models/, routes/: Authentication, data models, and API endpoints.


docs/: LaTeX documentation (project-structure.tex).
.github/workflows/: GitHub Actions for compiling LaTeX to PDF (build-latex.yml).

Setup Instructions

Prerequisites:

Node.js (v18 or higher)
MongoDB (local or cloud, e.g., MongoDB Atlas)
Git


Clone the Repository:
git clone https://github.com/your-username/degree-planner.git
cd degree-planner


Front-end Setup:
cd client
npm install
npm run dev

The front-end runs at http://localhost:5173 by default.

Back-end Setup:
cd server
npm install
cp .env.example .env

Edit .env with your MongoDB URI and JWT secret, e.g.:
MONGODB_URI=mongodb://localhost:27017/degree-planner
JWT_SECRET=your_jwt_secret

Start the server:
npm start

The back-end runs at http://localhost:5000.

LaTeX Compilation:

The build-latex.yml workflow compiles docs/project-structure.tex to project-structure.pdf on push events.
View the PDF in the Actions tab under workflow artifacts.



Usage

Register or login at /register or /login.
Navigate to /planner to add courses and drag them into semesters.
Save plans to MongoDB; localStorage caches temporary changes.
Logout via the navigation bar to clear the session.

GitHub Actions

build-latex.yml: Compiles the LaTeX document into a PDF, uploaded as an artifact on push events.

Contributing

Fork the repository and create a pull request with your changes.
Follow coding standards (ESLint/Prettier configs available in client/).

License
MIT
