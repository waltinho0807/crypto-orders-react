// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UpdateApiKeyForm from './components/UpdateApiKeyForm';
import OrdersTable from './components/OrdersTable';
import TradingViewChart from './components/TradingViewChart';

const App = () => {
    const [symbol, setSymbol] = useState('BTCUSDT'); // Defina um símbolo padrão

    return (
        <Router>
            <Navbar />
            <TradingViewChart symbol={symbol} />
            <Routes>
                <Route path="/orders" element={<OrdersTable setSymbol={setSymbol} />} />
                <Route path="/configure" element={<UpdateApiKeyForm setSymbol={setSymbol} />} />
                <Route path="/" element={<h1>Bem-vindo ao Crypto Bot!</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
