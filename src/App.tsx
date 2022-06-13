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
  color?: number,
  location?: [number, number],
  items: {
    image?: string,
    audio?: string,
    text: string | string[],
  }[],
}

const soundText = "The project “The sound of Tevere” by Celia Garrido, Eleni Dimakou, Leonie Cozzolino and Nina Pravst, deals with the relationship between the urban space at the top of the river walls and the banks directly by the water. The group has collected the sounds of the city life “above” and intends to play it at water level at chosen points, allowing it to mix with the natural sound of the water. Thereby they bring together two parts of the river experience, create an immaterial connection between the two altitude levels. Here you hear the sounds recorded on street level. To get the full experience, take a walk along the Tiber!"

const LocationData: Location[] = [
  {
    name: "Porto di Ripa Grande",
    location: [325, 638],
    items: [
      {
        text: "The Porto Fluviale di Ripa Grande was build in 1692 and used to be the main harbor of the city. In 1901, during the construction of the levees, the harbor and its two lighthouses were destroyed. Today, its former presence is only witnessed in the toponymy of the place and in the reconstruction of the two ramps that used to lead down to the water level.",
      },
      {
        image: "location2/image1.png",
        text: "1625 The fluvial transport of the city in the region of Porta Portes, before the construction of the Ripa Grande harbor. Drawing by Giovanni Maggi.",
      },
      {
        image: "location2/image2.jpg",
        text: "1711 The harbor and its surroundings before the construction of the Ospizio di San Michele. Painting by Gaspar van Wittel.",
      },
      {
        image: "location2/image3.jpg",
        text: "1750 The life on the harbor and the San Michele hospice. Engraving by Giovanni Battista Piranesi.",
      },
      {
        image: "location2/image4.png",
        text: "1888 Photography of the harbor and its lighthouse.",
      },
      {
        image: "location2/image5.jpeg",
        text: "Our intervention is based on the presence of the elevated promenade along the San Michele hospice and seeks to develop its potential. The promenade is reconnected to its history through a symbolic figure of the port, the lighthouse. The platform marking the site of the former lighthouse is used to host a café that extend to the outside and pulses along the promenade. In addition, a shade structure and street furniture are added, so that the promenade can be, again, a place where people meet, exchange news and stay.",
      }
    ],
  },
  {
    name: "Ex-Arsenale Clementino Pontificio",
    location: [291, 671],
    items: [
      {
        image: "location3/image1.jpg",
        text: "Pope Clement XI built the new papal arsenal, intended for the maintenance of the river boats, as well as the commercial papal ships. Its position just outside the excise city wall can be explained with the purpose to reduce the fiscal pressure on the materials used in maintenance activities. 1754 Represents the view of the Port of Ripa Grande; Arsenale Pontificio on the Tiber in Rome with the Aventine on the right.",
      },
      {
        image: "location3/image2.jpg",
        text: "Flood of 1915.",
      },
      {
        image: "location3/image3.jpg",
        text: "The launch of the pirodaga built in 1842 in the papal arsenals of Ripa Grande. It took place on November 30, 1842 in the river cantıere built by Gregory 16 out of Porta Portese.",
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
        text: "The projection of the ship launching activity, which is the Arsenale's strong relationship with the river in the past, and the use of existing platforms to observe the wall that is the exhibition screen of the Quadrianale di Roma",
      },
      {
        image: "location3/image7.png",
        text: "The planned platforms allow people to sit and stay along the riverbanks. From there, you will be able to enjoy a unique view not only on the projections recalling the Porto de Ripa Grande but also on the Emporium. This is an interesting point located right on the other side of the river, ruins that are being excavated and turned into an open-air museum.",
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
        text: "1752 View of the Piazza Giudea Drawing by Giuseppe Vasi.",
      },
      {

        image: "ghetto/image2.png",
        text: "1850 - 1880 The houses of the Via della Fiumara aggettanti sun Tevere Photography (Communal Archives). ",
      },
      {
        image: "ghetto/image3.png",
        text: "1887 Il Portico d'Ottavia Drawing form E. Roesler Franz.",
      },
      {
        image: "ghetto/image4.png",
        text: "Ricostruzione planimetrica del Ghetto ebraico Estratto da Il Ghetto - Benocci e Guidoni, 1993.",
      },
      {
        image: "ghetto/image5.jpg",
        text: [
          "Our intervention is situated on a more sensitive and cultural level. The idea is to recall the relationship that existed between the houses of the ghetto and the Tevere. Indeed, some houses had a boat entrance at the water level and were thus directly connected with the river. We suggest to use the surface of the levees to implement an artwork evoking the lost relationship between neighborhood and river.",
          "This visualisation of a possible intervention is based on an artwork made by Gert Sennema for the Jewish street in Groningen, the Netherlands. For this intervention we would ask Jewish artists to create art based on the heritage of the Ghetto."
        ]
      },
      {
        audio: "ghetto/sound.mp4",
        text: soundText,
      }
    ],
  },
  {
    name: "Castello di St. Angelo",
    location: [228, 364],
    items: [
      {
        text: "The Castello di Sant Angelo is a multilayered structure at the heart of which lies the Hadrian mausoleum built by imperator Hadrian between 123 and 139 A.D. It is one of the first buildings erected on the right side of the river. It was used as the resting place for the ruling imperators until 217 A.D. after which it eventually became a fortress. In the medieval ages, the structure changed hands between different important families until the Orsini. One of them became Pope Niccolò III under whose commission the Passetto di Borgo passage to the Vatican was built. From 1367 onwards, the Mausoleum became a defensive castle for the popes, even against the Napoleonic invasion. The military use of the castle stopped in 1901 when its restorations began.",
        image: "castello/image1.png",
      },
      {
        text: [
          "1667 Plan of Rome by Giovanni Battista Falda.",
          "In green – the contemporary pedestrian zone, a continuation of the horticulture to the south of the now demolished bastion.  ",
        ],
        image: "castello/image2.png",
      },
      {
        text: "1697 Plan of Rome by Antonio Barbey where the use of the waters of the Tiber for defense can be seen.",
        image: "castello/image3.png",
      },
      {
        text: [
          "1699 Numismata pontificum Romanorum quae a tempore Martini V. usque ad annum, depiction by Filippo Buonanni. ",
          "In yellow – the part of the defensive walls that has been demolished in the construction of the Lungotevere. ",
        ],
        image: "castello/image4.png",
      },
      {
        text: [
          "View of Piantumazione Lungotevere, pedestrian zone north of St. Angelo’s entrance.",
          "Nowadays, where two of the defensive Bastions have been destroyed, a beautiful pedestrian part has been freed to continue the historical development of opening up of the now obsolete defensive function of the mausoleum. Just as tourists can enter what was once a rather exclusive domain, they can also access a recreational free space where castle citizens might have once walked within the perimeter of the castle or outside of the city altogether.  ",
        ],
        image: "castello/image5.png",
      },
      {
        text: soundText,
        audio: "castel.mp4",
      },
    ],
  },
  {
    name: "Mattatoio di Testaccio",
    location: [265, 775],
    items: [
      {
        text: "The Mattatoio di Testaccio (slaughterhouse) has been planned and realized in 1889 by the architect Gioacchino Ersoch. This establishment substituted the slaughterhouses situated at the actual Piazza del Popolo, that had to be closed because they occasioned serious pollution of the water. The new Mattatoio was, at the time, one of the more modern slaughterhouse of Europe. They have been closed in 1975 and are now being re-used. They are hosting a popular music school, the MACRO museum and the Architecture Departement of the university Roma Tre."
      },
      {
        image: "mattatoio/image1.jpg",
        text: "1888 Project of the Mattatoio di Testaccio Drawings by Gioacchino Ersoch.",
      },
      {
        image: "mattatoio/image2.jpg",
        text: "1891 View of the slaughterhouse shortly after the construction Photography (Archivo Urbano Testaccio). ",
      },
      {
        image: "mattatoio/image3.png",
        text: "2015 View of the Caffè Tevere, small bar located in the enclosure wall of the Mattatoio and meeting point of the students. Photography by Marco Foschi.",
      },
      {
        image: "mattatoio/extra.jpg",
        text: "A visualisation of Mattatoio before the intervention.",
      },
      {
        image: "mattatoio/Mattatoio_intervention.jpg",
        text: "Our intervention proposes to re-value the parking space situated between the Mattatoio and the Tevere, together with the Lungotevere Testaccio. The parking area becomes a piazza and connects itself to the new green, pedestrian and cyclist friendly promenade. The Caffè Tevere plays the role of an activator for this new urban context.",
      },
      {
        audio: "mattatoio/audio.mp4",
        text: soundText,
      },
    ],
  },
  {
    name: "Palazzo Ricci-Sacchetti",
    location: [190, 427],
    items: [
      {
        image: "palazzo/image1.png",
        text: [
          "Frescoes, gilded globes and immersion into 16th-century architecture are some of the highlights of Rome’s centrally located Palazzo Sacchetti. Constructed as part of one of the city’s first urban planning projects, the late Renaissance building is located on the cobblestoned Via Giulia near the banks of the Tiber River.",
          "In 1754 Giuseppe Vasi published his fourth book of etchings with views of Roman monuments. It covered the main palaces and the most renowned streets. This view of Palazzo Sacchetti is actually a view of Via Giulia.",
        ]
      },
      {
        image: "palazzo/image2.png",
        text: "Palazzo Sacchetti is a palazzo in Rome, important for historical and artistic reasons. The building was designed and owned by Antonio da Sangallo the Younger and completed by Nanni di Baccio Bigio or his son Annibale Lippi. After Sangallo, the palace belonged among others to the Ricci, Ceoli and Sacchetti, important families of the Roman nobility.",
      },
      {
        image: "palazzo/image3.png",
        text: "We know the origins of the palace thanks to some sketches preserved at present in the Uffizi, but also to a passage in Le Vitedel Vasari: 'he refounded again in Rome, to defend himself from the floods when the Tiber swells, his house in strada Giulia'.",
      },
      {
        image: "palazzo/image4.jpg",
        text: "On the side towards the Lungotevere the palace ends with a loggia once overlooking the river, created by the Ceuli and modified by the Sacchetti, adorned with a colossal marble head (possibly Juno) and two mascarons. The loggia is the backdrop to a citrus garden.",
      },
      {
        image: "palazzo/image5.png",
        text: "Palazzo Ricci-Sacchetti. Rome, Via Giulia 66.",
      },
      {
        image: "palazzo/image6.jpg",
        text: "Inside view of the Nymphaeum In 1660 Carlo Rainaldi built a fine nymphaeum in the garden which is clearly visible in the Grand View of Rome. The garden had direct access to the River Tiber, but today it is almost strangled by the new street upon the high walls which were built in the 1880s to prevent floods. It regains its beauty when seen from the courtyard of the palace (photo taken during a FAI weekend).",
      },
      {
        image: "palazzo/image7.png",
        text: "A landscaping arrangement reminding of the lemon groves stretching towards Tevere; by creating a seating area.",
      },

    ],
  },
  {
    name: "Farnesia Garden",
    location: [236, 509], // ??
    items: [
      {
        text: "Villa Farnesina-Chigi was originally built outside of the city walls by the Sienese banker Agostino Chigi, and passed into the possession of the Farnese family in 1579. The Farnese family already owned a neighboring plot which was subsequently combined with the original Chigi one. Nowadays the main rooms of the villa are open to visitors and it accommodates the Accademia dei Lincei – a Roman academy of sciences.",
      },
      {
        image: "farnesina/image1.png",
        text: "XVIII century view of the Vila, etching by G. Vasi – the Villa’s gardens overlooked the river directly.",
      },
      {
        image: "farnesina/image2.png",
        text: [
          "On the left: A map of the Villa’s gardens by C. Frommel. Marked in green is the original lot of Agostino Chigi, in white the lot of the Farnese family.",
          "Numbers 6 and 11 demark loggias.",
          "On the right: a view of Ponte Sisto and the Villa Farnesina lot by G.Vasi in the XVIII century. Marked in red is one of two loggias looking over the river where the Farnese family used to organize fests. Today it has been demolished along with a big portion of the gardens of the Villa.",
        ]
      },
      {
        image: "farnesina/image3.png",
        text: [
          "1988 Forma Urbis from Rudolfo Lanciani – a comprehensive study of the whereabouts of ancient roman remains under modern day Rome.",
          "In yellow - the demolished part of the coast between Ponte Mazzini and Ponte Sisto.",
          "In red - contemporaneous buildings and roads.",
          "In black - Known roman ruins dating up to the VI century A.D.",
          "Visible in light blue is the course of the Lungotevere street of today.",
        ],
      },
      {
        image: "farnesina/image4.png",
        text: [
          "1748 Nolli plan of Rome.",
          "In red - the new percourse of the Lungotevere, in green - the banks next to the waterline.",
          "About the map: The Nolli plan of 1748 is the first accurate modern cartography of Rome. ",
        ],
      },
      {
        image: "farnesina/image5.png",
        text: [
          "The proposed intervention draws on the history of the vividarium (”pleasure garden”) and the loggias that overlooked the river in the past, making use of the ",
          "new urban situation. The reconstruction of the banks opened up the strip between Ponte Mazzoni and Ponte Sisto to the wide public - one no longer needs to be an",
          "esteemed guest of the Villa owner to enjoy a stroll or sit near the water. The intervention aim is to allow for seating along the water, echoing not the physical state but the activities which used to",
          "happen. Sitting opportunities would also allow visitors to enjoy the live music played on Ponte Sisto or Piazza della Fontana which remind of the Loggia and its music.",
        ]
      },
    ],
  },
  {
    name: "Emporium",
    location: [314, 668],
    items: [
      {
        text: "The Testaccio part of the roman initiative of a diffused museum – starts at the excavated part of the Roman Emporio – Rome’s second big port structure built between the 1st and 2nd century BC to replace the Port Tiberinus at the Foro Boario. Facilities for the storage and preservation of goods comprised the part of the new building complex overlooking the river - it is them that visitors can see nowadays. Any deliveries made at the ancient port in Ostia would arrive at Emporium to be redistributed throughout the city. After the fall of Rome, the area lost its function (which was taken on by the Porto di Ripa Grande) and slowly became rural, being used instead as a recreational space and more importantly for vineyards and vegetable gardens. It was in the 19th century that plans were first made to rebuild this part of Rome. The zone was used for industrial and residential buildings, of which nowadays only the latter remain still in use. If one wanders along the path of the diffused museum they can see some remains of the Emporium, including the arch of St. Lazzaro, thought to have been a part of a warehouse."
      },
      {
        text: "1901 Forma Urbis by Rodolfo Lanciani, reconstruction of the plan of Emporium. The yellow mark corresponds to the location of the diffused museum. Another important part of the complex, the Portico Aemilia, surved as a distributions centre for the goods entering the port and stretched for almost 500 m. A part of it is still visible in the building block between via Florio, via Giovanni Branca and via Rubattino. A hypothesis as to why it isn’t directly adjacent to the Emporio is that the distance helped mitigate the damages of seasonal flooding which the Emporio on the other hand was susceptible to. It was probably the raging Tiber waters that prompted most of the inner restructuring of the port during its operational time.",
        image: "emporium/image1.png"
      },
      {
        text: "Photograph taken during the excavation process in the XX century, the source is Info.roma.it.",
        image: "emporium/image2.png"
      },
      {
        text: "The excavated site today, photograph taken from Info.roma.it . The museum is only open on specific occasions.",
        image: "emporium/image3.png"
      },
    ],
  },
  {
    name: "Colonne delle Piene del Tevere",
    color: 2,
    location: [306, 318],
    items: [
      { text: "", image: "water/image1.jpg" },
      { text: "", image: "water/image2.jpg" },
      { text: "The two columns with the functions of hydrometers were installed together with the Fountain of the Navigators at Rome’s northern port of Ripetta in 1704 when the Port was replanned by Alessandro Specchi and Carlo Fontana. The whole composition was moved in 1875 and in 1930 it was reassembled at the Piazza del Porto di Ripetta where you can find it today. The plaques on the columns correspond to the water level during floods between 1495 al 175. A hand indicates the height reached by the floods of the Tiber, with the date and name of the reigning Pope. (As the street level today is some meters higher than the original level of the fountain, the heights are not absolute measures)." }
    ]
  },
  {
    name: "Fontana della Barcaccia",
    color: 2,
    location: [389, 307],
    items: [
      { text: "The fountain of the boat in Piazza di Spagna, executed by Pietro Bernini assisted by his son Gian Lorenzo, commemorates a boat dragged to the location during the flood of 1598 which reached 5 meters above the current street level. 18th century drawing by G.B. Piranesi.", image: "water/image3.jpg" },
    ]
  },
  {
    name: "Basilika di Santa Maria Sopra Minerva",
    color: 2,
    location: [336, 429],
    items: [
      { text: "", image: "water/image4.jpg" },
      { text: "", image: "water/image5.jpg" },
      { text: "Plaques dating as far back as the 15th century can be found on the southwest end of the church’s façade. Photos published on Google maps." },
    ]
  },
  {
    name: "Idrometro Largo S. Rocco",
    color: 2,
    location: [331, 319],
    items: [
      { image: "water/image6.jpg", text: "Originally, this hydrometer was installed at the Porto di Ripetta. It was installed on the church wall after the construction of the retention walls. Photo published on Wikipedia." },
    ]
  },
  {
    name: "Plaque of Santo Spirito in Sassia",
    color: 2,
    location: [143, 382],
    items: [
      {
        image: "water/image7.png", text: "The occasion for the commemorative plaque on the west façade of Santo Spirito in Sassia was the destructive flood of 1598, the same for which Bernini designed the Fontana della Barcaccia. Photo published on PassagiLenti.com"
      },
    ]
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
              style={{ left: location.location[0], top: location.location[1] + 5}}
              className={className}
              src={location.color ? "pointer2.png" : "pointer.png"}
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
                On this website, you will find marked spots on the map along the river Tiber in Rome that will bring you face to (digital)face with heritage.Do you want to explore the heritage of the river?Go ahead and click on one of the points, the website will show you, in chronological order, the changes that the river and the urban fabric went through.For the full experience, go for a walk along the Tiber and explore the points at the geographical location and try to envision the heritage (or maybe there is still evidence of it?!). Some of the spots on the maps have, as a final slide,  a visualisation that this project proposes for an intervention. The goal of the intervention is to make a connection between the heritage and nowadays Tiber. For those of you who are interested in exploring the traces of the Tevere in the contemporary urban fabric, you go can on a plaque hunt along the green route. Feel free to share your experience with the project and use @projectciaotevere on Twitter to be featured on the website!
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
