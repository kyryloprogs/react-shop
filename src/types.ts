export type ProductData = {
    comments: [{
        user_id: number,
        comment: string,
        created_at: any
    }],
    price: Array<any>,
    productAttributes: Array<any>,
    product: {
        name: string,
        description: string,
        price: number,
        attributes: string,
        main_img: string,
        sale: number,
        images: [{
            id: number,
            productId: number,
            imageUrl: string
        }]
    },
    reviewData: {
        likes_count: number,
        dislikes_count: number,
        favorites_count: number,
        views_count: number,
        comments_count: number
    },
    priceDynamics: [
        {
            price: number,
            regDate: string
        }
    ],
}