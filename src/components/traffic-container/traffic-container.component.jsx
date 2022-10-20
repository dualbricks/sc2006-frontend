// container for single traffic image

const TrafficContainer = ({trafficImage}) => {
  const { ImageLink, Name } = trafficImage;
  return (
    <div className="trafficcontainer">
      <img src={ImageLink} alt=''/>
      <p>{Name}</p>
    </div>
  );
};

export default TrafficContainer