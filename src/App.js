import {useEffect, useState} from 'react';

import './App.css';
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";


const App = () => {
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);
    const [searchField, setSearchField] = useState('')

    console.log('render')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then(users => setMonsters(users))
    },[]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
    }

    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField)
        })
        setFilteredMonsters(newFilteredMonsters);
    }, [monsters, searchField] )


    return (
        <div className="App">
            <h1 className='app-title'>MONSTERS ROLODEX</h1>
            <SearchBox
                onChangeHandler={onSearchChange}
                placeholder='Search monsters'
                className='monsters-search-box'/>
            <CardList monsters={filteredMonsters}/>
        </div>
    );
}


export default App;
