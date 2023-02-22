import React, { useEffect, useState } from "react"
import { Row, Col, Carousel, Image } from "react-bootstrap"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getProducts } from "../slices/productSlice"
import { useLocation } from "react-router-dom"
import Paginate from "../components/Paginate"
import axios from "axios"

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products, page, pages } = productList
  const [carouselLoading, setCarouselLoading] = useState(false)
  const [carouselImages, setCarouselImages] = useState()

  const location = useLocation()
  let keyword = location.search

  useEffect(() => {
    dispatch(getProducts(keyword))

    const getCarouselImages = async () => {
      setCarouselLoading(true)
      const { data } = await axios.get("/api/products/carousel/")
      setCarouselImages(data)
      setCarouselLoading(false)
    }

    if (keyword === "") {
      getCarouselImages()
    }
  }, [dispatch, keyword])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error.length !== 0 ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <div>
          <Row>
            {carouselLoading && !carouselImages ? (
              <Loader />
            ) : carouselImages ? (
              <Col sm={12}>
                <Carousel variant="dark">
                  {carouselImages.map((image) => (
                    <Carousel.Item key={image._id}>
                      <Image src={image.image} className="d-block mx-auto" fluid />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            ) : (
              ""
            )}
            <h1 className="mt-5 border-top">Products</h1>

            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {products.length === 0 && <h1>Products</h1> && <p>No Products Found</p>}
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  )
}

export default HomeScreen
