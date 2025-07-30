import { Request, Response, NextFunction } from 'express';
export interface ValidationRule {
    field: string;
    type: 'string' | 'number' | 'boolean' | 'date';
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    enum?: string[];
    transform?: (value: any) => any;
}
export interface ValidationSchema {
    query?: ValidationRule[];
    params?: ValidationRule[];
    body?: ValidationRule[];
}
export declare class ValidationError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string);
}
export declare const validateRequest: (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validationSchemas: Record<string, ValidationSchema>;
//# sourceMappingURL=validation.d.ts.map