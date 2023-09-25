import React from "react";

const BloodyDetailComponent = () => {
  const bloodyHeadList = [
    "日期(DATE)",
    "收縮壓(SYS)",
    "舒張壓(DIA)",
    "心跳(PUL)",
  ];

  const bloodyDetailList = [];

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {bloodyHeadList.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr>
        <tr>
          <td>Mary</td>
          <td>Moe</td>
          <td>mary@example.com</td>
        </tr>
        <tr>
          <td>July</td>
          <td>Dooley</td>
          <td>july@example.com</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BloodyDetailComponent;
