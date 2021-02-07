import { mount } from "enzyme";
import { DashboardRoute } from "../../routers/DashboardRoute";
import { AuthContext } from "../../auth/AuthContext";
import React from 'react';
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en DashboardRouter', ()=>{

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    test('Debe hacer match el dashboard route', ()=>{

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>    
                <MemoryRouter>       
                    <DashboardRoute />
                </MemoryRouter>     
            </AuthContext.Provider>
        );

        expect( wrapper).toMatchSnapshot();

    });

});