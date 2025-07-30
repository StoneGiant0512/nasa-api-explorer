import { EPICResponse } from '../types/nasa';
export interface EPICImageURLParams {
    identifier: string;
    date: string;
    image: string;
    enhanced?: boolean;
}
export declare class EPICService {
    private api;
    private apiKey;
    private baseURL;
    constructor();
    getEPICData(date?: string): Promise<EPICResponse[]>;
    getEPICByDate(date: string): Promise<EPICResponse[]>;
    getLatestEPIC(): Promise<EPICResponse[]>;
    getEPICImageURL(identifier: string, date: string, image: string): string;
    getEPICEnhancedImageURL(identifier: string, date: string, image: string): string;
    getEPICImageURLWithParams(params: EPICImageURLParams): string;
    getAvailableEPICDates(): Promise<string[]>;
    getEPICByDateRange(startDate: string, endDate: string): Promise<EPICResponse[]>;
    validateEPICParams(date?: string): {
        isValid: boolean;
        errors: string[];
    };
    validateEPICImageURLParams(params: EPICImageURLParams): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const epicService: EPICService;
//# sourceMappingURL=epicService.d.ts.map