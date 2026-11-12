
import { useState } from "react";
import { useParams } from "react-router-dom";

function Register() {
  const { id } = useParams();

  const [form, setForm] = useState({
    studentName: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: id,
            ...form
          })
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setMessage("Registration successful!");
      setForm({
        studentName: "",
        email: "",
        phone: ""
      });

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Student Name"
          value={form.studentName}
          onChange={e => setForm({
            ...form, studentName: e.target.value
          })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({
            ...form, email: e.target.value
          })}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={e => setForm({
            ...form, phone: e.target.value
          })}
          required
        />

        <button type="submit">Register Now</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;
