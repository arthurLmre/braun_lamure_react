import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    useParams
} from 'react-router-dom'
import {StylesProvider} from "@material-ui/core/styles";
import "./ViewDetails.css"

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
                    <div className={"CenterDetails"}>
                        <h1> {characters?.name} </h1>
                        <img src={characters?.image}/>
                    </div>
                </Route>
            </Router>
        </StylesProvider>
    )
};

export default ViewDetails;