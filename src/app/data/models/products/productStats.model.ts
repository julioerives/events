export interface ProductStats {
    priceStatsProjection:        PriceStatsProjection;
    mostBoughtProductProjection: MostBoughtProductProjection;
}

export interface MostBoughtProductProjection {
    name:         string;
    totalProduct: number;
}

export interface PriceStatsProjection {
    averagePrice:  number;
    mostExpensive: number;
}
