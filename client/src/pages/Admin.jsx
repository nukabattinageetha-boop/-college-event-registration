
import { useEffect, useState } from "react";

function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 50
  });

  const loadData = async () => {
    const [e, r] = await Promise.all([
      fetch("http://localhost:5000/api/events"),
      fetch("http://localhost:5000/api/registrations")
    ]);

    if (!e.ok || !r.ok) throw new Error("Unable to load data");

    setEvents(await e.json());
    setRegistrations(await r.json());
  };

  useEffect(() => {
    loadData().catch(err => console.error(err));
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            capacity: Number(form.capacity)
          })
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Event added successfully!");

      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: 50
      });

      await loadData();

    } catch (error) {
      alert(error.message);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      <h2>Add New Event</h2>

      <form onSubmit={addEvent}>
        <input
          placeholder="Event Title"
          value={form.title}
          onChange={e => setForm({...form, title:e.target.value})}
          required
        />

        <textarea
          placeholder="Event Description"
          value={form.description}
          onChange={e => setForm({...form, description:e.target.value})}
          required
        />

        <input
          type="datetime-local"
          value={form.date}
          onChange={e => setForm({...form, date:e.target.value})}
          required
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({...form, location:e.target.value})}
          required
        />

        <input
          type="number"
          min="1"
          value={form.capacity}
          onChange={e => setForm({...form, capacity:e.target.value})}
          required
        />

        <button type="submit">Add Event</button>
      </form>

      <h2>Manage Events</h2>

      {events.map(event => (
        <div className="event-card" key={event._id}>
          <h3>{event.title}</h3>
          <button onClick={() => deleteEvent(event._id)}>
            Delete Event
          </button>
        </div>
      ))}

      <h2>Student Registrations</h2>

      {registrations.map(r => (
        <div className="event-card" key={r._id}>
          <p>Name: {r.studentName}</p>
          <p>Email: {r.email}</p>
          <p>Phone: {r.phone}</p>
          <p>Event: {r.eventId?.title || "Unavailable"}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;
