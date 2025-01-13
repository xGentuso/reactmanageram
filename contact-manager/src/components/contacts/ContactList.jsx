import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-card">
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
              onClick={() => console.log('Edit', contact.id)}
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
        </div>
      ))}
    </div>
  );
};

export default ContactList; 