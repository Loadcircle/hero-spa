import { mount } from "enzyme";
import React from 'react';
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Pruebas en Hero Screen', ()=>{

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }


    test('Debe de mostrar el comoponente redirect si no hay argumentos en el URL', ()=>{

        const wrapper = mount(
            //Initial entries envia parametros
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock} />
            </MemoryRouter>
        );
        expect( wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true)

    });

    test('debe de mostrar un hero si el parametro existe', ()=>{

        const wrapper = mount(
            //Initial entries envia parametros
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />                
            </MemoryRouter>
        );

        expect( wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists()).toBe(true)

    });

    test('Debe regresar a la pantalla anterior con push', ()=>{

        const historyMock = {
            length: 0,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            //Initial entries envia parametros
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={()=> <HeroScreen history={historyMock} />} 
                />                
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();

    });

    test('Debe regresar a la pantalla anterior con goBack', ()=>{

        const historyMock = {
            length: 5,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            //Initial entries envia parametros
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={()=> <HeroScreen history={historyMock} />} 
                />                
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.goBack).toHaveBeenCalled();
        expect(historyMock.push).not.toHaveBeenCalled();
        
    });

});