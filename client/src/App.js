import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Api from "./Api";

const { Header, Content } = Layout;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Api.getAverages().then((data) => setData(data));
  }, [data]);

  return (
    <div className="App">
      <Layout>
        <Header>header</Header>
        <Content>
          <pre>{JSON.stringify(data)}</pre>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
