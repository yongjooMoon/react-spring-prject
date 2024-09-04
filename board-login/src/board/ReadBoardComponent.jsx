import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AxiosService from '../service/AxiosService';
import CommentsSection from './CommentsSection';
import HeartButton from './HeartButton';

const ReadBoardComponent = () => {
    const { no } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState({});
    const { user } = useUser(); // 컨텍스트에서 사용자 정보 가져오기
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        AxiosService.apiRequest('GET', 'api/board/' + no).then(res => {
            setBoard(res.data);

            const info ={
                no: no,
                id: user.param.id
            }
            AxiosService.apiRequest('POST', 'api/board/getLike', info).then(res => {
                setIsLiked(res.data);
            })
        });
    }, [no]);

    const returnBoardType = (typeNo) => {
        let type;
        switch (typeNo) {
            case "1":
                type = "자유게시판";
                break;
            case "2":
                type = "질문과 답변 게시판";
                break;
            default:
                type = "타입 미지정";
        }
        return (
            <div className="row">
                <label>게시판 종류:</label> {type}
            </div>
        );
    };

    const returnDate = (cTime, uTime) => {
        return (
            <div className="row">
                <h6>생성일: [ {cTime} ] / 최종 수정일: [ {uTime} ]</h6>
            </div>
        );
    };

    const goToList = () => {
        navigate('/board');
    };

    const updateList = () => {
        navigate(`/create-board/${no}`);
    };

    const handleHeartClick = () => {
        // 좋아요 버튼 활성화/비활성화
        const chkLike = !isLiked;
        setIsLiked(chkLike);

        const likeInfo ={
            no: no,
            id: user.param.id,
            isLiked: chkLike
        }
        AxiosService.apiRequest('POST', 'api/board/like', likeInfo).then( res => {
            if (res.status === 200) {
                //alert("좋아요를 눌렀습니다.");
            } else {
                alert("좋아요를 실패했습니다.");
            }
        });
    };

    const deleteList = (no) => {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            AxiosService.apiRequest('DELETE', 'api/board/' + no).then( res => {
                //console.log("delete result => "+ JSON.stringify(res));
                if (res.status === 200) {
                    navigate('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });

        }
    };

    return (
        <div>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">게시판 상세</h3>
                <div className="card-body">
                    {returnBoardType(board.type)}
                    <div className="row">
                        <label>제목:</label> {board.title}
                    </div>
                    <div className="row">
                        <label>내용:</label> <br />
                        <textarea value={board.contents} readOnly />
                    </div>
                    <div className="row">
                        <label>작성자:</label> {board.memberNo}
                    </div>
                    <div className="row">
                        {returnDate(board.createTime, board.updateTime)}
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={goToList}
                        style={{ marginTop: "10px", marginLeft: "10px" }}
                    >
                        글 목록으로 이동
                    </button>
                    {user && user.param && user.param.id === board.memberNo ? (
                    <>
                        <button
                        className="btn btn-primary"
                        onClick={() => updateList(no)}
                        style={{ marginTop: "10px", marginLeft: "10px", background: "green" }}
                        >
                        글 수정
                        </button>
                        <button
                        className="btn btn-primary"
                        onClick={() => deleteList(no)}
                        style={{ marginTop: "10px", marginLeft: "10px", background: "red" }}
                        >
                        글 삭제
                        </button>
                    </>
                    ) : ''}
                    <HeartButton isLiked={isLiked} onHeartClick={handleHeartClick} />
                </div>
            </div>
            <CommentsSection boardId={no} />
        </div>
    );
};

export default ReadBoardComponent;
