import  * as actionType from './ActionsTypes';
import initialState from './State';
export default function reducers(state = initialState,action){

  switch (action.type) {
    case actionType.ADD_ITEMSDATA:
      return {
        ...state,
        itemsData: [...state.itemsData, {id: action.payload.tempid, name: action.payload.data.name, isTemp : true, edit: false}]
      }
      case actionType.ADD_ITEMSDATA_COMMIT:
        return {
          ...state,
          itemsData: state.itemsData.map(item => {
            if (item.id === action.meta.tempId) {
              return {
                ...item,
                id: action.payload.id,
                isTemp: false
              }
            }
            return item;
          })
        }
        case actionType.EDIT_ITEMSDATA_ROLLBACK:
          return {
            ...state,
            itemsData: state.itemsData.filter(item => item.id === action.meta.data.id)
          };
      case actionType.ADD_ITEMSDATA_ROLLBACK:
        return {
          ...state,
          itemsData: state.itemsData.filter(item => item.id === action.meta.tempId)
        };
      case actionType.EDIT_ITEMSDATA:
        return {
          ...state,
          itemsData: state.itemsData.map((item, index) => {
            if (item.id === action.payload.data.id) {
              return {
                ...item,
                name: action.payload.data.name,
                edit: true
              }
            }
            return item
        })
      }
      case actionType.DELETE_ITEMSDATA:
        return{
          ...state,
          itemsData: state.itemsData.filter(item => item.id !== action.payload.data.id)
        }
      case actionType.EDIT_ITEMSDATA_COMMIT:
        return {
          ...state,
          itemsData: state.itemsData.map((item, index) => {
            if (item.id === action.payload.meta.id) {
              return  {
                ...item,
                name: action.payload.data.name,
                edit: false
              }
            }
            return item

        })
      }
    case actionType.ENABLED_EDIT_ITEMSDATA:
        return {
          ...state,
          itemsData: state.itemsData.map((item, index) => {
            if (index === action.payload) {
              return {
                ...item,
                edit: true
              }
            }
            return item;
          })
        }
    case actionType.SET_ITEMSDATA:
      return {
        ...state,
        itemsData: action.payload
      }
    default:
      return state;
  }
}
