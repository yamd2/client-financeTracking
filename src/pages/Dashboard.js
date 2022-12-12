import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TransForm } from "../components/form/TransForm";
import { Layout } from "../components/layout/Layout";
import { TransTable } from "../components/table/TransTable";
import { fetchTrans } from "../utils/axiosHelper";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    getTrans();

    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    !user && Navigate("/");
  }, []);

  const getTrans = async () => {
    const { trans } = (await fetchTrans()) || [];

    setTrans(trans);
  };

  return (
    <Layout>
      <div className="form">
        <TransForm getTrans={getTrans} />
      </div>
      <div className="table">
        {trans.length} transactions found!
        <TransTable trans={trans} getTrans={getTrans} />
      </div>
    </Layout>
  );
};

export default Dashboard;
