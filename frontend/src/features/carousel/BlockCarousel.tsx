import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {getCarousel} from "@/features/carousel/CarouselThunk";
import {loadingCarouselState, photoCarouselState} from "@/features/carousel/CarouselSlice";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {API_URl} from "@/consts";
import {Loader} from "@/components/Loader/Loader";


export const BlockCarousel = () => {
    const dispatch = useAppDispatch()
    const carousel = useAppSelector(photoCarouselState);
    const loadingCarousel = useAppSelector(loadingCarouselState);

    useEffect(() => {
        dispatch(getCarousel());
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <>
            <div>
                <div className="pt-[52px] text-center md:pt-[157px]">
                    <h1 className="text-cr-black text-[24px] font-bold  uppercase px-5 pb-[25px] md:text-[64px] md:pb-[16px]">Кыргызстанское
                        сообщество любителей тенниса</h1>
                    <p className="hidden md:block text-[36px] text-cr-gray-300 font-medium pb-[56px]">Искусство становиться первым!</p>
                </div>

                {
                    loadingCarousel ? (
                        <Loader/>
                    ) : (
                        <div className="mx-auto px-4 lg:px-[50px] mb-5">
                            <Slider {...settings}>
                                {carousel.map(img => (
                                    <div key={img._id} className="p-2">
                                        <img src={API_URl + "/" + img.image} alt={`${img._id}`}
                                             className="w-full h-auto rounded-lg object-cover"/>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )
                }
            </div>
        </>
    );
};