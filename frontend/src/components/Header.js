import React, { useState, useEffect } from "react"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { NavDropdown, Container, Button } from "react-bootstrap"
import SearchBox from "./SearchBox"
import { userLogout } from "../slices/userSlice"
import { orderListReset } from "../slices/orderSlice"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

function Header() {
  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cartList)
  const { cartItems } = cart
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [sizesSelected, setSizesSelected] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("userInfo")
    dispatch(orderListReset())
    dispatch(userLogout())
  }

  const filterSubmitHandler = (e) => {
    e.preventDefault()
    const filterParams = location.search
    if (filterParams.includes("size")) {
      const newParams = filterParams.split("&size")[0].split("?")[1]
      navigate(`/?${newParams}&size=${sizesSelected}`)
    } else {
      const newParams = filterParams.split("?")[1]
      navigate(`/?${newParams}&size=${sizesSelected}`)
    }
  }

  const sizesFilterChanged = (e) => {
    // Destructuring
    const { value, checked } = e.target

    // Case 1 : The user checks the box
    if (checked) {
      setSizesSelected((sizesSelected) => [...sizesSelected, value])
    }

    // Case 2  : The user unchecks the box
    else {
      setSizesSelected(sizesSelected.filter((e) => e !== value))
    }
  }

  useEffect(() => {
    const getBrands = async () => {
      const { data } = await axios.get("/api/products/brands")

      setBrands(data)
    }
    if (brands.length === 0) {
      getBrands()
    }
  }, [brands.length])

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/api/products/categories")

      setCategories(data)
    }
    if (categories.length === 0) {
      getCategories()
    }
  }, [categories.length])

  useEffect(() => {
    const getSizes = async () => {
      const { data } = await axios.get("/api/products/sizes/")
      setSizes(data)
    }
    if (sizes.length === 0) {
      getSizes()
    }
  }, [sizes.length])

  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container className="mx-3">
            <LinkContainer to="/">
              <Navbar.Brand>Meows and Co.</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart" />
                    Cart ({cartItems.length})
                  </Nav.Link>
                </LinkContainer>

                {userInfo.name ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user" />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar bg="light" expand="lg" className="px-3">
          <Container fluid>
            <Nav>
              <NavDropdown title="Brands" id="basic-nav-dropdown">
                {brands.length !== 0 &&
                  brands.map((brand) => (
                    <NavDropdown.Item key={brand}>
                      <LinkContainer to={{ pathname: "/", search: `?keyword=${brand}&page=1` }}>
                        <p className="text-center mb-0">{brand[0].toUpperCase() + brand.slice(1).toLowerCase()}</p>
                      </LinkContainer>
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                {categories.length !== 0 &&
                  categories.map((category) => (
                    <NavDropdown.Item key={category}>
                      <LinkContainer to={{ pathname: "/", search: `?category=${category}&page=1` }}>
                        <p className="text-center mb-0">{category[0].toUpperCase() + category.slice(1).toLowerCase()}</p>
                      </LinkContainer>
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <NavDropdown title="Sizes" id="basic-nav-dropdown">
                <Form onSubmit={filterSubmitHandler} className="px-3">
                  {sizes.map((size) => (
                    <Form.Check key={size} inline onChange={sizesFilterChanged} label={size} value={size} type="checkbox" />
                  ))}
                  <Button type="submit" variant="primary" className="my-2">
                    Filter
                  </Button>
                </Form>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  )
}

export default Header
