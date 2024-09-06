package com.msaProject.board.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.msaProject.board.Repository.UserRepository;
import com.msaProject.board.model.User;
import com.msaProject.core.util.JwtUtil;

@Service
public class LoginService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtBlacklistService jwtBlacklistService;

	
	public Optional<User> loginUser(String id, String password) {		
		return userRepository.findByIdAndPassword(id, password);
	}
	
	public User createId(User user){
		return userRepository.save(user);
	}
	
	// 로그아웃 시 JWT 토큰을 블랙리스트에 추가
    public void logout(String token) {
        long expirationTime = JwtUtil.getExpiration(token) - System.currentTimeMillis();
        jwtBlacklistService.addToBlacklist(token, expirationTime);
    }
}