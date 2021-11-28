import React, { useState } from "react";
import data from "../data";
import './Searchbar.css';

const Searchbar = () => {
    const [filteredArray, setFilteredArray] = useState([]);
    const [hasFocus, setHasFocus] = useState(false);

    const handleOnChange = (e) => {
        const searchedWord = e.target.value;
        const newArray = data.filter(value => {
            return value.toLowerCase().includes(searchedWord.toLowerCase());
        });
        setFilteredArray(newArray)
    }

    const handleOnFocus = () => {
        setHasFocus(true)
    }

    const handleOnBlur = () => {
        setHasFocus(false)
    }

    const handleKeyBoardNavigation = (e) => {
        if(e.key === "ArrowDown"){
            console.log("arrow down")
        }
        if(e.key === "ArrowUp"){
            console.log("arrow up")
        }
    }

    return(
        <>
            <div className="search-container">
                {!hasFocus && <i class="fa fa-search search-container--icon" aria-hidden="true"></i>}
                <input 
                    type="text" 
                    placeholder="Search here..." 
                    className="search-container--searchbar" 
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyDown={handleKeyBoardNavigation}
                />
            </div>
            {hasFocus && <div className="search-result">
                {filteredArray.map((value,key) => {
                    return(
                        <div className="list-group" key={key}>
                            {value}
                        </div>
                    );
                })}
            </div>}
        </>
    )
}

export default Searchbar;