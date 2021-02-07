import { mount } from "enzyme";
import React from 'react'
import { MemoryRouter, Route } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { SearchScreen } from "../../components/search/SearchScreen";

describe('Pruebas en SearchScreen', ()=>{

    const historyMock = {
        push: jest.fn()
    }

    test('Debe de mostrarse correctamente con valores por defecto', ()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen}>

                </Route>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de mostrar a Batman y el input con el valor del query', ()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen}>

                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');

    });

    test('Debe de mostrar un erro si no hay heroes', ()=>{
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=sdfsdfsd']}>
                <Route path="/search" component={SearchScreen}>

                </Route>
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-warning').exists()).toBe(true);

    });

    test('Debe llamar al push del history', ()=>{
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route 
                    path="/search" 
                    component={()=> <SearchScreen history={historyMock}/>}>
                </Route>
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: 'searchText',
            value: 'batman'
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`);

    });

});