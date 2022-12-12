import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />

      <Container className="mt-5" style={{ minHeight: "73vh" }}>
        {children}
      </Container>

      <footer className="text-center bg-dark text-light p-5 mt-5">
        &copy; all right resrved 2022 || Made with fun by ME
      </footer>
    </div>
  );
};
