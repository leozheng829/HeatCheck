import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "@emotion/styled";

const Container = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 20px 0;
  border: 1px solid var(--border);
  classname: glass-card;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
`;

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid var(--border);
  background: var(--surface);
  font-size: 1rem;
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;

  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  option {
    background: var(--surface);
    color: var(--text);
  }
`;

const AverageContainer = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--border);
`;

const AverageValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
`;

const AverageLabel = styled.span`
  color: var(--text-secondary);
  margin-left: 8px;
`;

const CustomTooltip = styled.div`
  background: rgba(30, 41, 59, 1);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const StatsVisualization = ({ statsData }) => {
  const [selectedStat, setSelectedStat] = useState("points");

  const chartData = useMemo(() => {
    if (!statsData || !statsData[selectedStat]) return [];

    return statsData[selectedStat]
      .slice()
      .reverse()
      .map((value, index) => ({
        game: `Game ${index + 1}`,
        value: value,
      }));
  }, [statsData, selectedStat]);

  const average = useMemo(() => {
    if (!statsData || !statsData[selectedStat]) return 0;
    const values = statsData[selectedStat];
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  }, [statsData, selectedStat]);

  const statOptions = useMemo(() => {
    if (!statsData) return [];
    return Object.keys(statsData).map((stat) => ({
      value: stat,
      label: stat
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));
  }, [statsData]);

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <p style={{ margin: 0, color: "var(--text)" }}>{label}</p>
          <p
            style={{
              margin: "4px 0 0 0",
              color: "var(--primary)",
              fontWeight: "bold",
            }}
          >
            {payload[0].value}
          </p>
        </CustomTooltip>
      );
    }
    return null;
  };

  if (!statsData) return null;

  return (
    <Container className="glass-card">
      <Header>
        <Title>Performance Analysis</Title>
        <Select
          value={selectedStat}
          onChange={(e) => setSelectedStat(e.target.value)}
        >
          {statOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Header>

      <div
        style={{
          width: "100%",
          height: 400,
          background: "rgba(30,41,59,0.95)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis
              dataKey="game"
              stroke="var(--text-secondary)"
              tick={{ fill: "var(--text-secondary)" }}
            />
            <YAxis
              stroke="var(--text-secondary)"
              tick={{ fill: "var(--text-secondary)" }}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <AverageContainer
        style={{
          background: "rgba(30,41,59,0.9)",
          border: "1px solid var(--card-border)",
        }}
      >
        <AverageValue>{average}</AverageValue>
        <AverageLabel
          style={{ color: "var(--text-secondary)", background: "none" }}
        >
          Average {statOptions.find((opt) => opt.value === selectedStat)?.label}
        </AverageLabel>
      </AverageContainer>
    </Container>
  );
};

export default StatsVisualization;
