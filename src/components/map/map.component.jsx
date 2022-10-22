import {Buffer} from 'buffer';
const Map = ({carpark, width, height}) => {
    const { Development,Location} = carpark;
    const coords = Location.coordinates
    const str = `<p>${Development}</p><a href="https://google.com/maps?q=${coords[1]},${coords[0]}" target="_blank">Click here to open in google maps</a>`
    console.log(str)
    const bs64 = Buffer.from(str,'utf8')
    console.log(bs64)
    const bs64String = bs64.toString('base64');
    let srcString = `https://www.onemap.gov.sg/minimap/mm.html?mapStyle=Night&zoomLevel=17&latLng=${coords[1]},${coords[0]}&ewt=${bs64String}&popupWidth=200&showPopup=True`
    return(
        <iframe title={Development} src={srcString} height={height} width={width} scrolling="no" frameborder="1" allowfullscreen="allowfullscreen"></iframe>
    )
}

export default Map;