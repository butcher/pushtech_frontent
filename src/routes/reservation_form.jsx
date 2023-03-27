import {
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function ReservationForm(props) {
  const { method, action } = props

  const [reservation, setReservation] = useState({...props.reservation, ['price']: props.reservation.price/100});
  const [error, setError] = useState({title: '', detail: ''});

  const navigate = useNavigate()

  function onUpdateField(event) {
    setReservation({...reservation, [event.target.name]: event.target.value})
  }

  function handleSubmit(event) {
    event.preventDefault()
    fetch(`http://localhost:3000/${action}`, {
      method: method,
      body: JSON.stringify({...reservation, ['price']: parseInt(reservation.price*100) }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        setError(response.error)
      } else {
        navigate('/reservations')
      }
    })
  }

  return (
    <>
      { error.detail &&
        <Alert variant="danger">
          {error.title}
          <ul>
            {error.detail.map((errorItem) => (
              <li>{errorItem}</li>
            ))}
          </ul>
        </Alert>
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Hotel name</Form.Label>
          <Form.Control name="hotel_name" type="text" value={reservation.hotel_name} onChange={onUpdateField} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={reservation.price} onChange={onUpdateField} />
          <Form.Select name="currency" value={reservation.currency} onChange={onUpdateField}>
            <option value='usd'>United States Dollar ($)</option>
            <option value='eur'>Euro (&#x20AC;)</option>
            <option value='gbp'>British Pound (&#x00A3;)</option>
            <option value='aud'>Australian Dollar ($)</option>
            <option value='cad'>Canadian Dollar ($)</option>
            <option value='jpy'>Japanese Yen (&#x00A5;)</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Checkin Date</Form.Label>
          <Form.Control name="checkin_date" type="date" value={reservation.checkin_date} onChange={onUpdateField} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Checkout Date</Form.Label>
          <Form.Control name="checkout_date" type="date" value={reservation.checkout_date} onChange={onUpdateField} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Guest Full Name</Form.Label>
          <Form.Control name="guest_full_name" type="text" value={reservation.guest_full_name} onChange={onUpdateField} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Guest Email</Form.Label>
          <Form.Control name="guest_email" type="email" value={reservation.guest_email} onChange={onUpdateField} />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Save</Button>
          {' '}
          <Button href="/reservations" variant="secondary">Cancel</Button>
        </Form.Group>
      </Form>
    </>
  )
}
