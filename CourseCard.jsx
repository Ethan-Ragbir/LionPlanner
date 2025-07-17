import { Draggable } from 'react-beautiful-dnd';

function CourseCard({ course, index, onDelete }) {
  return (
    <Draggable draggableId={course._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
            <p className="text-sm text-gray-600">Code: {course.code} | Credits: {course.credits}</p>
          </div>
          <button
            onClick={() => onDelete(course._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default CourseCard;
