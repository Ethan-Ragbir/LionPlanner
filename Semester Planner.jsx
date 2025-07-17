import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CourseCard from './CourseCard';
import api from '../utils/api';

function SemesterPlanner() {
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState({
    'Fall 2025': [],
    'Spring 2026': [],
    'Fall 2026': [],
    'Spring 2027': [],
  });
  const [newCourse, setNewCourse] = useState({ title: '', code: '', credits: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, planRes] = await Promise.all([
          api.get('/courses'),
          api.get('/plans'),
        ]);
        setCourses(coursesRes.data);
        setSemesters(planRes.data.semesters);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.code || !newCourse.credits) {
      setError('All fields are required');
      return;
    }
    try {
      const res = await api.post('/courses', newCourse);
      setCourses([...courses, res.data]);
      setNewCourse({ title: '', code: '', credits: '' });
      setError('');
    } catch (err) {
      setError('Error adding course');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
      setSemesters(Object.fromEntries(
        Object.entries(semesters).map(([semester, courses]) => [
          semester,
          courses.filter((course) => course._id !== id),
        ])
      ));
    } catch (err) {
      setError('Error deleting course');
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceSemester = source.droppableId;
    const destSemester = destination.droppableId;
    const course = sourceSemester === 'available' ? courses[source.index] : semesters[sourceSemester][source.index];

    const newSemesters = { ...semesters };
    if (sourceSemester !== 'available') {
      newSemesters[sourceSemester].splice(source.index, 1);
    }
    if (destSemester !== 'available') {
      newSemesters[destSemester].splice(destination.index, 0, course);
    }

    setSemesters(newSemesters);

    try {
      await api.put('/plans', { semesters: newSemesters });
    } catch (err) {
      setError('Error saving plan');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Semester Planner</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            placeholder="Credits"
            value={newCourse.credits}
            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
            className="border p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Course
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(semesters).map((semester) => (
            <Droppable droppableId={semester} key={semester}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">{semester}</h2>
                  {semesters[semester].map((course, index) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      index={index}
                      onDelete={handleDeleteCourse}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <Droppable droppableId="available">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Courses</h2>
                {courses.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    index={index}
                    onDelete={handleDeleteCourse}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default SemesterPlanner;
