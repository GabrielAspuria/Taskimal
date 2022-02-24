import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { searchResults } from '../../store/search';
import SearchBar from "./SearchBar";
import { allTasks } from "../../store/tasks";
import '../CSS/SearchPage.css'

const SearchPage = () => {
    const resultsObj = useSelector(state => state.search)
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const results = Object.values(resultsObj)

    const [input, setInput] = useState('')
    const history = useHistory()

    const submitSearch = async (e) => {
        e.preventDefault()
        const search = { search: input}
        if (input) {
            await dispatch(searchResults(search))
            setInput('')
            history.push(`/search/${input}`)
        }
    }

    return (
        <div className="search-page">
            <SearchBar className='search-form'/>
            <h2> Search Results </h2>
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
