import {createStore} from 'vuex';

let store =createStore({
    state(){
        return{
            NumProd:parseInt(localStorage.getItem('counter'))||0 ,
        }
    },
    mutations:{
        ADDTOCART(state){
            let oldcount=state.NumProd;
            oldcount+=1;
            state.NumProd=oldcount;
            localStorage.setItem('counter', state.NumProd);
        },
        DeleteItem(state){
            let oldcount=state.NumProd;
            oldcount-=1;
            state.NumProd=oldcount;
            if(state.NumProd<0)
            {
                state.NumProd=0;
            }
            localStorage.setItem('counter', state.NumProd);
        }
    },
    actions:{
        ADDTOCART({commit}){
            commit('ADDTOCART')
        }
        ,DeleteItem({commit}){
            commit('DeleteItem')
        }
    },
    getters:{}
});
export default store;