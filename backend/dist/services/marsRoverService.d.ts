import { MarsRoverResponse, MarsRoverRequest } from '../types/nasa';
export interface MarsRover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Array<{
        name: string;
        full_name: string;
    }>;
}
export interface MarsRoversResponse {
    rovers: MarsRover[];
}
export interface MarsRoverManifest {
    photo_manifest: {
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
        max_sol: number;
        max_date: string;
        total_photos: number;
        photos: Array<{
            sol: number;
            earth_date: string;
            total_photos: number;
            cameras: string[];
        }>;
    };
}
export declare class MarsRoverService {
    private api;
    private apiKey;
    private baseURL;
    private validRovers;
    constructor();
    getMarsRovers(): Promise<MarsRoversResponse>;
    getMarsRoverPhotos(rover: string, params?: MarsRoverRequest): Promise<MarsRoverResponse>;
    getMarsRoverManifest(rover: string): Promise<MarsRoverManifest>;
    getPhotosBySol(rover: string, sol: number, camera?: string): Promise<MarsRoverResponse>;
    getPhotosByEarthDate(rover: string, earthDate: string, camera?: string): Promise<MarsRoverResponse>;
    getRoverInfo(rover: string): Promise<MarsRover>;
    private validateRover;
    validateMarsRoverParams(params: MarsRoverRequest): {
        isValid: boolean;
        errors: string[];
    };
    getRoverCameras(rover: string): Promise<string[]>;
}
export declare const marsRoverService: MarsRoverService;
//# sourceMappingURL=marsRoverService.d.ts.map