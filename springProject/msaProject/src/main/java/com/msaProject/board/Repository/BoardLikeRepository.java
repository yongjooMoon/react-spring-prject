package com.msaProject.board.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.msaProject.board.model.Like;

@Repository
public interface BoardLikeRepository extends JpaRepository<Like, Integer> {
	
	Optional<Like> findByNoAndId(Integer no, String id);

	void deleteByNoAndId(Integer no, String id);
}