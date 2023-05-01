import React, { useEffect, useState } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, PieChart, Pie, Legend } from 'recharts';

const Statistics = () => {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch('/statistics/area')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch('/statistics/pie')
      .then((response) => response.json())
      .then((data) => setPieData(data));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Movie View Counts by Month</h1>
      <div className="row">
        <div className="col-lg-8">
          <AreaChart width={800} height={400} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="viewCount" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </div>
        <div className="col-lg-4">
          <h3>3 Longest Movies</h3>
          <ul className="list-group">
            {pieData.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.title}
                <span className="badge bg-primary rounded-pill">{item.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="mt-5 mb-4">3 Longest Movies</h1>
          <PieChart width={800} height={400}>
            <Pie
              data={pieData}
              dataKey="duration"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
