import { Box, Grid, Typography, BottomNavigation } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import ListItem from '../components/ListItem/ListItem';
import ListItemShort from '../components/ListItem/ListItemShort';
import Icons from '../components/UtilsComponents/Icons';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import instance from '../config/axios';
import { useCookies } from 'react-cookie';
import Breadcrumbs from './Breadcrumps';


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

type Props = Array<ItemData>

type PropsData = {
  fav: boolean
}
function MainPage({ fav }: PropsData) { // { options }: Props
  const [priceUp, setPriceUp] = useState<boolean>(true);
  const [visual, setVisual] = useState<boolean>(true);
  const [productList, setProductList] = useState<Props>();
  const params = useParams();

  const [searchParams] = useSearchParams();
  const [cookies] = useCookies(["bestproducts"]);


  useEffect(() => {
    const url = `/products/categories/${params.name}/${params.id && "/" + params.id}`;
    const urlfav = `/products/categories/favorites`;
    const query = searchParams.get('query');
    if (!query) {
      
      instance.get(fav ? urlfav : url, {
        headers: {
          Authorization: cookies.bestproducts,
        },
      })
        .then(e => {
          const data = e.data.data;
          setProductList(data);
        })
        .catch(e => console.log(e));
    } else {
      instance.get(`/search?query=${query}`)
        .then(e => {
          const data = e.data.data;
          setProductList(data);
        })
        .catch(e => console.log(e));
    }

  }, [searchParams, fav]);

  const handleClick = () => {
    setPriceUp(priceUp => !priceUp);

    if (productList) {
      const sortedList = [...productList]; // Создание нового массива
      sortedList.sort((a, b) => (priceUp ? a.price - b.price : b.price - a.price));
    
      // Установка отсортированного массива в состояние
      console.log(sortedList)
      setProductList(sortedList);
    }

  };
  
  return (
    <Box component="div" sx={{ flexGrow: 1, p: 3 }} >
      <Breadcrumbs />
      <div className='bg-white w-[90%] h-[85px] m-auto mb-[50px] flex flex-row items-center justify-start rounded-extrumsDefault'>
        
        {visual ? (
          <div className='ml-[26px] mr-[25px]' onClick={() => setVisual(visual => !visual)}>
            <Icons.SvgBlocks />
          </div>

        ) : (
          <div className='ml-[23px] mr-[17px]' onClick={() => setVisual(visual => !visual)}>
            <Icons.SvgLine />
          </div>
        )}
        

        <div className='bg-extrumsPurple ml-[17px] h-[46px] px-[11px] py-[9px] rounded-extrumsDefault text-white flex flex-row justify-center items-center' onClick={handleClick}>
          <Icons.SvgSort />
          <Typography variant='buttonLower'>
            Price
          </Typography>
          {priceUp ? <Icons.SvgTop color='white' /> : <Icons.SvgBottom color='white' />}
        </div>

        <div className='bg-extrumsPurple h-[46px] px-[11px] py-[9px] ml-[12px] rounded-extrumsDefault text-white'>
          {/* </> */}
          <RightSideBar text="" />
        </div>

        <div className='bg-extrumsPurple h-[46px] px-[11px] py-[9px] ml-[12px] rounded-extrumsDefault text-white'>
          <Typography variant='buttonLower'>
            {`Category: ${fav ? "Favorites" : params.name}`}
          </Typography>
        </div>
      </div>

      {visual ?
        (
          productList?.map((e: ItemData, index) => (
            <ListItem props={e} key={index} />
          ))
        )
        :
        (
          <Grid container spacing={2}>
            {productList?.map((e: ItemData, index) => (
              <ListItemShort props={e} key={index} />
            ))}
          </Grid>
        )
      }

      <BottomNavigation />
    </Box>

  )
}

export default MainPage