import { useEffect, useState } from "react";
import "./App.css";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm, {
  ExpenseFormData
} from "./expense-tracker/components/ExpenseForm";
import ExpenseList from "./expense-tracker/components/ExpenseList";



function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" }
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  const addExpense = (expense: ExpenseFormData) => {
    // Create a copy of existing expenses from local storage or an empty array
    const existingExpenses = JSON.parse(
      localStorage.getItem("expenses") || "[]"
    );

    // Add the new expense to the existing expenses
    const updatedExpenses = [
      ...existingExpenses,
      { ...expense, id: existingExpenses.length + 1 }
    ];

    // Update state and save to local storage
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleDelete = (id: number) => {
    // Filter out the expense with the matching id
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    // Update the state with the new list of expenses
    setExpenses(updatedExpenses);

    // Save the updated list of expenses to local storage
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmit={addExpense} />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      {expenses.length > 0 ? (
        <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
      ) : (
        <p>No expenses available.</p>
      )}
    </div>
  );
}

export default App;
