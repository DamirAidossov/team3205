import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { NavBar } from './components/navbar.js'
import { RatesComp } from './components/rates.js'
import { Converter } from "./components/currConverter.js"
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

function Home() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={5} >
          <h2 className="text-center">Currency converter</h2>
          <Converter></Converter>
        </Col>
        <Col ></Col>
      </Row>
    </Container>
  );
}

function Rates() {
  return (
    <Container fluid>
      <Row>
        <Col ></Col>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={5}>
          <h2 className="text-center">Currency Rate List</h2>
          <RatesComp></RatesComp>
        </Col>
        <Col ></Col>
      </Row>
    </Container>
  )
}


const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "Rates", element: <Rates /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <NavBar />
      <App />
    </Router>
  );
};

export default AppWrapper;

