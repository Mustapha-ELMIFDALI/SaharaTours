package ma.saharatours.service;

import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.ReservationDTO;
import ma.saharatours.entity.Reservation;
import ma.saharatours.entity.User;
import ma.saharatours.enums.ReservationStatus;
import ma.saharatours.repository.ReservationRepository;
import ma.saharatours.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    /** Admin — toutes les réservations */
    public List<ReservationDTO> getAll() {
        return reservationRepository.findAll().stream().map(this::toDTO).toList();
    }

    /** Client — réservations de l'utilisateur */
    public List<ReservationDTO> getByUser(Long userId) {
        return reservationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toDTO).toList();
    }

    public ReservationDTO getById(Long id) {
        return reservationRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable : " + id));
    }

    public ReservationDTO create(ReservationDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        Reservation reservation = Reservation.builder()
                .user(user)
                .itemId(dto.getItemId())
                .type(dto.getType())
                .itemName(dto.getItemName())
                .date(dto.getDate())
                .people(dto.getPeople())
                .total(dto.getTotal())
                .status(ReservationStatus.PENDING)
                .build();
        return toDTO(reservationRepository.save(reservation));
    }

    /** Admin — changer le statut */
    public ReservationDTO updateStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable : " + id));
        reservation.setStatus(ReservationStatus.valueOf(status.toUpperCase()));
        return toDTO(reservationRepository.save(reservation));
    }

    public void delete(Long id) {
        if (!reservationRepository.existsById(id))
            throw new RuntimeException("Réservation introuvable : " + id);
        reservationRepository.deleteById(id);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────
    public ReservationDTO toDTO(Reservation r) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(r.getId());
        dto.setUserId(r.getUser().getId());
        dto.setUserName(r.getUser().getName());
        dto.setItemId(r.getItemId());
        dto.setType(r.getType());
        dto.setItemName(r.getItemName());
        dto.setDate(r.getDate());
        dto.setPeople(r.getPeople());
        dto.setTotal(r.getTotal());
        dto.setStatus(r.getStatus().name());
        dto.setCreatedAt(r.getCreatedAt() != null ? r.getCreatedAt().toString() : null);
        return dto;
    }
}
