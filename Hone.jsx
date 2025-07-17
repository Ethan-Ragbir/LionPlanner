import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center pt-20">
      <h1 className="text-4xl font-bold text-tcnj-blue mb-6">Welcome to TCNJ Degree Planner</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Plan your academic journey with ease. Inspired by TCNJ's Physics and Math programs, create and manage your degree plan with a professional, user-friendly interface.
      </p>
      <Link
        to="/planner"
        className="bg-tcnj-gold text-tcnj-blue px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
      >
        Start Planning
      </Link>
    </div>
  );
}

export default Home;
