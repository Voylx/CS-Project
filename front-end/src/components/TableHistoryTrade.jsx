import React, { useState } from "react";

import { Table } from "react-bootstrap";
export const TableHistoryTrade = ({ history }) => {
  function unixTime(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        ("0" + u.getHours()).slice(-2) +
        ":" +
        ("0" + u.getMinutes()).slice(-2) +
        ":" +
        ("0" + u.getSeconds()).slice(-2)
      );
    }
  }
  function unixDay(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + (u.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + u.getDate()).slice(-2)
      );
    }
  }
  return (
    <div>
      <div className="mt-4 linetext mb-2 text-muted">
        &ensp; ประวัติการแจ้งเตือนของบอทเทรด &ensp;
      </div>
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
          {history.length > 0 ? (
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
          )}
        </tbody>
      </Table>
    </div>
  );
};
