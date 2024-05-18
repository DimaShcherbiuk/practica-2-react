import { getPhotos } from "apiService/photos";
import { Button, Form, Loader, PhotosGallery, Text } from "components";
import { MyModal } from "components/MyModal/MyModal";
import { useEffect, useState } from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  //modal
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMoreBtn = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //modal
  const openModal = (url, alt) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && (
        <Button onClick={onLoadMoreBtn} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more"}
        </Button>
      )}
      <MyModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        modalUrl={modalUrl}
        modalAlt={modalAlt}
      />
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
