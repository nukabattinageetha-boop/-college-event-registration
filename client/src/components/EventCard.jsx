
function EventCard({ event, onRegister }) {
  return (
    <div className="event-card">
      <div className="event-icon">🎓</div>

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>📅 {new Date(event.date).toLocaleDateString()}</p>

      <p>📍 {event.location}</p>

      <p>👥 Capacity: {event.capacity}</p>

      <button onClick={() => onRegister(event._id)}>
        Register Now
      </button>
    </div>
  );
}

export default EventCard;
