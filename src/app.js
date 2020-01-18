import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    /**
     * Starting the error debugger.
     * Iniciando o depurador de erros.
     */
    Sentry.init(sentryConfig);

    // Chamando os métodos
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    /* Tratamento de erros com Sentry */
    this.server.use(Sentry.Handlers.requestHandler());

    /* Define endereços que podem acessar a API (em produção):
    this.server.use(cors({ origin: 'https://rocketseat.com.br' })); ou
    this.server.use(cors()); para permitir qualquer endereço. */
    this.server.use(helmet());
    this.server.use(cors());

    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15, // 15 minutos de espera se ultrapassar o valor max.
          max: 100, // Máximo de requisições
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // check environment/ambiente
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json({ errors });
      }
      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

// Exportando diretamente o server
export default new App().server;
