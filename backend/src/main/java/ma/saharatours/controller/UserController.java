package ma.saharatours.controller;

import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.CreateUserRequest;
import ma.saharatours.dto.UpdateProfileRequest;
import ma.saharatours.dto.UserDTO;
import ma.saharatours.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ─── Utilisateur connecté — modifier son propre profil ────────────────────
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateSelf(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody UpdateProfileRequest req) {
        return ResponseEntity.ok(userService.updateSelf(principal.getUsername(), req));
    }

    // ─── Admin ────────────────────────────────────────────────────────────────
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    /** Admin — créer un nouvel utilisateur (avec rôle ADMIN ou CLIENT) */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(req));
    }

    /** Admin — modifier rôle / infos d'un utilisateur */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
