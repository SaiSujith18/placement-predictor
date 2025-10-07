import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { name: "1 Star", rating: 12 },
  { name: "2 Stars", rating: 8 },
  { name: "3 Stars", rating: 20 },
  { name: "4 Stars", rating: 35 },
  { name: "5 Stars", rating: 50 }
];

export default function AdminAnalytics() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>
        App Ratings Overview
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rating" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
