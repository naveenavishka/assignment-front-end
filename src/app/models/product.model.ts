export class Product {
    id: number;
    productName: string;
    purchasePrice?: number | null;
    sellingPrice: number;
    description?: string | null;
    image?: string | null;
}
