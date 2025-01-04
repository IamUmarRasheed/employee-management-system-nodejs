import { app } from './app.js'; 
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

async function main() {
  try {
    // Check the database connection
    await prisma.$connect();
    console.log("✅ PostgreSQL connected successfully!");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database!", err);
    process.exit(1); // Exit the process with a failure code
  }
}
main();
