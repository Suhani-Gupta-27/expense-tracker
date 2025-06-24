function Expenses(props) {
  return (
    <div>
      <h4>Expenses</h4>
      <ul>
        {props.items.map((expense) => (
          <li key={expense.id}>
            {expense.title} – ₹{expense.amount}{" "}
            <button onClick={() => props.onDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
