import React from "react";
import { Table, Tabs } from "antd";

// סוגי עמודות
interface InsuranceData {
  id: string;
  mainBranch: string;
  subBranch: string;
  productType: string;
  company: string;
  insurancePeriod: string;
  additionalDetails: string;
  premium: string;
  premiumType: string;
  policyNumber: string;
  planClassification: string;
}

function InsuranceTable(props: { data: any[] }) {
  // עיבוד הנתונים
  const dataSource: InsuranceData[] = props.data
    .filter((item) => item[0] && item[0].trim() !== "")
    .map((item, index) => ({
      id: item[0],
      mainBranch: item[1],
      subBranch: item[2],
      productType: item[3],
      company: item[4],
      insurancePeriod: item[5],
      additionalDetails: item[6],
      premium: item[7],
      premiumType: item[8],
      policyNumber: item[9],
      planClassification: item[10],
    }));

  // הגדרת עמודות
  const columns = [
    { title: "תעודת זהות", dataIndex: "id", key: "id" },
    { title: "ענף ראשי", dataIndex: "mainBranch", key: "mainBranch" },
    { title: "ענף משני", dataIndex: "subBranch", key: "subBranch" },
    { title: "סוג מוצר", dataIndex: "productType", key: "productType" },
    { title: "חברה", dataIndex: "company", key: "company" },
    {
      title: "תקופת ביטוח",
      dataIndex: "insurancePeriod",
      key: "insurancePeriod",
    },
    {
      title: "פרטים נוספים",
      dataIndex: "additionalDetails",
      key: "additionalDetails",
    },
    { title: 'פרמיה בש"ח', dataIndex: "premium", key: "premium" },
    { title: "סוג פרמיה", dataIndex: "premiumType", key: "premiumType" },
    { title: "מספר פוליסה", dataIndex: "policyNumber", key: "policyNumber" },
    {
      title: "סיווג תוכנית",
      dataIndex: "planClassification",
      key: "planClassification",
    },
  ];

  // קיבוץ לפי ענף ראשי
  const groupedData = dataSource.reduce((acc, item) => {
    acc[item.mainBranch] = acc[item.mainBranch] || [];
    acc[item.mainBranch].push(item);
    return acc;
  }, {} as Record<string, InsuranceData[]>);
  return (
    <Tabs
      hideAdd
      type="card"
      defaultActiveKey="1"
      style={{ marginTop: "50px" }}
    >
      {Object.keys(groupedData).map((branch, index) => (
        <Tabs.TabPane
          tab={branch + " (" + groupedData[branch].length + ")"}
          key={index.toString()}
        >
          <Table
            dataSource={groupedData[branch]}
            columns={columns}
            rowKey="policyNumber"
            pagination={{ pageSize: 10 }}
          />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

export default InsuranceTable;
