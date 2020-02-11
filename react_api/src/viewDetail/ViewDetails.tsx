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
                        <div className={"CenterDetails box-blue margin-top-25"}>
                            <h1 className={"text-style-title no-margin margin-top-25"}> {characters?.name} </h1>
                            <img className={"img-round margin-top-20"} src={characters?.image} alt={"image profile"}/>
                            <div className={"card-content margin-top-20"}>
                                <p className={"text-style-content no-margin margin-top-10"}> {characters?.species} </p>
                                <p className={"text-style-content no-margin margin-top-10"}> {characters?.location.name} </p>
                                <p className={"text-style-content no-margin margin-top-10 margin-bottom-10"}> {characters?.status} </p>
                            </div>
                            <button className={"back-btn text-style-btn margin-top-20 margin-bottom-10"} onClick={goBack}>Retour</button>
                        </div>
                    )}
                </Route>
            </Router>
        </StylesProvider>
    )
};

export default ViewDetails;