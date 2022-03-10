import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { searchResults } from '../../store/search';
import SearchBar from "./SearchBar";
import { allTasks } from "../../store/tasks";
import '../CSS/SearchPage.css'

const SearchPage = () => {
    const resultsObj = useSelector(state => state.search)
    const tasksObj = useSelector(state => state.tasks)
    const search = useLocation().search
    const q = new URLSearchParams(search).get('q')
    const dispatch = useDispatch()

    const results = Object.values(resultsObj)

    const [input, setInput] = useState('')
    const history = useHistory()

    useEffect(() => {
        dispatch(searchResults(q))
    }, [dispatch, q])

    // const submitSearch = async (e) => {
    //     e.preventDefault()
    //     const search = { search: input}
    //     if (input) {
    //         await dispatch(searchResults(search))
    //         setInput('')
    //         history.push(`/search/${input}`)
    //     }
    // }

    return (
        <div className="search-page">
            <SearchBar className='search-form'/>
            <h2> Search Results for {q} </h2>
            {results?.length === 0 &&
                <div>
                    <h2> No given task/animal by that name </h2>
                </div>
            }
            <div>
                {results?.length > 0 &&
                    results.map(result => (
                        <div>
                            <h2>{result?.animal}: {result?.name}</h2>
                            <NavLink to={`/tasks/${result.id}`}>
                                <img src={result?.pictures} className='search-img'/>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchPage
