# Desafio - Receptor de Webhooks e Relatórios

API desenvolvida em **Node.js**, **TypeScript**, **Express** e **Prisma ORM** para receção de *webhooks* de transações e geração de relatórios consolidados.

## 🚀 Tecnologias Utilizadas
- Node.js & TypeScript
- Express (Framework web)
- Prisma ORM
- SQLite (Persistência local leve)
- Render.com (Deploy em produção)

## 📌 Decisão Arquitetural (Nota técnica)
> **Nota sobre o Banco de Dados:** Durante o desenvolvimento local, imprevistos de rede com portas externas levaram à decisão estratégica de utilizar **SQLite** em vez de PostgreSQL. Esta escolha garantiu a entrega funcional dentro do prazo estipulado, mantendo toda a integridade da camada de dados através da abstração do Prisma ORM e assegurando um deploy fluido e estável no Render.com.

## 🌐 Endpoints em Produção
- **URL Base:** `https://twr-webhook-jvw.onrender.com`
- **POST `/webhook`**: Recebe os dados da transação.
- **GET `/report`**: Retorna o relatório consolidado de vendas.

### Exemplo de Payload para POST (`/webhook`):
\`\`\`json
{
  "transactionId": "txn_98765",
  "status": "approved",
  "amount": 250.00,
  "customerEmail": "cliente@teste.com",
  "productName": "Ingresso VIP"
}
\`\`\`

## 🛠️ Como Executar Localmente
1. Clona o repositório:
   \`\`\`bash
   git clone <url-do-repositorio>
   \`\`\`
2. Instala as dependências:
   \`\`\`bash
   npm install
   \`\`\`
3. Configura o ficheiro \`.env\` com:
   \`\`\`env
   DATABASE_URL="file:./dev.db"
   \`\`\`
4. Executa as migrações e inicia o servidor:
   \`\`\`bash
   npx prisma migrate dev --name init
   npm run dev
   \`\`\`
