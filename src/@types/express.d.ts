declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    restaurant: {
      id: string;
    };
  }
}
