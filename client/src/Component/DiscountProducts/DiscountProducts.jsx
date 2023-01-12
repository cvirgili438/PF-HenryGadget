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
        marginBottom: '5rem',
        marginTop: '4rem'
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
                  backgroundColor: "rgb(242,242,242)",
                  display: "flex",
                  borderRadius: "8px",
                  boxSizing: 'border-box'
                }}
              >
                <Link to={`/product/${e.id}`}>
                  <img
                    src={e.img[0]}
                    alt={e.name}
                    style={{
                      maxWidth: "15rem",
                      height: "15rem",
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
                        justifyContent: "space-around",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="overline"
                          sx={{
                            fontSize: "1rem",
                            textDecoration: 'line-through'
                          }}
                        >
                          ${e.price}
                        </Typography>
                        <Typography
                          variant="overline"
                          sx={{
                            fontSize: "1.8rem",
                          }}
                        >
                          ${Math.round((1 - e.discount / 100) * e.price)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          fontSize: "larger",
                          // backgroundColor:'rgb(161, 208, 246)',
                          backgroundColor: "rgb(207, 12, 35)",
                          color: "black",
                          padding: "5px",
                          // paddingRight: "10px",
                          marginTop: "2rem",
                          borderRadius: "10px",
                          boxShadow: "1px 1px 0px rgba(0,0,0,0.5)",
                          height: '4rem'
                        }}
                      >
                        {e.discount}% OFF
                      </Typography>
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
