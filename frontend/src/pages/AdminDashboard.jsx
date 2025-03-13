import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';

const AdminDashboard = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Products" component={Link} to="/admin/products" />
          <Tab label="Orders" component={Link} to="/admin/orders" />
          <Tab label="Users" component={Link} to="/admin/users" />
        </Tabs>
      </Paper>

      <Box>
        <Routes>
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="*" element={<AdminProducts />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 