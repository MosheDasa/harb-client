import React, { useRef, useState } from "react";

import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Row,
  Col,
  Card,
  Spin,
} from "antd";

import dayjs from "dayjs";

import ExcelTable from "../components/excel-table/excel-table";

const { Item } = Form;

const MyForm: React.FC = () => {
  const [form] = Form.useForm();

  const [excelData, setExcelData] = useState<any>();

  const [loading, setLoading] = useState(false);

  const [executionTime, setExecutionTime] = useState("00:00");

  const startTimeRef = useRef<number | null>(null);

  const intervalRef = useRef<any | null>(null);

  const [selectedUserName, setSelectedUserName] = useState<any>();

  const [users] = useState<
    { name: string; issueDate: string; birtDate: string; id: string }[]
  >([
    {
      id: "306955741",

      birtDate: "1987-01-01",

      issueDate: "2023-10-01",

      name: "משה",
    },

    {
      id: "311533509",

      birtDate: "1993-08-12",

      issueDate: "2023-09-28",

      name: "עדן",
    },

    {
      id: "039128186",

      birtDate: "1983-03-14",

      issueDate: "2022-08-09",

      name: "אבישי",
    },
  ]);

  const startMethod = () => {
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(updateTime, 1000);
  };

  const stopMethod = () => {
    clearInterval(intervalRef.current);
  };

  const updateTime = () => {
    if (startTimeRef && startTimeRef.current) {
      const elapsedTime = Date.now() - startTimeRef.current;

      setExecutionTime(formatTime(elapsedTime / 1000));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,

      "0"
    )}`;
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      setExcelData(null);

      startMethod();

      const aa: {
        id: string;

        bod: string;

        iis: string;

        userid: number;
      } = {
        userid: 1212,

        id: values.idField,

        bod: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : "",

        iis: values.birthDate ? values.idIssueDate.format("YYYY-MM-DD") : "",
      };

      const response = await fetch(
        "http://localhost:3002/api/userdata",
        //"http://localhost:2020/api/test/postexcel",
        {
          // החלף בכתובת ה-API שלך
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(aa),
        }
      );

      const result = await response.json();

      setExcelData(result.data);

      setLoading(false);

      stopMethod();
    } catch (error) {
      setLoading(false);

      stopMethod();

      console.error("Error posting data:", error);
    }
  };

  const handleGetUser = (user: any) => {
    setSelectedUserName(user.name);

    form.setFieldsValue({
      idField: user.id,

      birthDate: dayjs(user.birtDate),

      idIssueDate: dayjs(user.issueDate),

      nameField: user.name,
    });
  };

  const hendlerLogin = async () => {
    setLoading(true);

    startMethod();

    fetch("http://localhost:3001/api/login")
      .then((res) => res.json())

      .then(
        (result) => {
          setLoading(false);

          stopMethod();

          console.error("Error fetching data: 1", result);
        },

        (error) => {
          setLoading(false);

          stopMethod();

          console.error("Error fetching data:", error);
        }
      );
  };

  return (
    <>
      <Button type="link" onClick={hendlerLogin}>
        LOGIN
      </Button>

      <div
        style={{
          direction: "rtl",

          display: "flex",

          height: "80vh",

          marginRight: "50px",
        }}
      >
        <Form form={form} onFinish={onFinish} style={{ width: "300px" }}>
          <>
            <div style={{ marginBottom: "10px" }}>
              {executionTime && (
                <span style={{ color: "green" }}>
                  זמן ריצה : {executionTime}
                </span>
              )}
            </div>

            {users.map((user, index) => (
              <Button
                key={user.id}
                style={{
                  marginRight: index === 0 ? "0" : "10px",

                  marginBottom: "20px",
                }}
                type="primary"
                onClick={() => handleGetUser(user)}
              >
                {user.name}
              </Button>
            ))}
          </>

          <Row gutter={[11, 0]}>
            <Col span={24}>
              <Item label="שם" name="nameField">
                <Input disabled value={"dasa"} />
              </Item>

              <Item label="ת.ז" name="idField">
                <Input />
              </Item>
            </Col>

            <Col span={24}>
              <Item label="תאריך לידה" name="birthDate">
                <DatePicker style={{ width: "100%" }} />
              </Item>
            </Col>

            <Col span={24}>
              <Item label="תאריך הנפקת" name="idIssueDate">
                <DatePicker style={{ width: "100%" }} />
              </Item>
            </Col>

            <Col span={24}>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  שלח
                </Button>
              </Item>
            </Col>
          </Row>
        </Form>

        <div style={{ marginRight: "120px", direction: "rtl" }}>
          {!loading && excelData && selectedUserName && (
            <h1> הפרטים של {selectedUserName} </h1>
          )}

          {loading ? (
            <Spin size="large" />
          ) : excelData ? (
            Object.keys(excelData).map((sheetName, index) => {
              const sheetData = excelData[sheetName];

              if (sheetData.length > 0) {
                return (
                  <div
                    key={sheetName}
                    style={{
                      border: "2px solid blue",

                      padding: "10px",

                      margin: "10px 0",
                    }}
                  >
                    <ExcelTable key={index} data={sheetData} />
                  </div>
                );
              }

              return null;
            })
          ) : (
            <p>אין מידע להציג</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyForm;
