import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import saleService from "../../services/SaleService";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import "./reportscss.css"; // Importa el archivo CSS

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const TopSellingProductsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    saleService.getTopSellingProducts()
      .then(response => {
        const data = response.data || [];
        if (data.length > 0) {
          setChartData({
            labels: data.map(item => `${item.productName}`),
            datasets: [
              {
                label: "Cantidad Vendida",
                data: data.map(item => item.totalQuantity),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          });
        } else {
          console.warn("No se encontraron productos más vendidos");
        }
      })
      .catch(error => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2>Productos más vendidos</h2>
      {chartData.labels.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>No hay datos disponibles para mostrar</p>
      )}
    </div>
  );
};

export default TopSellingProductsChart;
