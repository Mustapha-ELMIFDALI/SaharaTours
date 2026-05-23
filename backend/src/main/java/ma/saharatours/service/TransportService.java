package ma.saharatours.service;

import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.TransportDTO;
import ma.saharatours.entity.Transport;
import ma.saharatours.repository.TransportRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransportService {

    private final TransportRepository transportRepository;

    public List<TransportDTO> getAll() {
        return transportRepository.findAll().stream().map(this::toDTO).toList();
    }

    public TransportDTO getById(Long id) {
        return transportRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Transport introuvable : " + id));
    }

    public TransportDTO create(TransportDTO dto) {
        return toDTO(transportRepository.save(toEntity(dto)));
    }

    @Transactional
    public TransportDTO update(Long id, TransportDTO dto) {
        Transport existing = transportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transport introuvable : " + id));
        existing.setName(dto.getName());
        existing.setType(dto.getType());
        existing.setCapacity(dto.getCapacity());
        existing.setPricePerTrip(dto.getPricePerTrip());
        existing.setPricePerDay(dto.getPricePerDay());
        existing.setDriver(dto.isDriver());
        existing.setAc(dto.isAc());
        existing.setImage(dto.getImage());
        if (dto.getFeatures() != null) {
            existing.getFeatures().clear();
            existing.getFeatures().addAll(dto.getFeatures());
        }
        return toDTO(transportRepository.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!transportRepository.existsById(id))
            throw new RuntimeException("Transport introuvable : " + id);
        transportRepository.deleteById(id);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────
    public TransportDTO toDTO(Transport t) {
        TransportDTO dto = new TransportDTO();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setType(t.getType());
        dto.setCapacity(t.getCapacity());
        dto.setPricePerTrip(t.getPricePerTrip());
        dto.setPricePerDay(t.getPricePerDay());
        dto.setDriver(t.isDriver());
        dto.setAc(t.isAc());
        dto.setImage(t.getImage());
        dto.setFeatures(t.getFeatures());
        return dto;
    }

    private Transport toEntity(TransportDTO dto) {
        return Transport.builder()
                .name(dto.getName())
                .type(dto.getType())
                .capacity(dto.getCapacity())
                .pricePerTrip(dto.getPricePerTrip())
                .pricePerDay(dto.getPricePerDay())
                .driver(dto.isDriver())
                .ac(dto.isAc())
                .image(dto.getImage())
                .features(dto.getFeatures() != null ? dto.getFeatures() : List.of())
                .build();
    }
}
