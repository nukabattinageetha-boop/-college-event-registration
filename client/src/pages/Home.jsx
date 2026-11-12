
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const exploreEvents = () => {
    document.getElementById("events")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Discover Amazing College Events</h1>

        <p>
          Explore events, showcase your talents,
          learn new skills and create memories.
        </p>

        <button onClick={exploreEvents}>
          Explore Events
        </button>
      </section>

      <section id="events" className="events-section">
        <h2>Upcoming Events</h2>

        {loading && <p>Loading events...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="event-container">
            {events.length === 0 ? (
              <p>No events available. Check back soon!</p>
            ) : (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onRegister={(id) => navigate(`/register/${id}`)}
                />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
