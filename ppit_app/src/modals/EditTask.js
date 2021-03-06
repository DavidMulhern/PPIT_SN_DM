import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditTask = ({ modal, toggle, updateTask, taskObj }) => {

    const [rteValue, setRteValue] = useState('');

    useEffect(() => {
        setRteValue(taskObj.rte)
    }, [])

    const handleChange = (e) => {
        setRteValue(e)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        let taskObj = {}

        taskObj["rte"] = rteValue
        updateTask(taskObj)
    }

   return (
        <Modal isOpen={modal} toggle={toggle} contentClassName="your-custom-class">
            <ModalHeader toggle={toggle}>Edit Card</ModalHeader>
            <ModalBody>

                <div className="App">
                    <CKEditor
                        config={
                            {
                                cloudServices: {
                                    uploadUrl: "https://88037.cke-cs.com/easyimage/upload/",
                                    tokenUrl: "https://88037.cke-cs.com/token/dev/106eb05296cc85fd48dc707a24296dabad703eb299fe21dbf939ca3923b5?limit=10"
                                }
                            }
                        }

                        name="editorName"
                        editor={ClassicEditor}
                        data={taskObj.data}
                        onChange={(event, editor) => {
                            const dataFromEditor = editor.getData();
                            handleChange(dataFromEditor);
                        }}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTask;