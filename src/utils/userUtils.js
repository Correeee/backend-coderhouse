import { faker } from "@faker-js/faker/locale/es";

export const generateProductFaker = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph({min: 3, max: 6}),
        category: faker.commerce.productAdjective(),
        code: faker.number.int({ min: 50, max: 999999 }),
        price: faker.commerce.price({min: 5000, max: 50000, dec: 0}),
        thumbnail: faker.image.url(),
        stock: faker.number.int({ min: 1, max: 100 })
    };
};