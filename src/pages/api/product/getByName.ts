import { NextApiRequest, NextApiResponse } from 'next';
import { _products } from 'src/_mock/_product';
import { paramCase } from 'src/utils/change-case';
import cors from 'src/utils/cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);

    const { name } = req.query;

    const product = _products.find((product) => paramCase(product.name) === name);

    if (!product) {
      res.status(404).json({
        message: 'Product Not Found!',
      });
      return;
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error('[Product API]: ', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
