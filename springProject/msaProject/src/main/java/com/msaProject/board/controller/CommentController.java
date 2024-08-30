package com.msaProject.board.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.msaProject.board.model.Comment;
import com.msaProject.board.service.CommentService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/select")
    public List<Comment> getCommentsByBoardId(@RequestBody Comment comment) {
        return commentService.getCommentsByBoardId(comment.getNo());
    }

    @PostMapping("/add")
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }
    
    @PostMapping("/delete")
    public void deleteComment(@RequestBody Comment comment) {
        commentService.deleteComment(comment);
    }
}
