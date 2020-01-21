import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import {StylesProvider} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ViewDetails from "./viewDetail/ViewDetails";


type ApiRes = {
    results: Characters[]
    info: any
}

type Characters = {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
    image: string
    episode: [string]
    url: string
    created: string
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        // backgroundColor: "#E6E6E6",

        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },

    },
}));

const getCharacters = (page = 1, name: string = "") =>
    fetch(name == "" ? `https://rickandmortyapi.com/api/character/?page=${page}` : `https://rickandmortyapi.com/api/character/?name=+${name}+`, {
        headers: {Accept: 'application/json'},
    }).then<ApiRes>(res => res.json())

const getCharactersId = (id: number) => {
    return id
}

const App: React.FC = () => {
    const [characters, setCharacters] = React.useState<Characters[]>([])
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [inputCharacterName, setInputCharacterName] = React.useState("")

    React.useEffect(() => {
        let cancel = false
        setLoading(true)

        getCharacters(page, inputCharacterName).then(data => {
            if (!cancel) {
                if(data != null && data.results != null){
                    setCharacters(data.results.map(d => d))
                    setLoading(false)
                }
            }
        })

        return () => {
            cancel = true
        }
    }, [page, inputCharacterName])

    return (
        <StylesProvider injectFirst>
            <Router>
                <Switch>
                    <Route path="/users/:id">
                        <ViewDetails/>
                    </Route>
                    <Route path="/">
                        <div className="App">
                            <AppBar position="static" className={"MenuBar"}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={useStyles().menuButton}
                                        color="inherit"
                                        aria-label="open drawer"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography className={useStyles().title} variant="h6" noWrap>
                                        Material-UI
                                    </Typography>
                                    <div className={useStyles().search}>
                                        <div className={useStyles().searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Enter character's name ..."
                                            classes={{
                                                root: useStyles().inputRoot,
                                                input: useStyles().inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={(e) => setInputCharacterName(e.target.value)}
                                            value={inputCharacterName}
                                        />
                                    </div>
                                </Toolbar>
                            </AppBar>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <List id={"rickAndMortyListView"}>
                                    {characters.map(character => {
                                        return (
                                            <Link to={"/users/" + getCharactersId(character.id)} key={character.id}>
                                                <ListItem key={character.id} button>
                                                    <ListItemAvatar>
                                                            <Avatar
                                                                alt={`Avatar n°${character.id}`}
                                                                src={`${character.image}`}
                                                            />
                                                    </ListItemAvatar>
                                                    <p className={"TextListView"}>{character.name}</p>
                                                </ListItem>
                                            </Link>
                                        );
                                    })}
                                </List>
                            )}
                            <footer className={"Footer"}>
                                <div className={"CenterButton"}>
                                    <Button classes={{root: "ButtonStyle"}} variant="contained" color="primary"
                                            disabled={loading || inputCharacterName !=""}
                                            onClick={() => setPage((page - 1) < 0 ? page : page - 1)}>
                                        Previous
                                    </Button>
                                    <Button classes={{root: "ButtonStyle"}} variant="contained" color="primary"
                                            disabled={loading || inputCharacterName !=""}
                                            onClick={() => setPage((page + 1) > 25 ? page : page + 1)}>
                                        Next
                                    </Button>
                                </div>
                            </footer>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </StylesProvider>
    )
};

export default App