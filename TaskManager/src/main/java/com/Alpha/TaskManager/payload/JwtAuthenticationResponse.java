package com.Alpha.TaskManager.payload;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;

    public JwtAuthenticationResponse(String accessToken, String role) {
        this.accessToken = accessToken;
        this.role = role;
    }
}