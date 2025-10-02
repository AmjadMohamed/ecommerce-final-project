export async function getSpecificBrand(brandId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);

    const data = await response.json();

    return data
}
