import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { CustomeInput } from "../components/custom-input/CustomeInput";
import { Layout } from "../components/layout/Layout";
import { loginUser } from "../utils/axiosHelper";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "yam.dangar@hotmail.com",
    pin: 3333,
  });
  const [response, setResponse] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputFields = [
    {
      label: "Email",
      placeholder: "your@gmail.com",
      required: true,
      name: "email",
      type: "email",
      value: form.email,
    },
    {
      label: "pin",
      placeholder: "1234",
      required: true,
      name: "pin",
      type: "number",
      value: form.pin,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { data } = await loginUser(form);
    setResponse(data);
    if (data.status === "success") {
      navigate("/dashboard");
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
  };

  console.log(response);
  return (
    <Layout>
      <Form className="login-page" onSubmit={handleOnSubmit}>
        <h2>Welcome Back! Login</h2>
        <hr />
        {response.status === "error" && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        {inputFields.map((item) => (
          <CustomeInput {...item} onChange={handleOnChange} />
        ))}

        <Button variant="primary" type="submit">
          Login
        </Button>

        <div className="text-end">
          New here? <Link to="/register"> register </Link>
        </div>
      </Form>
    </Layout>
  );
};
