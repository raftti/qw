"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import api from "../api/api";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Gallery from "../components/Gallery";
import styles from "./event-page.module.css";


function MsecToString({ time }) {
  let mins = Math.round(time / 60000);
  const hours = Math.floor(mins / 60);

  mins %= 60;
  if (mins < 10) mins = "0" + mins;
  return (
    <h1 className={styles.h1}>
      Продолжительность:
      <div className={styles.timeContainer}>
        <div className={styles.timeContainer}>
          <span className={styles.colorBlack}>{" " + hours + " "}</span>
          <h5>Часа(ов)</h5>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.colorBlack}>{" " + mins + " "}</span>
          <h5 className={styles.h}>Минут(ы)</h5>
        </div>
      </div>
    </h1>
  );
}

const EventPage = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchEvent = () => {
      if (router.query.id) {
        api.getEventById(router.query.id).then((res) => {
          setEventData(res);
          setCoordinates([res.longitude, res.latitude] );
        });
      }
    };

    fetchEvent();
  }, [router.query.id]);

  return (
    <>
      <div className={styles.logoWrapper}>
        <div className={styles.logoSubWrapper}>
          <img className={styles.logo} src="/logo.png" alt="Логотип" />
        </div>
      </div>
      {eventData && (
        <div className={styles.wrapper}>
          <>
            <div className={styles.imagesContainer}>
              <div className={styles.imageContainer}>
                <div className={styles.galleryWrapper}>
                  <Gallery
                    inlineStyles={{
                      width: "100%",
                      aspectRatio: "4/3",
                      padding: 0,
                      imageFit: "cover",
                    }}
                    carousel={{
                      spacing: 10,
                      padding: 0,
                    }}
                    slides={eventData.photosUrl}
                  />
                </div>
                <h1 className={styles.h1}>
                  Событие:
                  <span className={styles.colorBlack}>
                    {" " + eventData.event}
                  </span>
                </h1>
              </div>
              <div className={styles.mapContainer}>
                <div className={styles.mapWrapper}>
                  <YMaps>
                    <Map
                      defaultState={{
                        center: coordinates
                          ? coordinates
                          : [55.751574, 37.573856],
                        zoom: 13,
                      }}
                      className={styles.map}
                    >
                      <Placemark
                        defaultGeometry={
                          coordinates ? coordinates : [55.751574, 37.573856]
                        }
                      />
                    </Map>
                  </YMaps>
                </div>
                <div className={styles.descWrapper}>
                  <div className={styles.buttonCont}>
                    <a
                      href="https://play.google.com/store/apps/details?id=dev.platovco.letsgo&pli=1"
                      className={styles.buttonPlMarket}
                    >
                      PlayMarket
                      <div className={styles.buttonArrow}>›</div>
                    </a>
                    <a
                      href="/static/mobileApp.apk"
                      download
                      className={styles.buttonDownload}
                    >
                      Скачать apk
                    </a>
                  </div>

                  <div className={styles.creatorContainer}>
                    <h1>{eventData.creator.name}</h1>
                    <img
                      className={styles.creatorImage}
                      src={eventData.creator.photoUrl}
                      alt=""
                    />
                  </div>
                  <div className={styles.descContainer}>
                    <h1 className={styles.h1}>
                      Адрес:
                      <span className={styles.colorBlack}>
                        {" " + eventData.address}
                      </span>
                    </h1>
                    <h1 className={styles.h1}>
                      Цена:
                      <span className={styles.colorBlack}>
                        {" " + eventData.price}
                      </span>
                    </h1>
                    <MsecToString time={Number(eventData.duration)} />
                    <h1 className={styles.h1}>
                      Описание:
                      <span className={styles.colorBlack}>
                        {" " + eventData.desc}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default EventPage;
