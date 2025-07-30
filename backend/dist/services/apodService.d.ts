import { APODResponse, APODRequest } from '../types/nasa';
export declare class APODService {
    private api;
    private apiKey;
    private baseURL;
    constructor();
    getAPOD(params?: APODRequest): Promise<APODResponse | APODResponse[]>;
    getAPODByDate(date: string): Promise<APODResponse>;
    getAPODByDateRange(startDate: string, endDate: string): Promise<APODResponse[]>;
    getAPODByCount(count: number): Promise<APODResponse[]>;
    validateAPODParams(params: APODRequest): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const apodService: APODService;
//# sourceMappingURL=apodService.d.ts.map