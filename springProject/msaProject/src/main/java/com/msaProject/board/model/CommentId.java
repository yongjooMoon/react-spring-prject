package com.msaProject.board.model;

import java.io.Serializable;
import java.util.Objects;

public class CommentId implements Serializable {
    private Integer no;
    private String id;
    private Integer commentNo;

    // 기본 생성자
    public CommentId() {}

    // 매개변수 있는 생성자
    public CommentId(Integer no, String id, Integer commentNo) {
        this.no = no;
        this.id = id;
        this.commentNo = commentNo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentId that = (CommentId) o;
        return Objects.equals(no, that.no) &&
               Objects.equals(id, that.id) &&
               Objects.equals(commentNo, that.commentNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(no, id, commentNo);
    }
}
