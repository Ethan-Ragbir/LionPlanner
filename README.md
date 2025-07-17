Degree Planner
A web application for planning academic degree schedules with a responsive UI and persistent data storage.
Features

User authentication (login/register) with JWT
Course management (add, view, delete courses)
Semester planner with drag-and-drop functionality
Persistent storage using MongoDB and localStorage
Responsive, professional UI with Tailwind CSS
LaTeX documentation compiled via GitHub Actions

Structure

client/: React front-end with Vite and Tailwind CSS
server/: Node.js/Express back-end with MongoDB
docs/: LaTeX documentation
.github/workflows/: GitHub Actions for CI/CD and LaTeX compilation

Setup

Front-end:cd client
npm install
npm run dev


Back-end:cd server
npm install
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
npm start

Ensure MongoDB is running locally or via a cloud provider (e.g., MongoDB Atlas).

GitHub Actions

build-latex.yml: Compiles docs/project-structure.tex into a PDF on push events.

License
MIT
