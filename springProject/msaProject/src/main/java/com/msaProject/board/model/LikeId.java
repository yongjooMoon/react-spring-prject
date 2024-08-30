package com.msaProject.board.model;

import java.util.Objects;

public class LikeId {
	private Integer no;
    private String id;

    // 기본 생성자
    public LikeId() {}

    // 매개변수 있는 생성자
    public LikeId(Integer no, String id) {
        this.no = no;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LikeId that = (LikeId) o;
        return Objects.equals(no, that.no) &&
               Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(no, id);
    }
}
