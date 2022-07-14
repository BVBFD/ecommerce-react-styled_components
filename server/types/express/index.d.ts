import express from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_URL: string;
      PORT: number;
      STRIPE_KEY: string;
      PASS_SEC: string;
      JWT_SEC: string;
      NODE_ENV: 'development' | 'production';
      XSS_TOKEN: string;
      CSRF_TOKEN: string;
      REACT_APP_CSRF_TOKEN: string;
    }
  }

  namespace Express {
    interface Request {
      user?: Record<Object | String>;
    }
  }
}

// 내가 임의로 만든 정의.
// declare global로 기존에 정의되어있던
// 인터페이스를 확장했음.
