/* eslint-disable react-hooks/refs */
import { useContext, useRef, useState } from "react";
import "./Comments.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import GlobalContext from "../../../context/Context";
import TestimonialSkeleton from "../../../components/loadingComponents/TestimonialSkeleton";

export default function Comments() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([
    {
      firstname: "John",
      lastname: "Doe",
      userType: "Graohist",
      id: 1,
      title: "Men Wear",
      img: "main-images/category-main-images/man-wear.png",
      stars: 15,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Maria",
      lastname: "Oaly",
      userType: "Developer",
      id: 2,
      title: "Women Wear",
      img: "main-images/category-main-images/woman-wear.png",
      stars: 20,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Walter",
      lastname: "White",
      userType: "Drog dealer",
      id: 3,
      title: "Kids Wear",
      img: "main-images/category-main-images/kids-wear.png",
      stars: 45,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Hunt",
      lastname: "Karray",
      userType: "Cashier",
      id: 4,
      title: "Bags",
      img: "main-images/category-main-images/bags.png",
      stars: 30,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Koal",
      lastname: "Boj",
      userType: "Driver",
      id: 5,
      title: "Belts",
      img: "main-images/category-main-images/belts.png",
      stars: 35,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Lim",
      lastname: "Jert",
      userType: "Leader",
      id: 6,
      title: "Watches",
      img: "main-images/category-main-images/watches.png",
      stars: 35,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Trever",
      lastname: "",
      userType: "Seller",
      id: 7,
      title: "Accessories",
      img: "main-images/category-main-images/accessories.png",
      stars: 10,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
    {
      firstname: "Michel",
      lastname: "",
      userType: "Theif",
      id: 8,
      title: "Winter Wear",
      img: "main-images/category-main-images/winter-wear.png",
      stars: 25,
      comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, nisi quas excepturi dignissimos quo reprehenderit
                dolore eos sed ab, similique beatae unde quasi neque vitae
                quaerat commodi consequuntur tempora impedit. Natus qui nam
                nulla amet, et porro accusamus, corporis eligendi sunt optio
                voluptatibus explicabo sint quia praesentium excepturi
                adipisci blanditiis quam voluptatem numquam ipsam similique
                possimus deserunt saepe vitae. Adipisci! Nostrum culpa enim
                cupiditate sit? Consectetur dolorum in quo facilis soluta
                incidunt eius ducimus dolores error similique saepe illum
                ullam suscipit doloremque, quidem quibusdam hic fuga rem
                repudiandae corporis deserunt.`,
    },
  ]);

  const { loading } = useContext(GlobalContext);

  return (
    <div className="comments-main-container">
      <div className="comments-header">
        <div className="title-comments">
          <h1>Shop by Categories</h1>
        </div>
        <div className="change-comments">
          <button ref={prevRef} className="go-back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </button>
          <button ref={nextRef} className="go-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <TestimonialSkeleton />
              </SwiperSlide>
            ))
          : items.map((item) => {
              return (
                <SwiperSlide style={{ padding: 35 }} key={item.id}>
                  <div key={item.id} className="card-container-comments">
                    <div className="top-stars">
                      <img
                        src={`main-images/stars/${item.stars}.svg`}
                        alt="stars"
                      />
                    </div>
                    <div className="middle-content-comment">
                      <p>{item.comment}</p>
                    </div>
                    <div className="profile-comments">
                      <div className="profile-image">
                        <img
                          src="main-images/banner-main-images/banner.jpg"
                          alt="profile"
                        />
                      </div>
                      <div className="contact-info">
                        <h2>{item.firstname + " " + item.lastname}</h2>
                        <h3>{item.userType}</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}
