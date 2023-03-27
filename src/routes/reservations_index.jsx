import {
  useLoaderData, useNavigate
} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export async function loader() {
  const reservations = await fetch('http://localhost:3000/reservations.json')
    .then((response) => response.json())

  return { reservations };
}


export default function ReservationsIndex() {
  const { reservations } = useLoaderData();
  const navigate = useNavigate()

  function handleDelete(id) {
    if (!window.confirm('Are you sure?')) {
      return false
    }

    fetch(`http://localhost:3000/reservations/${id}.json`, { method: 'DELETE' })
      .then(() => navigate('/reservations'));
  }

  return (
    <>
      <Button onClick={() => navigate('/reservations/new')}>Create new reservation</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Quest</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            reservations.map((reservation) => (
              <tr key={reservation._id.$oid}>
                <th>{reservation._id.$oid}</th>
                <th>{reservation.hotel_name}</th>
                <th>{reservation.guest_full_name}<br></br>&lt;{reservation.guest_email}&gt;</th>
                <th>{new Date(reservation.checkin_date).toDateString()}</th>
                <th>{new Date(reservation.checkout_date).toDateString()}</th>
                <th>{reservation.price/100} {reservation.currency}</th>
                <th>
                  <Button onClick={() => navigate(`/reservations/${reservation._id.$oid}`)}>Edit</Button>
                  {' '}
                  <Button onClick={() => handleDelete(reservation._id.$oid)} variant="danger" type="submit">Delete</Button>
                </th>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}
