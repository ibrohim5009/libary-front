import React, { useEffect, useState } from 'react';
import Delete from './Delete';

const Category = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingPlace, setEditingPlace] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/categories/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, place }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Category added successfully!");
      setName('');
      setPlace('');
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error('Failed to fetch:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setEditingName(category.name);
    setEditingPlace(category.place);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/categories/${editingCategoryId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editingName, place: editingPlace }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCategory = await response.json();
      setCategories(categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      ));
      setEditingCategoryId(null);
    } catch (error) {
      console.error('Failed to update category:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Category Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 py-2 px-4 border border-gray-300 rounded shadow-sm"
          />
          <input
            type="text"
            placeholder="Category Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="mr-2 py-2 px-4 border border-gray-300 rounded shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-sm"
          >
            Add Category
          </button>
        </div>
      </form>
      {categories.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Categories</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Place</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  {editingCategoryId === category.id ? (
                    <React.Fragment>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full py-1 px-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          value={editingPlace}
                          onChange={(e) => setEditingPlace(e.target.value)}
                          className="w-full py-1 px-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border px-4 py-2 flex space-x-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCategoryId(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td className="border px-4 py-2">{category.name}</td>
                      <td className="border px-4 py-2">{category.place}</td>
                      <td className="border px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <Delete id={category.id} fetchCategories={fetchCategories} />
                      </td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Category;
