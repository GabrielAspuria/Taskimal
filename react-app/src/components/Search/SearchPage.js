import { useSelector } from "react-redux";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SearchPage = () => {
    const resultsObj = useSelector(state => state.search)

    const results = Object.values(resultsObj)

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
                            <h2>{result?.animal} {result?.category}</h2>
                            <NavLink to={'/search'}>
                                <img src={result?.pictures}/>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SearchPage
