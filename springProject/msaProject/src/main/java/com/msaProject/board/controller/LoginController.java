package com.msaProject.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msaProject.board.model.User;
import com.msaProject.board.service.LoginService;
import com.msaProject.core.util.JwtUtil;
import com.msaProject.core.util.UserInfo;
import com.msaProject.core.util.Util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Value("${jwt.key}")
	private String SECRET_KEY;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user ,HttpServletRequest request, HttpServletResponse response) throws IOException {
		Map<String, Object> result = new HashMap<>();
		
		String id = user.getId();
		String password = user.getPassword();
		Optional<User> info = loginService.loginUser(id, password);
	    	if (info.isPresent()) {
	    		// 비밀번호는 화면에 안넘김
	    		info.get().setPassword("");
	    		
//	    		// 세션 설정
//	    		HttpSession session = request.getSession(true);
//
//	    		UserInfo userInfo = new UserInfo();
//				userInfo.parseMap(info);
//	    		String sessionId = session.getId();
//
//	    		if( sessionId.indexOf(".") > -1 ) {
//	    			sessionId = sessionId.substring(0, sessionId.indexOf("."));
//	    		}
//				session.getServletContext().getContext("/").setAttribute(sessionId, Util.serialize(userInfo));
				
	    		// jwt 설정 토큰을 만들어서 쿠키에 저장하여 가지고 다님
	    		String token = JwtUtil.generateToken(info.get().getId(), SECRET_KEY);
	    		
	    		Cookie cookie = new Cookie("token", token);
	            cookie.setHttpOnly(true); // 클라이언트 자바스크립트에서 접근 불가
	            cookie.setPath("/"); // 애플리케이션 전체에서 접근 가능
	            response.addCookie(cookie);
	    		
	    		result.put("list", info);
	            return ResponseEntity.ok(result);
	        } else {
	            return ResponseEntity.status(401).build();  // 로그인 실패 시 401 Unauthorized 반환
	        }
	}
	
	@PostMapping("/create")
	public User createId(@RequestBody User user) {
		return loginService.createId(user);
	}
	
	@GetMapping("/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) {
//		HttpSession session = request.getSession();
//		
//		if(session != null) {
//			session.invalidate();
//		}
		
		Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    cookie.setValue(null);
                    cookie.setMaxAge(0); // 쿠키 만료 시간 설정 (즉시 만료)
                    cookie.setPath("/"); // 쿠키의 경로 설정 (애플리케이션 전체에 적용)
                    response.addCookie(cookie); // 응답에 쿠키 추가하여 클라이언트에서 삭제되도록 함
                    break;
                }
            }
        }
	}
}