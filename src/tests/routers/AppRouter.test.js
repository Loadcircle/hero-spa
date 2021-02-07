import { mount } from "enzyme";
import React from 'react';
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en AppRouter', ()=>{

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('Debe de mostrar el login si no estoy autenticado', ()=>{

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper).toMatchSnapshot();
    });

    test('Debe de mostrar el componente de Marvel si esta autenticado', ()=>{

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'jesus'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe(true);
    });

});