import * as actionType from './ActionsTypes';
export function AddItemsData(data, tempid)
{
  return {
    type: actionType.ADD_ITEMSDATA, payload: {data, tempid},
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: "//localhost:8000/api/user/"+data.users_id+"/todo",
          method: "POST",
          body: JSON.stringify(data),
          headers: { 
            "content-type": "application/json" 
          }
        }, 
        commit: { type: actionType.ADD_ITEMSDATA_COMMIT, meta: { data , tempid } },
        rollback: { type: actionType.ADD_ITEMSDATA_ROLLBACK, meta: { data , tempid} }
      }
    }
  }
}
export function enabledEditItem(index){
  return {
    type: actionType.ENABLED_EDIT_ITEMSDATA, payload: index,
    
  }
}
export function deleteItemsData(data){
  return {
    type: actionType.DELETE_ITEMSDATA, payload: {data},
    meta :{
      offline: {
        effect: {
          url: "//localhost:8000/api/todo/"+data.id,
          method: "delete",
          body: JSON.stringify(data),
          headers: { 
            "content-type": "application/json" 
          }
        }, 
      }
    }
  }
}
export function editItemsData(data){
  return {
    type: actionType.EDIT_ITEMSDATA, payload: {data},
    meta :{
      offline: {
        effect: {
          url: "//localhost:8000/api/todo/"+data.id,
          method: "PUT",
          body: JSON.stringify(data),
          headers: { 
            "content-type": "application/json" 
          }
        }, 
        commit: { type: actionType.EDIT_ITEMSDATA_COMMIT, meta: { data} },
        rollback: { type: actionType.EDIT_ITEMSDATA_ROLLBACK, meta: { data} }
      }
    }
  }
}
export function setItemsData(data){
  return {
    type: actionType.SET_ITEMSDATA, payload: data
  }
}