import { APODResponse, MarsRoverResponse, EPICResponse, NEOResponse, NASAImageResponse, APODRequest, MarsRoverRequest, NEORequest, NASAImageRequest } from '../types/nasa';
export declare class NASAService {
    private api;
    private apiKey;
    private baseURL;
    constructor();
    getAPOD(params?: APODRequest): Promise<APODResponse | APODResponse[]>;
    getMarsRoverPhotos(rover: string, params?: MarsRoverRequest): Promise<MarsRoverResponse>;
    getEPICData(date?: string): Promise<EPICResponse[]>;
    getNEOData(params?: NEORequest): Promise<NEOResponse>;
    searchNASAImages(params?: NASAImageRequest): Promise<NASAImageResponse>;
    getMarsRovers(): Promise<any>;
    getMarsRoverManifest(rover: string): Promise<any>;
    getEPICImageURL(identifier: string, date: string, image: string): string;
    getEPICEnhancedImageURL(identifier: string, date: string, image: string): string;
}
export declare const nasaService: NASAService;
//# sourceMappingURL=nasaService.d.ts.map