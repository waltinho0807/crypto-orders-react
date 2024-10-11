// src/OrdersTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, Typography
} from '@mui/material';

const OrdersTable = ({ setSymbol }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10); // Número de ordens por página

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                setOrders(response.data);
            } catch (err) {
                setError('Erro ao buscar ordens');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Paper>
            <Typography variant="h6" component="h2" style={{ padding: 16 }}>
                Ordens de Compra e Venda
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID da Ordem</TableCell>
                            <TableCell>Simbolo</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.symbol}</TableCell>
                                <TableCell>{order.type}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.amount}</TableCell>
                                <TableCell>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
};

export default OrdersTable;
