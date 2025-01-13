// src/pages/MainPage.jsx
import React, { useState, useEffect } from 'react';
import AddContact from "../components/contacts/AddContact";
import ContactList from "../components/contacts/ContactList";
import './MainPage.css';

const MainPage = () => {
  const [contacts, setContacts] = useState(() => {
    // Initialize contacts from localStorage
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const user = localStorage.getItem('user');

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    const contact = {
      ...newContact,
      id: Date.now(),
      userId: user // Associate contact with current user
    };
    setContacts([...contacts, contact]);
    setIsAddingContact(false);
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleEditContact = (updatedContact) => {
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  };

  // Filter contacts to only show those belonging to the current user
  const userContacts = contacts.filter(contact => contact.userId === user);

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

        {userContacts.length === 0 && !isAddingContact ? (
          <div className="empty-state">
            <h2>No Contacts Yet</h2>
            <p>Click the "Add Contact" button to get started!</p>
          </div>
        ) : (
          <ContactList 
            contacts={userContacts} 
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEditContact}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
