package ma.saharatours.service;

import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.ActivityDTO;
import ma.saharatours.entity.Activity;
import ma.saharatours.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<ActivityDTO> getAll() {
        return activityRepository.findAll().stream().map(this::toDTO).toList();
    }

    public ActivityDTO getById(Long id) {
        return activityRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Activité introuvable : " + id));
    }

    public ActivityDTO create(ActivityDTO dto) {
        Activity activity = toEntity(dto);
        return toDTO(activityRepository.save(activity));
    }

    @Transactional
    public ActivityDTO update(Long id, ActivityDTO dto) {
        Activity existing = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activité introuvable : " + id));
        existing.setTitle(dto.getTitle());
        existing.setCategory(dto.getCategory());
        existing.setPrice(dto.getPrice());
        existing.setDuration(dto.getDuration());
        existing.setDifficulty(dto.getDifficulty());
        existing.setLocation(dto.getLocation());
        existing.setMaxPeople(dto.getMaxPeople());
        existing.setImage(dto.getImage());
        existing.setRating(dto.getRating());
        existing.setReviews(dto.getReviews());
        existing.setDescription(dto.getDescription());
        if (dto.getIncludes() != null) {
            existing.getIncludes().clear();
            existing.getIncludes().addAll(dto.getIncludes());
        }
        return toDTO(activityRepository.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!activityRepository.existsById(id))
            throw new RuntimeException("Activité introuvable : " + id);
        activityRepository.deleteById(id);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────
    public ActivityDTO toDTO(Activity a) {
        ActivityDTO dto = new ActivityDTO();
        dto.setId(a.getId());
        dto.setTitle(a.getTitle());
        dto.setCategory(a.getCategory());
        dto.setPrice(a.getPrice());
        dto.setDuration(a.getDuration());
        dto.setDifficulty(a.getDifficulty());
        dto.setLocation(a.getLocation());
        dto.setMaxPeople(a.getMaxPeople());
        dto.setImage(a.getImage());
        dto.setRating(a.getRating());
        dto.setReviews(a.getReviews());
        dto.setDescription(a.getDescription());
        dto.setIncludes(a.getIncludes());
        return dto;
    }

    private Activity toEntity(ActivityDTO dto) {
        return Activity.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .duration(dto.getDuration())
                .difficulty(dto.getDifficulty())
                .location(dto.getLocation())
                .maxPeople(dto.getMaxPeople())
                .image(dto.getImage())
                .rating(dto.getRating())
                .reviews(dto.getReviews())
                .description(dto.getDescription())
                .includes(dto.getIncludes() != null ? dto.getIncludes() : List.of())
                .build();
    }
}
