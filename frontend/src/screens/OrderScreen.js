import React, { useEffect } from "react"
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import { orderDetails } from "../slices/orderSlice"
import { useParams, Link } from "react-router-dom"
import Loader from "../components/Loader"

function OrderScreen() {
  const dispatch = useDispatch()
  const { order, loading } = useSelector((state) => state.orders)
  const { id } = useParams()

  useEffect(() => {
    // if there is no matching order in state, reset payment details and get order into state
    if (Object.keys(order).length === 0 || order._id !== Number(id)) {
      dispatch(orderDetails(id))
    }
  }, [dispatch, id, order])

  return loading || !order._id ? (
    <Loader />
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},{"   "}
                {order.shippingAddress.state},{"   "}
                {order.shippingAddress.city}
                {"   "}
                {order.shippingAddress.postalCode},{"   "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt}</Message> : <Message variant="warning">Not Yet Delivered</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod[0].toUpperCase() + order.paymentMethod.slice(1).toLowerCase()}
              </p>
              {order.isPaid ? <Message variant="success">Paid On {order.paidAt.substring(0, 10)}</Message> : <Message variant="warning">Not Yet Paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${order.orderItems.length !== 0 ? order.orderItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2) : ""}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
