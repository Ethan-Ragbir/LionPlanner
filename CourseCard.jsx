function CourseCard({ course, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-tcnj-blue">{course.code}: {course.title}</h3>
        <p className="text-gray-600">{course.credits} credits</p>
      </div>
      <button
        onClick={() => onDelete(course._id)}
        className="text-red-500 hover:text-red-700"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default CourseCard;
