import {
  useLoaderData,
} from "react-router-dom";
import ReservationForm from './reservation_form';

export async function loader({ params }) {
  const reservation = await fetch(`http://localhost:3000/reservations/${params.reservationId}.json`)
    .then((response) => response.json())

  return { reservation };
}

export default function Reservation() {
  const { reservation } = useLoaderData();

  return (
    <>
      <h2>Editing the reservation #{reservation._id.$oid}</h2>
      <ReservationForm reservation={reservation} method="put" action={`reservations/${reservation._id.$oid}.json`}></ReservationForm>
    </>
  )
}
