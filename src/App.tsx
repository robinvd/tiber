import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    name: "test1",
    location: [50, 10],
    items: [
      {
        image: "location1/image1.png",
        text: "was subsequently combined with the original Chigi one. Nowadays the main rooms of the villa are open to visitors and it accomodates the Accademia dei Lincei - a Roman academy of sciences. The pictures below show how the villa and the banks looked before the construction of the Lungotevere and the new river banks in the 19. century. Our intervention draws on the history of the vividarium(”pleasure garden”) and the loggias that overlooked the river in the past, making use of the new urban situation.The reconstruction of the banks opened up the strip between Ponte Mazzoni and Ponte Sisto - one no longer needs to be an esteemed guest of the Villa owner to enjoy a stroll near the water.Inspired by the idea of a vividarium and the new element of accessability we aim to improve the accessability to the banks and to llow for seating along the water, echoing not the physical state but the acticities which used to happen.Sitting opportunities would also allow visitors to enjoy the live music played on Ponte Sisito or Piazza della Fontana which remind of the Loggia and its music. On the left: A map of the Villa’s gardens by C.Frommel.Marked in green is the original lot of Agostino Chigi, in white the lot of the Farnese family. Numbers 6 and 11 demarc loggias. On the left: a view of Ponte Sisto and the Villa Farnesina lot by G.Vasi in the XVIII century.Marked in red is one of two loggias looking over the river where the Farnese family used to organize fests.Today it has been demolished along with a big portion of the gardens of the Villa. About the drawings: Giuseppe Vasi was a Sicilian artist who moved to Rome early on in his career and is most famous for his series of etchings depicting Rome published between 1743 and 1771. Today they constitute an important historical source on 18th century Rome.",
      },
      {
        image: "location1/image2.png",
        text: "In yellow: the demoloished part of the coast between Ponte Mazzini and Ponte Sisto About the map: The Forma Urbis was a series of maps produced by the Italian archeologist Rodolfo Lanciani between 1893 and 1901 and contains a juxtaposition of contemporaneous buildings and roads(in red) with known roman ruins dating up to the VI century.AD. (in black).Visible in light blue is the percourse of the Lungotevere street of today.",
      },
    ],
  },
  {
    name: "test2",
    location: [50, 94],
    items: [
      {
        image: "location2/image1.png",
        text: "1625 The fluvial transport of the city in the region of Porta Portes, before the construction of the Ripa Grande harbor. Drawing by Giovanni Maggi",
      },
      {
        image: "location2/image2.jpg",
        text: "1711 The harbor and its surroundings before the construction of the Ospizio di San Michele. Painting by Gaspar van Wittel",
      },
    ],
  },
]

function ImageView(props: { current: number, currentImage: number, setCurrentImage: (x: number) => void }) {
  const next = (offset: number) => {
    let newVal = props.current + offset;
    newVal = Math.max(newVal, 0);
    newVal = Math.min(newVal, LocationData.length - 1);
    props.setCurrentImage(newVal);
  }
  return (
    <div className="block image-view-full">
      <div className="image-view">
        {LocationData[props.current].items.map((item, index) => {
          return <img src={item.image} key={100 * props.current + index} style={{ display: index === props.currentImage ? "inline" : "none" }} />
        })}
      </div>
      <div>
        {props.currentImage + 1} / {LocationData[props.current].items.length}
        <button onClick={() => next(-1)}>prev</button>
        <button onClick={() => next(1)}>next</button>
      </div>
    </div>

  )
}

function TextView(props: { current: number, currentImage: number }) {
  return <div className="text-view block"><p>{LocationData[props.current].items[props.currentImage].text}</p></div>
}

function MapView(props: { current: number, setCurrent: (x: number) => void }) {
  const next = (offset: number) => {
    let newVal = props.current + offset;
    newVal = Math.max(newVal, 0);
    newVal = Math.min(newVal, LocationData.length - 1);
    props.setCurrent(newVal);
  }
  return (
    <div className="map-sidebar block borders-horizontal">
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
      <div>
        {props.current + 1} / {LocationData.length}
        <button onClick={() => next(-1)}>prev</button>
        <button onClick={() => next(1)}>next</button>
      </div>
    </div>
  )
}

function InfoView(props: { current: number }) {
  let [currentImages, setCurrentImages] = useState<Record<number, number>>({});
  const currentImage = currentImages[props.current] || 0;
  const setCurrentImage = (n: number) => {
    setCurrentImages((items) => {
      const newItems = {...items};
      newItems[props.current] = n
      return newItems
    })
  }
  return (
    <div className="info-view borders-horizontal">
      <ImageView current={props.current} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      <TextView current={props.current} currentImage={currentImage} />
    </div>
  )
}

function App() {
  let [current, setCurrent] = useState(0)
  return (
    <div className="App borders">
      <MapView current={current} setCurrent={setCurrent} />
      <InfoView current={current} />
    </div>
  )
}

export default App;
