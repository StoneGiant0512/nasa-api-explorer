import { NEOResponse, NEORequest } from '../types/nasa';
export interface NEOSummary {
    totalCount: number;
    hazardousCount: number;
    dateRange: {
        start: string;
        end: string;
    };
    averageDiameter: {
        min: number;
        max: number;
    };
}
export declare class NEOService {
    private api;
    private apiKey;
    private baseURL;
    constructor();
    getNEOData(params?: NEORequest): Promise<NEOResponse>;
    getNEOByDateRange(startDate: string, endDate: string): Promise<NEOResponse>;
    getNEOByAsteroidId(asteroidId: string): Promise<NEOResponse>;
    getHazardousNEOs(startDate?: string, endDate?: string): Promise<NEOResponse>;
    getNEOSummary(startDate?: string, endDate?: string): Promise<NEOSummary>;
    getNEOsBySize(minDiameter: number, maxDiameter: number, startDate?: string, endDate?: string): Promise<NEOResponse>;
    validateNEOParams(params: NEORequest): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const neoService: NEOService;
//# sourceMappingURL=neoService.d.ts.map