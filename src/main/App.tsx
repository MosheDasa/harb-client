import "./App.css";

import { useState } from "react";
import { Layout, Tabs } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Card } from "antd";
import HarbPage from "../pages/herb-page";
import LogPage from "../pages/log-page";

const tabsTestData = [
  {
    label: "הר הביטוח",

    key: "0",

    children: <HarbPage />,
  },

  {
    label: "לוגים",

    key: "1",

    children: <LogPage />,
  },
];

const { Content } = Layout;

function App() {
  const [defaultActiveKey, setDefaultActiveKey] = useState<string>("לוגים");

  return (
    <Layout>
      <BrowserRouter>
        <Content
          style={{
            display: "flex",

            minHeight: "85vh",
          }}
        >
          <Card
            style={{
              width: "100%",

              minHeight: "80vh",

              margin: "0 10px",
            }}
          >
            <Tabs
              onChange={(x) => {
                setDefaultActiveKey(x);
              }}
              type="card"
              defaultActiveKey={defaultActiveKey}
              items={tabsTestData}
            />
          </Card>
        </Content>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
