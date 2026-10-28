"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota POST - Recebe o Webhook
app.post('/webhook', async (req, res) => {
    try {
        const { transactionId, status, amount, customerEmail, productName } = req.body;
        // Validação básica (Diferencial pro desafio)
        if (!transactionId || !status || amount === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const sale = await prisma.sale.create({
            data: {
                transactionId,
                status,
                amount,
                customerEmail,
                productName: productName || 'Unknown Product',
            },
        });
        // Webhooks precisam de respostas rápidas (200 OK)
        res.status(200).json({ message: 'Webhook received successfully', id: sale.id });
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Rota GET - Relatório de Vendas
app.get('/report', async (req, res) => {
    try {
        const allSales = await prisma.sale.findMany();
        // Agregações de dados para o relatório
        const totalTransactions = allSales.length;
        const approvedSales = allSales.filter(s => s.status === 'approved');
        const totalRevenue = approvedSales.reduce((acc, curr) => acc + curr.amount, 0);
        const statusBreakdown = allSales.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
        }, {});
        res.status(200).json({
            summary: {
                totalTransactions,
                totalRevenue,
                statusBreakdown,
            },
            data: allSales,
        });
    }
    catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
