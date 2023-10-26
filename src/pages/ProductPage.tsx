import axios from 'axios';
import { useState, useEffect } from 'react'
import Icons from '../components/Icons'
import { Avatar, Grid, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Charasteristics from '../components/PageComponents/Charasteristics';
import Price from '../components/PageComponents/Price';
import Comment from '../components/PageComponents/Comment';
import Description from '../components/PageComponents/Description';

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

type ProductData = {
    comments: Array<any>,
    price: Array<any>,
    product: {
        name: string,
        description: string,
        price: number,
        attributes: string
    },
    reviewData: {
        likes_count: number,
        dislikes_count: number,
        favorites_count: number,
        views_count: number,
        comments_count: number
    },
    priceDynamics: Array<any>,
}

const instance = axios.create({
    baseURL: 'http://localhost:4500/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});



const ProductPage = () => {
    const [subMenu, setSubMenu] = useState<String>("description");
    const params = useParams();
    const [productData, setProductData] = useState<ProductData>();
    const [attributes, setAttributes] = useState<object>({});

    const subMenus = [
        {
            name: "description",
            component: <Description />
        },
        {
            name: "attributes",
            component: <Charasteristics attributes={attributes} />
        },
        {
            name: "comments",
            component: <Comment />
        },
        {
            name: "prices",
            component: <Price data={productData?.priceDynamics || []} />
        }

    ]
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setSubMenu(e.currentTarget?.id || "description");
        setSubMenu(e.currentTarget?.id || "description");
    };

    useEffect(() => {

        instance.get(`/products/${params.id}`, {
            // params: {    
            //     custom_data: ""
            // }
        })
            .then(e => {
                const data = e.data.data;
                setProductData(data);
                setAttributes(JSON.parse(data.product.attributes || "{}"));
            })
            .catch(e => console.log(e));
        // console.log(productData?.priceDynamics)
        // console.log(productData?.product.attributes)

    }, [])
    return (
        <div>
            <div className='w-[90%] h-[495px] bg-white m-auto flex flex-row justify-between rounded-extrumsDefault'>
                <div className='w-[50%] bg-red-300'>

                </div>

                <div className='w-[50%] flex flex-col mt-[21px]'>
                    {/* <Grid container spacing={2}> */}
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
                                <Typography>
                                    Design:
                                </Typography>
                                overhead, closed
                            </div>


                            <div className='flex flex-row mt-[19px]'>
                                <Typography>
                                    Connection type:
                                </Typography>
                                combined, 3.5mm, Bluetooth v w5.0
                            </div>

                        </Grid>
                        <Grid item xs={12} sx={{ height: "15%" }}>
                            <div className='inline-flex gap-3'>
                                <Icons.SvgIconPrice />
                                <Typography variant='priceInside'>
                                    ${productData?.product.price}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    {/* </Grid> */}
                    {/* <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                            <p style={{ textAlign: "left" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                                Suspendisse congue vulputate lobortis. Pellentesque at interdum
                                tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                                sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                                metus, efficitur lobortis nisi quis, molestie porttitor metus.
                                Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                                tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                                lectus vitae ex.{" "}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                posted 1 minute ago
                            </p>
                        </Grid>
                    </Grid> */}

                    {/* <Typography sx={{ marginTop: '45px' }}>
                        {productData?.product.name}
                    </Typography>

                    <div className='flex flex-row mt-[38px]'>
                        <Typography>
                            Design:
                        </Typography>
                        overhead, closed
                    </div>


                    <div className='flex flex-row mt-[19px]'>
                        <Typography>
                            Connection type:
                        </Typography>
                        combined, 3.5mm, Bluetooth v w5.0
                    </div>

                    <div className='flex flex-row'>
                        <Icons.SvgIconPrice />
                        ${productData?.product.price}
                    </div> */}
                </div>


            </div>
            <div className='w-[90%] bg-white m-auto flex flex-col justify-between mt-[15px] rounded-extrumsDefault'>

                <div className={`w-full flex flex-row justify-around mt-[14px]`}>
                    {/* <div > */}
                    <BootstrapButton className={`${(subMenu === "description" && 'activeButton')}`} id='description' onClick={handleClick}>
                        <Typography variant='itemButton' >
                            Description
                        </Typography>
                    </BootstrapButton>
                    {/* </div> */}


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