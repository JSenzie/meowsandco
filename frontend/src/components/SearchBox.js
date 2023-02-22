import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function SearchBox() {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword !== "") {
      if (keyword) {
        navigate(`/?keyword=${keyword}&page=1`)
      } else {
        navigate("/")
      }
    }
  }

  let navigate = useNavigate()

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control type="text" name="q" onChange={(e) => setKeyword(e.target.value)} className="mr-sm-2 ml-sm-5"></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
