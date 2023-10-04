import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 불러옴


const Board = ({
    id,
    title,
    registerId,
    registerDate,
    props
}) => {
    return (
        <tr>
            <td>
                <input type="checkbox" value={id} onChange={props.onCheckboxChange}></input>
            </td>
            <td>{id}</td>
            <td>{title}</td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    );
};


class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [],
            checkList: [],
        };
    }

    state = {
        boardList: [],
        checkList: [],
    };

    getList = () => {
        Axios.get("http://localhost:8000/list", {})
            .then((res) => {
                const { data } = res;
                this.setState({
                    boardList: data,
                });
                this.props.renderComplete();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    onCheckboxChange = (checked, id) => {
        const list = this.state.checkList.filter((a) => {
            return a = id;
        });

        if (checked) {
            list.push(id);
        }

        this.setState({
            checkList: list,
        });
    };

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isComplete !== prevProps.isComplete) {
            this.getList();
        }
    }
    


    render() {
        const { boardList } = this.state;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line
                            boardList.map((v) => {
                                return (
                                    React.createElement(Board, {
                                        id: v.BOARD_ID,
                                        title: v.BOARD_TITLE,
                                        registerId: v.REGISTER_ID,
                                        registerDate: v.REGISTER_DATE,
                                        key: v.BOARD_ID,
                                        props: this
                                    })
                                );
                            })

                        }
                    </tbody>
                    </Table>
                <Link to="/write"> {/* 글쓰기 버튼을 Link 컴포넌트로 감싸서 Write 페이지로 이동 */}
                    <Button variant="info">글쓰기</Button>
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.props.handleModify(this.state.checkList);
                    }}
                >
                    수정하기
                </Button>
                <Button variant="danger">삭제하기</Button>
            </div>
        );
    }
}

export default BoardList;
