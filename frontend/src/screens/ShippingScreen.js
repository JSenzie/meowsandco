import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"

function ShippingScreen() {
  const cart = useSelector((state) => state.cartList)
  const { shippingAddress } = cart
  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [state, setState] = useState(shippingAddress.state)
  const navigate = useNavigate()
  const USStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

  const submitHandler = (e) => {
    e.preventDefault()
    const data = { address, city, postalCode, country, state }
    dispatch(saveShippingAddress(data))
    localStorage.setItem("shippingAddress", JSON.stringify(data))
    navigate("/placeOrder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control required type="name" placeholder="Enter Address" value={address ? address : ""} onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control required type="name" placeholder="Enter City" value={city ? city : ""} onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Select required type="name" value={state ? state : ""} onChange={(e) => setState(e.target.value)}>
            <option>Select your State</option>
            {USStates.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control required type="name" placeholder="Enter Postal Code" value={postalCode ? postalCode : ""} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control required type="name" placeholder="Enter Country" value={country ? country : ""} onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
