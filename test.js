const faker = require('@faker-js/faker').faker

console.log('====================================');
console.log(faker.commerce.product()); //Table
console.log('====================================');


console.log(faker.commerce.productMaterial()); // Soft
console.log(faker.commerce.productName()); // Awesome Frozen Table
console.log(faker.commerce.productDescription()); // The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality
console.log(faker.commerce.productAdjective()); // Elegant
console.log(faker.commerce.price()); // 944.00
console.log(faker.image.business()); // http://loremflickr.com/640/480/business
console.log(faker.image.dataUri()); //data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E
console.log(faker.image.fashion()); // http://loremflickr.com/640/480/fashion
console.log(faker.image.image()); // http://loremflickr.com/640/480/transport
console.log(faker.image.imageUrl()); //http://loremflickr.com/640/480