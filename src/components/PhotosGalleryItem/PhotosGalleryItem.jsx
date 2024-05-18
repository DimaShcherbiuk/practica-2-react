import { GridItem } from "..";
import style from "./PhotosGalleryItem.module.css";
export const PhotosGalleryItem = ({ alt, src, avg_color, openModal }) => {
  return (
    <GridItem>
      <div
        className={style.thumb}
        style={{
          backgroundColor: avg_color,
          borderColor: avg_color,
        }}
      >
        <img
          src={src.large}
          alt={alt}
          onClick={() => openModal(src.large, alt)}
        />
      </div>
    </GridItem>
  );
};
