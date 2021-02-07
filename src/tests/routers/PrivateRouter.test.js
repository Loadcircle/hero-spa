import { mount } from "enzyme";
import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { PrivateRouter } from "../../routers/PrivateRouter";

describe('Pruebas en <PrivateRouter/>', ()=>{

    const props = {
        location: {
            pathname : '/ruta'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('Debe de mostrar que el componente si esta autenticado y guardar LS', ()=>{
        
        //El memory Router es un high order component para hacer pruebas
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                    isAuthenticated={true} 
                    component={()=> <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(true);        
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', props.location.pathname)

    });

    test('debe de bloquear el componente si no esta autenticado', ()=>{

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter 
                    isAuthenticated={false} 
                    component={()=> <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(false);    
    })

});