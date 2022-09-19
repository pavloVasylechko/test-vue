import data from '../../data/CitiesAndVillages'
const citiesStore = {
    namespaced:true,
    state:{
        cities:[]
    },
    getters:{
        allCities: ({cities}) => cities.map(item=>item.object_name)
    },
    mutations:{
        ALL_CITIES(state,cities){
            state.cities = cities 
        }
    },
    actions:{
        async getAllCities({commit}){
            const cities = await data
            commit('ALL_CITIES',cities)
        }
    }
}

export default citiesStore