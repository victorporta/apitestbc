import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { AddItemsData, setItemsData, editItemsData, enabledEditItem, deleteItemsData } from './services/redux/StoreActions';
import axios from './services/request';
import './App.css';

function App(props) {
  const [show, setShow] = useState(false);

  const handleClose = (index) => setShow(false);
  const [itemActive, setitemActive] = useState({
    data: {}, index: null
  });
  const handleShow = (item, index) => {
    setitemActive({
      data: item, index: index
    })
    setShow(true)
  };
  const saveChanges = () => {
    dispatch(editItemsData(itemActive.data));
    handleClose();

  }
  const dispatch = useDispatch();
  const { online } = useSelector(state => state.offline, shallowEqual);
  const { itemsData } = useSelector(state => state.state);
  const [todo, setTodo] = useState("");
  const setTodoFunc = () => {
    dispatch(AddItemsData({ name: todo }, itemsData.length + 1));
    setTodo("");
  };
  useEffect(() => {
    axios.getItems((data) => {
      var items = [];
      data.forEach(element => {
        items.push({ ...element, edit: false, isTemp: false });
      });
      dispatch(setItemsData(items));
    });

  }, []);
  const deleteItem = (item) => {
    if (window.confirm("Estas seguro que deseas eliminar este item?")) {
      dispatch(deleteItemsData(item));
    } else {
      console.log(item);
    }
  }
  return (
    <div className="container p-5">
      {
        online ? <></> : <div className="alert alert-danger" role="alert">
          No tienes coneccion a internet.
        </div>
      }

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Todo</h5>
              <div className="card-text">
                <div className="d-flex justify-content-between">
                  <input type="text" className="form-control" placeholder="Add Todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
                  {
                    todo.length > 0 ? <button className="btn btn-primary mt-2" onClick={(e) => setTodoFunc()} >Add</button> : <button className="btn btn-primary mt-2" disabled >Add</button>
                  }
                </div>
                <ul className="list-group mt-3">
                  {itemsData.map((item, index) => {
                    return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                      {item.name}
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={(e) => handleShow(item, index)} type="button" className="btn btn-secondary">Editar</button>
                        <button type="button" className="btn btn-secondary" onClick={(e) => deleteItem(item)}>Eliminar</button>
                      </div>
                    </li>
                  })}
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <input type="text" className="form-control" value={itemActive.data.name} onChange={(e)=> setitemActive({
                ...itemActive,
                data: {
                  ...itemActive.data,
                  name: e.target.value
                }
              })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}
export default App;
