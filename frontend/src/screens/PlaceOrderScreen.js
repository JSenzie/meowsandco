import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { clearOrder, orderCreate } from "../slices/orderSlice"
import Loader from "../components/Loader"
import { PayPalButton } from "react-paypal-button-v2"
import { clearCart } from "../slices/cartSlice"

function PlaceOrderScreen() {
  const orderInfo = useSelector((state) => state.orders)
  const { order, error, loading, success } = orderInfo
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [navReady, setNavReady] = useState(false)

  const addPaypalScript = () => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    const client_id = process.env.PAYPAL_CLIENT_ID
    script.src = "https://www.paypal.com/sdk/js?client-id=" + client_id
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    dispatch(clearOrder())
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [dispatch])

  const cart = useSelector((state) => state.cartList)
  const itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2))
  const shippingPrice = Number((itemsPrice > 100 ? 0 : 15).toFixed(2))
  const taxPrice = cart.shippingAddress.state !== "Washington" ? 0 : Number((0.101 * itemsPrice).toFixed(2))
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice)

  const placeOrder = (data, actions) => {
    dispatch(
      orderCreate({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: data.paymentSource,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    )

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice,
          },
        },
      ],
    })
  }

  useEffect(() => {
    if (navReady) {
      localStorage.removeItem("cartItems")
      dispatch(clearCart())
      navigate(`/order/${order._id}`)
      dispatch(clearOrder)
    }
  }, [navReady, dispatch, navigate, order._id])

  const orderSuccess = (data, actions) => {
    if (!localStorage.getItem("itemsNotAvailable")) {
      actions.order.capture().then(setNavReady(true))
    } else {
      localStorage.removeItem("itemsNotAvailable")
      return
    }
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
              </p>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address},{"   "}
                {cart.shippingAddress.state},{"   "}
                {cart.shippingAddress.city}
                {"   "}
                {cart.shippingAddress.postalCode},{"   "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error.message && (
                <ListGroup.Item>
                  <Message variant="danger">{error.message}</Message>
                </ListGroup.Item>
              )}
              {loading && (
                <ListGroup.Item>
                  <Loader />
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <h3 className="my-3">Pay and Submit:</h3>
                {sdkReady ? <PayPalButton forceReRender={[success]} createOrder={placeOrder} onApprove={orderSuccess} /> : <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
