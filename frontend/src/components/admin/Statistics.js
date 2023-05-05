import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, PieChart, Pie, Legend } from 'recharts';

const Statistics = () => {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  //const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchArea = async () => {
      const res = await axios.get('http://localhost:5000/api/statistics/area');
      setData(res.data);
    };
    const fetchPie = async () => {
      const res = await axios.get('http://localhost:5000/api/statistics/pie');
      setPieData(res.data);
    };
    const fetchDonut = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/statistics/donut"
      );
      setData(res.data);
    };
    // const fetchGenreNames = async () => {
    //   const res = await axios.get("http://localhost:5000/api/movies/genre");
    //   const genreNames = res.data.map((genre) => genre.name);
    //   setLabels(genreNames);
    // };
    fetchArea();
    fetchPie();
    fetchDonut();
    //fetchGenreNames();
  }, []);

  // const chartData = {
  //   labels: [],
  //   datasets: [
  //     {
  //       data: data,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.6)",
  //         "rgba(54, 162, 235, 0.6)",
  //         "rgba(255, 206, 86, 0.6)",
  //         "rgba(75, 192, 192, 0.6)",
  //         "rgba(153, 102, 255, 0.6)",
  //         "rgba(255, 159, 64, 0.6)",
  //         "rgba(255, 99, 132, 0.6)",
  //         "rgba(54, 162, 235, 0.6)",
  //         "rgba(255, 206, 86, 0.6)",
  //         "rgba(75, 192, 192, 0.6)",
  //         "rgba(153, 102, 255, 0.6)",
  //         "rgba(255, 159, 64, 0.6)",
  //       ],
  //     },
  //   ],
  // };

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Movie View Counts by Month</h6>
            </div>
            <div class="card-body">
              <div class="chart-area">
                <AreaChart width={600} height={400} data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="viewCount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">The 3 Movies with the longest duration</h6>
            </div>
            <div class="card-body">
              <div class="chart-pie pt-4">
                <PieChart width={600} height={375}>
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
        </div>

        {/* <div>
          <Pie data={chartData} />
        </div> */}

        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Summary</h6>
            </div>
            <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default Statistics;
