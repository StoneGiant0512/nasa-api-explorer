import { Request, Response, NextFunction } from 'express';
export declare const cacheMiddleware: (ttl?: number) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const clearCache: (pattern?: string) => void;
export declare const cacheConfig: {
    apod: number;
    marsRover: number;
    epic: number;
    neo: number;
    imageSearch: number;
    default: number;
};
//# sourceMappingURL=cache.d.ts.map