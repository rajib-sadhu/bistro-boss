import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Category = () => {

    const slides = [
        {
            img: slide1,
            title: 'Salad'
        },
        {
            img: slide2,
            title: 'Pizza'
        },
        {
            img: slide3,
            title: 'Soups'
        },
        {
            img: slide4,
            title: 'Desserts'
        },
        {
            img: slide5,
            title: 'Salad'
        },
    ];

    return (
        <section>
            <SectionTitle
            heading={"Order online"}
            subHeading={'From 11:00am to 10pm'}
            />

            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-4"
            >
                {
                    slides.map((v,i)=>{
                        return(
                            <SwiperSlide key={i}  >
                                <img src={v.img} alt="" />
                                <h3 className="text-4xl uppercase text-center -mt-16 pb-16 text-white drop-shadow-2xl" >{v.title}</h3>
                            </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
        </section>
    );
};

export default Category;