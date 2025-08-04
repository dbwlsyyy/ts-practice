enum ProductCategory {
    Electronics = 'Electronics',
    Books = 'Books',
    Clothing = 'Clothing',
}

type Status = 'Available' | 'OutOfStock' | 'Discontinued';
type SKU = string | number;

interface Product {
    sku: SKU;
    name: string;
    price: number;
    category: ProductCategory;
    status: Status;
    onSale?: boolean;
}

class ProductCatalog {
    // 질문1 : private _products: Product[] = []; 말고 그냥 private _products; 라고 해도 되나 ? >> 불가능
    // 질문: 여기서 멤버변수로 선언 안 하고 바로 생성자의 매개변수로 해서 초기화 가능하지 않나 ? >> 가능함 해당 방식으로 완료

    constructor(private _products: Product[] = []) {}

    addProduct(product: Product) {
        this._products.push(product);
    }

    getProductsByCategory = (category: ProductCategory) => {
        return this._products.filter((p) => p.category === category);
    };

    findProductBySKU = (sku: SKU) => {
        return this._products.find((p) => p.sku === sku);
    };

    checkStatus(sku: SKU): string {
        const p = this.findProductBySKU(sku);
        // 질문3: p !== undefined이랑 typeof p !== 'undefined' 다른가 ? >> 동일함
        // 질문4: 타입 가드 할때 undefined갸 아닌지 먼저 판별하는게 좋은가 ?
        //      아니면 typeof p === 'undefined' 이거 먼저 판별해도 상관없는건가 ? >> 상관없음
        if (typeof p !== 'undefined') {
            return `Product '${p.name}' is ${p.status}.`;
        }
        return 'Product not found.';
    }
}

const catalog = new ProductCatalog();
catalog.addProduct({
    sku: 'ELEC001',
    name: 'Laptop',
    price: 1200,
    category: ProductCategory.Electronics,
    status: 'Available',
});
catalog.addProduct({
    sku: 101,
    name: 'The Alchemist',
    price: 15,
    category: ProductCategory.Books,
    status: 'OutOfStock',
});

console.log(catalog.checkStatus('ELEC001'));
