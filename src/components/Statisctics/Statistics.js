import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SellerAnalyticsChart = () => {
  const [checkboxState, setCheckboxState] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  const toggleCheckbox = (name) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 500, 400, 600, 350, 700, 650], // Sample data
        borderColor: (ctx) => {
          const dataset = ctx.chart.data.datasets[0];
          return dataset.data.map((value, index) => {
            const prevValue = dataset.data[index - 1] || value;
            return value > prevValue ? 'red' : 'blue';
          });
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Товары: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Аналитика отправленных товаров
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox1"
              checked={checkboxState.checkbox1}
              onChange={() => toggleCheckbox('checkbox1')}
            />
            <span className="checkbox-label">Показать детали</span>
          </div>
        </label>
        <label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox2"
              checked={checkboxState.checkbox2}
              onChange={() => toggleCheckbox('checkbox2')}
            />
            <span className="checkbox-label">Уведомления</span>
          </div>
        </label>
      </div>

      <div
        style={{
          maxHeight: checkboxState.checkbox1 ? '200px' : '0px',
          opacity: checkboxState.checkbox1 ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease, opacity 0.5s ease',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: checkboxState.checkbox1 ? '20px' : '0px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Детальная информация</h3>
        <p>В этом месяце было отправлено 650 товаров. Общая выручка составила 120,000 рублей.</p>
        <p>Самый успешный месяц: июнь с 700 отправлениями.</p>
      </div>

      <Line data={data} options={options} />
      <style>
        {`
          .checkbox-container {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }
          .checkbox-container input[type="checkbox"] {
            width: 24px;
            height: 24px;
            appearance: none;
            border: none;
            border-radius: 4px;
            background-color: #ccc;
            position: relative;
            outline: none;
            transition: background-color 0.3s, transform 0.3s;
          }
          .checkbox-container input[type="checkbox"]:checked {
            background-color: rgb(76, 78, 175);
          }
          .checkbox-container input[type="checkbox"]:checked::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 2px;
            transform: scale(1);
            transition: transform 0.2s;
          }
          .checkbox-container input[type="checkbox"]:not(:checked)::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 16px;
            height: 16px;
            background-color: transparent;
            border-radius: 2px;
            transform: scale(0);
            transition: transform 0.2s;
          }
          .checkbox-container input[type="checkbox"]:checked + .checkbox-label {
            font-weight: bold;
            color: #333;
          }
          .checkbox-container input[type="checkbox"]:hover {
            background-color: rgb(76, 78, 175);
            transform: scale(1.05);
          }
          .checkbox-label {
            font-size: 14px;
            color: #333;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default SellerAnalyticsChart;
