import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, Stack, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'api/snackbar';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// third-party
import Slider from 'react-slick';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// assets
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  HeartFilled,
  HeartOutlined,
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

import prod1 from 'assets/images/e-commerce/prod-1.png';
import prod2 from 'assets/images/e-commerce/prod-2.png';
import prod3 from 'assets/images/e-commerce/prod-3.png';
import prod4 from 'assets/images/e-commerce/prod-4.png';
import prod5 from 'assets/images/e-commerce/prod-5.png';
import prod6 from 'assets/images/e-commerce/prod-6.png';
import prod7 from 'assets/images/e-commerce/prod-7.png';
import prod8 from 'assets/images/e-commerce/prod-8.png';
import prod9 from 'assets/images/e-commerce/prod-9.png';

// types
import { SnackbarProps } from 'types/snackbar';
import { ThemeMode } from 'types/config';
import { Products } from 'types/e-commerce';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }: { product: Products }) => {
  const theme = useTheme();
  const products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];

  const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const [selected, setSelected] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setSelected(product && product?.image ? getImageUrl(`${product.image}`, ImagePath.ECOMMERCE) : '');
  }, [product]);

  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favourites',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    } as SnackbarProps);
  };

  const lgNo = matchDownLG ? 5 : 4;

  const ArrowUp = ({ currentSlide, slideCount, ...props }: any) => (
    <Box
      {...props}
      color="secondary"
      className={'prev' + (currentSlide === 0 ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        mr: 1.25,
        ...(!matchDownMD && { mb: 1.25, mr: 0 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {!matchDownMD ? (
        <UpOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      ) : (
        <LeftOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const ArrowDown = ({ currentSlide, slideCount, ...props }: any) => (
    <Box
      {...props}
      color="secondary"
      className={'next' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')}
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        ml: 1.5,
        ...(!matchDownMD && { mt: 1.25, ml: 0 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {!matchDownMD ? (
        <DownOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      ) : (
        <RightOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const settings = {
    rows: 1,
    vertical: !matchDownMD,
    verticalSwiping: !matchDownMD,
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: products.length > 3 ? lgNo : products.length,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />
  };

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={10} lg={9}>
          <MainCard
            content={false}
            border={false}
            boxShadow={false}
            shadow={false}
            sx={{
              m: '0 auto',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'grey.50' : 'secondary.lighter',
              '& .react-transform-wrapper': { cursor: 'crosshair', height: '100%' },
              '& .react-transform-component': { height: '100%' }
            }}
          >
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent>
                    <CardMedia
                      onClick={() => setModal(!modal)}
                      component="img"
                      image={selected}
                      title="Scroll Zoom"
                      sx={{ borderRadius: `4px`, position: 'relative' }}
                    />
                  </TransformComponent>
                  <Stack direction="row" className="tools" sx={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
                    <IconButton color="secondary" onClick={() => zoomIn()}>
                      <ZoomInOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => zoomOut()}>
                      <ZoomOutOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => resetTransform()}>
                      <RedoOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                  </Stack>
                </>
              )}
            </TransformWrapper>
            <IconButton
              color="secondary"
              sx={{ ml: 'auto', position: 'absolute', top: 5, right: 5, '&:hover': { background: 'transparent' } }}
              onClick={addToFavourite}
            >
              {wishlisted ? (
                <HeartFilled style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
              ) : (
                <HeartOutlined style={{ fontSize: '1.15rem' }} />
              )}
            </IconButton>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={2} lg={3} sx={{ height: '100%' }}>
          <Box
            sx={{
              '& .slick-slider': {
                display: 'flex',
                alignItems: 'center',
                mt: 2
              },
              ...(!matchDownMD && {
                display: 'flex',
                height: '100%',
                '& .slick-slider': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: { xs: 0, md: 3, lg: 1.25 },
                  width: { xs: 72, lg: 100 }
                },
                '& .slick-arrow': {
                  '&:hover': { bgcolor: theme.palette.grey.A200 },
                  position: 'initial',
                  color: theme.palette.grey[500],
                  bgcolor: theme.palette.grey.A200,
                  p: 0,
                  transform: 'rotate(90deg)',
                  borderRadius: '50%',
                  height: 17,
                  width: 19
                }
              })
            }}
          >
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Box key={index} onClick={() => setSelected(getImageUrl(`prod-${item}.png`, ImagePath.ECOMMERCE))} sx={{ p: 1 }}>
                  <Avatar
                    size={matchDownLG ? 'xl' : 'md'}
                    src={getImageUrl(`thumbs/prod-${item}.png`, ImagePath.ECOMMERCE)}
                    variant="rounded"
                    sx={{ m: '0 auto', cursor: 'pointer', bgcolor: theme.palette.grey[0], border: `1px solid ${theme.palette.grey[200]}` }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductImages;
