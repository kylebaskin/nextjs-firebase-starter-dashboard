import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
      </Head>

      <Container>
        <Row className="mt-5">
          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Header>
                <Card.Title>Card 1</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Header>
                <Card.Title>Card 2</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Header>
                <Card.Title>Card 3</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}