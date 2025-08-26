'use client';

import { useEffect, useRef } from 'react';

export default function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sample data - in a real app, this would come from your API
    const data = [
      { date: 'Jan', sales: 1200 },
      { date: 'Feb', sales: 1900 },
      { date: 'Mar', sales: 1500 },
      { date: 'Apr', sales: 2200 },
      { date: 'May', sales: 2800 },
      { date: 'Jun', sales: 3200 },
    ];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values
    const maxSales = Math.max(...data.map(d => d.sales));
    const minSales = Math.min(...data.map(d => d.sales));

    // Calculate scales
    const xScale = (width - 2 * padding) / (data.length - 1);
    const yScale = (height - 2 * padding) / (maxSales - minSales);

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * xScale;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (i * (height - 2 * padding)) / gridLines;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, i) => {
      const x = padding + i * xScale;
      const y = height - padding - (point.sales - minSales) * yScale;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#3b82f6';
    data.forEach((point, i) => {
      const x = padding + i * xScale;
      const y = height - padding - (point.sales - minSales) * yScale;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    data.forEach((point, i) => {
      const x = padding + i * xScale;
      const y = height - padding + 20;
      ctx.fillText(point.date, x, y);
    });

    // Draw y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (i * (height - 2 * padding)) / gridLines;
      const value = maxSales - (i * (maxSales - minSales)) / gridLines;
      ctx.fillText(`$${value.toFixed(0)}`, padding - 10, y + 4);
    }

  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
