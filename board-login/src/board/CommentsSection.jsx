import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import AxiosService from '../service/AxiosService';

const CommentsSection = ({ boardId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useUser(); // 컨텍스트에서 사용자 정보 가져오기

    useEffect(() => {
        // 댓글을 불러옵니다
        const boardNo = {
            no: boardId
        }

        AxiosService.apiRequest('POST', 'api/comments/select', boardNo).then(res => {
            setComments(res.data);
        }).catch(error => console.error('댓글 조회 실패', error));
    }, [boardId]);

    const handleAddComment = () => {
        if (!newComment) return;

        const comment = {
            no: boardId,
            id: user.param.id,
            content: newComment,
            createdTime: new Date().toISOString()
        };

        AxiosService.apiRequest('POST', 'api/comments/add', comment).then(response => {
            if (response.status === 200) {
                AxiosService.apiRequest('POST', 'api/comments/select', comment).then(res => {
                    setComments(res.data);
                    setNewComment('');
                });
            }
        }).catch(error => console.error('댓글 추가 실패', error));
    };

    const handleDeleteComment = (commentId, commentNo) => {
        if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
            const commentInfo = {
                no: boardId,
                id: commentId,
                commentNo: commentNo
            };

            AxiosService.apiRequest('POST', 'api/comments/delete', commentInfo).then(response => {
                if (response.status === 200) {
                    setComments(prevComments => 
                        prevComments.filter(comments => 
                            !(comments.id === commentId && comments.commentNo === commentNo)
                        )
                    );
                } else {
                    alert('댓글 삭제가 실패했습니다.');
                }
            }).catch(error => console.error('댓글 삭제 실패', error));
        }
    };

    return (
        <div className="card col-md-6 offset-md-3" style={{ marginTop: '20px' }}>
            <div className="card-body">
                <h4 className="text-center">댓글</h4>
                <div className="row">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="form-control"
                        rows="3"
                    />
                    <button 
                        onClick={handleAddComment} 
                        className="btn btn-primary" 
                        style={{ marginTop: '10px', marginLeft: 'auto', marginRight: '10px' }}>
                        댓글 추가
                    </button>
                </div>
                <div className="comments-list" style={{ marginTop: '20px' }}>
                    {comments.map(comment => (
                        <div key={comment.commentNo} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div><strong>{comment.id}</strong></div>
                                {user && user.param && user.param.id === comment.id ? (
                                <>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id, comment.commentNo)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        삭제
                                    </button>
                                </>
                                ) : ''}
                            </div>
                            <div>{comment.content}</div>
                            <div><small>{new Date(comment.createdTime).toLocaleString()}</small></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentsSection;
