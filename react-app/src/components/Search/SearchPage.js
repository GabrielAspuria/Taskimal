import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { searchResults } from '../../store/search';
import SearchBar from "./SearchBar";
import '../CSS/SearchPage.css'

const SearchPage = (props) => {
    const resultsObj = useSelector(state => state.search)
    const dispatch = useDispatch()

    const results = Object.values(resultsObj)

    const [input, setInput] = useState('')
    const history = useHistory()

    const submitSearch = async (e) => {
        e.preventDefault()
        const search = { search: input}
        console.log("SEARCH:",search)
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
                            <NavLink to={'/search'}>
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
