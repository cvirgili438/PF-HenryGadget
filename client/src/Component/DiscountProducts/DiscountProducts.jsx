import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductWithDiscount } from "../../Redux/Actions/products";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Navigation, Pagination } from "swiper";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BasicRating from "../FeaturedProducts/BasicRating";
import { AverageRating } from "../../Utils/Rating/controller";
import { Link } from 'react-router-dom';

function DiscountProducts() {
  const dispatch = useDispatch();
  const discountProducts = useSelector((state) => state.productsWithDiscount);
  useEffect(() => {
    dispatch(getProductWithDiscount());
  }, []);

  return (
    <section id='anchor-sales'
      style={{
        width: "100%",
        height: "25rem",
        marginBottom: '20rem',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          marginBottom: "4rem",
        }}
      >
        Sales
      </Typography>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{ height: "25rem", margin: "auto" }}
      >
        {discountProducts ? (
          discountProducts.map((e) => (
            <SwiperSlide
              key={e.id}
              style={{
                cursor: "grab",
                width: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: '20rem',
                  padding: "1rem",
                  // backgroundColor: "rgb(242,242,242)",
                  display: "flex",
                  borderRadius: "8px",
                  boxSizing: 'border-box',
                  transition:'all 200ms ease',
                  '&:hover':{
                    backgroundColor:'rgb(242,242,242)',
                    boxShadow:'0px 0px 4px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Link to={`/product/${e.id}`}>
                  <img
                    src={e.img[0]}
                    alt={e.name}
                    style={{
                      maxWidth: "16.6rem",
                      height: "16.6rem",
                      objectFit: "contain",
                    }}
                  />
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6">{e.name}</Typography>
                  <BasicRating valor={AverageRating(e.reviews)} />
                  {/* <Typography variant="subtitle1">
                    {e.description ? e.description : null}
                  </Typography> */}
                   <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            fontSize: "0.8rem",
                            textDecoration: 'line-through',

                          }}
                        >
                          ${e.price}
                        </Typography>
                        <Typography
                          variant="overline"
                          sx={{
                            fontSize: "1.2rem",

                          }}
                        >
                         ${Math.round((1 - e.discount / 100) * e.price)}
                        </Typography>
                      </Box>
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width:'100%',
                        justifyContent: "flex-end",
                      }}
                    >
                      <div style={{
                        backgroundColor:'rgb(0,0,0)',
                        display:'flex',
                        placeItems:'center',
                        borderRadius:'6px',
                        boxShadow: "1px 1px 0px rgba(0,0,0,0.5)",
                        height:'3rem',
                        padding:'10px',
                        justifyContent:'center',
                        maxWidth:'8rem'
                      }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight:'500',
                            color: "white",
                            boxSizing: 'content-box',
                          }}
                        >
                          {e.discount}% OFF
                        </Typography>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Swiper>
    </section>
  );
}

export default DiscountProducts;
