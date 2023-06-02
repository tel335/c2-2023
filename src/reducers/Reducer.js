export const Reducer = (state= [], action) => {
    //Se definen los casos para agregar y eliminar de favoritos
    switch (action.type){
        case 'ADDFAV':
            var exists=0
            state.forEach(element => {
                if( action.fact.value !== undefined && element.value !== undefined){     //Primero se verifica que exista el elemento
                    if(element.value === action.fact.value){                       //Se agrega para verificar si ya está agregado el fact y no agregarla de nuevo
                        exists=1
                    }
                }
            });
            if(exists===0 || state[0]===undefined){                         //Si el fact aún no ha sido agregada o ningún fact ha sido agregada
                alert('Fact Liked')                 
                return [ ...state, action.fact ]                            //Se agrega a los favoritos
            }
            else{
                alert('You already liked this fact')
                return  [ ...state]
            }
        case 'DELFAV':                                                              //Elimina el fact si se encuentra agregada
            alert('Fact Deleted')
            return [...state.filter(fact => fact !== action.fact)]
        
        default:
            return [ ...state]

    }
}