function delay(miliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

async function fetchData() {
    await delay(2000);
    console.log("fetch data success");
}
fetchData();

//example

interface Product {
    id: number;
    name: string;
    price: number;
}

async function getProduct(id:number) {
    delay(2000);
    const products: Product[] = [
        { id: 1, name: 'iPhone', price: 1000 },
        { id: 2, name: 'Macbook', price: 500 },
        { id: 3, name: 'Tablet', price: 300 }
    ];

    const found = products.find((products) => products.id === id);
    if (!found) {
        console.log(`Product with id ${id} not found`);
        return null;
    }
    return found;
}

async function printProduct(): Promise<void> {
    await delay(2000);
    const product = await getProduct(1);
    console.log(product?.name);
}

getProduct(1);
export{}