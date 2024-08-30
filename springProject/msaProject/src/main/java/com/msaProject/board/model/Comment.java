package com.msaProject.board.model;
import jakarta.persistence.*;

@Entity
@Table(name = "comments")
@IdClass(CommentId.class)
public class Comment {

    @Id
    @Column(name = "id")
    private String id;

    @Id
    @Column(name = "no")
    private Integer no;
    
    @Id
    @Column(name = "comment_no")
    private Integer commentNo;

    @Column(name = "content")
    private String content;

    @Column(name = "created_time")
    @Temporal(TemporalType.TIMESTAMP)
    private String createdTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getNo() {
		return no;
	}

	public void setNo(Integer no) {
		this.no = no;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(String createdTime) {
		this.createdTime = createdTime;
	}

	public Integer getCommentNo() {
		return commentNo;
	}

	public void setCommentNo(Integer commentNo) {
		this.commentNo = commentNo;
	}	
    
}
