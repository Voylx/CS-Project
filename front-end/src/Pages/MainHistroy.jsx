import React from "react";
import { Header } from "../components/Header";
import { Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TableHistoryTrade } from "../components/TableHistoryTrade";

export const MainHistroy = () => {
  return (
    <>
      <Header />
      <Container fluid="md">
        <div className="bg-light bg-opacity-25">
          <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="">
                <td className="table-primary">Date</td>
                <td className="table-secondary">Time</td>
                <td className="table-primary">Side</td>
                <td className="table-secondary">Amount</td>
                <td className="table-primary">Symbol</td>
              </tr>
            </thead>
            <tbody>
              {/* {history.length > 0 ? (
            history.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{unixDay(v.Timestamp)}</td>
                  <td>{unixTime(v.Timestamp)}</td>
                  <td
                    className={
                      v.Side === "BUY" ? "text-success" : "text-danger"
                    }
                  >
                    {v.Side}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td> - </td>
              <td> - </td>
              <td> - </td>
            </tr>
          )} */}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
