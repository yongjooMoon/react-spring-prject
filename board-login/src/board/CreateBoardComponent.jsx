import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AxiosService from '../service/AxiosService';

const CreateBoardComponent = () => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [memberNo, setMemberNo] = useState('');
    const { user } = useUser(); // 컨텍스트에서 사용자 정보 가져오기

    const { no } = useParams();
    const navigate = useNavigate();

    const changeTypeHandler = (event) => {
        setType(event.target.value);
    };

    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    };

    const changeContentsHandler = (event) => {
        setContents(event.target.value);
    };

    const changeMemberNoHandler = (event) => {
        setMemberNo(event.target.value);
    };

    const createBoard = (event) => {
        event.preventDefault();
        const boardData = {
            type,
            title,
            contents,
            memberNo
        };

        if (no === '_create') {
            AxiosService.apiRequest('POST', 'api/board', boardData).then( res => {
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert("실패했습니다.");
                }
            });
        } else {
            AxiosService.apiRequest('PUT', 'api/board/' + no, boardData).then( res => {
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert("실패했습니다.");
                }
            });
        }
    };

    const cancel = () => {
        navigate('/board');
    };

    const getTitle = () => {
        if (no === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>;
        } else {
            return <h3 className="text-center">{title}글을 수정합니다.</h3>;
        }
    };

    useEffect(() => {
        if (no !== '_create') {
            AxiosService.apiRequest('GET', 'api/board/' + no).then(res => {
                const boardData = res.data;
                setType(boardData.type);
                setTitle(boardData.title);
                setContents(boardData.contents);
                setMemberNo(boardData.memberNo);
            }).catch(error => console.error("Error fetching board:", error));
        }else{
            setType("1");

            const info = user && user.param ? (user.param.id) : '';
            setMemberNo(info);
        }
    }, [no]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form onSubmit={createBoard}>
                                <div className="form-group">
                                    <label>종류</label>
                                    <select name="type" className="form-control" 
                                        value={type} onChange={changeTypeHandler}>
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>제목</label>
                                    <input type="text" placeholder="제목" name="title" className="form-control" 
                                        value={title} onChange={changeTitleHandler} />
                                </div>
                                <div className="form-group">
                                    <label>내용</label>
                                    <textarea placeholder="내용" name="contents" className="form-control" 
                                        value={contents} onChange={changeContentsHandler} />
                                </div>
                                <div className="form-group">
                                    <label>작성자</label>
                                    <input name="memberNo" className="form-control" 
                                        value={memberNo} onChange={changeMemberNoHandler} readOnly />
                                </div>
                                <button className="btn btn-success" type="submit">Save</button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={cancel}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBoardComponent;
