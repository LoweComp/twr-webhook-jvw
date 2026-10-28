# Desafio Full Stack - Receptor de Webhooks e Relatórios

API desenvolvida em **Node.js**, **TypeScript**, **Express** e **Prisma ORM** para receção de *webhooks* de transações e geração de relatórios consolidados.

## 🚀 Tecnologias Utilizadas
- Node.js & TypeScript
- Express (Framework web)
- Prisma ORM
- SQLite (Persistência local leve)
- Render.com (Deploy em produção)

---

## 🌐 Endpoints e Como Chamar a Aplicação

A URL base da aplicação em produção é:  
`https://twr-webhook-jvw.onrender.com`

### 1. POST `/webhook`
Responsável por receber os dados da transação, validá-los e persistir na base de dados.

- **Exemplo de Requisição (JSON Payload):**
  ```json
  {
    "transactionId": "txn_98765",
    "status": "approved",
    "amount": 250.00,
    "customerEmail": "cliente@teste.com",
    "productName": "Ingresso VIP"
  }

  ### 2. GET `/report`
Responsável por retornar o relatório consolidado com o total de vendas processadas e o histórico acumulado.

- **Como chamar:** Basta aceder diretamente ao endpoint via navegador ou ferramenta de teste (Postman/Thunder Client):  
  `https://twr-webhook-jvw.onrender.com/report`

---

## 📌 Premissas e Decisões Tomadas

- **Escolha do Banco de Dados (SQLite + Prisma):** Durante a fase de desenvolvimento, imprevistos de rede com portas externas de motores relacionais pesados levaram à decisão estratégica de utilizar **SQLite**. Através da abstração do Prisma ORM, mantivem a integridade total do modelo de dados garantindo um *deploy* fluido, rápido e sem falhas no Render.com.
- **Foco na Entrega Funcional:** Priorizou-se a robustez dos endpoints principais (`/webhook` e `/report`) e a tipagem estrita com TypeScript para assegurar que a lógica de negócio estivesse impecável dentro do prazo limite.

## 🚫 O que foi Decidido Não Fazer (Escopo Excluído)
Para manter o foco no objetivo central e garantir a entrega a tempo, **não foram implementados**:

- Sistema de autenticação de utilizadores ou proteção por tokens (JWT), visto que o desafio avalia prioritariamente a receção do *webhook* e a persistência.
- Interface gráfica (*Frontend*), mantendo a aplicação exclusivamente como uma API REST.
- Validações avançadas de reenvio de *webhooks* (*idempotency keys*), optando por um fluxo direto de registo.


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
   npx prisma db push
   npx tsc
   node dist/server.js
   \`\`\`

