import React, { useState } from 'react';
import './ContactList.css';

const ContactList = ({ contacts, onDeleteContact, onEditContact }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditForm(contact);
  };

  const handleSave = () => {
    onEditContact(editForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-card">
          {editingId === contact.id ? (
            <div className="contact-edit-form">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <div className="edit-actions">
                <button onClick={handleSave} className="save-button">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>
                  <span className="icon">📧</span> {contact.email}
                </p>
                <p>
                  <span className="icon">📱</span> {contact.phone}
                </p>
              </div>
              <div className="contact-actions">
                <button 
                  className="edit-button"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button"
                  onClick={() => onDeleteContact(contact.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList; 