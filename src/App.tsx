import { Fragment, useEffect, useState } from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Card, CardContent, CardMedia, CssBaseline, Drawer, Stack, ThemeOptions, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import useWindowDimensions from './utils';

const map_interaction = require('react-map-interaction');

const drawerWidth = 'min(944px, 50vw)';

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
    image?: string,
    audio?: string,
    text: string | string[],
  }[],
}

const LocationData: Location[] = [
  {
    name: "Farnesina garden",
    location: [216, 489],
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
    location: [325, 638],
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
        text: "1750 The life on the harbor and the San Michele hospice. Engraving by Giovanni Battista Piranesi",
      },
      {
        image: "location2/image4.png",
        text: "1888 Photography of the harbor and its lighthouse.",
      },
      {
        image: "location2/image5.jpeg",
        text: "our intervention",
      }
    ],
  },
  {
    name: "Ex-Arsenale Clementino Pontificio",
    location: [295, 665],
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
      {
        image: "location3/image6.jpg",
        text: "Our intervention",
      },
      {
        image: "location3/image7.png",
        text: "",
      },

    ],
  },
  {
    name: "Ghetto ebraico",
    location: [320, 525],
    items: [
      {
        text: "The Jewish ghetto was founded in 1555 under the authority of the Pope Paul IV.  The walls enclosing the ghetto went from the Portico d’Ottavia to the Ponte Fabricio, through Piazza Guide e Vicolo Cenci, for a total area of three hectares. The living conditions were very bad, the area being regularly flooded by the Tiber and overcrowded. The ghetto has been temporarily abolished during the Napolean occupation, but was restored with the comeback of the Papal State. The inhabitants of the ghetto had to wait 1888 to see the definitive demolition of the ghetto walls and the end of the controlling laws.",
      },
      {
        image: "ghetto/image1.jpg",
        text: "1752 View of the Piazza Giudea Drawing by Giuseppe Vasi",
      },
      {

        image: "ghetto/image2.png",
        text: "1850 - 1880 The houses of the Via della Fiumara aggettanti sun Tevere Photography(Communal Archives) ",
      },
      {
        image: "ghetto/image3.png",
        text: "1887 Il Portico d'Ottavia Drawing form E.Roesler Franz",
      },
      {
        image: "ghetto/image4.png",
        text: "Ricostruzione planimetrica del Ghetto ebraico Estratto da Il Ghetto - Benocci e Guidoni, 1993",
      },
      {
        image: "ghetto/image5.jpg",
        text: ["Our intervention is situated on a more sensitive and cultural level. The idea is to recall the relationship that existed between the houses of the ghetto and the Tevere. Indeed, some houses had a boat entrance at the water level and were thus directly connected with the river. We suggest to use the surface of the levees to implement an artwork evoking the lost relationship between neighborhood and river.",
          "This visualisation of a possible intervention is based on an artwork made by Gert Sennema for the Jewish street in Groningen, the Netherlands.For this intervention we would ask Jewish artists to create art based on the heritage of the Ghetto."]
      },
    ],
  },
  {
    name: "castel sant'Angelo",
    location: [228, 364],
    items: [],
  },
  {
    name: "Mattatoio di Testaccio",
    location: [265, 775],
    items: [
      {
        text:  "The Mattatoio di Testaccio (slaughterhouse) has been planned and realized in 1889 by the architect Gioacchino Ersoch. This establishment substituted the slaughterhouses situated at the actual Piazza del Popolo, that had to be closed because they occasioned serious pollution of the water. The new Mattatoio was, at the time, one of the more modern slaughterhouse of Europe. They have been closed in 1975 and are now being re-used. They are hosting a popular music school, the MACRO museum and the Architecture Departement of the university Roma Tre."
      },
      {
        image: "mattatoio/image1.jpg",
        text: "1888 Project of the Mattatoio di Testaccio Drawings by Gioacchino Ersoch",
      },
      {
        image: "mattatoio/image2.jpg",
        text: "1891 View of the slaughterhouse shortly after the construction Photography(Archivo Urbano Testaccio) ",
      },
      {
        image: "mattatoio/image3.png",
        text: "2015 View of the Caffè Tevere, small bar located in the enclosure wall of the Mattatoio and meeting point of the students Photography by Marco Foschi",
      },
      {
        image: "mattatoio/Mattatoio_intervention.jpg",
        text: "Our intervention proposes to re-value the parking space situated between the Mattatoio and the Tevere, together with the Lungotevere Testaccio. The parking area becomes a piazza and connects itself to the new green, pedestrian and cyclist friendly promenade. The Caffè Tevere plays the role of an activator for this new urban context.",
      },
    ],
  },
]

function getTexts(item: string | string[]): string[] {
  return (typeof item == 'string') ? [item] : item;
}

function MapView(props: { current: number | null, setCurrent: (x: number) => void }) {
  let { height } = useWindowDimensions();
  let [zoomState, setZoomState] = useState({
    scale: 1,
    translation: { x: 0, y: - (1169 - height) / 2 },
  });
  return (
    <map_interaction.MapInteractionCSS value={zoomState} onChange={(value: any) => setZoomState(value)} minScale={1} maxScale={3} translationBounds={{
      xMin: 600 - 944 * zoomState.scale,
      xMax: 0,
      yMin: height - 1169 * zoomState.scale,
      yMax: 0,
    }}>
      <div className="map-with-pointers" onClick={(event) => {
        // @ts-ignore
        const target = event.target.closest('.map-with-pointers');
        // @ts-ignore
        const { left, top } = target.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        console.log(Math.round(x - 25), Math.round(y - 50));
      }}>
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
              style={{ left: location.location[0], top: location.location[1] + 5 }}
              className={className}
              src="pointer.png"
              onClick={() => props.setCurrent(index)}
            />
          } else {
            return ''
          }
        }))}
      </div>
    </map_interaction.MapInteractionCSS>
  )
}

function InfoView(props: { current: number | null, next: () => void }) {
  return (
    <Fragment>
      {props.current === null ?
        <Stack spacing={3}>
          <Card sx={{ maxWidth: 500 }} elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Welcome to “Project Ciao Tevere”!
              </Typography>
              <Typography>
                On this website, you will find marked spots on the map along the river Tiber in Rome that will bring you face to (digital)face with heritage. Do you want to explore the heritage of the river? Go ahead and click on one of the points, the website will show you, in chronological order, the changes that the river and the urban fabric went through. For the full experience, go for a walk along the Tiber and explore the points at the geographical location and try to envision the heritage (or maybe there is still evidence of it?!). Some of the spots on the maps have, as a final slide,  a visualisation that this project proposes for an intervention. The goal of the intervention is to make a connection between the heritage and nowadays Tiber. Feel free to share your experience with the project and use @projectciaotevere on Twitter to be featured on the website!
                Go and explore!
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <TwitterTimelineEmbed
              sourceType="profile" screenName="ciaotevere"
              autoHeight={false}
              noHeader={true}
              noFooter={true}
              noScrollbar={true}
            />
          </Card>
        </Stack>
        : undefined
      }
      {LocationData.map((location, index) =>
        <Stack key={index} spacing={3} sx={{ display: props.current === index ? 'initial' : 'none' }}>
          <Typography variant="h4">
            {location.name}
          </Typography>
          {location.items.map((item, index) =>
            <Card key={index} sx={{ maxWidth: 500 }} elevation={3}>
              {item.image ? <CardMedia
                component="img"
                src={item.image}
                alt="green iguana"
              /> : undefined}
              <CardContent>
                <Box>
                  {getTexts(item.text).map((text, index) =>
                    <Typography key={index} variant="body2" color="text.secondary">
                      {text}
                    </Typography>
                  )}
                </Box>
                {item.audio ?
                  <AudioPlayer
                    src={item.audio}
                    onError={(e) => console.log(e)}
                    // autoPlay={true}
                    showSkipControls={false}
                    showJumpControls={false}
                    hasDefaultKeyBindings={false}
                  />
                  : undefined
                }
              </CardContent>
            </Card>
          )}
        </Stack>
      )}
    </Fragment>
  );
}

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
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, minHeight: 64 }}>
          <Toolbar>
            <Container sx={{ textAlign: 'center' }}>
              <Typography variant="h4" noWrap component="div">
                CIAO TEVERE!
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
