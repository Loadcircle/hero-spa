import { mount } from "enzyme";
import React from 'react';
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";
import '@testing-library/jest-dom'

describe('Pruebas en Navbar', ()=>{

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
            name: 'pedro'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>                    
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(()=>{
        jest.clearAllMocks();
    });

    test('Debe mostrarse correctamente', ()=>{

        expect( wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name)

    });

    test('Debe de llamar el logout y usar el history', ()=>{

        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout})

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    });

});