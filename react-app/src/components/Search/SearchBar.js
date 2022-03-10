import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { searchResults } from '../../store/search';
import '../CSS/SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const history = useHistory()
    const search = useLocation().search
    const q = new URLSearchParams(search).get('q')

    useEffect(() => {
        dispatch(searchResults(q))
    }, [dispatch, q])

    const submitSearch = async (e) => {
        e.preventDefault()
        const search = { search: input}
        console.log("SEARCH:",search)
        if (input) {
            await dispatch(searchResults(search))
            setInput('')
            history.push(`/search?q=${input}`)
        }
    }

    return (
        <div className='search-container'>
            <form className='search-form' action='/search'>
                <input
                    type='search'
                    placeholder='Search for an animal or task!'
                    // value={input}
                    // onChange={(e) => setInput(e.target.value)}
                    className='search-field'
                    name='q'
                >
                </input>
                <button className="search-button"><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1645120735/Taskimal/searching-magnifying-glass_ktn6vm.png'/></button>
                {/* <button className="search-button"><i class="fa fa-search" aria-hidden="true"></i></button> */}
            </form>
        </div>
    )
}

export default SearchBar;
