const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 BiblioVirtual rodando em http://localhost:${PORT}`);
  console.log(`\n📧 Credenciais de acesso:`);
  console.log(`   Admin : admin@bibliovirtual.com / password`);
  console.log(`   Leitor: joao@email.com / password\n`);
});
