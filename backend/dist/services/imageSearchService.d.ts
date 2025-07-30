import { NASAImageResponse, NASAImageRequest } from '../types/nasa';
export interface ImageSearchResult {
    totalHits: number;
    items: any[];
    links: any[];
}
export interface ImageSearchFilters {
    mediaType?: 'image' | 'video' | 'audio';
    yearStart?: number;
    yearEnd?: number;
    center?: string;
    photographer?: string;
    location?: string;
}
export declare class ImageSearchService {
    private api;
    private apiKey;
    private baseURL;
    constructor();
    searchNASAImages(params?: NASAImageRequest): Promise<NASAImageResponse>;
    searchByKeyword(keyword: string, filters?: ImageSearchFilters): Promise<NASAImageResponse>;
    searchByCenter(center: string, filters?: ImageSearchFilters): Promise<NASAImageResponse>;
    searchByPhotographer(photographer: string, filters?: ImageSearchFilters): Promise<NASAImageResponse>;
    searchByYearRange(yearStart: number, yearEnd: number, filters?: ImageSearchFilters): Promise<NASAImageResponse>;
    searchByMediaType(mediaType: 'image' | 'video' | 'audio', filters?: ImageSearchFilters): Promise<NASAImageResponse>;
    getPopularCenters(): Promise<string[]>;
    getSearchSuggestions(): Promise<string[]>;
    validateImageSearchParams(params: NASAImageRequest): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const imageSearchService: ImageSearchService;
//# sourceMappingURL=imageSearchService.d.ts.map