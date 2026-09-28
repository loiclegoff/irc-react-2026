import { useEffect } from "react";
import "./App.css";
import { RobotsList } from "./components/robot/robots-list";
import { Col, Container, Row } from "react-bootstrap";
import { PartsList } from "./components/part/parts-list";
import { useDispatch } from "react-redux";
import { loadRobots } from "./core/actions/robot.js";
import { loadParts } from "./core/actions/part.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://robot-cpe.cleverapps.io/robots"
      );
      const data = await response.json();
      // même chose dispatch({ type: "LOAD_PARTS", payload: data });
      dispatch(loadRobots(data));
    }
    // Get data from an API.
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://robot-cpe.cleverapps.io/parts"
      );
      const data = await response.json();
      dispatch(loadParts(data));
    }
    // Get data from an API.
    fetchData();
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Robot Shop</h1>
      <Container>
        <Row>
          <Col>
            <RobotsList />
          </Col>
          <Col>
            <PartsList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
