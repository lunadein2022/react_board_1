import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            isRendered: false,
        };
    }

    state = {
        title: "",
        content: "",
        isRendered: false,
    };

    write = () => {
        Axios.post("http://localhost:8000/insert", {
            title: this.state.title,
            content: this.state.content,
        })
            .then((res) => {
                this.setState({
                    title: this.state.title,
                    content: this.state.content,
                    username: "artistJay",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    update = () => {
        Axios.post("http://localhost:8000/update", {
            title: this.state.title,
            content: this.state.content,
            id: this.props.boardId,
        })
            .then((res) => {
                this.setState({
                    title: this.state.title,
                    content: this.state.content,
                    username: "artistJay",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    detail = () => {
        Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        title: res.data[0].BOARD_TITLE,
                        content: res.data[0].BOARD_CONTENT,
                        username: "artistJay",
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
            this.detail();
        }
    };

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" onChange={this.handleChange} placeholder="제목을 입력하세요" name="title" value={this.state.title}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" onChange={this.handleChange} placeholder="내용을 입력하세요" name="content" value={this.state.content}/>
                    </Form.Group>
                </Form>
                <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>
                    작성완료
                </Button>
            </div>
        );
    }
}

export default Write;
