function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Degree Planner</h1>
      <p className="text-lg text-gray-600 mb-6">
        Plan your academic journey with ease. Create, manage, and sync your degree plan.
      </p>
      <a
        href="/planner"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Start Planning
      </a>
    </div>
  );
}

export default Home;