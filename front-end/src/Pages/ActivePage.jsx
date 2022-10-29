import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Table, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TableHistoryTrade } from "../components/TableHistoryTrade";

export const ActivePage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const Bot_Type = params?.botType;

  useEffect(() => {
    if (Bot_Type !== "1") {
      navigate("/bot");
    }
  }, []);

  return (
    <>
      <Header />
      <Container fluid="md">
        <div className="bg-light bg-opacity-25">
          <div className="fs-1 mt-2">Table Active</div>
          <div className="mt-1 linetext mb-3 text-muted" />
          <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="">
                <td className="table-primary">Time</td>
                <td className="table-secondary">Side</td>
                <td className="table-primary">Amount,Sym</td>
                <td className="table-secondary">Price Buy</td>
                <td className="table-primary">Price Sell</td>
                <td className="table-secondary">Profit,BTH</td>
                <td className="table-primary">Total</td>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
