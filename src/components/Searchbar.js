import React, { useState, useRef, useEffect } from "react";
import data from "../data";
import './Searchbar.css';

const Searchbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);
    const [cursor, setCursor] = useState(-1);

    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    },[])

    const showSuggestion = () => setIsVisible(true);

    const hideSuggestion = () => setIsVisible(false);

    const handleClickOutside = (event) => {
        if(searchContainer.current && !searchContainer.current.contains(event.target)){
            hideSuggestion()
        };
    };

    const handleOnChange = (e) => {
        const searchedWord = e.target.value;
        const newArray = data.filter(value => {
            return value.toLowerCase().includes(searchedWord.toLowerCase());
        });
        setFilteredArray(newArray)
    }

    const handleKeyBoardNavigation = (e) => {
        if(e.key === "ArrowDown"){
            isVisible ? 
                    setCursor(preValue => (preValue < filteredArray.length - 1 ? preValue + 1 : preValue)) :
                    showSuggestion();
        }
        if(e.key === "ArrowUp"){
            setCursor(preValue => (preValue > 0 ? preValue - 1 : 0))
        }
        if(e.key === "Escape"){
            hideSuggestion();
        }
        if(e.key === "Backslash"){
            console.log("uifieiuyiyie")
        }
    }

    return(
        <>
            <div className="search-container" ref={searchContainer}>
                {!isVisible && <i class="fa fa-search search-container--icon" aria-hidden="true"></i>}
                <input 
                    type="text" 
                    placeholder="Search here..." 
                    className="search-container--searchbar" 
                    onChange={handleOnChange}
                    onClick={showSuggestion}
                    onKeyDown={e => handleKeyBoardNavigation(e)}
                />
            </div>
            {isVisible && <div className="search-result" ref={searchResultRef}>
                {filteredArray.map((value,key) => {
                    return(
                        <div className={`list-group ${cursor === key ? "active" : ""}`} key={key} >
                            {value}
                        </div>
                    );
                })}
            </div>}
        </>
    )
}

export default Searchbar;