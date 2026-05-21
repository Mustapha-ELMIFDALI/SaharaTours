package ma.saharatours.service;

import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.CreateUserRequest;
import ma.saharatours.dto.UpdateProfileRequest;
import ma.saharatours.dto.UserDTO;
import ma.saharatours.entity.User;
import ma.saharatours.enums.Role;
import ma.saharatours.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> getAll() {
        return userRepository.findAll().stream().map(this::toDTO).toList();
    }

    public UserDTO getById(Long id) {
        return userRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
    }

    /** Admin — changer nom/email/rôle d'un utilisateur */
    public UserDTO update(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + id));
        if (dto.getName() != null)  user.setName(dto.getName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getRole() != null)  user.setRole(Role.valueOf(dto.getRole()));
        return toDTO(userRepository.save(user));
    }

    /** Utilisateur connecté — modifier son propre profil */
    public UserDTO updateSelf(String currentEmail, UpdateProfileRequest req) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (req.getName()  != null && !req.getName().isBlank())
            user.setName(req.getName());

        if (req.getEmail() != null && !req.getEmail().isBlank()
                && !req.getEmail().equals(currentEmail)) {
            if (userRepository.existsByEmail(req.getEmail()))
                throw new RuntimeException("Cet email est déjà utilisé");
            user.setEmail(req.getEmail());
        }

        if (req.getPassword() != null && !req.getPassword().isBlank())
            user.setPassword(passwordEncoder.encode(req.getPassword()));

        return toDTO(userRepository.save(user));
    }

    /** Admin — créer un nouvel utilisateur (ADMIN ou CLIENT) */
    public UserDTO createUser(CreateUserRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Cet email est déjà utilisé");

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.valueOf(req.getRole() != null ? req.getRole() : "CLIENT"))
                .build();

        return toDTO(userRepository.save(user));
    }

    public void delete(Long id) {
        if (!userRepository.existsById(id))
            throw new RuntimeException("Utilisateur introuvable : " + id);
        userRepository.deleteById(id);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────
    public UserDTO toDTO(User u) {
        UserDTO dto = new UserDTO();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole().name());
        dto.setCreatedAt(u.getCreatedAt() != null ? u.getCreatedAt().toString() : null);
        return dto;
    }
}
