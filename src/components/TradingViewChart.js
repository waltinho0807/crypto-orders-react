// src/components/TradingViewChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TradingViewChart = () => {
    const [symbol, setSymbol] = useState('BINANCE:BTCUSDT'); // Símbolo padrão
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get(`${process.env.BASE_URL}/get-api-key`  || 'http://localhost:5000/api/get-api-key');
                const { symbol } = response.data;
                setSymbol(symbol ? `BINANCE:${symbol.replace('/', '')}` : 'BINANCE:BTCUSDT');
            } catch (error) {
                console.error('Erro ao buscar API Key:', error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchApiKey();
    }, []);

    useEffect(() => {
        if (!loading) { // Verifica se não está carregando
            const widgetScript = document.createElement('script');
            widgetScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            widgetScript.async = true;
            widgetScript.innerHTML = JSON.stringify({
                symbol: symbol,
                width: "100%",
                height: "400",
                locale: "pt",
                interval: "D",
                theme: "dark",
                style: "1",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                allow_symbol_change: true,
                studies: ["BB@tv-basicstudies", "RSI@tv-basicstudies"],
            });

            const container = document.getElementById('tradingview-widget');
            if (container) {
                container.innerHTML = ''; // Limpa o container antes de injetar
                container.appendChild(widgetScript);
            }
        }
    }, [symbol, loading]);

    return (
        <div id="tradingview-widget" style={{ margin: '20px 0', width: '100%', height: '400px' }}>
            {/* O gráfico será injetado aqui */}
        </div>
    );
};

export default TradingViewChart;
