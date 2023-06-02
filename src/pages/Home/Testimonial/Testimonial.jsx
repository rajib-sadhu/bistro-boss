
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { useEffect, useState } from 'react';

import comma from '../../../assets/icon/quotation-mark.png'

const Testimonial = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])

    return (
        <div>
            <SectionTitle
                heading={'Testimonial'}
                subHeading={'What Our Clients Say'}
            />
            <div className='my-20' >
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">


                    {
                        reviews.map(review => <SwiperSlide key={review._id} >


                            <div className='text-center mx-28 my-16 space-y-4'>
                                <Rating
                                    className='mx-auto'
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                />
                                <img className='w-20 mx-auto' src={comma} alt="" />
                                <p>{review.details}</p>
                                <h3 className='text-3xl text-orange-400' >{review.name}</h3>
                            </div>

                        </SwiperSlide>)
                    }


                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;