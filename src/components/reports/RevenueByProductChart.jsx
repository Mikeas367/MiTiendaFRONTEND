import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import saleService from "../../services/SaleService";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./reportscss.css"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueByProductChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    saleService.getRevenueByProduct()
      .then(response => {
        const data = response.data || [];
        if (data.length > 0) {
          setChartData({
            labels: data.map(item => ` ${item.productName}`),
            datasets: [
              {
                label: "Ingresos Generados $",
                data: data.map(item => item.totalRevenue),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        } else {
          console.warn("No se encontraron ingresos por producto");
        }
      })
      .catch(error => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2>Ingresos por Producto</h2>
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No hay datos disponibles para mostrar</p>
      )}
    </div>
  );
};

export default RevenueByProductChart;
