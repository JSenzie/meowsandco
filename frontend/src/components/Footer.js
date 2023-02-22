import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer>
      <Container>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item" md={2} sm={12}>
            <p>
              <Link to={"/about"}>About</Link>
            </p>
          </li>
          <li className="nav-item" md={2} sm={12}>
            <p>
              <Link to={"/contact"}>Contact</Link>
            </p>
          </li>
          <li className="nav-item" md={2} sm={12}>
            <p>
              <Link to={"/returns"}>Returns</Link>
            </p>
          </li>
          <li className="nav-item" md={2} sm={12}>
            <p>
              <Link to={"/privacy"}>Privacy Policy</Link>
            </p>
          </li>

          <li className="nav-item" md={2} sm={12}>
            <p>
              <Link to={"/terms"}>Terms of Service</Link>
            </p>
          </li>
        </ul>
        <Row>
          <Col className="text-center pb-3">Copyright &copy; Meows and Co.</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
