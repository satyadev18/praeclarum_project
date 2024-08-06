import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventList from "./features/EventList/EventList";
import AddEvent from "./features/AddEvent/AddEvent";
import { Container, Button } from "@mui/material";

const App: React.FC = () => (
  <Router>
    <Container>
      <nav>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/events">
          <Button>Event List</Button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddEvent isEdit={false} />} />
        <Route path="/event/:id" element={<AddEvent isEdit={true} />} />
        <Route path="/events" element={<EventList />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
