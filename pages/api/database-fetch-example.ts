import { connectToDatabase } from "../../Utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("users")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return res.json(movies);
};