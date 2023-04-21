import { Request, Response } from 'express';
import { connect  } from '../database/connection';
import { ShortUrl } from '../interfaces/url.interface';
import axios from 'axios';

export const createNewurl = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { original_url }: ShortUrl = req.body;
    console.log('request body:', req.body);

    const conn = await connect();

    const shortUrlRes = await axios.get(`https://api.shrtco.de/v2/shorten?url=${original_url}`);
    
    const shortUrlData = shortUrlRes.data?.result;
    if (!shortUrlData) {
      console.log('Invalid response from API');
      throw new Error('Could not shorten URL');
    }

    const shortUrl = shortUrlData.short_link;

    const result = await conn.query('INSERT INTO url (original_url, short_url) VALUES ($1, $2) RETURNING *', [original_url, shortUrl]);

    return res.status(200).json({
      resp: true,
      message: 'Posted',
      data: result.rows[0]
    });
  } catch(err: any) {
    return res.status(500).json({
      resp: false,
      message: err.message
    });
  }
}

export const checkDatabaseForShortenedUrl = async (req: Request, res: Response): Promise<Response> => {
  try {
    const conn = await connect();
    const result = await conn.query('SELECT * FROM url');
    const rows = result.rows;
    const shortenedUrls = rows.map((row: any) => ({short_url: row.short_url, original_url: row.original_url}));
    return res.status(200).json({
      resp: true,
      message: 'Found shortened URLs',
      data: shortenedUrls
    });
  } catch(err: any) {
    return res.status(500).json({
      resp: false,
      message: err.message
    });
  }
}