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

const Statistics2 = () => {
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

  const dataAlternate = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Alternate Sales',
        data: [400, 450, 500, 550, 500, 600, 700], // Sample alternate data
        borderColor: (ctx) => {
          const dataset = ctx.chart.data.datasets[0];
          return dataset.data.map((value, index) => {
            const prevValue = dataset.data[index - 1] || value;
            return value > prevValue ? 'blue' : 'red';
          });
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        tension: 0.6, // Adjusted the curve tension
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
        Аналитика количества принятых товаров
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
          maxHeight: checkboxState.checkbox1 ? '300px' : '0',
          opacity: checkboxState.checkbox1 ? '1' : '0',
          overflow: 'hidden',
          backgroundColor: '#f9f9f9',
          border: checkboxState.checkbox1 ? '1px solid #ddd' : 'none',
          borderRadius: '8px',
          padding: checkboxState.checkbox1 ? '20px' : '0 20px',
          marginBottom: checkboxState.checkbox1 ? '20px' : '0',
          transition: 'all 0.3s ease',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Детальная информация</h3>
        <p>За последние 7 месяцев было принято 700 товаров. Среднее количество принятых товаров в месяц составляет 550.</p>
        <p>Самый активный месяц: июль с 700 принятыми товарами.</p>
      </div>

      <Line data={dataAlternate} options={options} />
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
            border-radius: 50%;
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
            border-radius: 50%;
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
            border-radius: 50%;
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

export default Statistics2;
