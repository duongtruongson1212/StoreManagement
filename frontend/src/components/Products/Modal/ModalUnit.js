import React from 'react';
import {Button, Modal, ListGroup, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../../LoadingError/Loading';
import { createUnit, deleteUnit } from '../../../Redux/Actions/UnitAction';

const MyVerticallyCenteredModalUnit = (props) =>{
    const {data, loading} = props
    const dispatch = useDispatch();

    const [itemName, setItemName] = useState('');
    const handleSubmit = e => {
      e.preventDefault();
      dispatch(createUnit(itemName))
      setItemName('');
    };
    return(
      <Modal 
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm đơn vị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="mb-4 form-line">
            <div className="row">
              <div className="col-md-8">
                <Form.Group controlId="formBasicText">
                  <Form.Control type="text" placeholder="Nhập đơn vị" value={itemName} onChange={e => setItemName(e.target.value)}/>
                </Form.Group>
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  Thêm
                </Button>
              </div>
            </div>
          </Form>
          <ListGroup className="list-line">
            {loading ? <Loading/> : ''}
            {data?.map((item, index) => (
              <ListGroup.Item key={index}>
                <span className="item-text">{item}</span>
                <Button variant="danger" size="sm" className="float-right delete-btn" onClick={(e)=>{
                  e.preventDefault()
                  dispatch(deleteUnit(index))
                }}>
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    )
}
export default MyVerticallyCenteredModalUnit