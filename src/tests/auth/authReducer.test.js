const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', ()=>{


    test('Debe de retornar el estado por defecto', ()=>{
        const reducer = authReducer({logged: false}, {});
        expect(reducer).toEqual({logged: false})
        
    });
    
    test('Debe de autenticar al usuario', ()=>{

        const action = {
            type: types.login,
            payload: {
                name: 'Jesus Milano'
            },
        }
        const reducer = authReducer({}, action);

        expect(reducer).toEqual({
            logged: true,
            name: 'Jesus Milano'
        })

    });
    
    test('Debe de hacer logout al usuario', ()=>{

        const action = {
            type: types.logout,
        }
        const reducer = authReducer({}, action);

        expect(reducer).toEqual({
            logged: false,
        });
    });

});