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
import './App.css';
import ViewDetails from "./viewDetail/ViewDetails";
import {AppBar, IconButton, InputBase, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

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

const getCharacters = (page = 1, limit = 2) =>
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
        headers: {Accept: 'application/json'},
    }).then<ApiRes>(res => res.json())

const getCharactersId = (id: number) => {
    console.log('id: ', id)
    return id
}


const App: React.FC = () => {
    const [characters, setCharacters] = React.useState<Characters[]>([])
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        let cancel = false
        setLoading(true)

        getCharacters(page).then(data => {
            if (!cancel) {
                console.log('data: ', data)
                setCharacters(data.results.map(d => d))
                setLoading(false)
            }
        })

        return () => {
            cancel = true
        }
    }, [page])

    return (
        <StylesProvider injectFirst>
            <Router>
                <Switch>
                    <Route path="/users/:id">
                        <ViewDetails/>
                    </Route>
                    <Route path="/">
                        <div className="App">
                            <AppBar position="static">
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={""}
                                        color="inherit"
                                        aria-label="open drawer"
                                    >
                                        {/*<MenuIcon />*/}
                                    </IconButton>
                                    <Typography className={""} variant="h6" noWrap>
                                        Rick & Morty
                                    </Typography>
                                    <div className={""}>
                                        <div className={""}>
                                            {/*<SearchIcon />*/}
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                // root: classes.inputRoot,
                                                // input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </Toolbar>
                            </AppBar>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <List>
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
                                            disabled={loading}
                                            onClick={() => setPage((page - 1) < 0 ? page : page - 1)}>
                                        Previous
                                    </Button>
                                    <Button classes={{root: "ButtonStyle"}} variant="contained" color="primary"
                                            disabled={loading}
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

export default App;