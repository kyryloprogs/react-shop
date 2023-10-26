import { Box, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation, useMatch } from "react-router-dom";
import ItemCard from '../components/ItemCard';

type Props = {
  category?: string
}
function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function GoodsPage({ category }: Props) {

  let location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x)
  console.log(pathnames);

  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
      <Stack spacing={2}>
        <Link to="/">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Link>
      </Stack>

      <ItemCard
        favorite={false}
        img={''}
        title={'Test Item'}
        design={'Desing'}
        additional={
          [
            {
              option: "connection",
              description: "description"
            }
          ]
        }
        price={123}
        watches={123}
        favcount={123}
        likes={123}
        dislikes={123}
      />
    </Box>

  )
}

export default GoodsPage;