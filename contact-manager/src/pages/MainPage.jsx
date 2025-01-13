// src/pages/MainPage.jsx
import React, { useState } from 'react';
import AddContact from "../components/contacts/AddContact";
import ContactList from "../components/contacts/ContactList";
import './MainPage.css';

const MainPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const user = localStorage.getItem('user');

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
    setIsAddingContact(false);
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className="main-page">
      <div className="main-header">
        <h1>Welcome, {user}!</h1>
        <button 
          className="add-contact-button"
          onClick={() => setIsAddingContact(!isAddingContact)}
        >
          {isAddingContact ? 'Cancel' : '+ Add Contact'}
        </button>
      </div>

      <div className="main-content">
        {isAddingContact && (
          <div className="add-contact-form">
            <AddContact 
              addContact={handleAddContact} 
              onCancel={() => setIsAddingContact(false)}
            />
          </div>
        )}

        {contacts.length === 0 && !isAddingContact ? (
          <div className="empty-state">
            <h2>No Contacts Yet</h2>
            <p>Click the "Add Contact" button to get started!</p>
          </div>
        ) : (
          <ContactList 
            contacts={contacts} 
            onDeleteContact={handleDeleteContact}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
