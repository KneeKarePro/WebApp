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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './UserProfile.css';
import accountIcon from '../assets/account_icon.png';

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [timeFrame, setTimeFrame] = useState('24h'); // State to track selected time frame
  const [error, setError] = useState(null);
  const username = 'testuser'; // Replace with the actual username

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/data/${username}`);
        if (response.ok) {
          const result = await response.json();
          setData(Array.isArray(result) ? result : []);
        } else {
          setError(`Error: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoadingData(false);
      }
    };

    // Fetch user stats
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:8000/data/stats/${username}`);
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

  if (loadingData) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data available</div>;

  // Prepare chart data with null check
  const chartData = data?.map(item => ({
    time: new Date(item.timestamp).toLocaleDateString('en-US') + ' ' + new Date(item.timestamp).toLocaleTimeString(),
    angle: item.angle,
    rotation: item.rotation,
  })) || [];

  return (
    <Container maxWidth="lg" className="user-profile-container">
      {/* Header Section */}
      <div className="user-profile-header">
        <Typography variant="h4" className="user-profile-title">
          Patient Profile
        </Typography>
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
            {/* Data Records Section */}
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

            {/* Statistics Section */}
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
                              Min: {stats[param].min.toFixed(2)}</Typography>
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

            {/* Chart with Time Frame Selector */}
            <Grid item xs={12}>
              <Paper elevation={3} className="user-profile-paper user-profile-chart">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" className="user-profile-subtitle">
                    Analytics
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel className="user-profile-select-label">Time Frame</InputLabel>
                    <Select
                      value={timeFrame}
                      onChange={(e) => setTimeFrame(e.target.value)}
                      label="Time Frame"
                      className="user-profile-select"
                    >
                      <MenuItem value="24h">Last 24 Hours</MenuItem>
                      <MenuItem value="48h">Last 48 Hours</MenuItem>
                      <MenuItem value="1w">Last Week</MenuItem>
                      <MenuItem value="1m">Last Month</MenuItem>
                      <MenuItem value="1y">Last Year</MenuItem>
                      <MenuItem value="all">All Time</MenuItem>
                    </Select>
                  </FormControl>
                </div>
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
                  <Typography>No data available for the selected time frame</Typography>
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
