import { useState } from 'react';

function AddExpense({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || amount.trim() === '') return;

    // Send data to App.js
    onAddExpense(title, amount);

    // Clear the form
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Expense</h4>
      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddExpense;
