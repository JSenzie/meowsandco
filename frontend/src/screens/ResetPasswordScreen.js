import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import axios from "axios"

function ResetPasswordScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const userRegisterInfo = useSelector((state) => state.userLogin)
  const { userInfo } = userRegisterInfo

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  // make async function that returns either a message if the request was successful, or error if not
  const submitHandler = async (e) => {
    e.preventDefault()
    setResponse("")
    setLoading(true)
    const data = await axios
      .post("/api/users/password_reset/", { email: email })
      .then((response) => {
        setResponse("Please check your email for a link to update your password")
      })
      .catch((error) => {
        setResponse("There was an error processing your request. Please check the spelling of your email address")
      })

    setLoading(false)
  }

  return (
    <div>
      <FormContainer>
        <h1>Reset Password</h1>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Send Password Reset Email
            </Button>
            <p>{response}</p>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ResetPasswordScreen
