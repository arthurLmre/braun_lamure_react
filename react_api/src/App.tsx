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
            <div className="App">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <List>
                        {characters.map(character => {
                            return (
                                <ListItem key={character.id} button>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${character.id}`}
                                            src={`${character.image}`}
                                        />
                                    </ListItemAvatar>
                                    <p>{character.name}</p>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
                <footer className={"Footer"}>
                    <div className={"CenterButton"}>
                        <Button classes={{root: "ButtonStyle"}} variant="contained" color="primary" disabled={loading}
                                onClick={() => setPage(page - 1)}>
                            Previous
                        </Button>
                        <Button classes={{root: "ButtonStyle"}} variant="contained" color="primary" disabled={loading}
                                onClick={() => setPage(page + 1)}>
                            Next
                        </Button>
                    </div>
                </footer>
            </div>
        </StylesProvider>
        <Router>
            <Switch>
                <Route path="/users/:id">
                    <ViewDetails/>
                </Route>
                <Route path="/users">
                    <div className="App">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                               characters.map(character => <Link to={"/users/" + getCharactersId(character.id)} key={character.id}>{character.name}</Link>)
                        )}
                        <button disabled={loading} onClick={() => setPage((page - 1) < 0 ? page : page - 1 )}>
                            Previous
                        </button>
                        <button disabled={loading} onClick={() => setPage((page + 1) > 25 ? page : page + 1 )}>
                            Next
                        </button>
                    </div>
                </Route>
            </Switch>
        </Router>
    )
};

const transformCharacters = (characters: Characters[]) => {
    return characters.map(character =>
        <p key={character.id} onClick={() => getCharactersId(character.id)}>{character.name}</p>
    )
}

export default App;