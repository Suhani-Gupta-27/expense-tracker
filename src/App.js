import { useState, useEffect } from 'react';
import Header from './Header';
import './App.css';
import Expenses from './Expenses';
import AddExpense from './AddExpense';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [
    { id: 1, title: 'Groceries', amount: 1200 },
    { id: 2, title: 'Recharge', amount: 199 },
    { id: 3, title: 'Coffee', amount: 150 },
    { id: 4, title: 'Books', amount: 500 },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [budget, setBudget] = useState(
    () => parseFloat(localStorage.getItem('budget')) || ''
  );

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (budget !== '') {
      localStorage.setItem('budget', budget.toString());
    }
  }, [budget]);

  const addExpenseHandler = (title, amount) => {
    const newExpense = {
      id: expenses.length + 1,
      title,
      amount: parseFloat(amount),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget !== '' ? budget - totalSpent : '';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C71585'];

  return (
    <div className="app-container">
      <Header />
      <h3>Expense Tracker</h3>
      <p className="sub-heading">Welcome, Suhani! 🎉</p>

      <div className="budget-section">
        <input
          type="number"
          placeholder="Enter your budget"
          value={budget}
          className="budget-input"
          onChange={(e) => {
            const value = e.target.value;
            setBudget(value === '' ? '' : parseFloat(value));
          }}
        />
      </div>

      <div className="summary">
        <p className="total">Total Spent: ₹{totalSpent}</p>
        {budget !== '' && (
          <p className="remaining">
            Remaining: ₹{remainingBudget}{' '}
            {remainingBudget < 0 && (
              <span className="warning">⚠️ Over budget!</span>
            )}
          </p>
        )}
      </div>

      <div className="chart-container">
        {expenses.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenses}
                dataKey="amount"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {expenses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <AddExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} onDelete={deleteExpenseHandler} />
    </div>
  );
}

export default App;

