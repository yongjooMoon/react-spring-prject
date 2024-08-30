package com.msaProject.board.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msaProject.board.model.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

}