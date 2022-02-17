import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const SearchPage = () => {
    const resultsObj = useSelector(state => state.search)
    console.log("RESULTS OBJ", resultsObj)

    const results = Object.values(resultsObj)
    console.log("RESULTS", results)

    return (
        <>
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
                            <h2>{result.animal}{result.category}</h2>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SearchPage
