import { Fragment, useEffect, useState } from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Card, CardContent, CardMedia, CssBaseline, Drawer, Stack, ThemeOptions, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#607D8B',
    },
    secondary: {
      main: '#607D8B',
    },
    background: {
      paper: '#fafafa',
      default: '#CFD8DC',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Times New Roman',
  },
};

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
    location: [61, 139],
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
  {
    name: "Ex-Arsenale Clementino Pontificio",
    location: [53, 146],
    items: [
      {
        image: "location3/image1.jpg",
        text: "Pope Clement XI built the new papal arsenal, intended for the maintenance of the river boats, as well as the commercial papal ships. Its position just outside the excise city wall can be explained with the purpose to reduce the fiscal pressure on the materials used in maintenance activities. 1754- Represents the view of the Port of Ripa Grande ; Arsenale Pontificio on the Tiber in Rome with the Aventine on the right.",
      },
      {
        image: "location3/image2.jpg",
        text: "Flood of 1915",
      },
      {
        image: "location3/image3.jpg",
        text: "The launch of the pirodaga built in 1842 in the papal arsenals of Ripa Grande.It took place on November 30, 1842 in the river cantıere built by Gregory 16. out of porta portese",
      },
      {
        image: "location3/image4.png",
        text: "1906 With the construction of the embankments and the demolition of the Port, port activities move towards the arsenal.",
      },
      {
        image: "location3/image5.jpg",
        text: "As can be seen in a photo from the 70s, Arsenal used to be a warehouse as a repair shop. Today, it is preparing to host the Quadrianale Roma as an exhibition space. Before the Arsenal, it was once used as a warehouse for art. in 1798 as a warehouse for works of art stolen by the French from Napoleon, before sending them to France.",
      },
    ],
  },

]

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
    return <Card>
      <TwitterTimelineEmbed
        sourceType="profile" screenName="ciaotevere"
        autoHeight={false}
        noHeader={true}
        noFooter={true}
        noScrollbar={true}
      />
    </Card>
  }

  return (
    <Fragment>
      {LocationData.map((location, index) =>
        <Stack spacing={3} sx={{display: props.current === index ? 'initial' : 'none'}}>
          <Typography variant="h4">
            {location.name}
          </Typography>
          {location.items.map((item, index) =>
            <Card key={index} sx={{ maxWidth: 500 }} elevation={3}>
              <CardMedia
                component="img"
                src={item.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          )}
        </Stack>
      )}
    </Fragment>
  );
}

const drawerWidth = 600;

function App() {
  let [current, setCurrent] = useState<number | null>(null)
  const next = () => {
    setCurrent((current) => {
      if (current === null) {
        return 0
      } else {
        return Math.min(current + 1, LocationData.length - 1)
      }
    })
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current])
  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <Container sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Container>
              <Typography variant="h6" noWrap component="div">
                CIAOTEVERE
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <MapView current={current} setCurrent={setCurrent} />
          </Box>
        </Drawer>
        <Container component="main" sx={{ flexGrow: 1, p: 3, minWidth: 550 }}>
          <Toolbar />
          <InfoView current={current} next={next} />
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
