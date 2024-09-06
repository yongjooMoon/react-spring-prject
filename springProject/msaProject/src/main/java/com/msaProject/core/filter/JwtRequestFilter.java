package com.msaProject.core.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import com.msaProject.board.service.JwtBlacklistService;
import com.msaProject.core.util.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    
    @Autowired
	private JwtBlacklistService jwtBlacklistService;

    // 제외할 URL 목록
    private final List<String> excludeUrlPatterns = List.of("/api/login", "/api/create", "/api/logout");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // 현재 요청 URI
        String requestUri = request.getRequestURI();

        // 제외할 경로에 해당하는 경우 필터를 건너뜁니다.
        if (excludeUrlPatterns.contains(requestUri)) {
            chain.doFilter(request, response);
            return;
        }

        logger.info("Request received at {}", request.getRemoteAddr());

        // 쿠키에서 JWT 추출
        String jwt = JwtUtil.extractJwtFromCookies(request);

        if (jwt != null) {
            try {
            	if(jwtBlacklistService.isBlacklisted(jwt)) {
            		// 블랙리스트에 포함된 토큰
            		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "만료된 토큰입니다.");
                    return;
            	}
            	
                String userId = JwtUtil.extractUsername(jwt);
                if (userId != null && request.getAttribute("userId") == null) {
                    // JWT가 유효하면 사용자 정보를 설정
                    request.setAttribute("userId", userId);
                } else if (userId == null) {
                	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 존재하지 않습니다.");
                    return;
                }
            } catch (Exception e) {
                // JWT가 유효하지 않은 경우
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "잘못된 토큰입니다.");
                return;
            }
        }else {
        	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 존재하지 않습니다.");
            return;
        }

        chain.doFilter(request, response);

        logger.info("Response sent to {}", request.getRemoteAddr());
    }
}
