import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchResults } from '../../store/search';
import '../CSS/SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const submitSearch = async (e) => {
        e.preventDefault()
        const search = { search: input}
        console.log("SEARCH:",search)
        if (input) {
            await dispatch(searchResults(search))
            setInput('')
            history.push('/search/')
        }
    }

    return (
        <div className='search-container'>
            <form onSubmit={submitSearch} className='search-form'>
                <input
                    type='search'
                    placeholder='Search for an animal or task!'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='search-field'
                >
                </input>
                <button className="search-button"><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1645120735/Taskimal/searching-magnifying-glass_ktn6vm.png'/></button>
                {/* <button className="search-button"><i class="fa fa-search" aria-hidden="true"></i></button> */}
            </form>
        </div>
    )
}

export default SearchBar;
