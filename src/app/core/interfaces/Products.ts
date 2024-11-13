export interface Product {
    id:       string;
    name:     string;
    imageUrl: string;
    category: string;
    price:    number;
    status:   string;
    comments: any[];
    likes:    any[];
}
