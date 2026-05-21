package ma.saharatours.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.AuthResponse;
import ma.saharatours.dto.LoginRequest;
import ma.saharatours.dto.RegisterRequest;
import ma.saharatours.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
}
