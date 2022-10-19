// container for single traffic image

const TrafficContainer = (trafficimage) => {
  const { ImageLink, Name } = trafficimage;
  return (
    <div className="trafficcontainer">
      <img src={ImageLink} />
      <p>{Name}</p>
    </div>
  );
};

export default TrafficContainer