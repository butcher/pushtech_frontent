import ReservationForm from './reservation_form';

export default function NewReservation() {
  const reservation = {
    hotel_name: '',
    price: 0,
    currency: 'usd',
    checkin_date: new Date().toISOString().slice(0, 10),
    checkout_date: new Date().toISOString().slice(0, 10),
    guest_full_name: '',
    guest_email: ''
  }


  return (
    <>
      <h2>Creating new reservation</h2>
      <ReservationForm reservation={reservation} method="post" action="reservations.json"></ReservationForm>
    </>
  )
}
