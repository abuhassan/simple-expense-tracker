import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AddExpense from "./AddExpense";

const Home = () => (
  <div>
    <h1>Welcome to the Expense Tracker</h1>
    <p>Your simple solution for tracking expenses in MYR.</p>
  </div>
);

const ViewExpenses = () => <h2>View All Expenses</h2>;

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />{" "}
          {/* New route */}
          <Route path="/view-expenses" element={<ViewExpenses />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
