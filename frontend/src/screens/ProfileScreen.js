import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getUserDetails, userUpdate, userProfileReset } from "../slices/userSlice"
import { orderList } from "../slices/orderSlice"

function ProfileScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetailsInfo = useSelector((state) => state.userLogin)
  const { userDetails, error, loading, userInfo, success } = userDetailsInfo

  const orderDetailsInfo = useSelector((state) => state.orders)
  const { orders, loading: loadingOrders, error: errorOrders } = orderDetailsInfo

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      navigate("/login")
    } else {
      if (Object.keys(userDetails).length === 0 || !userDetails.name) {
        if (success) {
          dispatch(userProfileReset())
        }
        dispatch(getUserDetails("profile"))
        dispatch(orderList())
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
      }
    }
  }, [dispatch, navigate, userDetails, userInfo, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      setMessage("")
      dispatch(
        userUpdate({
          id: userInfo._id,
          name: name,
          email: email,
          password: password,
        })
      )
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error.message && <Message variant="danger">{error.message}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders.length !== 0 ? (
          <Message variant="danger">{errorOrders.message}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
