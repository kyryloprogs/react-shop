import { useState, useEffect, useRef } from 'react'
import Icons from '../components/UtilsComponents/Icons'
import { Grid, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Charasteristics from '../components/PageComponents/Charasteristics';
import Price from '../components/PageComponents/Price';
import Comment from '../components/PageComponents/Comment';
import Description from '../components/PageComponents/Description';
import instance from '../config/axios';
import Slider from 'react-slick';
import '../Carousel.css';
import Carousel from '../components/Carousel';
import { ProductData } from '../types';



const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    border: '1px solid',

    borderRadius: "10px",
    padding: "18px 10px",
    height: 66,
    background: "#FFF",
    borderColor: '#FFF',
    "&.activeButton": {
        backgroundColor: "#766ED3",
        borderColor: '#766ED3',
    },
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
});



const ProductPage = () => {
    const [subMenu, setSubMenu] = useState<String>("description");
    const params = useParams();
    const [productData, setProductData] = useState<ProductData>();

    const subMenus = [
        {
            name: "description",
            component: <Description description={productData?.product.description || ""} />
        },
        {
            name: "attributes",
            component: <Charasteristics attributes={productData?.productAttributes || []} />
        },
        {
            name: "comments",
            component: <Comment id={params.id || ""} />
        },
        {
            name: "prices",
            component: <Price data={productData && productData.priceDynamics || [{
                price: productData?.product.price || 0,
                regDate: new Date().toDateString()
            }]} />
        }

    ]
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setSubMenu(e.currentTarget?.id || "description");
        setSubMenu(e.currentTarget?.id || "description");
    };


    useEffect(() => {
        instance.get(`/products/${params.id}`,)
            .then(e => {
                const data = e.data.data;
                setProductData(data);
                console.log(e.data.data)
            })

            .catch(e => console.log(e));
    }, [])



    return (
        <div className='w-full'>
            <div className='w-[90%] h-[495px] bg-white m-auto flex flex-row justify-between rounded-extrumsDefault'>
                <div className='w-[50%]'>
                    {productData && productData.product.images && productData.product.images.length > 0 && (

                        <Carousel images={productData.product.images} main_img={productData.product.main_img} /> // onChange={selectImage}

                    )}
                </div>

                <div className='w-[50%] flex flex-col mt-[21px]'>

                    <Grid container spacing={2} xs={12} >
                        <Grid item xs={3} sx={{ height: "30%" }}>
                            <div className='inline-flex justify-center  gap-3'>
                                <Icons.SvgIconViews />
                                <Typography variant='productStats'>
                                    {productData?.reviewData.views_count}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} >
                            <div className='inline-flex  justify-center  gap-3'>
                                <Icons.SvgIconFavMini />
                                <Typography variant='productStats'>
                                    {productData?.reviewData.favorites_count}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} >
                            <div className='inline-flex items-end  gap-3'>
                                <Icons.SvgIconLike />
                                <Typography variant='productStats'>
                                    {productData?.reviewData.likes_count}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} >
                            <div className='inline-flex items-end gap-3'>
                                <Icons.SvgIconDislike />
                                <Typography variant='productStats'>
                                    {productData?.reviewData.dislikes_count}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ height: "10%" }}>
                            <Typography variant='productTitle'>
                                {productData?.product.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ height: "45%" }}>
                            <div className='flex flex-row mt-[38px]'>
                                <Typography variant='productSettings'>
                                    Design: overhead, closed
                                </Typography>
                            </div>


                            <div className='flex flex-row mt-[19px]'>
                                <Typography variant='productSettings'>
                                    Connection type: combined, 3.5mm, Bluetooth v w5.0
                                </Typography>
                            </div>

                        </Grid>
                        <Grid item xs={12} sx={{ height: "20%" }}>
                            <div className='inline-flex gap-3 items-center' >

                                <Icons.SvgIconPrice mini="53px" />

                                {productData?.product.sale ? (
                                    <>
                                        <Typography variant='priceOutside' sx={{ color: "red" }}>
                                            ${(productData?.product.price - productData?.product.price * (productData?.product.sale || 0) / 100)}
                                        </Typography>
                                        <Typography variant='saleFont'>
                                            ${productData?.product.price}
                                        </Typography>
                                    </>

                                ) : (
                                    <Typography variant='priceInside'>
                                        ${productData?.product.price}
                                    </Typography>
                                )}

                            </div>
                        </Grid>
                    </Grid>
                </div>


            </div>
            <div className='w-[90%] bg-white m-auto flex flex-col justify-between mt-[15px] rounded-extrumsDefault'>

                <div className={`w-full flex flex-row justify-around mt-[14px]`}>
                    <BootstrapButton className={`${(subMenu === "description" && 'activeButton')}`} id='description' onClick={handleClick}>
                        <Typography variant='itemButton' >
                            Description
                        </Typography>
                    </BootstrapButton>


                    <BootstrapButton className={`${(subMenu === "attributes" && 'activeButton')}`} id='attributes' onClick={handleClick}>
                        <Typography variant='itemButton'>
                            Charasteristics
                        </Typography>
                    </BootstrapButton>

                    <BootstrapButton className={`${(subMenu === "comments" && 'activeButton')}`} id='comments' onClick={handleClick}>
                        <Typography variant='itemButton'>
                            Comments ({productData?.comments.length})
                        </Typography>
                    </BootstrapButton>

                    <BootstrapButton className={`${(subMenu === "prices" && 'activeButton')}`} id='prices' onClick={handleClick}>
                        <Typography variant='itemButton'>
                            Price dynamics
                        </Typography>
                    </BootstrapButton>
                </div>


                {subMenus.find(e => e.name === subMenu)?.component}

                {/* </div> */}

            </div>

        </div >
    )
}

export default ProductPage;