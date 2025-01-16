import axios from 'axios';
import React, { useEffect } from 'react';

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;

  async function getDogFacts() {
    try {
      const response = await axios.get('/api/f17b68a4-89fb-4464-ba05-62208c5bda10.jpg');
      console.log(response.data); // 假设API返回JSON格式的数据，这里打印所有狗的事实
    } catch (error: any) {
      console.error('获取数据时出错：', error.response ? error.response.data : error.message);
    }
  }
  useEffect(() => {
    getDogFacts();
  }, []);

  return (
    <div className="app">
      <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
