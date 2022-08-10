import { Db, MongoClient, MongoClientOptions } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  if (!uri) return { client: null, db: null }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = await MongoClient.connect(uri as string, opts as MongoClientOptions).catch(error => {
    console.log('error during connecting to mongo: ');
    console.error(error);
  })
  if (!client) return { client: null, db: null }


  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}