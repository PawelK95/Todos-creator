import * as React from 'react';
import {  Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

interface Props {
    setSearchName: (payload: any) => void;
    setAddName: (payload: string) => void;
    add: (payload: any) => void;
    addName: string;
    todo_list?: number;
}

class Panel extends React.Component<Props > {

    handleSearch(e: any) {
        this.props.setSearchName( e.target.value);
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const {add, addName, todo_list} = this.props;
        typeof todo_list !== 'undefined' ?
            add({name: addName, is_complete: false, todo_list: todo_list}) :
            add(addName);
    }

    handleChange(e: any) {
        this.props.setAddName(e.target.value);
    }
    render() {
        const {addName } = this.props;
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Name"
                                value={addName}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <InputGroup.Button>
                                <Button type="submit">Add <Glyphicon glyph="plus" /></Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => this.handleSearch(e)}
                />
            </div>
        );
    }
}

export default Panel;