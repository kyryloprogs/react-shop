import { Grid, Typography, Link } from "@mui/material";
import Icons from "../UtilsComponents/Icons";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type ItemData = {
    category_id: number,
    comments_count: number,
    description: string,
    dislikes_count: number,
    favorites_count: number,
    id: number,
    likes_count: number,
    main_img: string,
    name: number,
    price: number,
    product_id: number,
    sale: number,
    userID: number,
    views_count: number
}

// const instance = axios.create({
//     baseURL: ',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });

const ListItem = (props: any) => {

    console.log(props)
    const [data, setData] = useState<ItemData>(props.props);

    const updateFav = () => {
        axios.patch(`http://localhost:4500/favorites/${data.id}`, {
            favorite: data?.userID
        }).then((e) => {
            console.log(e.data?.userID);
            setData({
                ...data,
                userID: e.data?.userID
            })
            // data.userID = e.data?.userID;
        }).catch((e) => {
            console.log(`Error: ${e}`);
        })

    }


    // console.log(data);
    return (

        <div className='w-[90%] h-[274px] mb-[35px] bg-white m-auto flex flex-row justify-between rounded-extrumsDefault'>
            <div className='w-[50px] h-full flex bg-[#766ED3] flex-col items-center justify-center' onClick={() => { updateFav() }}>
                {data.userID ? (
                    <Icons.SvgIconFavMini />
                ) : (
                    <Icons.SvgIconNonFavorite />
                )}
            </div>

            <div className=' w-[27%] h-full flex flex-row items-center justify-center'>
                <img src={data?.main_img} alt="id" className="object-fill w-[50%] h-[75%] " />
            </div>

            <div className='w-[50%] flex flex-col mt-[21px]'>
                <Grid container spacing={2} xs={12} >
                    <Grid item xs={12} sx={{ height: "10%" }}>

                        <Typography variant='productTitle' >
                            <a href={`/products/${data.id}`}>
                                {data?.name}
                            </a>
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sx={{ height: "45%" }}>
                        <div className='flex flex-row mt-[16px] gap-1'>
                            <Typography variant="productCard">
                                Design:
                            </Typography>
                            <Typography variant="overheadFont">
                                overhead, closed
                            </Typography>

                        </div>


                        <div className='flex flex-row mt-[20px]  gap-1'>
                            <Typography variant="productCard">
                                Connection type:
                            </Typography>
                            <Typography variant="overheadFont">
                                combined, 3.5mm, Bluetooth v w5.0
                            </Typography>
                        </div>

                    </Grid>
                    <Grid item xs={12} sx={{ height: "15%" }}>
                        <div className='flex flex-row justify-start items-center gap-3'>
                            <Icons.SvgIconPriceSM />
                            {data?.sale ? (
                                <>
                                <Typography variant='priceOutside' sx={{ color: "red" }}>
                                    ${(data?.price - data?.price * (data?.sale || 0) / 100)}
                                </Typography>
                                <Typography variant='saleFont'>
                                    ${data?.price}
                                </Typography>
                                </>

                            ) : (
                                <Typography variant='priceOutside'>
                                    ${data?.price}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className='w-[200px] flex flex-col justify-center mt-[21px]'>
                <Grid container spacing={2} className="h-full">
                    <Grid item xs={12}>
                        <div className='flex flex-row justify-center gap-6'>
                            <Icons.SvgIconViews />
                            <Typography variant='productStatsInside'>
                                {data?.views_count}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='flex flex-row justify-center gap-6'>
                            <Icons.SvgIconFavMini />
                            <Typography variant='productStatsInside'>
                                {data?.favorites_count}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='flex flex-row justify-center gap-6'>
                            <Icons.SvgIconLike />
                            <Typography variant='productStats'>
                                {data?.likes_count}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='flex flex-row justify-center gap-6'>
                            <Icons.SvgIconDislike />
                            <Typography variant='productStats'>
                                {data?.dislikes_count}
                            </Typography>
                        </div>
                    </Grid>

                </Grid>

            </div>
        </div>
    );
}

export default ListItem;