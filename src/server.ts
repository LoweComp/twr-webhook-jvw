import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota POST - Recebe o Webhook
app.post('/webhook', async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota GET - Relatório de Vendas
app.get('/report', async (req: Request, res: Response): Promise<void> => {
  try {
    const allSales = await prisma.sale.findMany();

    // Agregações de dados para o relatório
    const totalTransactions = allSales.length;
    const approvedSales = allSales.filter(s => s.status === 'approved');
    const totalRevenue = approvedSales.reduce((acc, curr) => acc + curr.amount, 0);

    const statusBreakdown = allSales.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json({
      summary: {
        totalTransactions,
        totalRevenue,
        statusBreakdown,
      },
      data: allSales,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});