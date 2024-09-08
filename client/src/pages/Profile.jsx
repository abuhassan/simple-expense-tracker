import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, reset } from "../features/auth/authSlice"; // Assuming you have an updateUser action
import Spinner from "../components/Spinner";

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(updateUser(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="profile">
      <h1>Profile</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </section>
  );
}

export default Profile;
