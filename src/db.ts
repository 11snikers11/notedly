import mongoose from 'mongoose';

const connectionString = process.env.MONGO_CONNECTION_STRING;

export async function connectToDb() {
  const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  try {
    console.log('[DB]', 'Connecting...');
    if (!connectionString) throw new Error('no connection string');
    await mongoose.connect(connectionString, connectionParameters);
    console.log('[DB]', 'Connected');
  } catch (e) {
    console.log('[DB]', 'Connection error:', e);
  }
}
