import React, { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addItem, removeItem } from "../slices/cartSlice"
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap"
import Message from "../components/Message"

function CartScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartList)
  const { cartItems } = cart
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      dispatch(addItem(id))
    }
  }, [id, dispatch])

  const removeFromCartHandler = (id) => {
    const localCart = JSON.parse(localStorage.getItem("cartItems"))
    const newCart = localCart.filter((x) => x.product !== id)
    localStorage.setItem("cartItems", JSON.stringify(newCart))
    dispatch(removeItem(newCart))
    navigate("/cart")
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>${item.price}</Col>
                  <Col md={3}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.length}) items</h2>${cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="text-center">
              <Button type="button" className="btn-block" disabled={cartItems.length === 0 ? true : false} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
