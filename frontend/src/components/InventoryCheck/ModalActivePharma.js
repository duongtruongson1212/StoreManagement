import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { listItemInventoryCheck } from "../../Redux/Actions/InventoryCheckAction";

const MyVerticallyCenteredModalListCategory = (props) => {
  const { data, setModalShowActivePharma } = props;
  const { categories } = data;
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();  
    dispatch(listItemInventoryCheck(itemName))
    setItemName("");
    setModalShowActivePharma(false)
  };
  const handleChange = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };
  const onHide= () => {
    setModalShowActivePharma(false)
  }
  return (
    <Modal
      {...props}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm thuốc từ nhóm thuốc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="mb-4 form-line">
          <div className="row d-flex">
            <div className="col-md-3 d-flex align-items-center">Nhóm thuốc</div>
            <div className="col-md-9">
              <Form.Group controlId="formBasicText">
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn nhóm thuốc</option>
                  {categories?.map((cat, index) => {
                    return (
                      <option key={index} value={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ marginTop: "20px" }}
          >
            Chọn
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default MyVerticallyCenteredModalListCategory;
