import { Fragment, useState } from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

interface Location {
  name: string,
  location?: [number, number],
  items: {
    image: string,
    text: string,
  }[],
}

const LocationData: Location[] = [
  {
    name: "Farnesina garden",
    location: [34, 90],
    items: [
      {
        image: "location1/image1.png",
        text: "You are standing in front of the gardens of Villa Farnesina-Chigi. Originally built outside of the city walls by the Sienese banker Agostino Chigi, the villa and its gardens passed into the possession of the Farnese family in 1579. The Farnese family already owned a neighboring plot which was subsequently combined with the original Chigi one. Nowadays the main rooms of the villa are open to visitors and it accomodates the Accademia dei Lincei - a Roman academy of sciences. The pictures below show how the villa and the banks looked before the construction of the Lungotevere and the new river banks in the 19. century. Our intervention draws on the history of the vividarium(”pleasure garden”) and the loggias that overlooked the river in the past, making use of the new urban situation.The reconstruction of the banks opened up the strip between Ponte Mazzoni and Ponte Sisto - one no longer needs to be an esteemed guest of the Villa owner to enjoy a stroll near the water.Inspired by the idea of a vividarium and the new element of accessability we aim to improve the accessability to the banks and to llow for seating along the water, echoing not the physical state but the acticities which used to happen.Sitting opportunities would also allow visitors to enjoy the live music played on Ponte Sisito or Piazza della Fontana which remind of the Loggia and its music. On the left: A map of the Villa’s gardens by C.Frommel.Marked in green is the original lot of Agostino Chigi, in white the lot of the Farnese family. Numbers 6 and 11 demarc loggias. On the left: a view of Ponte Sisto and the Villa Farnesina lot by G.Vasi in the XVIII century.Marked in red is one of two loggias looking over the river where the Farnese family used to organize fests.Today it has been demolished along with a big portion of the gardens of the Villa. About the drawings: Giuseppe Vasi was a Sicilian artist who moved to Rome early on in his career and is most famous for his series of etchings depicting Rome published between 1743 and 1771. Today they constitute an important historical source on 18th century Rome.",
      },
      {
        image: "location1/image2.png",
        text: "In yellow: the demoloished part of the coast between Ponte Mazzini and Ponte Sisto About the map: The Forma Urbis was a series of maps produced by the Italian archeologist Rodolfo Lanciani between 1893 and 1901 and contains a juxtaposition of contemporaneous buildings and roads(in red) with known roman ruins dating up to the VI century.AD. (in black).Visible in light blue is the percourse of the Lungotevere street of today.",
      },
      {
        image: "location1/image3.png",
        text: "In red - the new percourse of the Lungotevere, in green the banks next to the waterline About the map: The Nolli plan of 1748 is the first accurate modern cartography of Rome.",
      },
    ],
  },
  {
    name: "Porto di Ripa Grande",
    location: [33, 173],
    items: [
      {
        image: "location2/image1.png",
        text: "1625 The fluvial transport of the city in the region of Porta Portes, before the construction of the Ripa Grande harbor. Drawing by Giovanni Maggi",
      },
      {
        image: "location2/image2.jpg",
        text: "1711 The harbor and its surroundings before the construction of the Ospizio di San Michele. Painting by Gaspar van Wittel",
      },
      {
        image: "location2/image3.jpg",
        text: "1750 The life on the harbor and the San Michele hospice.",
      },
      {
        image: "location2/image4.png",
        text: "1888 Photography of the harbor and its lighthouse.",
      },
    ],
  },
]

function ImageView(props: { current: number, nextLocation: () => void }) {
  return (
    <div className="image-view">
      {LocationData[props.current].items.map((item, index) => {
        return <div className="image-view-item">
          <img src={item.image} key={100 * props.current + index} />
          <p>{item.text}</p>
        </div>
      })}
      {props.current !== LocationData.length - 1
        ? <button className="image-view-button" onClick={props.nextLocation}>next location</button>
        : <p className="image-view-button">this is the last location :)</p>
      }
    </div>
  )
}

function MapView(props: { current: number | null, setCurrent: (x: number) => void }) {
  return (
    <div className="map-sidebar borders-horizontal">
      <div className="map-with-pointers">
        <div className="map-img">
          <img src="map.png" />
        </div>
        {(LocationData.map((location, index) => {
          let className = "pointer-img"
          if (index === props.current) {
            className += " active"
          }
          if (location.location) {
            return <img
              key={index}
              style={{ left: location.location[0] / 100 * 600, top: location.location[1] / 100 * 600 }}
              className={className}
              src="pointer.png"
              onClick={() => props.setCurrent(index)}
            />
          } else {
            return ''
          }
        }))}
      </div>
      {/* <div>
        {props.current + 1} / {LocationData.length}
        <button onClick={() => next(-1)}>prev</button>
        <button onClick={() => next(1)}>next</button>
      </div> */}
    </div>
  )
}

function InfoView(props: { current: number | null, next: () => void }) {
  if (props.current === null) {
    return <div className="feed">
      <TwitterTimelineEmbed
        sourceType="profile" screenName="ciaotevere"
        autoHeight={true}
        noHeader={true}
        noFooter={true}
      />
    </div>
  }

  return (
    <div className="info-view borders-horizontal">
      <h1>{LocationData[props.current].name}</h1>
      <ImageView current={props.current} nextLocation={props.next} />
      {/* <TextView current={props.current} currentImage={currentImage} /> */}
    </div>
  )
}

function App() {
  let [current, setCurrent] = useState<number | null>(null)
  const next = () => {
    setCurrent((current) => {
      if (current === null) {
        return 0
      } else {
        return Math.min(current + 1, LocationData.length - 1)
      }})
  }
  return (
    <div className="App borders">
      <MapView current={current} setCurrent={setCurrent} />
      <InfoView current={current} next={next} />
    </div>
  )
}

export default App;
