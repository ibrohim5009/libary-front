import React from 'react';

const Delete = ({ category, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/v1/categories/${category}`, {
        method: 'DELETE',
      });
      onDelete(category); // Call the onDelete function passed as prop with the category ID
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
     <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
    </div>
  );
};

export default Delete;
