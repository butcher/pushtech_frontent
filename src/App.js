import React from "react";
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import ReservationsIndex, { loader as reservationIndexLoader } from "./routes/reservations_index";
import NewReservation from "./routes/new_reservation";
import Reservation, { loader as reservationLoader } from "./routes/reservation";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/reservations",
    element: <ReservationsIndex />,
    loader: reservationIndexLoader,
  },
  {
    path: "/reservations/new",
    element: <NewReservation />,
  },
  {
    path: "/reservations/:reservationId",
    element: <Reservation />,
    loader: reservationLoader,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <RouterProvider router={router} />
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}

export default App;
