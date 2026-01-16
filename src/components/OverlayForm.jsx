import { useState, useEffect } from 'react';
import '../styles/OverlayForm.css';

const OverlayForm = ({ overlay, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'text',
    content: '',
    position_x: 50,
    position_y: 50,
    width: 200,
    height: 100,
    font_size: 24,
    color: '#FFFFFF'
  });

  useEffect(() => {
    if (overlay) {
      setFormData({
        type: overlay.type || 'text',
        content: overlay.content || '',
        position_x: overlay.position_x || 50,
        position_y: overlay.position_y || 50,
        width: overlay.width || 200,
        height: overlay.height || 100,
        font_size: overlay.font_size || 24,
        color: overlay.color || '#FFFFFF'
      });
    }
  }, [overlay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' || name === 'content' || name === 'color'
        ? value
        : parseInt(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      alert('Please enter content for the overlay');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="overlay-form-container">
      <h3>{overlay ? 'Edit Overlay' : 'Create New Overlay'}</h3>
      <form onSubmit={handleSubmit} className="overlay-form">
        <div className="form-group">
          <label htmlFor="type">Overlay Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">
            {formData.type === 'text' ? 'Text Content:' : 'Image URL:'}
          </label>
          <input
            type="text"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder={formData.type === 'text' ? 'Enter text...' : 'Enter image URL...'}
          />
        </div>

        {formData.type === 'text' && (
          <>
            <div className="form-group">
              <label htmlFor="font_size">Font Size: {formData.font_size}px</label>
              <input
                type="range"
                id="font_size"
                name="font_size"
                min="12"
                max="72"
                value={formData.font_size}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Text Color:</label>
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="form-control color-picker"
              />
            </div>
          </>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="position_x">X Position: {formData.position_x}px</label>
            <input
              type="range"
              id="position_x"
              name="position_x"
              min="0"
              max="1000"
              value={formData.position_x}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position_y">Y Position: {formData.position_y}px</label>
            <input
              type="range"
              id="position_y"
              name="position_y"
              min="0"
              max="600"
              value={formData.position_y}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {formData.type === 'image' && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="width">Width: {formData.width}px</label>
              <input
                type="range"
                id="width"
                name="width"
                min="50"
                max="500"
                value={formData.width}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height: {formData.height}px</label>
              <input
                type="range"
                id="height"
                name="height"
                min="50"
                max="500"
                value={formData.height}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {overlay ? 'Update Overlay' : 'Create Overlay'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OverlayForm;
