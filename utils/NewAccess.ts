import jwt from 'jsonwebtoken';
import { client } from '../db.ts';
import { generateAccessToken } from '../utils/accessTokenGen.ts'; // the function above

export const refreshAccessToken = async (req: any, res: any) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

  // Check DB for existing refresh token
  const result = await client.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);
  const tokenRow = result.rows[0];
  if (!tokenRow) return res.status(403).json({ message: 'Invalid refresh token' });

  // Optional: check expiration
  if (new Date(tokenRow.expires_at) < new Date()) {
    return res.status(403).json({ message: 'Refresh token expired' });
  }

  const JWT_SECRET = process.env.JWT_SECRET!;
  
  // Issue new access token
  const accessToken = generateAccessToken({
    email: tokenRow.email,
    password: tokenRow.password,
    userId: tokenRow.user_id,
  })


  res.json({
    accessToken
  });
};
