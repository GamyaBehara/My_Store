import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import {
  fetchOrders,
  updateOrderToDelivered,
} from '../../features/orders/orderSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDeliver = (id) => {
    dispatch(updateOrderToDelivered(id));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>USER</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>TOTAL</TableCell>
            <TableCell>PAID</TableCell>
            <TableCell>DELIVERED</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.user?.name}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  new Date(order.paidAt).toLocaleDateString()
                ) : (
                  <Typography color="error">Not Paid</Typography>
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered ? (
                  new Date(order.deliveredAt).toLocaleDateString()
                ) : (
                  <Typography color="error">Not Delivered</Typography>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  disabled={!order.isPaid || order.isDelivered}
                  onClick={() => handleDeliver(order._id)}
                >
                  Mark as Delivered
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminOrders; 