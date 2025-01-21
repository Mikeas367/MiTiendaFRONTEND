import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import saleService from "../../services/SaleService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./reportscss.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueByProductChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saleService
      .getRevenueByProduct()
      .then((response) => {
        const data = response.data || [];
        if (data.length > 0) {
          setChartData({
            labels: data.map((item) => ` ${item.productName}`),
            datasets: [
              {
                label: "Ingresos Generados ($)",
                data: data.map((item) => item.totalRevenue),
                backgroundColor: data.map(
                  (_, i) =>
                    `rgba(${75 + i * 10}, ${192 - i * 5}, ${192 + i * 10}, 0.8)`
                ),
                borderColor: data.map(
                  (_, i) =>
                    `rgba(${75 + i * 10}, ${192 - i * 5}, ${192 + i * 10}, 1)`
                ),
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
              },
            ],
          });
        } else {
          console.warn("No se encontraron ingresos por producto");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Ingresos por Producto</h2>
      {loading ? (
        <p className="loading-text">Cargando datos...</p>
      ) : chartData.labels.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    family: "Arial, sans-serif",
                  },
                  color: "#333",
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: $${context.raw.toFixed(2)}`,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12,
                    family: "Arial, sans-serif",
                  },
                  color: "#555",
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 12,
                    family: "Arial, sans-serif",
                  },
                  color: "#555",
                  callback: (value) => `$${value}`,
                },
                title: {
                  display: true,
                  text: "Ingresos ($)",
                  font: {
                    size: 14,
                    family: "Arial, sans-serif",
                  },
                  color: "#333",
                },
              },
            },
          }}
        />
      ) : (
        <p className="no-data-text">No hay datos disponibles para mostrar</p>
      )}
    </div>
  );
};

export default RevenueByProductChart;
