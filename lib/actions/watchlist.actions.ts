'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export const getWatchlistSymbolsByEmail = async (email: string): Promise<string[]> => {
  try {
    await connectToDatabase();

    // Find user by email in Better Auth's user collection
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('Mongoose connection not connected');

    const user = await db.collection('user').findOne(
      { email },
      { projection: { id: 1, _id: 1 } }
    );

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return [];
    }

    const userId = user.id || user._id?.toString();
    if (!userId) {
      console.log(`No valid userId found for email: ${email}`);
      return [];
    }

    // Query watchlist by userId and return just the symbols
    const watchlistItems = await Watchlist.find({ userId }, { symbol: 1 }).lean();

    if (!watchlistItems || watchlistItems.length === 0) {
      return [];
    }

    return watchlistItems.map((item) => item.symbol);
  } catch (error) {
    console.error('Error getting watchlist symbols by email:', error);
    return [];
  }
};
