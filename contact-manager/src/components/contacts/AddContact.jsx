import React, { useState } from 'react';

const AddContact = ({ addContact }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({ name: '', email: '', phone: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={contact.name}
        onChange={(e) => setContact({...contact, name: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact({...contact, email: e.target.value})}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) => setContact({...contact, phone: e.target.value})}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact; 