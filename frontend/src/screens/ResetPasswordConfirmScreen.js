import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import axios from "axios"

//create logic to compare password to confirmpassword, and send to url with pass and token if true

function ResetPasswordConfirmScreen() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState(null)

  const location = useLocation()

  const submitHandler = async (e) => {
    e.preventDefault()
    setSuccess(null)
    let token = location.search.split("=")[1]
    if (password === confirmPassword) {
      const content = { password: password, token: token }
      const { data } = await axios
        .post(`api/users/password_reset/confirm/?token=${token}`, content)
        .then((response) => {
          setSuccess(true)
        })
        .catch((error) => {
          setSuccess(false)
        })
    } else {
      alert("Passwords do not match")
    }
  }
  return (
    <div>
      <FormContainer>
        <h1>Reset Password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Enter New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Reset Password
          </Button>
          {success === true && (
            <Message variant="success">
              Password reset successful. Please <Link to="/login">Log In</Link>
            </Message>
          )}
          {success === false && <Message variant="warning">There was an error processing this request</Message>}
        </Form>
      </FormContainer>
    </div>
  )
}

export default ResetPasswordConfirmScreen
