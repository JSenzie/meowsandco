import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import { userLoginUser } from "../slices/userSlice"

function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const loginInfo = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = loginInfo

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      if (redirect === "/") {
        navigate("/")
      } else {
        navigate("/" + redirect)
      }
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLoginUser({ email, password }))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error.message && <Message variant="danger">{error.message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col sm={12} className="mb-1">
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
        <Col sm={12}>
          Forgot Password? <Link to={redirect ? `/resetPassword?redirect=${redirect}` : "/resetPassword"}>Reset Password</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
