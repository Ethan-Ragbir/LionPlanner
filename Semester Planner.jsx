import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getCourses, addCourse, deleteCourse, getPlan, updatePlan } from '../utils/api';
import CourseCard from './CourseCard';

const semesters = [
  'Fall Year 1', 'Spring Year 1', 'Fall Year 2', 'Spring Year 2',
  'Fall Year 3', 'Spring Year 3', 'Fall Year 4', 'Spring Year 4'
];

function SemesterPlanner() {
  const [courses, setCourses] = useState([]);
  const [plan, setPlan] = useState(semesters.reduce((acc, sem) => ({ ...acc, [sem]: [] }), {}));
  const [newCourse, setNewCourse] = useState({ code: '', title: '', credits: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await getCourses();
        setCourses(coursesRes.data);
        const planRes = await getPlan();
        setPlan(planRes.data.semesters || semesters.reduce((acc, sem) => ({ ...acc, [sem]: [] }), {}));
      } catch (err) {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await addCourse(newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({ code: '', title: '', credits: '' });
    } catch (err) {
      setError('Failed to add course');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course._id !== id));
      const updatedPlan = { ...plan };
      semesters.forEach((sem) => {
        updatedPlan[sem] = updatedPlan[sem].filter((courseId) => courseId !== id);
      });
      setPlan(updatedPlan);
      await updatePlan(updatedPlan);
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceSem = result.source.droppableId;
    const destSem = result.destination.droppableId;
    const updatedPlan = { ...plan };
    const [movedCourse] = updatedPlan[sourceSem].splice(result.source.index, 1);
    updatedPlan[destSem].splice(result.destination.index, 0, movedCourse);
    setPlan(updatedPlan);
    try {
      await updatePlan(updatedPlan);
    } catch (err) {
      setError('Failed to update plan');
    }
  };

  return (
    <div className="pt-20">
      <h1 className="text-3xl font-bold text-tcnj-blue mb-6">Semester Planner</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-tcnj-blue mb-4">Add Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Course Code (e.g., PHY 201)"
          />
          <input
            type="text"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Course Title (e.g., General Physics I)"
          />
          <input
            type="number"
            value={newCourse.credits}
            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tcnj-gold"
            placeholder="Credits (e.g., 4)"
          />
        </div>
        <button
          onClick={handleAddCourse}
          className="mt-4 bg-tcnj-gold text-tcnj-blue py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
        >
          Add Course
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesters.map((semester) => (
            <Droppable droppableId={semester} key={semester}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h2 className="text-lg font-semibold text-tcnj-blue mb-4">{semester}</h2>
                  {plan[semester].map((courseId, index) => {
                    const course = courses.find((c) => c._id === courseId);
                    return course ? (
                      <Draggable key={courseId} draggableId={courseId} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CourseCard course={course} onDelete={handleDeleteCourse} />
                          </div>
                        )}
                      </Draggable>
                    ) : null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default SemesterPlanner;
