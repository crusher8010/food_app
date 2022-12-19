const cartreducer = (state, action) => {
    switch(action.type){
        case "Add_To_Cart": {
            let flag = state.findIndex((item) => item.id === action.payload.id);
            const obj = state[flag];
            let updatedItems;
            
            if(obj){
                const updatedItem = {
                    ...obj, amount: obj.amount+ action.payload.amount
                };
                updatedItems = [...state];
                updatedItems[flag] = updatedItem;
            }else{
                updatedItems = state.concat(action.payload)
            }

            return updatedItems;
        }

        case "Remove_From_Cart":{
            let flag = state.findIndex((item) => item.id === action.payload);
            let obj = state[flag];
            let updatedItems;

            if(obj.amount === 1){
                updatedItems = state.filter((item) => {
                    return item.id !== action.payload;
                })
            }else{
                const updatedItem = {...obj, amount: obj.amount-1};
                updatedItems = [...state];
                updatedItems[flag] = updatedItem;
            }

            return updatedItems;
        }

        case "Checkout":{
            return [];
        }

        default : {
            return state
        }
    }
}

export default cartreducer;