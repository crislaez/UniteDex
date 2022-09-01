import { IonContent } from "@ionic/angular";
import { SwiperOptions } from "swiper";

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const emptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content?.scrollToTop(500);
}

export const sliceText = (text: string, slice: number) => {
  return text?.length > slice ? text?.slice(0, slice) + '...' : text;
}

export const getImage = (id) => {
  return `assets/images/${id}.jpg`;
}

export const itemNameFormat = (item): string => {
  return item?.replace(/ /g,'-')
}

export const getSliderConfig = (info:any): SwiperOptions => {
  return {
    slidesPerView: info?.length > 1 ? 2 : 1,
    spaceBetween: 20,
    // freeMode: true,
    pagination:{ clickable: true },
    lazy: true,
    preloadImages: false
  };
}

