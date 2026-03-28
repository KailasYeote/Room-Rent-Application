import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
// ✅ FIX: Provide a default value to prevent crashes
const SearchContext = createContext({
    search: "",
    setSearch: () => { }, // A dummy function
    sortOrder: "",
    setSortOrder: () => { } // A dummy function
});

// 2. Create a "Provider" component that will hold the state
export function SearchProvider({ children }) {
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const value = {
        search,
        setSearch,
        sortOrder,
        setSortOrder
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

// 3. Create a custom "hook" to easily use the context
export function useSearch() {
    return useContext(SearchContext);
}