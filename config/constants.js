require('dotenv').config();
module.exports = {
    allowMimeType: ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'image/svg'],
    // product_image_url: process.env.HOST_URL + '/uploads/productImage',
    // donate_product_image_url: process.env.HOST_URL + '/uploads/DonateProductsImages',
    // profile_photo_url: process.env.HOST_URL + '/uploads/profileImage',
    // aboutus_photo_url: process.env.HOST_URL + '/uploads/AboutUsImages',
    // charity_photo_url: process.env.HOST_URL + '/uploads/CharityProfileImage',
    // shop_photo_url: process.env.HOST_URL + '/uploads/ShopImages',
    // banner_image_url: process.env.HOST_URL + '/uploads/BannerImages',
    // product_category_image_url: process.env.HOST_URL + '/uploads/productCategory',

    jwtAccessTokenOptions: {
        secret: 'TwajihiPalestineAPI#@2023',
        options: {
            algorithm: 'HS256',
            expiresIn: '7d',
            audience: 'aud:Aprodence',
            issuer: 'Aprodence-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        }
    },
    jwtRefreshTokenOptions: {
        secret: 'TwajihiPalestineAPI#@2023',
        options: {
            algorithm: 'HS256',
            expiresIn: '3d',
            audience: 'aud:Aprodence',
            issuer: 'Aprodence-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        }
    },
}