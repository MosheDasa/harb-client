import React from "react";

import { Table } from "antd";

const columns = [
  {
    title: "תעודת זהות",

    dataIndex: "תעודת זהות",

    key: "id",
  },

  {
    title: "ענף ראשי",

    dataIndex: "ענף ראשי",

    key: "mainBranch",
  },

  {
    title: "ענף משני",

    dataIndex: "ענף משני",

    key: "subBranch",
  },

  {
    title: "סוג מוצר",

    dataIndex: "סוג מוצר",

    key: "productType",
  },

  {
    title: "חברה",

    dataIndex: "חברה",

    key: "company",
  },

  {
    title: "תקופת ביטוח",

    dataIndex: "תקופת ביטוח",

    key: "insurancePeriod",
  },

  {
    title: "פרטים נוספים",

    dataIndex: "פרטים נוספים",

    key: "additionalDetails",
  },

  {
    title: 'פרמיה בש"ח',

    dataIndex: 'פרמיה בש"ח',

    key: "premium",
  },

  {
    title: "סוג פרמיה",

    dataIndex: "סוג פרמיה",

    key: "premiumType",
  },

  {
    title: "מספר פוליסה",

    dataIndex: "מספר פוליסה",

    key: "policyNumber",
  },

  {
    title: "סיווג תוכנית",

    dataIndex: "סיווג תוכנית",

    key: "planClassification",
  },
];

function ExcelTable(props: { data: any[]; key: number }) {
  const mainBranches = Array.from(
    new Set(props.data.map((item: any) => item["ענף ראשי"]))
  );

  const title = `${mainBranches.join(", ")} `;

  return (
    <Table
      key={props.key}
      title={() => (
        <h1>
          {title} - ({props.data.length})
        </h1>
      )}
      columns={columns}
      dataSource={props.data}
      rowKey={(record) =>
        `${record["תעודת זהות"]}-${record["מספר פוליסה"]}-${record['פרמיה בש"ח']}`
      }
      pagination={{ pageSize: 3 }}
    />
  );
}

export default ExcelTable;
