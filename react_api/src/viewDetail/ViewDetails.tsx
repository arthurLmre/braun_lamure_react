import React from 'react';
import {
    BrowserRouter as Router, Link,
    Route,
    useParams
} from 'react-router-dom'
import { StylesProvider } from "@material-ui/core/styles";
import "./ViewDetails.css"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

type ApiRes = {
    results: Characters[]
    info:any
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

const getCharacterById = (id: any) =>
    fetch(`https://rickandmortyapi.com/api/character/${id}`, {
        headers: { Accept: 'application/json' },
    }).then<Characters>(res => res.json())

const goBack = () => window.history.back();

const ViewDetails: React.FC = () => {
    const [characters, setCharacters] = React.useState<Characters>()
    const [loading, setLoading] = React.useState(false)
    let { id } = useParams()

    React.useEffect(() => {
        let cancel = false
        setLoading(true)

        getCharacterById(id).then(data => {
            if (!cancel) {
                console.log('data: ', data)
                setCharacters(data)
                setLoading(false)
            }
        })

        return () => {
            cancel = true
        }
    }, [])

    return (
        <StylesProvider injectFirst>
            <Router>
                <Route path="/users/:id">
                    {loading ? (
                        <div className="lds-ripple"><div></div><div></div></div>
                    ): (
                        <div className={"CenterDetails box-blue"}>
                            <h1 className={"text-style-title"}> {characters?.name} </h1>
                            <img className={"img-round"} src={characters?.image} alt={"image profile"}/>
                            <p className={"text-style-content"}> {characters?.species} </p>
                            <p className={"text-style-content"}> {characters?.location.name} </p>
                            <p className={"text-style-content"}> {characters?.status} </p>
                            <button className={"back-btn text-style-btn"} onClick={goBack}>Retour</button>
                        </div>
                    )}
                </Route>
            </Router>
        </StylesProvider>
    )
};

export default ViewDetails;