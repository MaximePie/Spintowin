import React from 'react';
import AddCardForm from '../molecules/AddCardForm/AddCardForm';
import AddCardUsers from '../molecules/AddCardUsers';

export default function AddCard() {
  return (
    <div className="AddCard">
      <AddCardForm />
      <AddCardUsers />
    </div>
  );
}
