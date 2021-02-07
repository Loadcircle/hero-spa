import { mount } from "enzyme";
import React from 'react'
import { AuthContext } from "../../auth/AuthContext";
import { LoginScreen } from "../../components/login/LoginScreen";
import { types } from "../../types/types";

describe('Pruebas en', ()=>{

    const historyMock = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', ()=>{

        expect( wrapper).toMatchSnapshot();

    });

    
    test('Debe de realizar el dispatch y la navegacion', ()=>{

        const handleClick = wrapper.find('button').prop('onClick'); 
        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalledWith({           
            type: types.login,
            payload: {
                name: 'Jesus Milano',
            }
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect(historyMock.replace).toHaveBeenCalledWith('/dc');


    });

});