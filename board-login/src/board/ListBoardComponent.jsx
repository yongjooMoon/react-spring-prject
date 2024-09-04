import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // React Router v6의 Navigate 컴포넌트
import AxiosService from '../service/AxiosService';

const ListBoardComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [navigateTo, setNavigateTo] = useState(null);
    const [state, setState] = useState({
        p_num: 1,
        paging: {},
        boards: []
    });

    useEffect(() => {
        AxiosService.apiRequest('GET', 'api/board?p_num=' + state.p_num)
            .then((res) => {
                setLoading(false);
                setState({ 
                    p_num: res.data.pagingData.currentPageNum,
                    paging: res.data.pagingData,
                    boards: res.data.list
                });
            })
            .catch((error) => {
                console.error("There was an error fetching the boards!", error);
                setError("Error fetching data");
                setLoading(false);
            });
    }, [state.p_num]);

    const createBoard = () => {
        setNavigateTo('/create-board/_create');
    };

    const readBoard = (no) => {
        setNavigateTo(`/read-board/${no}`);
    };

    const listBoard = (p_num) => {
        AxiosService.apiRequest('GET', 'api/board?p_num=' + p_num).then((res) => {
            setState({ 
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list
            });
        });
    };

    const viewPaging = () => {
        const pageNum = [];
        for (let i = state.paging.pageNumStart; i <= state.paging.pageNumEnd; i++) {
            pageNum.push(i);
        }

        return pageNum.map((page) => (
            <li className="page-item" key={page}>
                <button className="page-link" onClick={() => listBoard(page)}>
                    {page}
                </button>
            </li>
        ));
    };

    const isPagingPrev = () => {
        if (state.paging.prev) {
            return (
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => listBoard(state.paging.currentPageNum - 1)}
                        tabIndex="-1"
                    >
                        Previous
                    </button>
                </li>
            );
        }
    };

    const isPagingNext = () => {
        if (state.paging.next) {
            return (
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => listBoard(state.paging.currentPageNum + 1)}
                        tabIndex="-1"
                    >
                        Next
                    </button>
                </li>
            );
        }
    };

    const isMoveToFirstPage = () => {
        if (state.p_num !== 1) {
            return (
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => listBoard(1)}
                        tabIndex="-1"
                    >
                        Move to First Page
                    </button>
                </li>
            );
        }
    };

    const isMoveToLastPage = () => {
        if (state.p_num !== state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => listBoard(state.paging.pageNumCountTotal)}
                        tabIndex="-1"
                    >
                        LastPage({state.paging.pageNumCountTotal})
                    </button>
                </li>
            );
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (navigateTo) {
        return <Navigate to={navigateTo} />;
    }

    return (
        <div>
            <h2 className="text-center">게시판</h2>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={createBoard} style={{ marginBottom: "10px" }}>
                    글 작성
                </button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>타이틀</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>갱신일</th>
                            <th>좋아요수</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.boards.map(board => (
                            <tr key={board.no}>
                                <td>{board.no}</td>
                                <td>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => readBoard(board.no)}
                                    >
                                        {board.title}
                                    </button>
                                </td>
                                <td>{board.memberNo}</td>
                                <td>{board.createTime}</td>
                                <td>{board.updateTime}</td>
                                <td>{board.likes}</td>
                                <td>{board.counts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {isMoveToFirstPage()}
                        {isPagingPrev()}
                        {viewPaging()}
                        {isPagingNext()}
                        {isMoveToLastPage()}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ListBoardComponent;
