package com.msaProject.board.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.msaProject.board.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByNo(Integer no);
}
