import { User } from '../entities/User';
import { Challenge } from './../entities/Challenge';
import { UserChallenge } from '../entities/UserChallenge';
import { ProfileImage } from '../entities/ProfileImage';
import { createConnection, getConnectionManager } from "typeorm";

export async function createDbConnection() {

  // Set database variables from environment
  const DATABASE_HOST = process.env.DATABASE_HOST;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_USER = process.env.DATABASE_USER;
  const DATABASE_DB = process.env.DATABASE_DB;

  // Create a database connection
  await createConnection({
    type: "postgres",
    host: DATABASE_HOST,
    port: 5432,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: [
      Challenge, 
      User, 
      UserChallenge,
      ProfileImage
    ],
    extra: {
      ssl: true
    },
    synchronize: true
  });

  // Check if connection is successful
  const connection = getConnectionManager();
  console.log('Is DB connected:', connection.connections[0].isConnected);
}