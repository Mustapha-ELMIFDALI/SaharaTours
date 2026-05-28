package ma.saharatours.service;

import ma.saharatours.dto.AuthResponse;
import ma.saharatours.dto.LoginRequest;
import ma.saharatours.dto.RegisterRequest;
import ma.saharatours.entity.User;
import ma.saharatours.enums.Role;
import ma.saharatours.repository.UserRepository;
import ma.saharatours.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService – Unit Tests")
class AuthServiceTest {

    @Mock private UserRepository     userRepository;
    @Mock private PasswordEncoder    passwordEncoder;
    @Mock private JwtUtil            jwtUtil;
    @Mock private AuthenticationManager authManager;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .id(1L)
                .name("Mustapha Test")
                .email("mustapha@test.com")
                .password("encoded_password")
                .role(Role.CLIENT)
                .build();
        sampleUser.prePersist(); // sets createdAt = now
    }

    // ── Login ─────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("login() – valid credentials returns AuthResponse with token")
    void login_validCredentials_returnsAuthResponse() {
        LoginRequest req = new LoginRequest();
        req.setEmail("mustapha@test.com");
        req.setPassword("password123");

        when(userRepository.findByEmail("mustapha@test.com"))
                .thenReturn(Optional.of(sampleUser));
        when(jwtUtil.generateToken(sampleUser)).thenReturn("jwt.token.here");

        AuthResponse response = authService.login(req);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt.token.here");
        assertThat(response.getEmail()).isEqualTo("mustapha@test.com");
        assertThat(response.getName()).isEqualTo("Mustapha Test");
        assertThat(response.getRole()).isEqualTo("CLIENT");

        verify(authManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    @DisplayName("login() – unknown email throws RuntimeException")
    void login_unknownEmail_throwsRuntimeException() {
        LoginRequest req = new LoginRequest();
        req.setEmail("unknown@test.com");
        req.setPassword("password");

        when(userRepository.findByEmail("unknown@test.com"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("introuvable");
    }

    @Test
    @DisplayName("login() – bad credentials propagates exception from authManager")
    void login_badCredentials_throwsException() {
        LoginRequest req = new LoginRequest();
        req.setEmail("mustapha@test.com");
        req.setPassword("wrong");

        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authManager).authenticate(any());

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(BadCredentialsException.class);
    }

    // ── Register ──────────────────────────────────────────────────────────────

    @Test
    @DisplayName("register() – new email creates user and returns AuthResponse")
    void register_newEmail_createsUserAndReturnsResponse() {
        RegisterRequest req = new RegisterRequest();
        req.setName("New User");
        req.setEmail("newuser@test.com");
        req.setPassword("pass1234");

        when(userRepository.existsByEmail("newuser@test.com")).thenReturn(false);
        when(passwordEncoder.encode("pass1234")).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.prePersist();
            return u;
        });
        when(jwtUtil.generateToken(any(User.class))).thenReturn("new.jwt.token");

        AuthResponse response = authService.register(req);

        assertThat(response.getToken()).isEqualTo("new.jwt.token");
        assertThat(response.getEmail()).isEqualTo("newuser@test.com");
        assertThat(response.getRole()).isEqualTo("CLIENT");

        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("register() – duplicate email throws RuntimeException")
    void register_duplicateEmail_throwsRuntimeException() {
        RegisterRequest req = new RegisterRequest();
        req.setName("Dup");
        req.setEmail("existing@test.com");
        req.setPassword("pass");

        when(userRepository.existsByEmail("existing@test.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("déjà utilisé");

        verify(userRepository, never()).save(any());
    }
}
