package ma.saharatours.service;

import ma.saharatours.dto.CreateUserRequest;
import ma.saharatours.dto.UpdateProfileRequest;
import ma.saharatours.dto.UserDTO;
import ma.saharatours.entity.User;
import ma.saharatours.enums.Role;
import ma.saharatours.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService – Unit Tests")
class UserServiceTest {

    @Mock private UserRepository  userRepository;
    @Mock private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User client;
    private User admin;

    @BeforeEach
    void setUp() {
        client = User.builder()
                .id(1L)
                .name("Client User")
                .email("client@test.com")
                .password("encoded")
                .role(Role.CLIENT)
                .build();
        client.prePersist();

        admin = User.builder()
                .id(2L)
                .name("Admin User")
                .email("admin@test.com")
                .password("encoded")
                .role(Role.ADMIN)
                .build();
        admin.prePersist();
    }

    // ── getAll ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("getAll() – returns all users as DTOs")
    void getAll_returnsAllDTOs() {
        when(userRepository.findAll()).thenReturn(List.of(client, admin));

        List<UserDTO> result = userService.getAll();

        assertThat(result).hasSize(2);
        assertThat(result).extracting(UserDTO::getEmail)
                .containsExactlyInAnyOrder("client@test.com", "admin@test.com");
    }

    // ── getById ───────────────────────────────────────────────────────────────

    @Test
    @DisplayName("getById() – existing user returns DTO")
    void getById_existingUser_returnsDTO() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(client));

        UserDTO result = userService.getById(1L);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getName()).isEqualTo("Client User");
        assertThat(result.getRole()).isEqualTo("CLIENT");
    }

    @Test
    @DisplayName("getById() – unknown ID throws RuntimeException")
    void getById_unknownId_throwsException() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getById(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("99");
    }

    // ── updateSelf ────────────────────────────────────────────────────────────

    @Test
    @DisplayName("updateSelf() – changes name and saves")
    void updateSelf_changesName() {
        UpdateProfileRequest req = new UpdateProfileRequest();
        req.setName("New Name");

        when(userRepository.findByEmail("client@test.com")).thenReturn(Optional.of(client));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        UserDTO result = userService.updateSelf("client@test.com", req);

        assertThat(result.getName()).isEqualTo("New Name");
        verify(userRepository).save(client);
    }

    @Test
    @DisplayName("updateSelf() – changes email successfully when not taken")
    void updateSelf_changesEmail() {
        UpdateProfileRequest req = new UpdateProfileRequest();
        req.setEmail("newemail@test.com");

        when(userRepository.findByEmail("client@test.com")).thenReturn(Optional.of(client));
        when(userRepository.existsByEmail("newemail@test.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        UserDTO result = userService.updateSelf("client@test.com", req);

        assertThat(result.getEmail()).isEqualTo("newemail@test.com");
    }

    @Test
    @DisplayName("updateSelf() – email already taken throws RuntimeException")
    void updateSelf_emailAlreadyTaken_throwsException() {
        UpdateProfileRequest req = new UpdateProfileRequest();
        req.setEmail("taken@test.com");

        when(userRepository.findByEmail("client@test.com")).thenReturn(Optional.of(client));
        when(userRepository.existsByEmail("taken@test.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.updateSelf("client@test.com", req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("déjà utilisé");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateSelf() – encodes new password when provided")
    void updateSelf_encodesNewPassword() {
        UpdateProfileRequest req = new UpdateProfileRequest();
        req.setPassword("newpassword");

        when(userRepository.findByEmail("client@test.com")).thenReturn(Optional.of(client));
        when(passwordEncoder.encode("newpassword")).thenReturn("encoded_new");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        userService.updateSelf("client@test.com", req);

        verify(passwordEncoder).encode("newpassword");
        assertThat(client.getPassword()).isEqualTo("encoded_new");
    }

    // ── createUser ────────────────────────────────────────────────────────────

    @Test
    @DisplayName("createUser() – creates new ADMIN user successfully")
    void createUser_adminRole_createsSuccessfully() {
        CreateUserRequest req = new CreateUserRequest();
        req.setName("New Admin");
        req.setEmail("newadmin@test.com");
        req.setPassword("pass1234");
        req.setRole("ADMIN");

        when(userRepository.existsByEmail("newadmin@test.com")).thenReturn(false);
        when(passwordEncoder.encode("pass1234")).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.prePersist();
            return u;
        });

        UserDTO result = userService.createUser(req);

        assertThat(result.getEmail()).isEqualTo("newadmin@test.com");
        assertThat(result.getRole()).isEqualTo("ADMIN");
    }

    @Test
    @DisplayName("createUser() – duplicate email throws RuntimeException")
    void createUser_duplicateEmail_throwsException() {
        CreateUserRequest req = new CreateUserRequest();
        req.setEmail("client@test.com");
        req.setPassword("pass");
        req.setName("Dup");

        when(userRepository.existsByEmail("client@test.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.createUser(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("déjà utilisé");

        verify(userRepository, never()).save(any());
    }

    // ── delete ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("delete() – existing user deletes successfully")
    void delete_existingUser_deletesSuccessfully() {
        when(userRepository.existsById(1L)).thenReturn(true);

        assertThatCode(() -> userService.delete(1L))
                .doesNotThrowAnyException();

        verify(userRepository).deleteById(1L);
    }

    @Test
    @DisplayName("delete() – unknown ID throws RuntimeException")
    void delete_unknownId_throwsException() {
        when(userRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> userService.delete(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("99");

        verify(userRepository, never()).deleteById(any());
    }

    // ── role update ───────────────────────────────────────────────────────────

    @Test
    @DisplayName("update() – admin promotes CLIENT to ADMIN")
    void update_promotesToAdmin() {
        UserDTO dto = new UserDTO();
        dto.setRole("ADMIN");

        when(userRepository.findById(1L)).thenReturn(Optional.of(client));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        UserDTO result = userService.update(1L, dto);

        assertThat(result.getRole()).isEqualTo("ADMIN");
    }
}
