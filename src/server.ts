/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server | null = null;

// Database connection function
async function connectToDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected successfully!  🛢');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1); // if Database is not connected, no need to continue the app.. so closing the app
  }
}

// Graceful shutdown function to close the server properly
function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Closing server... 🤷‍♂️ `);
  if (server) {
    server.close(() => {
      console.log('Server closed gracefully! ✅');
      process.exit(0); // everything is closed successfully, so closing the app
    });
  } else {
    process.exit(0);
  }
}

// Application bootstrap function
async function main() {
  try {
    await connectToDatabase();
    // Seed function (optional, use if necessary)
    // await seed();

    server = app.listen(config.port, () => {
      console.log(`🚀 Application is running on port ${config.port}!  ✨  ⚡`);
    });

    // Listen for OS termination signals (Ctrl+C or server stop)
    process.on('SIGTERM', () => {
      console.error('😈 SIGTERM:');
      gracefulShutdown('SIGTERM');
    });
    process.on('SIGINT', () => {
      console.error('😈 SIGINT:');
      gracefulShutdown('SIGINT');
    });

    // Handling uncaught exceptions (if unexpected error in code)
    process.on('uncaughtException', (error) => {
      console.error('😈 Uncaught Exception:', error);
      // server is running, so closing the app
      gracefulShutdown('uncaughtException');
    });

    // Handling unhandled promise rejections (if any promise is rejected, but not catched)
    process.on('unhandledRejection', (error) => {
      console.error('😈 Unhandled Rejection:', error);
      // server is running, so closing the app
      gracefulShutdown('unhandledRejection');
    });
  } catch (error) {
    console.error('😈 Error during bootstrap:', error);
    // if server is not started, the app must be closed immediately
    process.exit(1);
  }
}

main();
