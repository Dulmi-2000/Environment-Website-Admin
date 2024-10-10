import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../Components/Topbar/Topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './publications.css';
import { MdOutlineModeEdit } from "react-icons/md";
function Publications() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/categories');
      const categoriesWithCount = await Promise.all(response.data.map(async (category) => {
        const countResponse = await axios.get(`http://localhost:3000/api/publications/count/${category._id}`);
        return { ...category, totalPublications: countResponse.data.totalPublications };
      }));
      setCategories(categoriesWithCount);
      setLoading(false);
    } catch (err) {
      setError('Failed to load categories');
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/category', {
          name: newCategory,
        });
        setCategories((prevCategories) => [...prevCategories, response.data]);
        setNewCategory('');
      } catch (err) {
        setError('Failed to add category');
      }
    }
  };

  const openUploadModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditCategoryName(category.name);
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (file && selectedCategory && displayName.trim() !== '') {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('categoryId', selectedCategory._id);
      formData.append('displayName', displayName);

      try {
        await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setIsModalOpen(false);
        setFile(null);
        setDisplayName('');
        fetchCategories(); // Refresh categories after upload
      } catch (err) {
        console.error('Upload error:', err.response.data);
        setError('Failed to upload file: ' + err.response.data.message);
      }
    } else {
      if (!file) setError('Please select a file.');
      if (!selectedCategory) setError('Please select a category.');
      if (displayName.trim() === '') setError('Please enter a display name.');
    }
  };

  const editCategory = async () => {
    if (editCategoryName.trim() !== '' && selectedCategory) {
      try {
        await axios.put(`http://localhost:3000/api/categories/${selectedCategory._id}`, {
          name: editCategoryName,
        });
        setCategories(prevCategories => prevCategories.map(cat =>
          cat._id === selectedCategory._id ? { ...cat, name: editCategoryName } : cat
        ));
        setIsModalOpen(false);
        setEditCategoryName('');
        setSelectedCategory(null);
        setIsEditMode(false);
      } catch (err) {
        setError('Failed to update category');
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${categoryId}`);
        setCategories(prevCategories => prevCategories.filter(cat => cat._id !== categoryId));
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="Category-list-container">
            <h5 className="heading">Add New Publication Category</h5>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="category-input"
            />
            <button onClick={addCategory} className="category-btn">
              Add Category
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="downloads-table">
            <h5 className="heading">Upload a Publication</h5>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <table className="data-tables">
                <thead>
                  <tr>
                    <th>Category of the Publication</th>
                    <th>Total Publications</th>
                    <th>Upload a Publication Under the Category</th>
                    <th>Actions</th> {/* Changed this to "Actions" */}
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="4">No categories available.</td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.totalPublications}</td>
                        <td>
                          <button className="submit-btn" onClick={() => openUploadModal(category)}>Upload</button>
                        </td>
                        <td className='action-btn-grp'>
                            <MdOutlineModeEdit  className="edit-btn1" onClick={() => openEditModal(category)} icon={faEdit} />
                            <FontAwesomeIcon className="delete-btn1" onClick={() => deleteCategory(category._id)} icon={faTrash} />
                          
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              {isEditMode ? (
                <>
                  <h3 className='pop-heading'>Edit Category</h3>
                  <input
                    type="text"
                    placeholder="Enter new category name"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="display-name-input"
                  />
                  <br/>
                  <button className='popup-btn' onClick={editCategory}>Update</button>
                </>
              ) : (
                <>
                  <h3 className='pop-heading'>Upload Document for {selectedCategory?.name}</h3>
                  <input
                    type="text"
                    placeholder="Enter display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="display-name-input"
                    />
                    
                    <input type="file" onChange={handleFileChange} className='file-handle' />
                    <br />
                    
                  <button className='popup-btn' onClick={uploadFile}>Upload</button>
                </>
              )}
              <button className='popup-btn-cancel1' onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            </div>
         
        )}
      </div>
    </>
  );
}

export default Publications;
