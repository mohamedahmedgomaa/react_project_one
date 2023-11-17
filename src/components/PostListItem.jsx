import {Button, ButtonGroup, Table} from "react-bootstrap";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

const PostListItem = ({data, deleteRecord}) => {
    const navigate = useNavigate();

    const deleteHandler = (item) => {
        if (window.confirm("Do ypu really want to delete record " + item.title + " ? ")) {
            deleteRecord(item.id);
        }
    }
    const records = data.map((el, idx) => (
        <tr key={el.id}>
            <td>#{++idx}</td>
            <td><Link to={`/post/${el.id}`}>{el.title}</Link></td>
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={() => navigate(`post/${el.id}/edit`)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteHandler(el)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));
    return (
        <>
            {records}
        </>
    );
};

export default PostListItem;
