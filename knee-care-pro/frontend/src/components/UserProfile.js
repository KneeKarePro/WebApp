import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './UserProfile.css';
import accountIcon from '../assets/account_icon.png'; // Ensure the account icon image is imported correctly

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const username = 'testuser'; // Replace with the actual username

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/data/${username}`);
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
          setLoadingData(false);
        } else {
          console.error('Error fetching data:', response.statusText);
          setLoadingData(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingData(false);
      }
    };

    // Fetch user stats
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/data/stats/${username}`);
        if (response.ok) {
          const result = await response.json();
          setStats(result.stats);
          setLoadingStats(false);
        } else {
          console.error('Error fetching stats:', response.statusText);
          setLoadingStats(false);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoadingStats(false);
      }
    };

    fetchData();
    fetchStats();
  }, [username]);

  // Prepare data for the chart (last 24 hours)
  const chartData = data
    .filter(item => {
      const itemDate = new Date(item.timestamp);
      const now = new Date();
      return now - itemDate <= 24 * 60 * 60 * 1000; // Last 24 hours
    })
    .map(item => ({
      time: new Date(item.timestamp).toLocaleTimeString(),
      angle: item.angle,
      rotation: item.rotation,
    }));

  return (
    <Container maxWidth="lg" className="user-profile-container">
      {/* Updated Title Section */}
      <div className="user-profile-header">
        <Typography variant="h4" className="user-profile-title">
          Patient Profile
        </Typography>

        {/* Account icon and username on the right */}
        <div className="account-info">
          <img src={accountIcon} alt="Account Icon" className="account-icon" />
          <Typography variant="body1" className="account-username">{username}</Typography>
        </div>
      </div>

      {loadingData || loadingStats ? (
        <div className="user-profile-loading">
          <CircularProgress />
          <Typography className="user-profile-loading-text">Loading data...</Typography>
        </div>
      ) : (
        <>
          <Grid container spacing={4}>
            {/* Data Table */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="user-profile-paper">
                <Typography variant="h6" className="user-profile-subtitle">
                  Data Records
                </Typography>
                {data.length > 0 ? (
                  <div className="user-profile-table-wrapper">
                    <Table size="small" className="user-profile-table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell align="left">Angle</TableCell>
                          <TableCell align="left">Rotation</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                            <TableCell align="left">{item.angle.toFixed(2)}</TableCell>
                            <TableCell align="left">{item.rotation.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Paper>
            </Grid>

            {/* Statistics */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="user-profile-paper">
                <Typography variant="h6" className="user-profile-subtitle">
                  Statistics
                </Typography>
                {stats ? (
                  <Grid container spacing={2}>
                    {['angle', 'rotation'].map(param => (
                      <Grid item xs={12} key={param}>
                        <Card variant="outlined" className="user-profile-card">
                          <CardContent className="user-profile-card-content">
                            <Typography className="user-profile-card-title">
                              {param.toUpperCase()}
                            </Typography>
                            <Typography className="user-profile-card-text">
                              Mean: {stats[param].mean.toFixed(2)}
                            </Typography>
                            <Typography className="user-profile-card-text">
                              Std Dev: {stats[param].std.toFixed(2)}
                            </Typography>
                            <Typography className="user-profile-card-text">
                              Min: {stats[param].min.toFixed(2)}
                            </Typography>
                            <Typography className="user-profile-card-text">
                              Max: {stats[param].max.toFixed(2)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography>No statistics available</Typography>
                )}
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12}>
              <Paper elevation={3} className="user-profile-paper user-profile-chart">
                <Typography variant="h6" className="user-profile-subtitle">
                  Last 24 Hour Data
                </Typography>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="angle" stroke="#8884d8" />
                      <Line type="monotone" dataKey="rotation" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography>No data available for the last 24 hours</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default UserProfile;
