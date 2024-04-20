type Props = {
  image: any;
};

const ThumbnailPreview = ({ image }: Props) => {
  return (
    <img
      className="w-[110px] h-[62px] object-cover col-start-2 justify-self-start border-2 border-primary-light rounded-md "
      src={image}
      alt="thumbnail"
    />
  );
};

export default ThumbnailPreview;
