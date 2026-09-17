import type { KeyboardEvent } from 'react'

interface SearchBarProps {
    city: string
    loading: boolean
    onCityChange: (city: string) => void
    onSearch: () => void
}

function SearchBar({
    city,
    loading,
    onCityChange,
    onSearch,
}: SearchBarProps) {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(event) => onCityChange(event.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button onClick={onSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </div>
    )
}

export default SearchBar