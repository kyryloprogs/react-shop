import { Grid, Typography } from "@mui/material";
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

const ListItemShort = (props: any) => {

    console.log(props)
    const [data, setData] = useState<ItemData>(props.props);

    const updateFav = () => {
        axios.patch(`http://localhost:4500/favorites/${data.id}`, {
            favorite: data?.userID
        }).then((e) => {
            console.log(e.data?.userID);
            data.userID = e.data?.userID;
        }).catch((e) => {
            console.log(`Error: ${e}`);
        })

    }

    return (
        // <Grid container spacing={2}>
        <Grid item xs={4} className="flex flex-row items-center justify-center">
            <div className="w-[50%]">
                <div className="bg-[#766ED3]  h-[50px] flex flex-row items-center justify-center">
                    {data.userID ? (
                        <Icons.SvgIconFavMini />
                    ) : (
                        <Icons.SvgIconNonFavorite />
                    )}
                </div>
                <div className="bg-white  h-[420px] flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-start items-start">
                    <Typography variant="priceOutside" sx={{ fontWeight: "bold",  }}>
                        <a href={`/products/${data.id}`}>
                            {data?.name}
                        </a>
                    </Typography>
                    </div>

                    <div>
                        <Icons.SvgIconPrice mini="32px" />
                        <Typography variant="priceOutside">
                            ${data.price}
                        </Typography>
                    </div>
                    {/* <div> */}
                        <div className='w-[162px] h-[196px] mt-[13px] mb-[10px] flex flex-row items-center justify-center'>
                            <img src={data?.main_img} alt="id" className="object-fill w-full h-full " />
                        </div>
                    {/* </div> */}
                    <Grid container spacing={2} className="">
                        <Grid item xs={6} className="flex flex-row items-center justify-center gap-[11px]">
                            <Icons.SvgIconViews />
                            <Typography variant="productStatsInside">
                                {data.views_count}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className="flex flex-row items-center justify-center gap-[18px]">
                            <Icons.SvgIconLike />
                            <Typography variant="productStatsInside">
                                {data.likes_count}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className="flex flex-row items-center justify-center gap-[13px]">
                            <Icons.SvgIconFavMini />
                            <Typography variant="productStatsInside">
                                {data.favorites_count}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className="flex flex-row items-center justify-center gap-[18px]">
                            <Icons.SvgIconDislike />
                            <Typography variant="productStatsInside">
                                {data.dislikes_count}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </Grid>
        // </Grid>
        // <div className='w-[90%] h-[274px] mb-[35px] bg-white m-auto flex flex-row justify-between rounded-extrumsDefault'>
        //     <div className='w-[50px] h-full flex bg-[#766ED3] flex-col items-center justify-center' onClick={() => { updateFav() }}>

        //     </div>

        //     <div className=' w-[27%] h-full flex flex-row items-center justify-center'>
        //         <img src={data?.main_img} alt="id" className="object-fill w-[50%] h-[75%] " />
        //     </div>

        //     <div className='w-[50%] flex flex-col mt-[21px]'>
        //         <Grid container spacing={2} xs={12} >
        //             <Grid item xs={12} sx={{ height: "10%" }}>
        //                 <Typography variant='productTitle'>
        //                     {data?.name}
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12} sx={{ height: "45%" }}>
        //                 <div className='flex flex-row mt-[16px] gap-1'>
        //                     <Typography variant="productCard">
        //                         Design: 
        //                     </Typography> 
        //                     <Typography variant="overheadFont">
        //                         overhead, closed
        //                     </Typography>

        //                 </div>


        //                 <div className='flex flex-row mt-[20px]  gap-1'>
        //                     <Typography variant="productCard">
        //                         Connection type:
        //                     </Typography>
        //                     <Typography variant="overheadFont">
        //                         combined, 3.5mm, Bluetooth v w5.0
        //                     </Typography>
        //                 </div>

        //             </Grid>
        //             <Grid item xs={12} sx={{ height: "15%" }}>
        //                 <div className='inline-flex gap-3'>
        //                     <Icons.SvgIconPriceSM />
        //                     <Typography variant='priceOutside'>
        //                         ${data?.price}
        //                     </Typography>
        //                 </div>
        //             </Grid>
        //         </Grid>
        //     </div>

        //     <div className='w-[200px] flex flex-col justify-center mt-[21px]'>
        //         <Grid container spacing={2} className="h-full">
        //             <Grid item xs={12}>
        //                 <div className='flex flex-row justify-center gap-6'>
        //                     <Icons.SvgIconViews />
        //                     <Typography variant='productStatsInside'>
        //                         {data?.views_count}
        //                     </Typography>
        //                 </div>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <div className='flex flex-row justify-center gap-6'>
        //                     <Icons.SvgIconFavMini />
        //                     <Typography variant='productStatsInside'>
        //                         {data?.favorites_count}
        //                     </Typography>
        //                 </div>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <div className='flex flex-row justify-center gap-6'>
        //                     <Icons.SvgIconLike />
        //                     <Typography variant='productStats'>
        //                         {data?.likes_count}
        //                     </Typography>
        //                 </div>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <div className='flex flex-row justify-center gap-6'>
        //                     <Icons.SvgIconDislike />
        //                     <Typography variant='productStats'>
        //                         {data?.dislikes_count}
        //                     </Typography>
        //                 </div>
        //             </Grid>

        //         </Grid>

        //     </div>
        // </div>
    );
}

export default ListItemShort;