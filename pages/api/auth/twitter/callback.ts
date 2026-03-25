import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'querystring';
import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET_KEY } from '@/utils/staticValues';
import CryptoJS from 'crypto-js';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { oauth_token, oauth_verifier } = req.query;  // Extract from req.query instead of req.body
 let secretKey="Shammi@12345"
  if (!oauth_token || !oauth_verifier) {
    return res.status(400).json({ error: 'Missing temporary OAuth credentials...', message: { oauth_verifier: oauth_verifier, oauth_token: oauth_token } });
  }
  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  };
  try {
    console.log(`oauth_token: ${oauth_token}, oauth_verifier: ${oauth_verifier}`);
    const response = await axios.post('https://api.twitter.com/oauth/access_token',
      qs.stringify({ oauth_token, oauth_verifier }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${TWITTER_CONSUMER_KEY}:${TWITTER_CONSUMER_SECRET_KEY}`).toString('base64')}`
        }
      }
    );
    console.log('Twitter API response:', response.data);
    const urlParams = new URLSearchParams(response.data);
    const accessToken = urlParams.get('oauth_token');
    const accessTokenSecret = urlParams.get('oauth_token_secret');
    const userId = urlParams.get('user_id');
    const screenName = urlParams.get('screen_name');
    const parsedData:any = qs.parse(response.data);
    const encodedUserId = encrypt(parsedData.user_id);
    res.redirect(`/auth/twitter/callback?&user_id=${encodedUserId}&screen_name=${encodeURIComponent(parsedData.screen_name)}`)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
