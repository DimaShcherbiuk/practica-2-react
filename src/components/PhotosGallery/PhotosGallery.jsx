import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ id, alt, src, avg_color }) => (
        <PhotosGalleryItem
          key={id}
          alt={alt}
          src={src}
          avg_color={avg_color}
          openModal={openModal}
        />
      ))}
    </Grid>
  );
};
