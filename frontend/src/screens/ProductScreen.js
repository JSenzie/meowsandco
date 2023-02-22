import React, { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button, Carousel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getProduct } from "../slices/productSlice"

function ProductScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    return navigate(`/cart/${id}`)
  }

  const productList = useSelector((state) => state.productList)
  const { error, loading, product } = productList

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        <i className="fas fa-arrow-left" />
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error.length !== 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col lg={6}>
            <Carousel>
              {product.image !== null && (
                <Carousel.Item>
                  <Image src={product.image} alt={product.name} fluid />
                </Carousel.Item>
              )}
              {product.image2 !== null && (
                <Carousel.Item>
                  <Image src={product.image2} alt={product.name} fluid />
                </Carousel.Item>
              )}
              {product.image3 !== null && (
                <Carousel.Item>
                  <Image src={product.image3} alt={product.name} fluid />
                </Carousel.Item>
              )}
              {product.image4 !== null && (
                <Carousel.Item>
                  <Image src={product.image4} alt={product.name} fluid />
                </Carousel.Item>
              )}
              {product.image5 !== null && (
                <Carousel.Item>
                  <Image src={product.image5} alt={product.name} fluid />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>

          <Col lg={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Size: {product.size}</ListGroup.Item>
              <ListGroup.Item>Color: {product.color}</ListGroup.Item>
              <ListGroup.Item>Material: {product.material}</ListGroup.Item>
              <ListGroup.Item>Brand: {product.brand}</ListGroup.Item>
              <ListGroup.Item>Condition: {product.condition}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>

              <ListGroup.Item>
                {product.available ? (
                  <Button type="button" onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                ) : (
                  <Button type="button" disabled>
                    Sold
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductScreen
