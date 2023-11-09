import {Button, ButtonGroup, Table} from "react-bootstrap";
import React from "react";

const PostListItem = ({data, loading, error}) => {
    const records = data.map((el, idx) => (
        <tr key={el.id}>
            <td>#{++idx}</td>
            <td>{el.title}</td>
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));
    return (
        <>
            {
                loading ? (
                    <tr>
                        <td colSpan={3}>Loading please wait....</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan={3}>{error}</td>
                    </tr>
                ) : records
            }
        </>
    );
};

export default PostListItem;
