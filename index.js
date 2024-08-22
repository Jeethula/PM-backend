const app = require('./app');
const db = require('./config/db');

const PORT = 3000;

async function startServer() {
  try {
    await db.connect();
    console.log('Connected to Postgres');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();