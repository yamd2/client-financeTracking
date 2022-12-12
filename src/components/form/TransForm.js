import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { postTrans } from "../../utils/axiosHelper";
import { toast } from "react-toastify";

const initialState = {
  type: "",
  name: "",
  amount: "",
};
export const TransForm = ({ getTrans }) => {
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // call api to send data to database

    const { status, message } = await postTrans(form);
    console.log(status, message);
    toast[status](message);

    status === "success" && getTrans();

    // reset the form
    // setForm(initialState);
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="mt-3 gap-2">
          <Col md="2">
            <Form.Select
              name="type"
              required
              onChange={handleOnChange}
              value={form.type}
            >
              <option>Choose...</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </Form.Select>
          </Col>
          <Col md="5">
            <Form.Control
              onChange={handleOnChange}
              name="name"
              placeholder="Transaction Name"
              required
              value={form.name}
            />
          </Col>
          <Col md="2">
            <Form.Control
              onChange={handleOnChange}
              name="amount"
              type="number"
              placeholder="amount i.e. 500"
              required
              value={form.amount}
            />
          </Col>
          <Col md="2">
            <div className="d-grid">
              <Button type="submit"> Add </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
