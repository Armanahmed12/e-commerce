import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

// parsers are here
app.use(express.json());
app.use(cors());

const getController = (req: Request, res: Response) => {

  res.json({ a: 10 });
};

app.get('/', getController);

export default app;
