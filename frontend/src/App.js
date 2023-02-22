import { Container } from "react-bootstrap"

import Header from "./components/Header"
import Footer from "./components/Footer"

import HomeScreen from "./screens/HomeScreen"
import PrivacyPolicy from "./screens/PrivacyPolicy"
import About from "./screens/About"
import Contact from "./screens/Contact"

import ProductScreen from "./screens/ProductScreen"

import { HashRouter as Router, Routes, Route } from "react-router-dom"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ResetPasswordScreen from "./screens/ResetPasswordScreen"
import ResetPasswordConfirmScreen from "./screens/ResetPasswordConfirmScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import TermsScreen from "./screens/TermsScreen"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/resetPassword" element={<ResetPasswordScreen />} />
              <Route path="/resetPasswordConfirm" element={<ResetPasswordConfirmScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/placeOrder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />}>
                <Route path=":id" element={<CartScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
