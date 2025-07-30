import { Request, Response, NextFunction } from 'express';
export interface RequestLog {
    method: string;
    url: string;
    statusCode: number;
    responseTime: number;
    ip: string;
    userAgent: string;
    timestamp: string;
    query: any;
    params: any;
    body?: any;
}
declare class RequestLogger {
    private logs;
    private readonly maxLogs;
    log(requestLog: RequestLog): void;
    getLogs(limit?: number): RequestLog[];
    getStats(): {
        totalRequests: number;
        averageResponseTime: number;
        statusCodes: Record<number, number>;
        topEndpoints: Array<{
            url: string;
            count: number;
        }>;
    };
    clear(): void;
}
export declare const requestLogger: RequestLogger;
export declare const loggingMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const morganFormat: (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error) => void) => void;
export declare const getRequestStats: (req: Request, res: Response) => void;
export declare const getRecentLogs: (req: Request, res: Response) => void;
export {};
//# sourceMappingURL=logging.d.ts.map