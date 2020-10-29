import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();

    const {q:query = ''} = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({heroName: query});
    const {heroName} = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(query), [query]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        history.push(`?q=${heroName}`)
    }

    

    return (
        <div>
            <h1>
                Search Screen
            </h1>
            <hr/>
            <div className="row">

                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="heroName"
                            value={heroName}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btb mt-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">

                    {
                        (heroesFiltered.length < 1)
                        ?
                        (
                            <div className="alert alert-warning">
                                Hero doesn't exist
                            </div>
                        )
                        :
                        (
                            <>
                                <h4> Results </h4>
                                <hr/>
                                {
                                    heroesFiltered.map(hero=>(
                                        <HeroCard 
                                            key={hero.id}
                                            {...hero}
                                        />
                                    ))
                                }
                            </>
                        )
                    }

                </div>

            </div>
        </div>
    )
}
