// src/components/UpdateApiKeyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box } from '@mui/material';


const UpdateApiKeyForm = () => {
    const [symbol, setSymbol] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [usdtAmount, setUsdtAmount] = useState(0);

    // Carregar os dados existentes quando o componente monta
    useEffect(() => {
        const fetchApiKey = async () => {
            const response = await axios.get(`${process.env.BASE_URL}/get-api-key` || 'http://localhost:5000/api/get-api-key'); // Rota para obter os dados existentes
            const { symbol, timeframe, usdtAmount } = response.data;
            setSymbol(symbol);
            setTimeframe(timeframe);
            setUsdtAmount(usdtAmount);
        };

        fetchApiKey();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${process.env.BASE_URL}/get-api-key` || 'http://localhost:5000/api/update-api-key', {
                symbol,
                timeframe,
                usdtAmount,
            });
            alert('Parâmetros atualizados com sucesso!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar os parâmetros.');
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Atualizar API Key</h2>
            <form onSubmit={handleSubmit}>
                <Box mb={2}> {/* Margem abaixo do campo */}
                    <TextField
                        label="Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}> {/* Margem abaixo do campo */}
                    <TextField
                        label="Timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}> {/* Margem abaixo do campo */}
                    <TextField
                        label="USDT Amount"
                        type="number"
                        value={usdtAmount}
                        onChange={(e) => setUsdtAmount(Number(e.target.value))}
                        fullWidth
                        required
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Atualizar
                </Button>
            </form>
        </Container>
    );
};

export default UpdateApiKeyForm;
